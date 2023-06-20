/*
Alex G, flynger, Richard W, Harry

This file implements server-sided inventory functionality 
*/
import Items from "./items.js";
export default class Inventory {
    constructor(player, items = {}) {
        this.player = player;
        this.items = items;
    }

    addItem(item, quantity = 1) {
        if (!this.hasItem(item)) {
            this.items[item] = {
                id: item,
                quantity: 0
            };
        }
        this.items[item].quantity += quantity;
        this.sendItemUpdate();
    }

    removeItem(item, quantity) {
        if (!this.hasItem(item, quantity)) {
            throw Error("ItemError: No item to remove or not enough to remove");
        }
        this.items[item].quantity -= quantity;
        if (this.items[item].quantity == 0) {
            delete this.items[item];
        }
        this.sendItemUpdate();
    }

    hasItem(item, quantity = 1) {
        return this.items.hasOwnProperty(item) && this.items[item].quantity >= quantity;
    }

    useItem(item, slot, quantity = 1) {
        if (!this.hasItem(item, quantity)) {
            throw Error("ItemError: Not enough items to use");
        } else if (!Items[item] || !Items[item].isUsable) {
            throw Error("ItemError: Tried to use an unusable item");
        } else if (typeof slot != "number" || !this.player.party[slot - 1]) {
            throw Error("ItemError: Tried to use on an invalid slot");
        }
        this.removeItem(item, quantity);
        this.sendItemUpdate();
        //Items
    }

    isValidQuantity(quantity) {
        return !(typeof quantity != "number" || !Number.isInteger(quantity) || quantity <= 0);
    }

    sendItemUpdate() {
        if (this.player && this.player.connected) this.player.socket.emit("inventoryUpdate", this.items);
    }
}