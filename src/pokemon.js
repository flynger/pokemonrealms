// import { Dex } from "pokemon-showdown";
// const moves = Dex.moves.all().map(move => move.name);
// const items = Dex.items.all().map(item => item.name);
// const species = Dex.species.all().map(mon => mon.name);
// const abilities = Dex.abilities.all().map(ability => ability.name);

// // const typeArray = Object.keys(Types);
// // export type Type = typeof typeArray[number];
// export type Gender = "M"|"F"|"N";
// export type AbilitySlot = "0"|"1"|"H"|"S";
// export type Ability = typeof abilities[number];
// export type Move = typeof moves[number];
// export type Species = typeof species[number];
// export type HeldItem = typeof items[number];
// // export type StatStage = -6|-5|-4|-3|-2|-1|0|1|2|3|4|5|6;
// // export type StatStages = {
// //     atk?: StatStage,
// //     def?: StatStage,
// //     spa?: StatStage,
// //     spd?: StatStage,
// //     spe?: StatStage,
// //     accuracy?: StatStage,
// //     crit?: StatStage,
// //     evasion?: StatStage
// // }
// export type Stats = {
//     hp?: number,
//     atk?: number,
//     def?: number,
//     spa?: number,
//     spd?: number,
//     spe?: number,
// }
// const statNames = {
//     hp: "HP",
//     atk: "Attack",
//     def: "Defense",
//     spa: "Sp. Atk",
//     spd: "Sp. Defense",
//     spe: "Speed",
//     evasion: "evasiveness",
//     accuracy: "accuracy",
//     crit: "critical-hit ratio"
// }
export default class Pokemon {
    static shinyChance = 8192;
    
    constructor(species, name, gender, shiny, level, heldItem, nature, abilitySlot, ivs, evs, moves) {
        this.species = species;
        this.name = name || "";
        this.gender = gender;
        this.shiny = typeof shiny == "boolean" ? shiny : randomNumber(1, Pokemon.shinyChance) == 1;
        this.level = level || 1;
        this.heldItem = heldItem || "";
        this.nature = nature || "Serious";
        this.abilitySlot = abilitySlot || randomNumber(0, 1) + "";
        this.ivs = ivs || new Stats(randomNumber(0, 31), randomNumber(0, 31), randomNumber(0, 31), randomNumber(0, 31), randomNumber(0, 31), randomNumber(0, 31));
        this.evs = evs || new Stats(0, 0, 0, 0, 0, 0);
        this.moves = moves;
    }
}
class Stats {
    constructor(hp, atk, def, spa, spd, spe) {
        this.hp = hp;
        this.atk = atk;
        this.def = def;
        this.spa = spa;
        this.spd = spd;
        this.spe = spe;
    }

    toObject() {
        return { hp: this.hp, atk: this.atk, def: this.def, spa: this.spa, spd: this.spd, spe: this.spe };
    }

    toArray() {
        return [this.hp, this.atk, this.def, this.spa, this.spd, this.spe];
    }
}
// helper functions
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}