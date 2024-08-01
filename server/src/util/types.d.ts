/* Prototype Declarations */
declare global {
    interface Array<T> {
        remove(e): boolean;
        removeAll(e): boolean;
        removeIndex(i): boolean;
        random(): T;
        shuffle(): void;
    }
}

/* Types (Common and Recurring) */
export type NonEmptyArray<T> = [T, ...T[]];