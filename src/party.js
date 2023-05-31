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
import Pokedex from "./pokedex.js";

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
        if (item.isUsableInBattle) {
            if (item.isPokeball && this.battle.isWildBattle) {
                const randomNum = Math.random();
                console.log("random: " + randomNum);

                let encounter = this.battle.encounter;
                let encounterName = Pokedex[encounter.species].name;
                let catchRate = 0.5 * item.catchRate();
                if (randomNum < catchRate) {
                    encounter.setOwner(this.name);
                    encounter.setBall(id);
                    this.trainer.addPokemon(encounter);
                    this.battle.endBattle(true, `[TRAINER] caught the wild ${encounterName}!`);
                    return false;
                } else {
                    this.battle.preTurnData.push({
                        message: `The wild ${encounterName} broke free!`
                    });
                }
            }
            this.trainer.inventory.removeItem(id, 1);
            this.stream.write(`>p${this.id} pass`);
            return true;
        }
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