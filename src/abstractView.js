
import {t} from "./i18n.xml";
import {ContextMenu} from "@green-code-studio/context-menu/dist/index.mjs";
export class AbstractView extends HTMLElement {
    loadData(data, start, limit, infiniteScrollEnabled) {
        this.style.setProperty('--height', (data.total * this.rowHeight) + 'px');
        let top = 0;
        let isOdd = true;
        if (infiniteScrollEnabled) {
            top = this.rowHeight * start;
            isOdd = start % 2 == 0;
        }
        let newChildren = [];
        for (let row of data.rows) {
            let tr = this.generateRow(row);
            tr.style.top = `${top}px`;
            tr.classList.toggle('odd', isOdd)
            tr.classList.toggle('even', !isOdd)
            newChildren.push(tr);
            top += this.rowHeight;
            isOdd = !isOdd;
        }
        let oldChildren = Array.from(this.body.children);
        for (let tr of oldChildren.filter(tr => !newChildren.includes(tr) && !tr.matches(':focus'))) {
            tr.remove();
        }

        for (let tr of newChildren.filter(tr => !oldChildren.includes(tr))) {
            this.body.appendChild(tr);
        }
    }

    onScroll(e) {
        if (this.objectsList.infiniteScrollEnabled && this.onPaginationChanged) {
            let start = Math.round(this.scrollTop / this.rowHeight);
            let passedStart = Math.floor(start / 20) * 20 - 20;
            if (passedStart < 0)
                passedStart = 0;
            this.onPaginationChanged(passedStart);
        }
    }

    trOnClick(row, e) {
        const rowsIds = this.objectsList.currentRows.map(x => x.id);
        console.log('click')
        if (!e.ctrlKey) {
            this.objectsList.selected.clear();
        }

        if (e.shiftKey) {
            const mainIndex = rowsIds.indexOf(this.objectsList.selectedMain);
            const clickedIndex = rowsIds.indexOf(row.id);
            if (clickedIndex >= 0 && mainIndex >= 0)
                rowsIds.slice(Math.min(mainIndex, clickedIndex), Math.max(mainIndex, clickedIndex) + 1).forEach(x => this.objectsList.selected.add(x));
        } else {
            if (this.objectsList.selected.has(row.id))
                this.objectsList.selected.delete(row.id);
            else
                this.objectsList.selected.add(row.id);

            this.objectsList.selectedMain = row.id;
        }

        this.refreshSelectedClasses();
    }

