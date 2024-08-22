import template from './ConfigPopup.mpts';
import {t} from './i18n.xml';
import {TableView} from "./tableView.js";
import {ListView} from "./listView.js";
import {ColumnFilter} from "./ColumnFilter.js";

export class ConfigPopup extends HTMLElement {
    constructor(objectsList) {
        super();
        this.append(template({
            t,
            categories: Object.entries(objectsList.columns.reduce((o, c) => {
                o[c.category] = (o[c.category] ?? [])
                o[c.category].push(c);
                return o;
            }, {}))
                .map(([category, columns]) => ({name: category=='undefined'?'':category, columns}))
        }))
        this.querySelector('.mode').onchange = () => {
            objectsList.infiniteScrollEnabled = this.querySelector('.mode').value == 'scrollMode'
            objectsList.refresh()
        }
        this.querySelector('.view').onchange = () => {
            if (this.querySelector('.view').value == 'tableView')
                objectsList.insideViewClass = TableView
            else
                objectsList.insideViewClass = ListView
            objectsList.refresh()
        }
        this.addEventListener('blur', () => {
            if (!this.matches(':focus-within, :focus'))
                this.remove();
        })
        this.querySelector('select').focus()
        console.log('ssss')
        for (const checkbox of this.querySelectorAll('table input[type="checkbox"]')) {
            checkbox.checked = !objectsList.hiddenColumns.has(checkbox.dataset.name)
            checkbox.onchange = () => {
                if (checkbox.checked)
                    objectsList.hiddenColumns.delete(checkbox.dataset.name)
                else
                    objectsList.hiddenColumns.add(checkbox.dataset.name)

                objectsList.refresh()
            }
        }

        for (const filterContainer of this.querySelectorAll('table .filter')) {
            const filter = new ColumnFilter();
            filterContainer.append(filter)
            filter.addEventListener('x-filter', (e) => {
                console.log('dddd', e)
                objectsList.columnFilters.set(filterContainer.dataset.name, e.detail)
                objectsList.refresh()
            });
        }

        this.querySelector('[type="search"]').oninput = (event) => {
            for (const table of this.querySelectorAll('.categoryTableContainer')) {
                let anyVisible = false;
                for (const row of table.querySelectorAll('tbody tr')) {
                    const visible = row.children[1].textContent.toLowerCase().includes(event.target.value.toLowerCase())
                    row.style.display = visible ? '' : 'none'
                    if (visible)
                        anyVisible = true;
                }
                table.style.display = anyVisible ? '' : 'none'
            }
        }

        this.tabIndex = 0
        setTimeout(() => this.focus(), 1)
        setTimeout(() => this.checkFocus(), 100)
    }

    checkFocus() {
        console.log('checkFocus')
        if (!this.matches(':focus-within, :focus'))
            this.remove();

        if (this.parentNode)
            setTimeout(() => this.checkFocus(), 100)
    }
}

customElements.define('config-popup', ConfigPopup);
