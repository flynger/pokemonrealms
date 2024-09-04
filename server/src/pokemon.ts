import Item, { HeldItem, Pokeball } from "./pokedex/item";
import GrowthRates from "./pokedex/data/growthRates";
import Move from "./pokedex/move";
import Natures, { Nature } from "./pokedex/nature";
import Pokedex, { AbilitySlot, Gender, Species } from "./pokedex/pokedex";
import { createStats } from "./util/util";
import { randomInteger } from "../../shared/shared";
import Side from "battle/side";
import BattleParty from "battle/battleParty";

export default class Pokemon implements Stats {
    static id = 1;
    static readonly SHINY_CHANCE = 1 / 8192;
    static readonly HIDDEN_ABILITY_CHANCE = 1 / 64;

    species: Species;
    private _name: string;
    get name(): string {
        return this.name || Pokedex.getEntry(this.species).species;
    }

    readonly gender: Gender;

    readonly isShiny: boolean;
    level: number;
    xp: number;

    heldItem?: HeldItem;
    readonly nature: Nature;
    friendship: number;
    readonly abilitySlot: AbilitySlot;

    /* IVs and EVs */
    readonly ivs: Readonly<Stats>;
    readonly evs: Stats;

    /* Stats */
    currenthp: number;
    hp!: number;
    atk!: number;
    def!: number;
    spa!: number;
    spd!: number;
    spe!: number;

    readonly moves: Move[];

    caughtBall: Pokeball;
    OT?: string;
    owner?: string;

    /* Battle-only Properties */
    side?: Side;
    party?: BattleParty;

    constructor(species: Species, level: number, { name = "", gender, isShiny, xp, heldItem, nature, friendship, abilitySlot, ivs = {}, evs = {}, currenthp, moves, OT = "", owner = "", caughtBall = "Poké Ball", shinyChance = Pokemon.SHINY_CHANCE, hiddenAbilityChance = Pokemon.HIDDEN_ABILITY_CHANCE }: PokemonConfig = {}) {
        this.species = species;
        this._name = name;

        const pokedexData = Pokedex.getEntry(this.species);

        // gender initialization
        if (typeof pokedexData.gender === "string") {
            this.gender = pokedexData.gender;
        } else if (gender) {
            this.gender = gender;
        } else {
            this.gender = Math.random() < (pokedexData.gender?.M ?? 0.5) ? "M" : "F";
        }

        this.isShiny = isShiny ?? Math.random() < shinyChance;
        this.nature = nature ?? Natures.getRandom();
        this.friendship = friendship ?? (pokedexData.baseFriendship ?? 50);
        this.heldItem = heldItem;

        this.level = level ?? 1;
        this.xp = xp ?? GrowthRates.getXPAtLevel(pokedexData.growthRate, this.level);

        // ability code
        if (abilitySlot && abilitySlot in pokedexData.abilities) {
            this.abilitySlot = abilitySlot;
        } else if ("H" in pokedexData.abilities && Math.random() < hiddenAbilityChance) {
            this.abilitySlot = "H";
        } else this.abilitySlot = "1" in pokedexData.abilities ? randomInteger(0, 1) + "" as AbilitySlot : "0";

        this.ivs = createStats(ivs, () => randomInteger(0, 31));
        this.evs = createStats(evs, () => 0);
        this.calculateStats();
        this.currenthp = currenthp ?? this.hp;

        // generate moves
        if (moves) {
            this.moves = moves;
        } else {
            this.moves = [];
            const learnsetData = pokedexData.learnset.levelup;
            let learnsetLevel = +this.level;
            while (this.moves.length < 4 && learnsetLevel >= 1) {
                const moveData = learnsetData[learnsetLevel];
                if (moveData) {
                    if (typeof moveData === "string") this.moves.push(moveData);
                    else this.moves.splice(0, 0, ...moveData as Move[]);
                }
                learnsetLevel--;
            }
            this.moves.splice(4);
        }

        this.OT = OT;
        this.owner = owner;
        this.caughtBall = caughtBall;
    }

    levelUp() {
        if (this.level < 100) {
            this.level++;
            const prevhp = this.hp;
            this.calculateStats();
            this.currenthp += this.hp - prevhp;
            let levelUpMoves = Pokedex.getEntry(this.species).learnset.levelup[this.level];
            if (typeof levelUpMoves === "string") {
                levelUpMoves = [levelUpMoves];
            }

            if (levelUpMoves instanceof Array) {
                for (const move of levelUpMoves) {
                    this.learnMove(move);
                }
            }
        }
    }

    learnMove(move: Move) {
        if (this.moves.length < 4) this.moves.push(move);
        else console.log("Pokemon already has 4 moves!");
    }

    calculateStats() {
        for (const stat in this.ivs) {
            this[stat as Stat] = this.calculateStat(stat as Stat);
        }
    }

    calculateStat(stat: Stat) {
        const baseStat = Pokedex.getEntry(this.species).baseStats[stat];
        const iv = this.ivs[stat];
        const ev = this.evs[stat];
        const level = this.level;
        if (stat === "hp") {
            return Math.floor((2 * baseStat + iv + Math.floor(ev / 4)) * level / 100) + level + 10;
        } else {
            const natureEntry = Natures.getEntry(this.nature);
            const natureMultiplier = natureEntry?.increases === stat ? 1.1 : natureEntry?.decreases == stat ? 0.9 : 1;
            return Math.floor((Math.floor((2 * baseStat + iv + Math.floor(ev / 4)) * level / 100) + 5) * natureMultiplier);
        }
    }

    // Battle code
    get hpPercent(): number {
        return Math.floor(100 * this.currenthp / this.hp);
    }

    serializeForBattle(hideSecret: boolean = false) {
        const { name, species, level, isShiny, gender } = this;
        const data = { name, species, level, isShiny, gender };
        if (hideSecret) {
            return {
                ...data, hpPercent: this.hpPercent
            }
        } else {
            const { hp, atk, def, spa, spd, spe, currenthp, xp } = this;
            return {
                ...data, currenthp, hp, xp // atk, def, spa, spd, spe, 
            }
        }
    }
}

// export class Stats {
//     atk: number;
//     def: number;
//     spa: number;
//     spd: number;
//     spe: number;
//     hp: number;
// }

export type Stat = "hp" | "atk" | "def" | "spa" | "spd" | "spe";
export type Stats = {
    [key in Stat]: number;
};

export type PokemonConfig = {
    name?: string,
    gender?: Gender,
    isShiny?: boolean,
    xp?: number,
    heldItem?: Item,
    nature?: Nature,
    friendship?: number,
    abilitySlot?: AbilitySlot,
    ivs?: Partial<Stats>,
    evs?: Partial<Stats>,
    currenthp?: number,
    moves?: Move[],
    OT?: string,
    owner?: string,
    caughtBall?: Pokeball,
    shinyChance?: number,
    hiddenAbilityChance?: number
}