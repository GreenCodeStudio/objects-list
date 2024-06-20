import {ObjectsList} from "../src/index.js";


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
