import { Stats } from "../pokemon";
import { Type } from "./type";
import POKEDEX_DATA from "./data/rawdex";
import { Ability } from "./ability";
import Move from "./move";
import { GrowthRate } from "./data/growthRates";
import { Item } from "./item";

export default class Pokedex {
    private static readonly entries: Record<Species, PokedexEntry | PokedexFormEntry> = POKEDEX_DATA;

    static getEntry(species: Species): PokedexEntry {
        const dexEntry = this.entries[species];
        if ("baseSpecies" in dexEntry) {
            return {
                ...this.entries[dexEntry.baseSpecies],
                ...dexEntry
            } as PokedexEntry;
        }
        return dexEntry;
    }
}

export type Species = keyof typeof POKEDEX_DATA;
export type Gender = 'M' | 'F' | 'N';
type GenderRatio = {
    readonly M: number;
    readonly F: number;
}

export type AbilitySlot = '0' | '1' | 'H' | 'S';

type OtherAbilities = {
    readonly [slot in AbilitySlot]: Ability
};
type Abilities = {
    readonly 0: Ability
} & Partial<OtherAbilities>;

type Learnset = {
    readonly levelup: {
        readonly [level: number]: Move | readonly Move[];
    };
    readonly tm: readonly Move[];
    readonly tutor: readonly Move[];
}

type Evolution = {
    readonly species: Species;
    readonly level: number;
    readonly useItem?: Item;
    readonly heldItem?: Item;
    readonly trade?: true;
    readonly friendship?: true;
}

type EggGroup = "Monster" | "Human-Like" | "Amorphous" | "Water 1" | "Water 2" | "Water 3" | "Bug"
    | "Flying" | "Fairy" | "Dragon" | "Grass" | "Mineral" | "Field" | "Ditto";

type PokedexEntry = {
    readonly dex: {
        readonly national: number;
        readonly col?: number;
    };
    readonly species: Species;
    readonly types: readonly [Type] | readonly [Type, Type];
    readonly gender?: Gender | GenderRatio;
    readonly baseStats: Stats;
    readonly abilities: Abilities;
    readonly learnset: Learnset;
    readonly evolutions: readonly Evolution[];
    readonly desc: string;
    readonly height: number;
    readonly weight: number;
    readonly eggCycles: number;
    readonly eggMoves: readonly Move[];
    readonly eggGroups: readonly [EggGroup] | readonly [EggGroup, EggGroup];
    readonly evYield: Partial<Stats>;
    readonly catchRate: number;
    readonly baseFriendship?: number;
    readonly baseExp: number;
    readonly growthRate: GrowthRate;
};

type PokedexFormEntry = {
    readonly baseSpecies: Species;
    readonly form: string;
    readonly species: Species;
} & Partial<PokedexEntry>;

console.log(Pokedex.getEntry("Bulbasaur"));