// shared functions
export function randomInteger(min: number, max: number): number {
    if (!Number.isSafeInteger(min) || !Number.isSafeInteger(max)) throw Error("Non-integer parameters passed into randomInteger");
    return Math.floor(randomFloat(min, max));
}
export function randomFloat(min: number, max: number): number {
    return Math.random() * (max - min + 1) + min;
}
export function randomElement<T>(arr: T[]): T {
    if (arr.length === 0) throw Error("Array has no elements to choose from!");
    return arr[randomInteger(0, arr.length - 1)];
}

export function remove<T>(arr: T[], e: T): boolean {
    return removeIndex(arr, arr.indexOf(e));
}
export function removeAll<T>(arr: T[], e: T): number {
    let count = 0;
    const lastIndex = arr.length - 1;
    for (let i = lastIndex; i >= 0; i--)
        if (arr[i] === e) {
            removeIndex(arr, i);
            count++;
        }
    return count;
}
export function removeIndex<T>(arr: T[], i: number): boolean {
    return !!arr.splice(i, 1).length;
}
export function shuffleArray<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = randomInteger(0, i);
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}