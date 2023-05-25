import { players } from './loginHandler.js';
import { pokemon } from './pokemon.js'

class Trade {
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

    ready(num, value) {
        this[`p${num}Ready`] = value;
        if (!value) this[`p${num}Confirm`] = false;
    }

    confirm(num) {
        let ready = this[`p${num}Ready`];
        if (ready) {
            this[`p${num}Confirm`] = true;
            if (this.p1Confirm && this.p2Confirm) {
                this.completeTrade();
            }
        }
    }

    offerItem(num, id, quantity) {
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
        }

    }

    offerMon(num, partySlot) {
        let player = this[`player${num}`];
        let offers = this[`p${num}Offers`];
        let offeredMon = player.party[partySlot];
        if (offeredMon && offers.filter((offer) => offer.mon == offeredMon).length == 0) {
            offers.push({
                type: "pokemon",
                partySlot,
                mon: offeredMon
            });
        }
    }

    updateOffers() {
        this.player1.socket.emit("tradeOffers", p1Offers, p2Offers);
        this.player2.socket.emit("tradeOffers", p1Offers, p2Offers);
    }

    completeTrade() {
        for (let offer of p1Offers) {
            if (offer.type == "item") {
                this.player1.inventory.removeItem(offer.id, offer.quantity);
                this.player2.inventory.addItem(offer.id, offer.quantity);
            } else if (offer.type == "pokemon") {
                this.player1.party.splice(offer.partySlot - 1, 1);
                this.player2.addPokemon(offer.mon);
            }
        }
        for (let offer of p2Offers) {
            if (offer.type == "item") {
                this.player2.inventory.removeItem(offer.id, offer.quantity);
                this.player1.inventory.addItem(offer.id, offer.quantity);
            } else if (offer.type == "pokemon") {
                this.player2.party.splice(offer.partySlot - 1, 1);
                this.player1.addPokemon(offer.mon);
            }
        }
        this.player1.inventory.sendItemUpdate();
        this.player2.inventory.sendItemUpdate();
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