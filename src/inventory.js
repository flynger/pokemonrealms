export default class Inventory {
    constructor(items = {}) {
        this.items = items;
    }

    addItem(item, quantity) {
        if (!this.hasItem(item)) {
            this.items[item] = {
                id: item,
                quantity: 0
            };
        }
        this.items[item].quantity += quantity;
    }

    removeItem(item, quantity) {
        if (this.hasItem(item, quantity)) {
            this.items[item].quantity -= quantity;
            if (this.items[item].quantity == 0) {
                delete this.items[item];
            }
        }
        else throw Error("ItemError: No item to remove or not enough to remove");
    }

    hasItem(item, quantity = 1) {
        return this.items.hasOwnProperty(item) && this.items[item].quantity >= 1;
    }
}