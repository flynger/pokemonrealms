import Inventory from "./inventory.js";
import { Stats, Pokemon } from "./pokemon.js";

export default class Player {
    static onlinePlayers = [];
    static starterOptions = ["BULBASAUR", "CHARMANDER", "SQUIRTLE"];

    constructor(name, displayName, x = 256, y = 254, facing = "right") {
        this.name = name;
        this.displayName = displayName;
        this.x = x;
        this.y = y;
        this.facing = facing;
        this.connected = false;
        this.socket = null;
        this.requests = {};
        this.battle = null;
        this.trade = null;
        this.starter = false;
        this.party = [];
        this.box = [];
        this.balance = 500;
        this.inventory = new Inventory();
        this.inventory.addItem("pokeball", 5);
        this.inventory.addItem("potion", 3);
        this.pickStarter();
    }

    pickStarter(starter) {
        if (this.starter == false) {
            this.starter = Player.starterOptions.includes(starter) ? starter : "EKANS";
            this.party.push(new Pokemon(this.starter, 5, { originalTrainer: "Professor Oak", owner: this.displayName }));
            // this.party.push(new Pokemon("MIMEJR", 11, { gender: "F", originalTrainer: "Professor Oak", owner: this.displayName }));
        }
    }

    setSocket(socket) {
        this.socket = socket;
        this.connected = true;
        Player.onlinePlayers.push(this.displayName);
    }

    deleteSocket() {
        this.socket = null;
        this.connected = false;
        Player.onlinePlayers.remove(this.displayName);
    }

    export() {
        return {
            name: this.name,
            displayName: this.displayName,
            x: this.x,
            y: this.y,
            facing: this.facing
        }
    }
}