/*
Alex G, flynger, Richard W, Harry

This file implements server-sided pc
*/

import Pokedex from "./pokedex.js"

export default class PC {
    constructor (player, boxes = false) {
        this.player = player;
        this.boxes = boxes ? boxes : Array.from(Array(16), () => new Array());
        console.log(this.boxes);
    }

    addToPC(mon) {
        //add code to make sure pokemon is pokemon
        console.log("Adding pokemon to PC...");
        this.pokemonArr.push(mon);
        this.sendPCUpdate();
    }

    removeItem(index) {
        if (!this.pokemonArr.hasOwnProperty(index)) {
            throw Error("ItemError: No pokemon at that slot to remove!");
        }
        delete this.items[item];
        this.sendPCUpdate();
    }

    sendPCUpdate() {
        if (this.player && this.player.connected) this.player.socket.emit("pcUpdate", this.pokemonArr);
    }

    isPokemon() {
        //returns whether an object is recognized as a pokemon object
    }
}