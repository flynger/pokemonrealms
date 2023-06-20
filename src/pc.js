/*
Alex G, flynger, Richard W, Harry

This file implements server-sided pc
*/

import Pokedex from "./pokedex.js"

export default class Pc {
    constructor (player, pokemonArr = []) {
        this.player = player;
        this.pokemonArr = pokemonArr;
    }

    addToPc(mon) {
        //add code to make sure pokemon is pokemon
        console.log("Adding pokemon to PC...");
        this.pokemonArr.push(mon);
        this.sendPcUpdate();
    }

    removeItem(index) {
        if (!this.pokemonArr.hasOwnProperty(index)) {
            throw Error("ItemError: No pokemon at that slot to remove!");
        }
        delete this.items[item];
        this.sendPcUpdate();
    }

    sendPcUpdate() {
        if (this.player && this.player.connected) this.player.socket.emit("pcUpdate", this.pokemonArr);
    }

    isPokemon() {
        //returns whether an object is recognized as a pokemon object
    }
}