    trOnDblClick(row, tr, e) {
        if (!this.objectsList.selected.has(tr.dataset.row)) {
            this.objectsList.selected.clear();
            this.objectsList.selected.add(tr.dataset.row)
            this.objectsList.selectedMain = tr.dataset.row;
            this.refreshSelectedClasses();
        }
        let action = this.objectsList.generateActions(this.objectsList.getSelectedData(), 'dblClick').find(x => x.main);
        if (action) {
            if (action.command) {
                action.command();
            } else if (action.href) {
                this.objectsList.gotoUrl(action.href)
            }
        }
    }
    contextMenu(tr, event) {
        event.stopPropagation();
        if (!this.objectsList.selected.has(tr.dataset.row)) {
            this.objectsList.selected.clear();
            this.objectsList.selected.add(tr.dataset.row)
            this.objectsList.selectedMain = tr.dataset.row;
            this.refreshSelectedClasses();
        }
        const rows = this.objectsList.getSelectedData();
        let actions = this.objectsList.generateActions(rows, 'contextMenu');
        let actions2 = [];
        for (const action of actions) {
            actions2.push(action);
            if (action.href) {
                actions2.push({
                    ...action,
                    href: null,
                    command: () => window.open(action.href),
                    name: (action.name ?? '') + ' (' + t('objectList.inNewTab') + ')'
                });
            }
        }
        let elements = actions2.map(action => ({
            text: action.name,
            icon: action.icon,
            class: action.action ? 'action-' + action.action : '',
            onclick: action.command || (() => this.objectsList.gotoUrl(action.href))
        }));
        elements.push({
            text: 'copy',
            icon: 'icon-copy',
            onclick: () => {
                this.forceCopy(rows);
            }
        })
        ContextMenu.openContextMenu(event, elements);
    }
    trOnKeyDown(row, tr, e) {
        console.log('trOnKeyDown')
        if (e.key === 'Enter') {
            let action = this.objectsList.generateActions(this.objectsList.getSelectedData(), 'enter').find(x => x.main);
            if (action) {
                if (action.command) {
                    action.command();
                } else if (action.href) {
                    this.objectsList.gotoUrl(action.href)
                }
            }
        } else if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            const rowsIds = this.objectsList.currentRows.map(x => x.id);
            let index = rowsIds.indexOf(this.objectsList.selectedMain);
            if (e.key === 'ArrowDown') {
                if (index < rowsIds.length) index++;
                else index = rowsIds.length - 1;
            } else {
                if (index > 0) index--;
            }
            const id = rowsIds[index];
            if (!e.ctrlKey) {
                this.objectsList.selected.clear();
            }
            if (e.shiftKey) {
                if (!this.objectsList.selectedShiftStart) {
                    this.objectsList.selectedShiftStart = this.objectsList.selectedMain;
                }
                this.selectRange(this.objectsList.selectedShiftStart, id)
            } else {
                this.objectsList.selectedShiftStart = null;
                if (!e.ctrlKey) {
                    this.objectsList.selected.add(id);
                }
            }
            this.objectsList.selectedMain = id;
            this.refreshSelectedClasses();
            e.preventDefault();
        } else if (e.key === ' ') {
            if (this.objectsList.selected.has(this.objectsList.selectedMain))
                this.objectsList.selected.delete(this.objectsList.selectedMain);
            else
                this.objectsList.selected.add(this.objectsList.selectedMain);

            this.refreshSelectedClasses();
            e.preventDefault();
        } else if (e.key === 'a') {
            if (e.ctrlKey)
                this.objectsList.selected.selectAll();

            this.refreshSelectedClasses();
            e.preventDefault();
        }
    }

    trOnDragStart(row, oryginalTr, e) {
        if (!this.objectsList.selected.has(row.id)) {
            this.objectsList.selected.clear()
            this.objectsList.selected.add(row.id)
            this.refreshSelectedClasses();
        }
        this.fillDataTransfer(e.dataTransfer, this.objectsList.selected);
    }

    fillDataTransfer(dataTransfer, ids) {
        const trs = Array.from(this.body.children).filter(tr => ids.has(tr.dataset.row));
        let action = this.objectsList.generateActions(this.objectsList.getSelectedData(), 'dataTransfer').find(x => x.main);
        if (action && action.href) {
            dataTransfer.setData('text/uri-list', new URL(action.href, document.baseURI));
        }
        if (action && action.hrefArray) {
            dataTransfer.setData('text/uri-list', action.hrefArray.map(x => new URL(x, document.baseURI)).map(x => x.toString()).join("\r\n#\r\n"));
        }
        dataTransfer.setData('text/html', this.generateTableHtml(trs));
        dataTransfer.setData('text/plain', this.generateTableTextPlain(trs));

    }

    refreshSelectedClasses() {
        for (const tr of this.body.children) {
            tr.classList.toggle('selected', this.objectsList.selected.has(tr.dataset.row));
            tr.classList.toggle('selectedMain', this.objectsList.selectedMain == tr.dataset.row);
            if (this.objectsList.selectedMain == tr.dataset.row) {
                tr.tabIndex = 1;
                tr.focus();
                getSelection().selectAllChildren(tr)
            } else {
                tr.tabIndex = -1;
            }
        }
    }

    selectRange(start, end) {
        const rowsIds = this.objectsList.currentRows.map(x => x.id);
        let startIndex = rowsIds.indexOf(start);
        let endIndex = rowsIds.indexOf(end);
        if (endIndex < startIndex) {
            let tmp = startIndex;
            startIndex = endIndex;
            endIndex = tmp;
        }
        for (let i = startIndex; i <= endIndex; i++) {
            this.objectsList.selected.add(rowsIds[i]);
        }
    }


    onCopy(e) {
        if (this.copyForced) {
            this.fillDataTransfer(e.clipboardData, this.copyForced);
            e.preventDefault();
        } else if (document.querySelector(':focus')?.findParent(x => x === this)) {
            this.fillDataTransfer(e.clipboardData, this.objectsList.selected);
            e.preventDefault();
        }
    }
}
