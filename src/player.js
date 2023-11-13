/*
Alex G, flynger, Richard W, Harry

This file implements server-sided player functionality 
*/
import Items from "./items.js";
import Inventory from "./inventory.js";
import Pokedex from "./pokedex.js";
import Pokemon, { Stats } from "./pokemon.js";
import Map from "./map.js";
import PC from "./pc.js"

export default class Player {
    static onlinePlayers = [];
    static startingLocation = {
        x: 160,
        y: 240,
        facing: "down",
        map: "Ballet Town",
        submap: "Player House 2F"
    };
    static starterOptions = ["BULBASAUR", "CHARMANDER", "SQUIRTLE"];
    static starterNatures = ["bashful", "docile", "hardy", "quirky", "serious"];

    /*  Route 1 : Area 1, Area 2
        Ballet Town : Town, Lab, Player House 1F, Player House 2F, Outskirts
        
        For testing battle quicker
        map: "Route 1",
        submap: "Area 1"  */

    constructor({ name, displayName, location, balance, party, starter, pc, inventory }) { // 224, 288 town - 240, 350 lab
        // permanent data
        this.name = name;
        this.displayName = displayName;
        this.location = location ?? { ...Player.startingLocation };
        this.balance = balance ?? 500;
        this.party = party ?? [];
        this.starter = starter ?? this.pickStarter(Player.starterOptions.random());
        this.pc = new PC(this, pc?.boxes, pc?.defaultBox);
        this.inventory = new Inventory(this, inventory);
        this.inventory.addItem("pokeball", 5);
        this.inventory.addItem("potion", 3);
        this.inventory.addItem("masterball", 99);

        // temp data
        this.connected = false;
        this.socket = null;
        this.requests = {
            battle: {},
            trade: {}
        };
        this.battle = null;
        this.trade = null;
    }

    pickStarter(starter) {
        if (!this.starter && Player.starterOptions.includes(starter)) {
            this.starter = starter;
            // this.addPokemon(new Pokemon(this.starter, 5, { nature: Player.starterNatures.random(), ivs: new Stats(15, 15, 15, 15, 15, 15), owner: this.displayName, hiddenAbilityChance: 0, shiny: true }));
            for (let i = 0; i < 4; i++) {
                let rng = randomNumber(1, 649);
                for (let mon in Pokedex) {
                    if (rng == Pokedex[mon].id) {
                        //  console.log(mon)
                        this.addPokemon(new Pokemon(mon, 50, { originalTrainer: this.displayName, owner: this.displayName }));
                        break;
                    }
                }
            }
            // this.party.push(new Pokemon("MIMEJR", 1, { "ASH", gender: "F", originalTrainer: "Professor Oak", owner: this.displayName, caughtBall: "ultraball" }));
            // this.party.push(new Pokemon("DARKRAI", 10, { heldItem: "pokeball", originalTrainer: "Unknown", owner: this.displayName, caughtBall: "masterball" }));
            // this.party.push(new Pokemon("MAGNEMITE", 99, { originalTrainer: "Unknown", owner: this.displayName }));
            // this.party.push(new Pokemon("MAGNEMITE", 100, { originalTrainer: "Unknown", owner: this.displayName }));
        }
        return this.starter;
    }

    addPokemon(mon) {
        mon.owner = this.displayName;
        if (this.party.length < 6) {
            this.party.push(mon);
            this.sendPartyUpdate();
        } else this.pc.add(mon);
    }

    swapPartySlots(slot1, slot2) {
        if (typeof slot1 == "number" && typeof slot2 == "number" && slot1 != slot2 && this.party[--slot1] && this.party[--slot2]) {
            [this.party[slot1], this.party[slot2]] = [this.party[slot2], this.party[slot1]];
            this.sendPartyUpdate();
        }
    }

    giveItemToSlot(id, slot) {
        if (typeof slot == "number" && this.party[--slot] && this.inventory.hasItem(id, 1) && Items[id].isHoldable) {
            if (this.party[slot].heldItem) {
                this.inventory.addItem(this.party[slot].heldItem, 1);
            }
            this.party[slot].heldItem = id;
            this.inventory.removeItem(id, 1);
            this.sendPartyUpdate();
        }
    }

    removeItemFromSlot(slot) {
        if (typeof slot == "number" && this.party[--slot] && this.party[slot].heldItem) {
            this.inventory.addItem(this.party[slot].heldItem, 1);
            this.party[slot].heldItem = "";
            this.sendPartyUpdate();
        }
    }

    sendPartyUpdate() {
        if (this.connected) {
            this.socket.emit("partyUpdate", this.party);
        }
    }

    isBusy() {
        return this.battle != null || this.trade != null;
    }

    getMap() {
        return Map.getMap(this.location.map, this.location.submap);
    }

    getMapData() {
        return {
            name: this.name,
            displayName: this.displayName,
            x: this.location.x,
            y: this.location.y,
            facing: this.location.facing
        }
    }
    
    getLocation() {
        return this.location;
    }

    setLocation({ x, y, facing, map, submap }) {
        this.location.x = x ?? this.location.x;
        this.location.y = y ?? this.location.y;
        this.location.facing = facing ?? this.location.facing;
        this.location.map = map ?? this.location.map;
        this.location.submap = submap ?? this.location.submap;
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

    getSaveData() {
        return {
            name: this.name,
            displayName: this.displayName,
            location: this.location,
            balance: this.balance,
            party: this.party,
            starter: this.starter,
            pc: this.pc.getSaveData(),
            inventory: this.inventory.getSaveData()
        };
    }
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}