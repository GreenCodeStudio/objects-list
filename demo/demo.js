import {ObjectsList} from "../src/index.js";
import '../src/style/objectsList.scss';

console.log('aa');
const dataSource={
    async get(options){
        return {
            rows:[
                {id:1, name:'John'},
                {id:2, name:'Doe'},
                {id:3, name:'Smith'},
            ]
        }
    }
}
const objectList=new ObjectsList(dataSource)
objectList.paramsInUrl=true;
objectList.columns=[
    {dataName:'id', title:'ID'},
    {dataName:'name', title:'Name'},
]
objectList.style.height='500px';
document.body.appendChild(objectList);
objectList.readUrl()
objectList.refresh();
