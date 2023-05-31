// first number = action slot, second number = pokemon slot, third number = move slot
// action slot 0: attack, 1: bag, 2: pokemon, 3: run
// export type Input = ["MOVE", 0 | 1 | 2 | 3] | ["BAG", string] | ["POKEMON", 0 | 1 | 2 | 3 | 4 | 5] | ["RUN"];

// export type PlayerOptions = {
//     name: string;
//     //avatar: string;
//     team: string;
// }
import BattleAI from "./battleAI.js";
import Inventory from "./inventory.js";
import Items from "./items.js";
import { players } from "./loginHandler.js";

export default class Party {
    // TODO: Add party ID to party class to prevent scuffness
    constructor(id, name, team, isPlayer = true, items) {
        this.id = id;
        this.name = name;
        this.team = team;
        this.isPlayer = isPlayer;
        this.hasAI = !isPlayer;
        this.items = {};
        this.battle = null;
        this.stream = null;
        if (!isPlayer) {
            this.AI = new BattleAI(this);
            this.trainer = {
                inventory: new Inventory(false, items)
            }
        } else {
            this.trainer = players[name.toLowerCase()];
        }
        this.items = Object.values(this.trainer.inventory.items).filter((item) => Items[item.id].isUsableInBattle);
    }

    useMove(moveInput) {
        this.stream.write(`>p${this.id} move ${moveInput}`);
    }

    switchTo(switchInput) {
        this.stream.write(`>p${this.id} switch ${switchInput}`);
    }

    useItem(id) {
        if (!this.trainer.inventory.hasItem(id, 1)) {
            return false;
        }
        let item = Items[id];
        
        if (this.battle.isWildBattle && item.isUsableInBattle) {
            if (item.isPokeball) {
                const randomNum = Math.random();
                console.log("random: " + randomNum);

                let catchRate = 0.5;
                if (randomNum < catchRate) {
                    console.log("Pokemon is caught!");
                    this.onPokemonCaught();
                    console.log("onPokemonCaught runs");
                } else {
                    console.log("Pokemon escaped!");
                }
            } else {

            }
        }
        this.trainer.inventory.removeItem(id, 1);
        this.stream.write(`>p${this.id} pass`);
        return true;
    }

    exportTeam() {
        return this.team.map((mon) => translatePokemon(mon)).join(']');
    }
}

function translatePokemon(pokemon) {
    const species = pokemon.species;
    const name = pokemon.name;
    const heldItem = pokemon.heldItem;
    const abilitySlot = pokemon.abilitySlot;
    const moves = pokemon.moves.join(",");
    const nature = pokemon.nature;
    const evs = pokemon.evs.toArray().join(",");
    const ivs = pokemon.ivs.toArray().join(",");
    const level = pokemon.level || "";
    const shiny = pokemon.shiny ? "S" : "";
    const gender = pokemon.gender;
    return `${name}|${species}|${heldItem}|${abilitySlot}|${moves}|${nature}|${evs}|${gender}|${ivs}|${shiny}|${level}|`;
}