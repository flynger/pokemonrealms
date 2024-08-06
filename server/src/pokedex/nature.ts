// import "../util/types";
import { Stat } from "../pokemon";

// Define all Pokémon natures and their effects
const NATURE_DATA = {
    Hardy: null,
    Lonely: { increases: 'atk', decreases: 'def' },
    Adamant: { increases: 'atk', decreases: 'spa' },
    Naughty: { increases: 'atk', decreases: 'spd' },
    Brave: { increases: 'atk', decreases: 'spe' },

    Bold: { increases: 'def', decreases: 'atk' },
    Docile: null,
    Impish: { increases: 'def', decreases: 'spa' },
    Lax: { increases: 'def', decreases: 'spd' },
    Relaxed: { increases: 'def', decreases: 'spe' },

    Modest: { increases: 'spa', decreases: 'atk' },
    Mild: { increases: 'spa', decreases: 'def' },
    Bashful: null,
    Rash: { increases: 'spa', decreases: 'spd' },
    Quiet: { increases: 'spa', decreases: 'spe' },

    Calm: { increases: 'spd', decreases: 'atk' },
    Gentle: { increases: 'spd', decreases: 'def' },
    Careful: { increases: 'spd', decreases: 'spa' },
    Quirky: null,
    Sassy: { increases: 'spd', decreases: 'spe' },

    Timid: { increases: 'spe', decreases: 'atk' },
    Hasty: { increases: 'spe', decreases: 'def' },
    Jolly: { increases: 'spe', decreases: 'spa' },
    Naive: { increases: 'spe', decreases: 'spd' },
    Serious: null
} as const;

// Extract the nature names as a type
export type Nature = keyof typeof NATURE_DATA;
type NatureEntry = { increases: Stat, decreases: Stat } | null;
export default class Natures {
    private static readonly entries: Record<Nature, NatureEntry> = NATURE_DATA;

    static getEntry(nature: Nature): NatureEntry {
        return Natures.entries[nature];
    }

    static getRandom(): Nature {
        return (Object.keys(Natures.entries) as Nature[]).random();
    }
}