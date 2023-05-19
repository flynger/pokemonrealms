import Items from "./items.js"
export default class Pokemart {
    static sellValue = 0.5;

    constructor(items) {
        this.catalog = {};
        for (let item of items) {
            this.catalog[item.id] = item;
            if (Items[item.id]) {
                item.category = Items[item.id].category;
                item.name = Items[item.id].name;
                item.desc = Items[item.id].shortDesc;
            }
        }
    }

    buyItem(player, itemID, quantity) {
        if (!this.isValidQuantity(quantity)) {
            console.log(player.displayName + "'s buy request failed: Invalid quantity");
            return false;
        }
        if (this.catalog.hasOwnProperty(itemID)) {
            let item = this.catalog[itemID];
            if (player.balance >= item.price * quantity) {
                player.balance -= item.price * quantity;
                player.inventory.addItem(item.id, quantity);
                console.log(player.displayName + " purchased " + quantity + "x " + item.name);
                return true;
            } else {
                console.log(player.displayName + " couldn't purchase " + quantity + "x " + item.name + ": Not enough balance");
                return false;
            }
        }
    }

    sellItem(player, itemID, quantity) {
        if (!this.isValidQuantity(quantity)) {
            console.log(player.displayName + "'s sell request failed: Invalid quantity");
            return false;
        }
        if (this.catalog.hasOwnProperty(itemID)) {
            let item = this.catalog[itemID];
            if (player.inventory.hasItem(item.id, quantity)) {
                player.inventory.removeItem(item.id, quantity);
                player.balance += item.price * quantity * Pokemart.sellValue;
                console.log(player.displayName + " sold " + quantity + "x " + item.name);
                return true;
            } else {
                console.log(player.displayName + " couldn't sell " + quantity + "x " + item.name + ": Not enough items");
                return false;
            }
        }
    }

    isValidQuantity(quantity) {
        return !(typeof quantity != "number" || !Number.isInteger(quantity) || quantity <= 0);
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