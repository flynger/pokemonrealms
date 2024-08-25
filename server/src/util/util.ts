import { StatStages } from "battle/battleSpot";
import { Stats } from "../pokemon";

/* Helper functions (Common and Recurring) */
export function randomInteger(min: number, max: number): number {
    if (!Number.isSafeInteger(min) || !Number.isSafeInteger(max)) throw Error("Non-integer parameters passed into randomInteger");
    return Math.floor(randomFloat(min, max));
}
export function randomFloat(min: number, max: number): number {
    return Math.random() * (max - min + 1) + min;
}
export function createStats(stats: Partial<Stats>, defaultValue: () => number): Stats {
    return {
        hp: stats.hp ?? defaultValue(),
        atk: stats.atk ?? defaultValue(),
        def: stats.def ?? defaultValue(),
        spa: stats.spa ?? defaultValue(),
        spd: stats.spd ?? defaultValue(),
        spe: stats.spe ?? defaultValue()
    };
}

export function createStatStages(): StatStages {
    return {
        hp: 0,
        atk: 0,
        def: 0,
        spa: 0,
        spd: 0,
        spe: 0,
        acc: 0,
        eva: 0,
        crit: 0
    };
}