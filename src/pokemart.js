import { ItemsText } from 'pokemon-showdown/.data-dist/text/items.js'; // held items only
export default class Pokemart {
    constructor(items) {
        this.catalog = items;
        for (let item of this.catalog) {
            if (ItemsText[item.id]) {
                item.name = ItemsText[item.id].name;
                item.desc = ItemsText[item.id].desc;
            }
        }
    }

    buyItem(player, itemID) {
        if (this.catalog.filter((item) => item.id == itemID).length > 0) {
            console.log("Player purchased " + itemID);
        }
    }

    sellItem(player, itemID) {

    }
}

var testmart = new Pokemart([
    { id: "pokeball", price: 200 },
    { id: "greatball", price: 650 },
    { id: "aloraichiumz", price: 200 },
    { id: "aguavberry", price: 5 },
    { id: "thunderstone", price: 10000 }
]);
console.log(testmart);