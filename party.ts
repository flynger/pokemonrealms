import { Pokemon, Ability, AbilitySlot, Gender, Move, Species, Stats, Type } from './pokemon'

//first number = pokemon slot, second number = move slot
export type Input = [number, number];
export type Party = {
    pokemon: Pokemon[],
    input: Input,
}