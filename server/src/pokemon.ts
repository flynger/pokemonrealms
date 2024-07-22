import Move from "./pokedex/move";
import { Nature } from "./pokedex/nature";
import Pokedex, { AbilitySlot, Gender, Species } from "./pokedex/pokedex";

export default class Pokemon {
    static id = 1;
    static readonly shinyChance = 1 / 8192;
    static readonly hiddenAbilityChance = 1 / 64;

    species: Species;
    name: string;
    gender: Gender;

    shiny: boolean;
    level: number;
    xp: number;

    heldItem: string;
    nature: any;
    friendship: number;
    abilitySlot: AbilitySlot;

    ivs: Stats;
    evs: Stats;
    stats: Stats;
    currenthp: number;

    moves: Move[];

    caughtBall: string;
    OT: string;
    owner: string;
    constructor(species, level, { name, gender, shiny, xp, heldItem, nature, friendship, abilitySlot, ivs, evs, currenthp, moves = [], originalTrainer, owner, caughtBall, hiddenAbilityChance = false }: ) {
        this.species = species ?? "MISSINGNO";
        this.name = name ?? "";

        // gender initialization
        if (Pokedex[species].gender) {
            this.gender = Pokedex[species].gender;
        } else if (!Pokedex[species].genderRatio && gender != "M" && gender != "F") {
            this.gender = Math.random() < 0.5 ? "M" : "F";
        } else if (Pokedex[species].genderRatio && !Pokedex[species].genderRatio.hasOwnProperty(gender)) {
            this.gender = Math.random() < Pokedex[species].genderRatio.M ? "M" : "F";
        } else this.gender = gender;

        this.shiny = this.shiny ?? Math.random() < Pokemon.shinyChance;
        this.level = level ?? 1;
        this.xp = xp ?? Pokemon.growthRates[Pokedex[species].growthRate][level];
        this.heldItem = heldItem ?? "";
        this.nature = nature ?? Pokemon.getRandomNature();
        this.friendship = friendship ?? 70;

        // ability code
        if (abilitySlot && Pokedex[species].abilities.hasOwnProperty(abilitySlot)) {
            this.abilitySlot = abilitySlot;
        } else {
            if (hiddenAbilityChance !== 0 && Pokedex[species].abilities["H"] && randomNumber(1, hiddenAbilityChance || Pokemon.hiddenAbilityChance) == 1) {
                this.abilitySlot = "H";
            } else this.abilitySlot = Pokedex[species].abilities["1"] ? randomNumber(0, 1) + "" : "0";
        }

        this.ivs = new Stats(ivs ?? Stats.stats.reduce((statsObj, stat) => {
            statsObj[stat] = ;
            return statsObj;
        }, {}));
        this.evs = new Stats(evs);
        this.calculateStats();
        this.currenthp = this.stats.hp;

        // generate moves
        const learnsetMoves = [];
        for (let move in Pokedex[species].learnset.levelup) {
            if (+move <= level)
                learnsetMoves.push(Pokedex[species].learnset.levelup[move]);
            else break;
        }
        while (learnsetMoves.length > 4 - moves.length) {
            learnsetMoves.splice(randomNumber(0, learnsetMoves.length - 1), 1);
        }
        this.moves = [...moves, ...learnsetMoves];
        if (originalTrainer) this.originalTrainer = originalTrainer;
        if (owner) {
            this.setOwner(owner);
            this.caughtBall = caughtBall ? caughtBall : "pokeball";
        } else if (caughtBall) this.caughtBall = caughtBall;
    }

    getName() {
        return this.name || Pokedex[this.species].name;
    }

    levelUp() {
        if (this.level < 100) {
            this.level++;
            const prevhp = this.stats.hp;
            this.calculateStats();
            this.currenthp += this.stats.hp - prevhp;
            const levelUpMove = Pokedex[this.species].learnset.levelup[this.level];
            if (levelUpMove) {
                this.learnMove(levelUpMove);
            }
        }
    }

    learnMove(move) {
        if (this.moves.length < 4) this.moves.push(move);
        else throw Error("Pokemon already has 4 moves!");
    }

    calculateStats() {
        this.stats = {};
        for (const stat in this.ivs) {
            this.stats[stat] = this.calculateStat(stat);
        }
    }

    calculateStat(stat) {
        const baseStat = Pokedex[this.species].baseStats[stat];
        const iv = this.ivs[stat];
        const ev = this.evs[stat];
        const level = this.level;
        if (stat == "hp") {
            return Math.floor((2 * baseStat + iv + Math.floor(ev / 4)) * level / 100) + level + 10;
        } else {
            const natureData = Dex.natures.get(this.nature);
            const natureMultiplier = natureData.plus == stat ? 1.1 : natureData.minus == stat ? 0.9 : 1;
            return Math.floor((Math.floor((2 * baseStat + iv + Math.floor(ev / 4)) * level / 100) + 5) * natureMultiplier);
        }
    }

    setOwner(owner) {
        if (!this.owner) {
            this.id = Pokemon.id++;
            Pokemon.entries[this.id] = this;
            this.originalTrainer = owner;
        }
        this.owner = owner;
    }

    setBall(ball) {
        this.caughtBall = ball;
    }
}

export type Stat = "hp" | "atk" | "def" | "spa" | "spd" | "spe";
export type Stats = {
    readonly [key in Stat]: number;
};

type PokemonConfig = {
    name?: string,
    gender?: Gender,
    shiny?: boolean,
    xp?: number,
    heldItem?: string,
    nature?: Nature,
    friendship?: number,
    abilitySlot?: AbilitySlot,
    ivs?: Stats,
    evs?: Stats,
    currenthp?: number,
    moves?: Move[],
    OT?: string,
    owner?: string,
    caughtBall?: string,
    hiddenAbilityChance?: number
}
// helper functions
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}