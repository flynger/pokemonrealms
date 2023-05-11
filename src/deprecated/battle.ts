import { Pokemon, Ability, AbilitySlot, Gender, Move, Species, Stats, Type } from './pokemon'
import { Party, Input } from './party'

export interface PokemonBattle {
    startTurn(): void;
}
