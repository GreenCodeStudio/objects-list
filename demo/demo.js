import {ObjectsList} from "../src/index.js";
import '../src/style/objectsList.scss';

console.log('aa');
const dataSource={
    async get(options){
        console.log('aaaaaa')
        await new Promise(resolve=>setTimeout(resolve, 1000))
        return {
            rows:[
                {id:1, start:'2026-09-01 12:00:00', end:'2026-09-01 14:00:00', name:'John'},
                {id:2, start:'2026-09-01 15:00:00', end:'2026-09-01 16:00:00', name:'Jane'},
                {id:3, start:'2026-09-01 19:00:00', end:'2026-09-01 22:00:00', name:'Bob'},
                {id:4, start:'2026-09-02 12:00:00', end:'2026-09-02 14:00:00', name:'Alice'},
                {id:5, start:'2026-09-02 15:00:00', end:'2026-09-02 16:00:00', name:'Charlie'},

            ],
            total:3000
        }
    }
}
const objectList=new ObjectsList(dataSource)
objectList.paramsInUrl=false;
objectList.paramsInLocalStorage=document.location;
objectList.columns=[
    {dataName:'id', name:'ID', sortName:'id'},
    {dataName:'name', name:'Name'},
    {dataName:'start', name:'Start', sortName: 'start'},
    {dataName:'end', name:'End', sortName: 'end'},
]
objectList.generateActions=()=>[
    {title:'zz', href:'https://google.com'},
    {title:'aaa', href:'https://bing.com',  main: true,},
]
objectList.dateRowCallback=(row)=>new Date(row.start)
objectList.calendarRowCallback=(row)=>{
    const element = document.createElement('div');
    element.textContent = row.name;
    return element;
}
objectList.style.height='500px';
objectList.generateExports=()=>[
    {name:'pdf', action:()=>{console.log('export pdf')}},
    {name:'csv', action:()=>{console.log('export csv')}},
]
objectList.calendarDayActions=(day)=>[
    {title:'zz', href:'https://google.com'},
    {title:'aaa', href:'https://bing.com/'+day,  main: true,},
]
document.body.appendChild(objectList);
objectList.paramsInUrl=true;
objectList.readUrl()
objectList.refresh();

