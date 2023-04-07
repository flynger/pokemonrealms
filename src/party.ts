import { Pokemon, Ability, AbilitySlot, Gender, Move, Species, Stats, Type } from './pokemon'

// first number = action slot, second number = pokemon slot, third number = move slot
// action slot 0: attack, 1: bag, 2: pokemon, 3: run
export type Input = ["MOVE", 0 | 1 | 2 | 3] | ["BAG", string] | ["POKEMON", 0 | 1 | 2 | 3 | 4 | 5] | ["RUN"];
export type Party = {
    pokemon: Pokemon[],
    input: Input,
    affiliaton: string,
}