import { Pokedex } from "./pokedex";
import { Moves } from "./moves";
import { Abilities } from "./abilities";
import { Types } from "./types"

const typesArray = Object.keys(Types);
export type Type = typeof typesArray[number];
export type Gender = "M"|"F"|"N";
export type AbilitySlot = "0"|"1"|"H"|"S";
export type Ability = typeof Abilities[string]["id"];
export type Move = typeof Moves[string]["id"];
const speciesArray = Object.keys(Pokedex);
export type Species = typeof speciesArray[number];
export type StatStage = -6|-5|-4|-3|-2|-1|0|1|2|3|4|5|6;
export type StatStages = {
    atk?: StatStage,
    def?: StatStage,
    spa?: StatStage,
    spd?: StatStage,
    spe?: StatStage,
    accuracy?: StatStage,
    crit?: StatStage,
    evasion?: StatStage
}
export type Stats = {
    hp?: number,
    atk?: number,
    def?: number,
    spa?: number,
    spd?: number,
    spe?: number,
}
export enum StatNames {
    hp = "HP",
    atk = "Attack",
    def = "Defense",
    spa = "Sp. Atk",
    spd = "Sp. Defense",
    spe = "Speed",
    evasion = "evasiveness",
    accuracy = "accuracy",
    crit = "critical-hit ratio"
}
export type Pokemon = {
    species: string,
    item: string,
    nature: string,
    name: string,
    gender: Gender,
    shiny: boolean,
    level: number,
    ability: AbilitySlot,
    ivs: Stats,
    evs: Stats,
    stats: Stats,
    moves: Move[]
}