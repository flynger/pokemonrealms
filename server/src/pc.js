/*
Alex G, flynger, Richard W, Harry

This file implements server-sided pc
*/

import Pokedex from "./pokedex.js"

export default class PC {
    constructor (player, boxes, defaultBox = 0) {
        this.player = player;
        this.boxes = boxes ?? Array.from(new Array(16), () => []);
        this.defaultBox = defaultBox;
        // console.log(this.boxes);
    }

    add(mon) {
        //add code to make sure pokemon is pokemon
        console.log("Adding pokemon to PC...");
        this.boxes[this.defaultBox].push(mon);
        this.sendPCUpdate();
    }

    remove(box, mon) {
        if (!this.boxes[box].includes(mon)) {
            throw Error("ItemError: No pokemon at that slot to remove!");
        }
        this.boxes[box].remove(mon);
        this.sendPCUpdate();
    }

    sendPCUpdate() {
        this.player.socket?.emit("pcUpdate", this.boxes);
    }

    isPokemon() {
        //returns whether an object is recognized as a pokemon object
    }

    getSaveData() {
        return { boxes: this.boxes, defaultBox: this.defaultBox };
    }
}