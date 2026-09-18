import {ContextMenu} from "@green-code-studio/context-menu/dist/index.mjs";
import {create} from "fast-creator";
import {AbstractView} from "./abstractView.js";
import {t} from "./i18n.xml";

export class TableView extends AbstractView {
    constructor(objectsList, params) {
        super();
        this.objectsList = objectsList;
        this.init();
        window.dbgTable = this;
        this.params = params ?? {};
    }

    init() {
        this.head = create('.head');
        this.append(this.head);
        this.refreshHeader();
        const bodyContainer = create('.bodyContainer')
        this.body = create('.body')
        bodyContainer.append(this.body)
        this.append(bodyContainer);
        this.setColumnsWidths();
        addEventListener('resize', this.setColumnsWidths.bind(this))
        addEventListener('copy', this.onCopy.bind(this));
        this.addEventListener('scroll', this.onScroll.bind(this));
    }

    refreshHeader() {
        while (this.head.firstChild) this.head.firstChild.remove();

        console.log('uuu')
        this.head.append(create('.column.icon'))
        for (let column of this.objectsList.visibleColumns) {
            let node = create('.column')
            node.__column = column
            this.head.append(node);
            node.append(create('span.name', {text: column.name}));
            if (column.sortName) {
                node.classList.add('ableToSort');
                node.dataset.sortName = column.sortName
                node.onclick = () => {
                    let sortName = column.sortName || x.dataset.value;
                    if (this.objectsList.sort && this.objectsList.sort.col === column.sortName) {
                        this.objectsList.sort.desc = !this.objectsList.sort.desc;
                    } else {
                        this.objectsList.sort = {col: column.sortName, desc: false};
                    }
                    if (!this.objectsList.infiniteScrollEnabled) {
                        this.objectsList.start = 0;
                    }
                    this.objectsList.refresh();
                }
            }
            this.initColumnMovability(node)
        }
        this.head.append(create('.column.actions'))


        this.setColumnsWidths();
    }

    initColumnMovability(node) {
        let startX = null;
        let changed = false;
        let onmove = (e) => {
            const movement = (e.pageX - startX);
            node.style.setProperty('--move-x', movement + 'px');
            if (movement < -node.previousElementSibling.clientWidth / 2) {
                if (node.previousElementSibling.__column) {
                    startX -= node.previousElementSibling.clientWidth;
                    const prev = node.previousElementSibling;
                    node.parentNode.insertBefore(node, prev);
                    this.objectsList.reorderColumns(node.__column, prev?.__column)
                    changed = true;
                }
            } else if (movement > node.nextElementSibling.clientWidth / 2) {
                if (node.nextElementSibling.__column) {
                    startX += node.nextElementSibling.clientWidth;
                    const next = node.nextElementSibling.nextElementSibling;
                    node.parentNode.insertBefore(node, next);
                    this.objectsList.reorderColumns(node.__column, next?.__column)
                    changed = true;
                }
            }
        }
        const onup = e => {
            const movement = (e.pageX - startX);
            if (Math.abs(movement) < 10 && !changed) {
                if (node.onclick)
                    node.onclick();
            }
            startX = null;
            node.style.setProperty('--move-x', 0 + 'px');
            removeEventListener('mousemove', onmove);
            removeEventListener('mouseup', onup);
            if(changed) {
                this.objectsList.refresh()
            }
        }
        node.addEventListener('mousedown', (e) => {
            startX = e.pageX;
            addEventListener('mousemove', onmove)
            addEventListener('mouseup', onup)
        })
    }

    loadData(data, start, limit, infiniteScrollEnabled) {
        this.refreshSortIndicators();
        super.loadData(data, start, limit, infiniteScrollEnabled)
        this.setColumnsWidths();
    }

    get rowHeight() {
        return parseFloat(window.getComputedStyle(this).getPropertyValue('--rowHeight') ?? 31);
    }

    generateRow(data) {
        let tr = this.body.querySelector(`.tr[data-row="${data.id}"]`);
        if (!tr) {
            tr = create('.tr');
            tr.draggable = true;
        }
        tr.classList.toggle('selected', this.objectsList.selected.has(data.id))
        this.fillRowContent(tr, data);
        return tr;
    }

