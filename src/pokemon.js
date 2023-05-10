import Pokedex from "./pokedex";
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

    constructor(species, name = "", gender, shiny, level = -1, heldItem = "", nature, abilitySlot, ivs, evs, moves) {
        this.species = species;
        this.name = name;

        // gender initialization
        if (Pokedex[species].gender) {
            this.gender = Pokedex[species].gender;
        } else if (Pokedex[species].genderRatio && !Pokedex[species].genderRatio[gender]) {
            let genderRatio = Pokedex[species].genderRatio || { M: 0.5, F: 0.5 };
            this.gender = Math.random() < genderRatio.M ? genderRatio.M : genderRatio.F;
        } else this.gender = gender;

        this.shiny = typeof shiny == "boolean" ? shiny : randomNumber(1, Pokemon.shinyChance) == 1;
        this.level = level;
        this.heldItem = heldItem;
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