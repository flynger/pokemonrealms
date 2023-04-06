import { Pokedex } from "./pokedex";
import { Moves } from "./moves";

const types: {[type: string]: Object} = {
    NORMAL: {
        weakTo: ["FIGHTING"],
        resists: [],
        immuneTo: ["GHOST"]
    },
    FIRE: {
        weakTo: ["WATER", "GROUND", "ROCK"],
        resists: ["FIRE", "GRASS", "ICE", "BUG", "STEEL", "FAIRY"],
        immuneTo: []
    },
    WATER: {
        weakTo: ["GRASS", "ELECTRIC"],
        resists: ["FIRE", "WATER", "ICE", "STEEL"],
        immuneTo: []
    },
    ELECTRIC: {
        weakTo: ["GROUND"],
        resists: ["ELECTRIC", "FLYING", "STEEL"],
        immuneTo: []
    },
    GRASS: {
        weakTo: ["FIRE", "ICE", "POISON", "FLYING", "BUG"],
        resists: ["ELECTRIC", "WATER", "GRASS", "GROUND"],
        immuneTo: []
    },
    ICE: {
        weakTo: ["FIRE", "FIGHTING", "ROCK", "STEEL"],
        resists: ["ICE"],
        immuneTo: []
    },
    FIGHTING: {
        weakTo: ["FLYING", "PSYCHIC", "FAIRY"],
        resists: ["BUG", "ROCK", "DARK"],
        immuneTo: []
    },
    POISON: {
        weakTo: ["GROUND", "PSYCHIC"],
        resists: ["GRASS", "FIGHTING", "POISON", "BUG", "FAIRY"],
        immuneTo: []
    },
    GROUND: {
        weakTo: ["WATER", "GRASS", "ICE"],
        resists: ["POISON", "ROCK"],
        immuneTo: ["ELECTRIC"]
    },
    FLYING: {
        weakTo: ["ELECTRIC", "ICE", "ROCK"],
        resists: ["GRASS", "FIGHTING", "BUG"],
        immuneTo: ["GROUND"]
    },
    PSYCHIC: {
        weakTo: ["BUG", "GHOST", "DARK"],
        resists: ["FIGHTING", "PSYCHIC"],
        immuneTo: []
    },
    BUG: {
        weakTo: ["FIRE", "FLYING", "ROCK"],
        resists: ["GRASS", "FIGHTING", "GROUND"],
        immuneTo: []
    },
    ROCK: {
        weakTo: ["WATER", "GRASS", "FIGHTING", "GROUND", "STEEL"],
        resists: ["NORMAL", "FIRE", "POISON", "FLYING"],
        immuneTo: []
    },
    GHOST: {
        weakTo: ["GHOST", "DARK"],
        resists: ["POISON", "BUG"],
        immuneTo: ["NORMAL", "FIGHTING"]
    },
    DRAGON: {
        weakTo: ["ICE", "DRAGON", "FAIRY"],
        resists: ["FIRE", "WATER", "ELECTRIC", "GRASS"],
        immuneTo: []
    },
    DARK: {
        weakTo: ["FIGHTING", "BUG", "FAIRY"],
        resists: ["GHOST", "DARK"],
        immuneTo: ["PSYCHIC"]
    },
    STEEL: {
        weakTo: ["NORMAL", "GRASS", "ICE", "FLYING", "PSYCHIC", "BUG", "ROCK", "DRAGON", "STEEL", "FAIRY"],
        resists: ["FIRE", "WATER", "ELECTRIC", "GRASS"],
        immuneTo: ["POISON"]
    },
    FAIRY: {
        weakTo: ["POISON", "STEEL"],
        resists: ["FIGHTING", "BUG", "DARK"],
        immuneTo: ["DRAGON"]
    }
} as const;

export type Type = typeof types[string];
export type Gender = "M"|"F"|"N";
export type Ability = "0"|"1"|"H";
export type Stats = {
    hp?: number,
    atk?: number,
    def?: number,
    spa?: number,
    spd?: number,
    spe?: number,
    accuracy?: -6|-5|-4|-3|-2|-1|0|1|2|3|4|5|6,
    crit?: -6|-5|-4|-3|-2|-1|0|1|2|3|4|5|6,
    evasion?: -6|-5|-4|-3|-2|-1|0|1|2|3|4|5|6
}
export type Move = typeof Moves[string]["id"];
// export type Species = typeof Pokedex[string]["species"];
export type Pokemon = {
    species: string,
    name: string,
    gender: Gender,
    shiny: boolean,
    level: number,
    ability: Ability,
    ivs: number,
    evs: number
}