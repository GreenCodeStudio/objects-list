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
                .map(([category, columns]) => ({name: category == 'undefined' ? '' : category, columns}))
        }))
        this.querySelector('.mode').onchange = () => {
            objectsList.infiniteScrollEnabled = this.querySelector('.mode').value == 'scrollMode'
            objectsList.refresh()
        }
        if (objectsList.infiniteScrollEnabled) {
            this.querySelector('.mode').value = 'scrollMode'
        }
        if (objectsList.insideViewClass == TableView) {
            if (objectsList.insideViewParams?.wide)
                this.querySelector('.view').value = 'tableWideView'
            else
                this.querySelector('.view').value = 'tableView'
        } else if (objectsList.insideViewClass == ListView) {
            this.querySelector('.view').value = 'listView'
        }

        this.querySelector('.view').onchange = () => {
            objectsList.insideViewName = this.querySelector('.view').value
            objectsList.refresh()
        }
        // this.addEventListener('blur', () => {
        //     console.log('blur')
        //     if (!this.matches(':focus-within, :focus'))
        //         this.remove();
        // })
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
            const current = objectsList.columnFilters.get(filterContainer.dataset.name)
            if (current) {
                console.log('ffff')
                filter.set(current)
            }
        }

        this.querySelector('[type="search"]').oninput = (event) => {
            objectsList.configPopupSearch = event.target.value
            this.refreshSearch(event.target.value)
        }
        if (objectsList.configPopupSearch) {
            this.querySelector('[type="search"]').value = objectsList.configPopupSearch
            this.refreshSearch(objectsList.configPopupSearch)
        }
        this.tabIndex = 0
        setTimeout(() => this.focus(), 1)
        setTimeout(() => this.checkFocus(), 100)
        this.refreshSearch('')
    }

    refreshSearch(value) {
        let countedVisible = 0;
        const visibilityLimit = 100;
        for (const table of this.querySelectorAll('.categoryTableContainer')) {
            let anyVisible = false;
            for (const row of table.querySelectorAll('tbody tr')) {
                const shouldBeVisible = row.children[1].textContent.toLowerCase().includes(value.toLowerCase());
                const visible = shouldBeVisible && countedVisible < visibilityLimit;
                row.style.display = visible ? '' : 'none'
                if (visible) {
                    anyVisible = true;
                }

                countedVisible += shouldBeVisible;
            }
            table.style.display = anyVisible ? '' : 'none'
        }
        const endInformation = this.querySelector('.endInformation');
        if (countedVisible > visibilityLimit) {
            endInformation.style.display = '';
            endInformation.textContent = t('objectList.visibilityLimitReached') + ' ' + countedVisible
        } else {
            endInformation.style.display = 'none';
        }
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
