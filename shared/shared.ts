// shared functions
export function randomInteger(min: number, max: number): number {
    if (!Number.isSafeInteger(min) || !Number.isSafeInteger(max)) throw Error("Non-integer parameters passed into randomInteger");
    return Math.floor(randomFloat(min, max));
}
export function randomFloat(min: number, max: number): number {
    return Math.random() * (max - min + 1) + min;
}