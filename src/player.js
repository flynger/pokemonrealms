import Inventory from "./inventory.js";
import Pokedex from "./pokedex.js";
import { Stats, Pokemon } from "./pokemon.js";

export default class Player {
    static onlinePlayers = [];
    static starterOptions = ["BULBASAUR", "CHARMANDER", "SQUIRTLE"];
    static starterNatures = ["bashful", "docile", "hardy", "quirky", "serious"];

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
        this.inventory = new Inventory(this);
        this.inventory.addItem("pokeball", 5);
        this.inventory.addItem("potion", 3);
        this.pickStarter();
    }

    pickStarter(starter) {
        if (this.starter == false) {
            this.starter = Player.starterOptions.includes(starter) ? starter : Player.starterOptions.random();
            this.party.push(new Pokemon(this.starter, 5, { nature: Player.starterNatures.random(), ivs: new Stats(15, 15, 15, 15, 15, 15), originalTrainer: this.displayName, owner: this.displayName, hiddenAbilityChance: 0 }));
            for (let i = 0; i < 5; i++) {
                let rng = randomNumber(1, 649);
                for (let mon in Pokedex) {
                    if (rng == Pokedex[mon].id) {
                        console.log(mon)
                        this.party.push(new Pokemon(mon, randomNumber(1, 100), { originalTrainer: this.displayName, owner: this.displayName }));
                        break;
                    }
                }
            }
            // this.party.push(new Pokemon("MIMEJR", 1, { gender: "F", originalTrainer: "Professor Oak", owner: this.displayName, caughtBall: "ultraball" }));
            // this.party.push(new Pokemon("DARKRAI", 10, { heldItem: "pokeball", originalTrainer: "Unknown", owner: this.displayName, caughtBall: "masterball" }));
            // this.party.push(new Pokemon("MAGNEMITE", 99, { originalTrainer: "Unknown", owner: this.displayName }));
            // this.party.push(new Pokemon("MAGNEMITE", 100, { originalTrainer: "Unknown", owner: this.displayName }));
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

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}