type ItemCategory = "Poké Balls" | "Medicine" | "Berries";

interface ItemEntry {
    category: ItemCategory,
    num: number,
    name: Item,
    desc: string,
    shortDesc?: string,
    canBeHeld?: true, // Only held items
    canUseInBattle?: true,
    catchRate?: number | (() => number) // Only pokeballs
}

export const Items = {
    // Category: Poké Balls
    "Poké Ball": {
        category: "Poké Balls",
        num: 1,
        name: "Poké Ball",
        desc: "A device for catching wild Pokémon. It’s thrown like a ball at a Pokémon, comfortably encapsulating its target.",
        canBeHeld: true,
        canUseInBattle: true,
        catchRate: 1
    },
    "Great Ball": {
        category: "Poké Balls",
        num: 2,
        name: "Great Ball",
        desc: "A good, high-performance Poké Ball that provides a higher success rate for catching Pokémon than a standard Poké Ball.",
        canBeHeld: true,
        canUseInBattle: true,
        catchRate: 1.5
    },
    "Ultra Ball": {
        category: "Poké Balls",
        num: 3,
        name: "Ultra Ball",
        desc: "An ultra-high-performance Poké Ball that provides a higher success rate for catching Pokémon than a Great Ball.",
        canBeHeld: true,
        canUseInBattle: true,
        catchRate: 2
    },
    "Master Ball": {
        category: "Poké Balls",
        num: 4,
        name: "Master Ball",
        desc: "The very best Poké Ball with the ultimate level of performance. With it, you will catch any wild Pokémon without fail.",
        canBeHeld: true,
        canUseInBattle: true,
        catchRate: Infinity
    },
} as const;

export type Item = keyof typeof Items;
type ItemFilter<T> = Extract<typeof Items[Item], T>['name'];
export type Pokeball = ItemFilter<{ category: "Poké Balls" }>;
export type HeldItem = ItemFilter<{ canBeHeld: true }>;
export default Item;