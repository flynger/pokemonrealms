import TMs from "./tm.js";

const Items = {
    // Poké Balls
    pokeball: {
        category: "Poké Balls",
        num: 1,
        name: "Poké Ball",
        id: "pokeball",
        desc: "A device for catching wild Pokémon. It’s thrown like a ball at a Pokémon, comfortably encapsulating its target.",
        shortDesc: "A device for catching wild Pokémon.",
        nhonDesc: "For all the broke trainers out there",
        canBeHeld: true,
        isUsableInBattle: true,
        isPokeball: true,
        catchRate() {
            return 1;
        }
    },
    greatball: {
        category: "Poké Balls",
        num: 2,
        name: "Great Ball",
        id: "greatball",
        desc: "A good, high-performance Poké Ball that provides a higher success rate for catching Pokémon than a standard Poké Ball.",
        shortDesc: "A device for catching wild Pokémon with 1.5x the rate of a Poké Ball.",
        nhonDesc: "大きいです。",
        canBeHeld: true,
        isUsableInBattle: true,
        isPokeball: true,
        catchRate() {
            return 1.5;
        }
    },
    ultraball: {
        category: "Poké Balls",
        num: 3,
        name: "Ultra Ball",
        id: "ultraball",
        desc: "An ultra-high-performance Poké Ball that provides a higher success rate for catching Pokémon than a Great Ball.",
        shortDesc: "A device for catching wild Pokémon with 2x the rate of a Poké Ball.",
        nhonDesc: "stylish looking color scheme",
        canBeHeld: true,
        isUsableInBattle: true,
        isPokeball: true,
        catchRate() {
            return 2;
        }
    },
    masterball: {
        category: "Poké Balls",
        num: 4,
        name: "Master Ball",
        id: "masterball",
        desc: "The very best Poké Ball with the ultimate level of performance. With it, you will catch any wild Pokémon without fail.",
        shortDesc: "A device for catching any wild Pokémon without fail.",
        nhonDesc: "Venonatみたいなもんさ。",
        canBeHeld: true,
        isUsableInBattle: true,
        isPokeball: true,
        catchRate() {
            return true;
        }
    },

    // Medicine
    potion: {
        category: "Medicine",
        num: 1,
        name: "Potion",
        id: "potion",
        desc: "A spray-type medicine for treating wounds. It can be used to restore 20 HP to a Pokémon.",
        shortDesc: "Restores a Pokémon's HP by 20 points.",
        nhonDesc: "miracle drugs?",
        isUsableOnPokemon: true,
        isUsableInBattle: true,
        useOnPokemon(mon) {
            return heal(mon, 20);
        }
    },
    superpotion: {
        category: "Medicine",
        num: 2,
        name: "Super Potion",
        id: "superpotion",
        desc: "A spray-type medicine for treating wounds. It can be used to restore 60 HP to a Pokémon.",
        shortDesc: "Restores a Pokémon's HP by 60 points.",
        isUsableOnPokemon: true,
        isUsableInBattle: true,
        useOnPokemon(mon) {
            return heal(mon, 60);
        }
    },
    hyperpotion: {
        category: "Medicine",
        num: 3,
        name: "Hyper Potion",
        id: "hyperpotion",
        desc: "A spray-type medicine for treating wounds. It can be used to restore 120 HP to a Pokémon.",
        shortDesc: "Restores a Pokémon's HP by 120 points.",
        isUsable: true,
        isUsableOnPokemon: true,
        isUsableInBattle: true,
        useOnPokemon(mon) {
            return heal(mon, 120);
        }
    },
    maxpotion: {
        category: "Medicine",
        num: 4,
        name: "Max Potion",
        id: "maxpotion",
        desc: "A spray-type medicine for treating wounds. It can be used to fully restore the max HP of a Pokémon.",
        shortDesc: "Fully restores a Pokémon's HP.",
        isUsable: true,
        isUsableOnPokemon: true,
        isUsableInBattle: true,
        useOnPokemon(mon) {
            return heal(mon, mon.maxhp);
        }
    },
    aguavberry: {
        category: "Berries",
        num: 14,
        name: "Aguav Berry",
        id: "aguavberry",
        desc: "If a Pokémon holds one of these Berries, it will be able to restore some HP should it find itself in a pinch. But it will become confused if it hates the Berry's taste.",
        shortDesc: "Restores HP if it's low, but may cause confusion.",
        nhonDesc: "pray its not poisonous",
        canBeHeld: true,
        isUsableOnPokemon: true,
        isUsableInBattle: true
    },
    repel: {
        category: "Items",
        num: 1,
        id: "repel",
        name: "Repel",
        desc: "An item that prevents weak wild Pokémon from appearing for 100 steps after its use.",
        value: 400,
        canBeHeld: true,
        isUsable: true
    },
    superrepel: {
        category: "Items",
        num: 2,
        name: "Super Repel",
        id: "superrepel",
        desc: "An item that prevents weak wild Pokémon from appearing for 200 steps after its use.",
        value: 700,
        canBeHeld: true,
        isUsable: true
    },
    firestone: {
        category: "Items",
        num: 3,
        name: "Fire Stone",
        id: "firestone",
        desc: "A peculiar stone that can make certain species of Pokémon evolve. It has a fiery orange heart.",
        shortDesc: "Makes certain species of Pokémon evolve.",
        nhonDesc: "Pokemon version of MC flint",
        canBeHeld: true,
        isUsableOnPokemon: true,
        onUse: evolve
    },
    waterstone: {
        category: "Items",
        num: 4,
        name: "Water Stone",
        id: "waterstone",
        desc: "A peculiar stone that can make certain species of Pokémon evolve. It is the clear blue of a deep pool.",
        shortDesc: "Makes certain species of Pokémon evolve.",
        nhonDesc: "Don't try drinking this",
        canBeHeld: true,
        isUsableOnPokemon: true
    },
    thunderstone: {
        category: "Items",
        num: 5,
        name: "Thunder Stone",
        id: "thunderstone",
        desc: "A peculiar stone that can make certain species of Pokémon evolve. It has a distinct thunderbolt pattern.",
        shortDesc: "Makes certain species of Pokémon evolve.",
        nhonDesc: "Makeshift battery",
        canBeHeld: true,
        isUsableOnPokemon: true
    },
    ...TMs
}

function heal(pokemon, amount) {
    if (pokemon.currenthp) {
        if (pokemon.currenthp < pokemon.stats.hp) {
            pokemon.hp += Math.min(amount, pokemon.maxhp - pokemon.hp);
            return `${pokemon.getName()} had its HP restored.`;
        }
        return false;
    }
    if (pokemon.hp < pokemon.maxhp) {
        pokemon.hp += Math.min(amount, pokemon.maxhp - pokemon.hp);
        let newPercentage = 100 * pokemon.hp / pokemon.maxhp;
        // TODO: Stop rounding health for user's side
        return [{ message: " ", side: "you", damageHPTo: newPercentage }, { message: `${pokemon.name} had its HP restored.` }];
    } else return false;
}

function evolve(pokemon, method) {
    const { species, level } = pokemon;

    if (!Pokedex[species].evolves) {
        return;
    }

    // check if pokemon can evolve using this item
    const evolutionReq = Pokedex[species].evolves[method];
    if (evolutionData) {
        switch (method) {
            case "levelup":
                if (level < evolutionReq) break;
            case "item":
                if (level < evolutionReq) break;
            default:

        }
    }
    return false;
}

export default Items;