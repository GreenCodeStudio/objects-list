import {ObjectsList} from "../src/index.js";
import '../src/style/objectsList.scss';

console.log('aa');
const dataSource={
    async get(options){
        console.log('aaaaaa')
        await new Promise(resolve=>setTimeout(resolve, 1000))
        return {
            rows:[
                {id:1, name:'John'},
                {id:2, name:'Doe'},
                {id:3, name:'Smith'},
            ],
            total:3000
        }
    }
}
const objectList=new ObjectsList(dataSource)
objectList.paramsInUrl=true;
objectList.columns=[
    {dataName:'id', name:'ID'},
    {dataName:'name', name:'Name'},
    {name:'a', content:()=>{return 'aaa'}},
    {name:'b', content:()=>{return 'bbb'}},
    {name:'c', content:()=>{return 'ccc'}},
]
objectList.generateActions=()=>[{title:'zz', href:'https://google.com'}]
objectList.style.height='500px';
document.body.appendChild(objectList);
objectList.readUrl()
objectList.refresh();
