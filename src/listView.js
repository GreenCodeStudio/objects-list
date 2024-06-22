import {AbstractView} from "./abstractView.js";
import {create} from "fast-creator";

export class ListView extends AbstractView {
    constructor(objectsList) {
        super();
        this.objectsList = objectsList;
        this.init();
        window.dbgList = this;
    }

    init() {
        this.body=create('.body')
        const bodyContainer = create('.bodyContainer')
        bodyContainer.append(this.body)
        this.append(bodyContainer)
        this.addEventListener('scroll', this.onScroll.bind(this));
    }

    calcMaxVisibleItems(height) {
        return Math.floor((height) / this.rowHeight);
    }

    get rowHeight() {
        return Math.max(63, this.objectsList.visibleColumns.length * 21) + 20;
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
        tr.children.removeAll();
        tr.append(create('.icon', {className: this.objectsList.icon}));
        for (let column of this.objectsList.visibleColumns) {
            let keyValue = create('.keyValue');
            tr.append(keyValue)
            let key = create('strong', {text: column.name + ': '});
            keyValue.append(key);
            let value = create('span');
            keyValue.append(value);
            value.append((column.content?.call(column,data)||data[column.dataName]));
        }
        let actionsTd = create('.td.actions');
        tr.append(actionsTd);
        let actions = this.objectsList.generateActions([data], 'row');
        for (let action of actions) {
            let actionButton = create(action.href ? 'a.button' : 'button', {
                title: action.name
            });
            actionsTd.append(actionButton);
            if (action.href) {
                actionButton.href = action.href;
            }
            if (action.command) {
                actionButton.onclick = action.command;
            }
            if (action.icon) {
                actionButton.append(create('span', {classList: [action.icon]}));
                actionButton.append(action.name);
            } else {
                actionButton.textContent = action.name;
            }
        }


        tr.dataset.row = data.id;
        // tr.oncontextmenu = this.contextMenu.bind(this, tr);
        // tr.onclick = this.trOnClick.bind(this, data);
        // tr.ondblclick = this.trOnDblClick.bind(this, data, tr);
        // tr.onkeydown = this.trOnKeyDown.bind(this, data, tr);
        // tr.ondragstart = this.trOnDragStart.bind(this, data, tr);
    }
}

customElements.define('list-view', ListView);
