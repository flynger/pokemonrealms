import { Pokemon, Ability, AbilitySlot, Gender, Move, Species, Stats, Type } from './pokemon'
import { translatePokemon } from './pokemonTranslator';

// first number = action slot, second number = pokemon slot, third number = move slot
// action slot 0: attack, 1: bag, 2: pokemon, 3: run
export type Input = ["MOVE", 0 | 1 | 2 | 3] | ["BAG", string] | ["POKEMON", 0 | 1 | 2 | 3 | 4 | 5] | ["RUN"];

export type PlayerID = 'p1'|'p2'|'p3'|'p4';

export class Party {
    name: string;
    team: Pokemon[];
    
    constructor(name: string, team: Pokemon[]) {
      this.name = name;
      this.team = team;
    }

    exportToShowdown() {
        return {
            name: this.name,
            team: this.team.map((mon) => translatePokemon(mon)).join(']')
        }
    }
  }