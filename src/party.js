// first number = action slot, second number = pokemon slot, third number = move slot
// action slot 0: attack, 1: bag, 2: pokemon, 3: run
// export type Input = ["MOVE", 0 | 1 | 2 | 3] | ["BAG", string] | ["POKEMON", 0 | 1 | 2 | 3 | 4 | 5] | ["RUN"];

// export type PlayerOptions = {
//     name: string;
//     //avatar: string;
//     team: string;
// }
/*
Alex Ge, Arnav Singh, Richard Wei, Will Gannon, Harry Liu

This file implements server-sided party functionality 
*/
import BattleAI from "./battleAI.js";
import Inventory from "./inventory.js";
import Items from "./items.js";
import { players } from "./loginHandler.js";
import Pokedex from "./pokedex.js";

export default class Party {
    static catchMessagePrefix = ["Congratulations", "Congrats", "Nice", "Gotcha", "Great", "Excellent"];
    static shakeMessages = ["It shakes.", "It shakes again..", "It shakes again..."];
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
        this.data = null;
        this.nextData = null;
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
        // TODO: makes sure code prevents input if battle is over, item already used, etc.
        //console.log(this.stream);
        if (!this.trainer.inventory.hasItem(id, 1) || this.data.forceSwitch || this.data.usedItemThisTurn || this.stream.midTurn || this.stream.ended) {
            return false;
        }

        let item = Items[id];
        let preTurnData = [{ message: `${this.name} used ${item.name}!` }];
        if (item.isUsableInBattle) {
            if (item.isPokeball) {
                if (this.battle.isWildBattle) {
                    let encounter = this.battle.encounter;
                    let encounterEntry = Pokedex[encounter.species];
                    let encounterName = encounterEntry.name;
                    let catchRate = encounterEntry.catchRate || 64;
                    let ballMultiplier = item.catchRate();
                    let statusMultiplier = 1;
                    let hpCurrent = this.stream.battle.sides[0].active[0].hp;
                    console.log(hpCurrent);
                    let a = Math.floor((3 * encounter.stats.hp - 2 * hpCurrent) * 4096 * catchRate * ballMultiplier / (3 * encounter.stats.hp)) * statusMultiplier;
                    let b = Math.floor(65536 / ((1044480 / a) ** 0.25));
                    let shakeChance = (b / 65535);
                    // console.log( { a, b, shakeChance });
                    let shakes = 0;
                    while (shakes < 4) {
                        if (Math.random() < shakeChance) {
                            shakes++;
                            if (shakes == 4) {
                                encounter.setOwner(this.name);
                                encounter.setBall(id);
                                this.trainer.inventory.removeItem(id, 1); // remove ball from inventory so can break early
                                this.trainer.addPokemon(encounter);
                                preTurnData.push({ message: `${Party.catchMessagePrefix.random()}! You caught the wild ${encounterName}!` });
                                this.battle.endBattle(true, preTurnData);
                                return false;
                            } else preTurnData.push({
                                message: Party.shakeMessages[shakes - 1]
                            });
                        } else {
                            preTurnData.push({
                                message: `The wild ${encounterName} broke free!`
                            });
                            break;
                        }
                    }
                } else {
                    return false;
                }
            } else if (item.useOnPokemon) {
                let result = item.useOnPokemon(this.stream.battle.sides[this.id - 1].pokemon[0]);
                if (!result) {
                    if (this.trainer.connected) this.trainer.socket.emit("battleData", [{ message: "The item would have no effect." }]);
                    return false;
                } else {
                    preTurnData.push(...result);
                }
            } else {
                // TODO: other items
            }
            // add use message to front
            this.battle.preTurnData = preTurnData;
            this.trainer.inventory.removeItem(id, 1);
            this.data.usedItemThisTurn = true;
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
    const level = pokemon.level;
    const shiny = pokemon.shiny ? "S" : "";
    const gender = pokemon.gender;
    const happiness = pokemon.happiness;
    const pokeball = pokemon.caughtBall;
    return `${name}|${species}|${heldItem}|${abilitySlot}|${moves}|${nature}|${evs}|${gender}|${ivs}|${shiny}|${level}|${happiness},${pokeball}`;
}