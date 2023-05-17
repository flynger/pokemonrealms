import { ItemsText } from 'pokemon-showdown/.data-dist/text/items.js';
export default class Pokemart {
    constructor(items) {
        this.catalog = items;
        for(let item in catalog) {
            if(ItemsText[item.id]){
                item.name = ItemsText[item.id.name];
                item.desc = ItemsText[item.id.desc];
            }
        }
    }
    

}

new Pokemart([{id: "masterball", price: 1}, {id: "thunderstone", price: 50}, {id: "aloraichiumz", price: 200}, {id: "aguavberry", price: 5}, {id: "antidote", price: 10}]);