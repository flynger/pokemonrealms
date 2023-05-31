// first number = action slot, second number = pokemon slot, third number = move slot
// action slot 0: attack, 1: bag, 2: pokemon, 3: run
// export type Input = ["MOVE", 0 | 1 | 2 | 3] | ["BAG", string] | ["POKEMON", 0 | 1 | 2 | 3 | 4 | 5] | ["RUN"];

// export type PlayerOptions = {
//     name: string;
//     //avatar: string;
//     team: string;
// }
import BattleAI from "./battleAI.js";

export default class Party {
    // TODO: Add party ID to party class to prevent scuffness
    constructor(id, name, team, isPlayer = true, onPokemonCaught) {
        this.id = id;
        this.name = name;
        this.team = team;
        this.isPlayer = isPlayer;
        this.hasAI = !isPlayer;
        this.stream = null;
        this.onPokemonCaught = onPokemonCaught;
        if (!isPlayer) {
            this.AI = new BattleAI(this);
        }
    }

    useMove(moveInput) {
        this.stream.write(`>p${this.id} move ${moveInput}`);
    }

    switchTo(switchInput) {
        this.stream.write(`>p${this.id} switch ${switchInput}`);
    }

    useItem(item) {
        if (item.hasOwnProperty("isUsableInBattle")) {
            if (item.hasOwnProperty("isPokeball")) {
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
            }
        }
        this.stream.write(`>p${this.id} pass`);
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