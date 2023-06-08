/*
Alex Ge, Arnav Singh, Richard Wei, Will Gannon, Harry Liu

This file implements trade functionality 
*/
export default class Trade {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.p1Offers = [];
        this.p2Offers = [];
        this.p1Ready = false;
        this.p2Ready = false;
        this.p1Confirm = false;
        this.p2Confirm = false;
        this.player1.trade = this;
        this.player2.trade = this;
        this.player1.socket.emit("startTrade", player2.displayName);
        this.player2.socket.emit("startTrade", player1.displayName);
    }
    
    getPlayerId(name) {
        return this.player1.name == name ? 1 : this.player2.name == name ? 2 : -1;
    }

    ready(name, value) {
        let num = this.getPlayerId(name);
        if (value == this[`p${num}Ready`]) return;
        
        this[`p${num}Ready`] = value;
        if (!value) {
            this.p1Confirm = this.p2Confirm = false;
        }
    }

    confirm(name) {
        let num = this.getPlayerId(name);
        if (this[`p${num}Confirm`]) return;

        if (this.p1Ready && this.p2Ready) {
            this[`p${num}Confirm`] = true;
            if (this.p1Confirm && this.p2Confirm) {
                this.completeTrade();
            }
        }
    }

    offerItem(name, id, quantity) {
        let num = this.getPlayerId(name);
        if (this[`p${num}Ready`] || !isValidQuantity(quantity)) return;

        let player = this[`player${num}`];
        let offers = this[`p${num}Offers`];
        let existingOffer = offers.filter((offer) => offer.id == id)[0];
        if (existingOffer) {
            if (player.inventory.hasItem(id, quantity + existingOffer.quantity)) {
                existingOffer.quantity += quantity;
            }
        } else if (player.inventory.hasItem(id, quantity)) {
            offers.push({
                type: "item",
                id,
                quantity
            });
        } else {
            return;
        }
        console.log(offers);
        this[`p${num}Ready`] = false;
        this.updateOffers();
    }

    offerMon(name, partySlot) {
        let num = this.getPlayerId(name);
        let player = this[`player${num}`];
        let offers = this[`p${num}Offers`];
        // dont add the pokemon if its the last one in the party
        if (offers.filter((offer) => offer.type == "pokemon").length == player.party.length - 1) return;
        
        let offeredMon = player.party[partySlot - 1];
        if (offeredMon && !offers.some((offer) => offer.mon == offeredMon)) {
            offers.push({
                type: "pokemon",
                mon: offeredMon
            });
        }
        console.log(offers);
        this.updateOffers();
    }

    updateOffers() {
        this.player1.socket.emit("tradeOffers", this.p1Offers, this.p2Offers);
        this.player2.socket.emit("tradeOffers", this.p2Offers, this.p1Offers);
    }

    completeTrade() {
        for (let offer of this.p1Offers) {
            if (offer.type == "item") {
                this.player1.inventory.removeItem(offer.id, offer.quantity);
                this.player2.inventory.addItem(offer.id, offer.quantity);
            } else if (offer.type == "pokemon") {
                this.player1.party.splice(this.player1.party.indexOf(offer.mon), 1);
                this.player2.addPokemon(offer.mon);
            }
        }
        for (let offer of this.p2Offers) {
            if (offer.type == "item") {
                this.player2.inventory.removeItem(offer.id, offer.quantity);
                this.player1.inventory.addItem(offer.id, offer.quantity);
            } else if (offer.type == "pokemon") {
                this.player2.party.splice(this.player2.party.indexOf(offer.mon), 1);
                this.player1.addPokemon(offer.mon);
            }
        }
        this.player1.socket.emit("tradeComplete");
        this.player2.socket.emit("tradeComplete");
        this.player1.socket.emit("partyUpdate", this.player1.party);
        this.player2.socket.emit("partyUpdate", this.player2.party);
        this.player1.trade = null;
        this.player2.trade = null;
    }

    cancel() {
        this.player1.trade = null;
        this.player2.trade = null;
        if (this.player1.connected) this.player1.socket.emit("tradeCancel");
        if (this.player2.connected) this.player2.socket.emit("tradeCancel");
    }
}

function isValidQuantity(quantity) {
    return !(typeof quantity != "number" || !Number.isInteger(quantity) || quantity <= 0);
}