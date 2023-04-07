import { Type } from "./pokemon";
type TypeEntry = {
    weakTo: Type[],
    resists: Type[],
    immuneTo: Type[]
};
export const Types: {[type: string]: TypeEntry} = {
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
}