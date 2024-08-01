import { Stats } from "../pokemon";

// changing Array prototype methods
Array.prototype.remove = function (e): boolean {
    return this.removeIndex(this.indexOf(e));
}
Array.prototype.removeAll = function (e): boolean {
    const lastIndex = this.length - 1;
    for (let i = lastIndex; i >= 0; i--)
        if (this[i] === e) this.removeIndex(i);
    return this.length !== lastIndex + 1;
}
Array.prototype.removeIndex = function (i): boolean {
    return !!this.splice(i, 1).length;
}
Array.prototype.random = function () {
    return this[randomInteger(0, this.length - 1)];
}
Array.prototype.shuffle = function () {
    for (let i = this.length - 1; i > 0; i--) {
        const j = randomInteger(0, i);
        [this[i], this[j]] = [this[j], this[i]];
    }
    return this;
}

/* Helper functions (Common and Recurring) */
export function randomInteger(min: number, max: number): number {
    if (!Number.isSafeInteger(min) || !Number.isSafeInteger(max)) throw Error();
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