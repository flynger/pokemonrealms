// Define all Pokémon natures and their effects
export const natures = {
    Hardy: { increases: 'atk', decreases: 'atk' },
    Lonely: { increases: 'atk', decreases: 'def' },
    Adamant: { increases: 'atk', decreases: 'spa' },
    Naughty: { increases: 'atk', decreases: 'spd' },
    Brave: { increases: 'atk', decreases: 'spe' },

    Bold: { increases: 'def', decreases: 'atk' },
    Docile: { increases: 'def', decreases: 'def' },
    Impish: { increases: 'def', decreases: 'spa' },
    Lax: { increases: 'def', decreases: 'spd' },
    Relaxed: { increases: 'def', decreases: 'spe' },

    Modest: { increases: 'spa', decreases: 'atk' },
    Mild: { increases: 'spa', decreases: 'def' },
    Bashful: { increases: 'spa', decreases: 'spa' },
    Rash: { increases: 'spa', decreases: 'spd' },
    Quiet: { increases: 'spa', decreases: 'spe' },

    Calm: { increases: 'spd', decreases: 'atk' },
    Gentle: { increases: 'spd', decreases: 'def' },
    Careful: { increases: 'spd', decreases: 'spa' },
    Quirky: { increases: 'spd', decreases: 'spd' },
    Sassy: { increases: 'spd', decreases: 'spe' },

    Timid: { increases: 'spe', decreases: 'atk' },
    Hasty: { increases: 'spe', decreases: 'def' },
    Jolly: { increases: 'spe', decreases: 'spa' },
    Naive: { increases: 'spe', decreases: 'spd' },
    Serious: { increases: 'spe', decreases: 'spe' }
};

// Extract the nature names as a type
export type Nature = keyof typeof natures;