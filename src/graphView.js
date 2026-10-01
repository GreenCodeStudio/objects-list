import {AbstractView} from "./abstractView.js";
import {create} from "fast-creator";
import {CalendarView} from "./calendarView.js";

export class GraphView extends AbstractView {
    constructor(objectsList) {
        super();
        this.objectsList = objectsList;
        this.init();
        window.dbgList = this;
    }

    init() {
        this.body = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this.body.classList.add('graphView');
        const bodyContainer = create('.bodyContainer')
        bodyContainer.append(this.body)
        this.append(bodyContainer)
        const tmpPath=document.createElementNS("http://www.w3.org/2000/svg", "path");
        tmpPath.setAttribute('d', 'M0,0 L100,100 L50,0 Z');
        this.body.append(tmpPath)
    }
    calcMaxVisibleItems(height) {
        return Number.POSITIVE_INFINITY
    }
    loadData(data) {
        console.log('loaded', data)
        let d='M0,0 ';
        const minDate=new Date(data.summary[0].date);
        const maxDate=new Date(data.summary[data.summary.length-1].date);
        const max=Math.max(...data.summary.map(s=>s.count));
        for (let i=0;i<data.summary.length;i++) {
            const x=(new Date(data.summary[i].date)-minDate)/(maxDate-minDate)*this.clientWidth;
            const y=(1-data.summary[i].count/max)*this.clientHeight;
            d+=`L${x},${y} `;
        }
        const path=document.createElementNS("http://www.w3.org/2000/svg", "path");
        path.classList.add('lineGraph');
        path.setAttribute('d', d);
        this.body.append(path)
    }
}
customElements.define('graph-view', GraphView);