    fillRowContent(tr, data) {
        tr.lastData = data;
        while (tr.firstChild) {
            tr.removeChild(tr.firstChild)
        }
        tr.append(create('.td.icon', {className: this.objectsList.icon}));
        for (let column of this.objectsList.visibleColumns) {
            let td = create('.td');
            tr.append(td);
            if (this.multiEdit && column.dataName) {
                tr.dataset.id = data.id;
                td.append(create('input', {
                    data: {name: column.dataName},
                    value: data[column.dataName],
                    onclick: e => e.stopPropagation(),
                    onchange: () => this.multiEditChanged(tr)
                }));
            } else {
                td.append(column.content?.call(column, data) || data[column.dataName] || '');
            }
        }
        let actionsTd = create('.td.actions');
        tr.append(actionsTd);
        let actions = this.objectsList.generateActions([data], 'row');
        if (this.multiEdit && data.__isMultirowEdited) {
            actions = [
                {
                    name: t("objectList.saveRow"),
                    icon: 'icon-save',
                    command: () => {
                        this.multiEditChanged(tr, true)
                    }
                }
            ]
        }
        for (let action of actions) {
            let actionButton = create(action.href ? 'a.button' : 'button', {
                title: action.name
            });
            actionsTd.append(create(actionButton));
            actionButton.classList.add('action-' + (action.action ?? 'view'));

            if (action.href) {
                actionButton.href = action.href;
            }
            if (action.command) {
                actionButton.onclick = action.command;
            }
            if (action.icon) {
                actionButton.append(create('span', {classList: [action.icon]}));
            } else {
                actionButton.textContent = action.name;
            }
        }


        tr.dataset.row = data.id;
        tr.oncontextmenu = this.contextMenu.bind(this, tr);
        tr.onclick = this.trOnClick.bind(this, data);
        tr.ondblclick = this.trOnDblClick.bind(this, data, tr);
        tr.onkeydown = this.trOnKeyDown.bind(this, data, tr);
        tr.ondragstart = this.trOnDragStart.bind(this, data, tr);
    }

    setColumnsWidths() {
        const widths = this.calculateColumnsWidths();
        for (let tr of this.body?.children ?? []) {
            for (let i = 0; i < widths.length; i++) {
                if(tr.children[i]) {
                    tr.children[i].style.width = widths[i] + 'px';
                }
            }
        }
        let sum = 0;
        for (let i = 0; i < widths.length; i++) {
            let node = this.head.children[i];
            if (node) {
                if (i + 1 < widths.length)
                    node.style.width = widths[i] + 1 + 'px';
                else
                    node.style.width = widths[i] + 'px';
                node.style.left = sum + 'px';
            }
            sum += widths[i];
        }
    }

    calculateColumnsWidths() {
        let needed = [{base: 30, grow: 0}];

        for (let column of this.objectsList.visibleColumns) {
            needed.push({base: column.width || 10, grow: typeof (column.widthGrow) == "number" ? column.widthGrow : 1});
        }
        let actionWidth = Math.ceil(Array.from(this.querySelectorAll('.td.actions')).map(x => {
            if (x.lastElementChild)
                return x.lastElementChild.getBoundingClientRect().right - x.getBoundingClientRect().left + parseFloat(getComputedStyle(x).paddingRight);
            else
                return 0;
        }).reduce((a, b) => Math.max(a, b), 0));
        needed.push({base: actionWidth, grow: 0});
        let availableToGrow = this.clientWidth - needed.map(x => x.base).reduce((a, b) => a + b, 0);
        let sumGrow = needed.map(x => x.grow).reduce((a, b) => a + b, 0);
        if (this.params?.wide) {
            return needed.map(x => x.base + x.grow * Math.max(100, availableToGrow / sumGrow));
        } else {
            if (availableToGrow > 0 && sumGrow > 0) {
                return needed.map(x => x.base + x.grow / sumGrow * availableToGrow);
            } else {
                return needed.map(x => x.base);
            }
        }
    }

    refreshSortIndicators() {
        this.head.querySelectorAll('[data-order]').forEach(x => delete x.dataset.order);
        if (this.objectsList.sort)
            this.head.querySelectorAll(`[data-sort-name="${this.objectsList.sort.col}"]`).forEach(x => x.dataset.order = this.objectsList.sort.desc ? 'desc' : 'asc');
    }

    generateTableHtml(trs) {
        const thead = '<thead><tr>' + Array.from(this.head.querySelectorAll('.column')).map(x => '<th>' + x.innerHTML + '</th>').join('') + '</tr></thead>';
        const tbody = '<tbody>' + trs.map(tr => {
            return '<tr>' + Array.from(tr.children).slice(1, -1).map(td => {
                return '<td>' + td.innerHTML + '</td>';
            }).join('') + '</tr>';
        }).join('') + '</tbody>'
        return '<table>' + thead + tbody + '</table>';
    }

    generateTableTextPlain(trs) {
        const head = Array.from(this.head.querySelectorAll('.column')).map(x => x.textContent.replace(/\r\n/gm, ' ')).join("\t")
        const body = trs.map(tr => Array.from(tr.children).slice(1).map(x => x.textContent.replace(/\r\n/gm, ' ')).join("\t")).join("\r\n")
        return head + "\r\n" + body;
    }

    calcMaxVisibleItems(height) {
        return Math.floor((height - this.head.clientHeight) / this.rowHeight);
    }

    forceCopy(rows) {
        this.copyForced = new Set(rows.map(x => x.id));
        document.execCommand("copy");
        setTimeout(() => this.copyForced = null, 100);
    }

    startMultiEdit() {
        this.multiEdit = true;
    }

    multiEditChanged(tr, save = false) {
        let data = [...tr.querySelectorAll('[data-name]')].map(x => [x.dataset.name, x.value]);
        let dataObj = Object.fromEntries(data);
        this.objectsList.multiEditChanged(tr.dataset.id, dataObj, save);
        this.fillRowContent(tr, {...tr.lastData, ...dataObj, __isMultirowEdited: true});
        this.setColumnsWidths();
    }
}

customElements.define('table-view', TableView);
