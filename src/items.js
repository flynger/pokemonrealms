const Items = {
    pokeball: {
        category: "Poké Balls",
        num: 1,
        name: "Poké Ball",
        id: "pokeball",
        desc: "A device for catching wild Pokémon. It’s thrown like a ball at a Pokémon, comfortably encapsulating its target.",
        shortDesc: "A device for catching wild Pokémon.",
        nhonDesc: "For all the broke trainers out there",
        isHoldable: true,
        isUsableInBattle: true,
        isPokeball: true
    },
    greatball: {
        category: "Poké Balls",
        num: 2,
        name: "Great Ball",
        id: "greatball",
        desc: "A good, high-performance Poké Ball that provides a higher success rate for catching Pokémon than a standard Poké Ball.",
        shortDesc: "A device for catching wild Pokémon with 1.5x the rate of a Poké Ball.",
        nhonDesc: "大きいです。",
        isHoldable: true,
        isUsableInBattle: true,
        isPokeball: true
    },
    ultraball: {
        category: "Poké Balls",
        num: 3,
        name: "Ultra Ball",
        id: "ultraball",
        desc: "An ultra-high-performance Poké Ball that provides a higher success rate for catching Pokémon than a Great Ball.",
        shortDesc: "A device for catching wild Pokémon with 2x the rate of a Poké Ball.",
        nhonDesc: "stylish looking color scheme",
        isHoldable: true,
        isUsableInBattle: true,
        isPokeball: true
    },
    masterball: {
        category: "Poké Balls",
        num: 4,
        name: "Master Ball",
        id: "masterball",
        desc: "The very best Poké Ball with the ultimate level of performance. With it, you will catch any wild Pokémon without fail.",
        shortDesc: "A device for catching any wild Pokémon without fail.",
        nhonDesc: "Venonatみたいなもん",
        isHoldable: true,
        isUsableInBattle: true,
        isPokeball: true
    },
    potion: {
        category: "Medicine",
        num: 1,
        name: "Potion",
        id: "potion",
        desc: "A spray-type medicine for treating wounds. It can be used to restore 20 HP to a Pokémon.",
        shortDesc: "Restores a Pokémon's HP by 20 points.",
        nhonDesc: "miracle drugs?",
        isUsable: true,
        isUsableInBattle: true,
        useOnPokemon: function (pokemon) {
            pokemon.stats.hp += 20;
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
        isHoldable: true,
        isUsable: true,
        isUsableInBattle: true
    },
    firestone: {
        category: "Items",
        num: 1,
        name: "Fire Stone",
        id: "firestone",
        desc: "A peculiar stone that can make certain species of Pokémon evolve. It has a fiery orange heart.",
        shortDesc: "Makes certain species of Pokémon evolve.",
        nhonDesc: "Pokemon version of MC flint",
        isHoldable: true,
        isUsable: true
        // onUse: () => {

        // }
    },
    waterstone: {
        category: "Items",
        num: 2,
        name: "Water Stone",
        id: "waterstone",
        desc: "A peculiar stone that can make certain species of Pokémon evolve. It is the clear blue of a deep pool.",
        shortDesc: "Makes certain species of Pokémon evolve.",
        nhonDesc: "Don't try drinking this",
        isHoldable: true,
        isUsable: true
    },
    thunderstone: {
        category: "Items",
        num: 3,
        name: "Thunder Stone",
        id: "thunderstone",
        desc: "A peculiar stone that can make certain species of Pokémon evolve. It has a distinct thunderbolt pattern.",
        shortDesc: "Makes certain species of Pokémon evolve.",
        nhonDesc: "Makeshift battery",
        isHoldable: true,
        isUsable: true
    }
}
export default Items;