import { translatePokemon } from './pokemonTranslator.js';

// first number = action slot, second number = pokemon slot, third number = move slot
// action slot 0: attack, 1: bag, 2: pokemon, 3: run
// export type Input = ["MOVE", 0 | 1 | 2 | 3] | ["BAG", string] | ["POKEMON", 0 | 1 | 2 | 3 | 4 | 5] | ["RUN"];

// export type PlayerOptions = {
//     name: string;
//     //avatar: string;
//     team: string;
// }

export default class Party {
    constructor(name, team) {
        this.name = name;
        this.team = team;
    }

    exportTeam() {
        return this.team.map((mon) => translatePokemon(mon)).join(']');
    }   
}