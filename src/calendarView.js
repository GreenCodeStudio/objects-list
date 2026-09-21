import {AbstractView} from "./abstractView.js";
import {create} from "fast-creator";
import {ListView} from "./listView.js";

export class CalendarView extends AbstractView {
    constructor(objectsList) {
        super();
        this.objectsList = objectsList;
        this.init();
        window.dbgList = this;
    }

    init() {
        this.body = create('.body.monthCalendarBody')
        const bodyContainer = create('.bodyContainer')
        bodyContainer.append(this.body)
        this.append(bodyContainer)
        this.addEventListener('scroll', this.onScroll.bind(this));
    }

    calcMaxVisibleItems(height) {
        return Number.POSITIVE_INFINITY
    }

    loadData(data) {
        while (this.body.firstChild) {
            this.body.removeChild(this.body.firstChild);
        }
        console.log('data', data)
        let startDay = new Date()
        if (this.objectsList.date) {
            startDay = new Date(this.objectsList.date)
        }
        startDay.setDate(1);

        startDay.setDate(startDay.getDate() - startDay.getDay() + 1);
        for (let i = 0; i < 7 * 6; i++) {
            const day = new Date(startDay);
            day.setDate(startDay.getDate() + i);
            const dayElement = create('.day', {
                data: {date: day.toISOString().substring(0, 10)},
                text: day.toISOString().substring(0, 10)
            })
            this.body.append(dayElement)
            for (let item of data.rows.filter(r => this.objectsList.dateRowCallback(r).toISOString().substring(0, 10) == day.toISOString().substring(0, 10))) {
                const itemElement = create('.item')
                itemElement.append(this.objectsList.calendarRowCallback(item))
                dayElement.append(itemElement)
                itemElement.dataset.row = item.id;
                itemElement.oncontextmenu = this.contextMenu.bind(this, itemElement);
                itemElement.onclick = this.trOnClick.bind(this, item);
                itemElement.ondblclick = this.trOnDblClick.bind(this, item, itemElement);
                itemElement.onkeydown = this.trOnKeyDown.bind(this, item, itemElement);
                itemElement.ondragstart = this.trOnDragStart.bind(this, item, itemElement);
            }
            if (this.objectsList.calendarDayActions) {
                const calendarDayActionsWrapper= create('.calendarDayActionsWrapper');
                dayElement.append(calendarDayActionsWrapper);
                let dayActions = this.objectsList.calendarDayActions(day);
                for (let action of dayActions) {
                    let actionButton = create(action.href ? 'a.button' : 'button', {
                        title: action.name
                    });
                    calendarDayActionsWrapper.append(create(actionButton));
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
            }
        }
    }
}

customElements.define('calendar-view', CalendarView);
