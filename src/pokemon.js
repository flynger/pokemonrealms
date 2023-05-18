import Pokedex from "./pokedex.js";
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
    static shinyChance = 32;
    static hiddenAbilityChance = 64;

    constructor(species = "MISSINGNO", level = -1, { name = "", gender, shiny, heldItem = "", nature = "Serious", abilitySlot, ivs, evs, moves, originalTrainer, owner}) {
        this.species = species;
        this.name = name;

        // gender initialization
        if (Pokedex[species].gender) {
            this.gender = Pokedex[species].gender;
        } else if (!Pokedex[species].genderRatio && gender != "M" && gender != "F"){
            this.gender = Math.random() < 0.5 ? "M" : "F";
        } else if (Pokedex[species].genderRatio && !Pokedex[species].genderRatio.hasOwnProperty(gender)) {
            this.gender = Math.random() < Pokedex[species].genderRatio.M ? "M" : "F";
        } else this.gender = gender;

        this.shiny = typeof shiny == "boolean" ? shiny : randomNumber(1, Pokemon.shinyChance) == 1;
        this.level = level;
        this.heldItem = heldItem;
        this.nature = nature;

        // ability code
        if (abilitySlot && Pokedex[species].abilities.hasOwnProperty(abilitySlot)) {
            this.abilitySlot = abilitySlot;
        } else {
            if (Pokedex[species].abilities["H"] && randomNumber(1, Pokemon.hiddenAbilityChance) == 1) {
                this.abilitySlot = "H";
            } else this.abilitySlot = Pokedex[species].abilities["1"] ? randomNumber(0, 1) + "" : "0";
        }

        this.ivs = ivs || new Stats(randomNumber(0, 31), randomNumber(0, 31), randomNumber(0, 31), randomNumber(0, 31), randomNumber(0, 31), randomNumber(0, 31));
        this.evs = evs || new Stats(0, 0, 0, 0, 0, 0);

        // generate moves
        var possibleMoves = [];
        for (let move in Pokedex[species].learnset.levelup) {
            if (+move <= level)
                possibleMoves.push(Pokedex[species].learnset.levelup[move]);
            else break;
        }
        while (possibleMoves.length > 4) {
            possibleMoves.splice(randomNumber(0, possibleMoves.length - 1), 1);
        }
        possibleMoves.shuffle();
        console.log(possibleMoves);
        this.moves = possibleMoves;
    }

    learnMove(move) {
        if (this.moves.length < 4) this.moves.push(move);
        else return Error("Pokemon already has 4 moves");
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