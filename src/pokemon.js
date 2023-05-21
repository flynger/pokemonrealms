import Pokedex from "./pokedex.js";
import Showdown from "pokemon-showdown";
const { Dex } = Showdown;
// console.log(Dex.natures.get("Timid"));
export class Pokemon {
    static shinyChance = 32;
    static hiddenAbilityChance = 64;
    static getRandomNature() {
        return Dex.natures.all().random().id;
    }

    constructor(species = "MISSINGNO", level = -1, { name = "", gender, shiny, heldItem = "", nature, abilitySlot, ivs, evs, moves = [], originalTrainer, owner }) {
        this.species = species;
        this.name = name;

        // gender initialization
        if (Pokedex[species].gender) {
            this.gender = Pokedex[species].gender;
        } else if (!Pokedex[species].genderRatio && gender != "M" && gender != "F") {
            this.gender = Math.random() < 0.5 ? "M" : "F";
        } else if (Pokedex[species].genderRatio && !Pokedex[species].genderRatio.hasOwnProperty(gender)) {
            this.gender = Math.random() < Pokedex[species].genderRatio.M ? "M" : "F";
        } else this.gender = gender;

        this.shiny = typeof shiny == "boolean" ? shiny : randomNumber(1, Pokemon.shinyChance) == 1;
        this.level = level;
        this.heldItem = heldItem;
        this.nature = nature || Pokemon.getRandomNature();

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
        this.calculateStats();
        this.currenthp = this.stats.hp;

        // generate moves
        var possibleMoves = [];
        for (let move in Pokedex[species].learnset.levelup) {
            if (+move <= level)
                possibleMoves.push(Pokedex[species].learnset.levelup[move]);
            else break;
        }
        while (possibleMoves.length > 4 - moves.length) {
            possibleMoves.splice(randomNumber(0, possibleMoves.length - 1), 1);
        }
        possibleMoves.push(...moves);
        possibleMoves.shuffle();
        console.log(possibleMoves);
        this.moves = possibleMoves;
        this.originalTrainer = originalTrainer;
        this.owner = owner;
        console.log(this);
    }

    levelUp() {
        if (this.level < 100) {
            this.level++;
            let prevhp = this.stats.hp;
            this.calculateStats();
            this.currenthp += this.stats.hp - prevhp;
            let levelUpMove = Pokedex[this.species].learnset.levelup[this.level];
            if (levelUpMove) {
                this.learnMove(levelUpMove);
            }
        }
    }

    learnMove(move) {
        if (this.moves.length < 4) this.moves.push(move);
        else return Error("Pokemon already has 4 moves");
    }

    calculateStats() {
        this.stats = {};
        for (let stat in this.ivs) {
            this.stats[stat] = this.calculateStat(stat);
        }
    }

    calculateStat(stat) {
        let baseStat = Pokedex[this.species].baseStats[stat];
        let iv = this.ivs[stat];
        let ev = this.evs[stat];
        let level = this.level;
        if (stat == "hp") {
            return Math.floor((2 * baseStat + iv + Math.floor(ev / 4)) * level / 100) + level + 10;
        } else {
            let natureData = Dex.natures.get(this.nature);
            let natureMultiplier = natureData.plus == stat ? 1.1 : natureData.minus == stat ? 0.9 : 1;
            return Math.floor((Math.floor((2 * baseStat + iv + Math.floor(ev / 4)) * level / 100) + 5) * natureMultiplier);
        }
    }
}
export class Stats {
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