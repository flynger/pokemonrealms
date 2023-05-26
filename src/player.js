import Inventory from "./inventory.js";
import Pokedex from "./pokedex.js";
import Pokemon, { Stats } from "./pokemon.js";
import Map from "./map.js";

export default class Player {
    static onlinePlayers = [];
    static starterOptions = ["BULBASAUR", "CHARMANDER", "SQUIRTLE"];
    static starterNatures = ["bashful", "docile", "hardy", "quirky", "serious"];

    constructor(name, displayName, x = 192, y = 318, facing = "down") {
        this.name = name;
        this.displayName = displayName;
        this.x = x;
        this.y = y;
        this.facing = facing;
        this.connected = false;
        this.socket = null;
        this.requests = {
            battle: {},
            trade: {}
        };
        this.battle = null;
        this.trade = null;
        this.trade = null;
        this.starter = false;
        this.party = [];
        this.box = [];
        this.pickStarter();
        this.balance = 500;
        this.inventory = new Inventory(this);
        this.inventory.addItem("pokeball", 5);
        this.inventory.addItem("potion", 3);
        this.location = {
            map: "Route 1",
            submap: "Area 1"
        }
    }

    pickStarter(starter) {
        if (this.starter == false) {
            this.starter = Player.starterOptions.includes(starter) ? starter : Player.starterOptions.random();
            this.addPokemon(new Pokemon(this.starter, 5, { moves: ["SUPERSONIC"], nature: Player.starterNatures.random(), ivs: new Stats(15, 15, 15, 15, 15, 15), originalTrainer: this.displayName, owner: this.displayName, hiddenAbilityChance: 0 }));
            for (let i = 0; i < 5; i++) {
                let rng = randomNumber(1, 649);
                for (let mon in Pokedex) {
                    if (rng == Pokedex[mon].id) {
                        console.log(mon)
                        this.addPokemon(new Pokemon(mon, randomNumber(1, 100), { originalTrainer: this.displayName, owner: this.displayName }));
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

    addPokemon(mon) {
        mon.owner = this.displayName;
        this.party.push(mon);
    }

    getMap() {
        return Map.getMap(this.location.map, this.location.submap);
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