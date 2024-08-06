/* Prototype Declarations */
declare global {
    interface Array<T> {
        remove(e: T): boolean;
        removeAll(e: T): boolean;
        removeIndex(i: number): boolean;
        random(): T;
        shuffle(): void;
    }
}

/* Types (Common and Recurring) */
export type NonEmptyArray<T> = [T, ...T[]];