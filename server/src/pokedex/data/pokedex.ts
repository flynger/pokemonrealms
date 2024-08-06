const POKEDEX_DATA = {
    "Bulbasaur": {
        "dex": {
            "national": 1
        },
        "species": "Bulbasaur",
        "category": "Seed",
        "types": [
            "Grass",
            "Poison"
        ],
        "gender": {
            "M": 0.875,
            "F": 0.125
        },
        "baseStats": {
            "hp": 45,
            "atk": 49,
            "def": 49,
            "spa": 65,
            "spd": 65,
            "spe": 45
        },
        "abilities": {
            "0": "Overgrow",
            "H": "Chlorophyll"
        },
        "learnset": {
            "levelup": {
                1: ["Tackle", "Growl"],
                // 3: "Vine Whip",
                // 6: "Growth",
                // 9: "Leech Seed",
                // 12: "Razor Leaf"
            },
            "tm": [],
            "tutor": []
        },
        "evolutions": [
            {
                "species": "Bulbasaur",
                "level": 16
            },
        ],
        "desc": "Bulbasaur can be seen napping in bright sunlight. There is a seed on its back. By soaking up the sun's rays, the seed grows progressively larger.",
        "height": 0.7,
        "weight": 6.9,
        "eggCycles": 20,
        "eggMoves": [
            // "Amnesia",
            // "Charm",
            // "Curse",
            // "Endure",
            // "Giga Drain",
            // "Grass Whistle",
            // "Ingrain",
            // "Leaf Storm",
            // "Magical Leaf",
            // "Nature Power",
            // "Petal Dance",
            // "Power Whip",
            // "Skull Bash",
            // "Sludge"
        ],
        "eggGroups": [
            "Monster",
            "Grass"
        ],
        "evYield": {
            "spa": 1
        },
        "catchRate": 45,
        "baseExp": 64,
        "growthRate": "Medium Slow"
    },
    "Mareep": {
        "dex": {
            "national": 179
        },
        "species": "Mareep",
        "category": "Wool",
        "types": [
            "Electric"
        ],
        "baseStats": {
            "hp": 55,
            "atk": 40,
            "def": 40,
            "spa": 65,
            "spd": 45,
            "spe": 35
        },
        "abilities": {
            "0": "Static",
            "H": "Plus"
        },
        "learnset": {
            "levelup": {
                1: ["Tackle", "Growl"],
                // 4: "Thunder Wave",
                // 8: "Thunder Shock",
                // 11: "Cotton Spore"
            },
            "tm": [],
            "tutor": []
        },
        "evolutions": [],
        "desc": "",
        "height": 0.6,
        "weight": 7.8,
        "eggCycles": 20,
        "eggMoves": [],
        "eggGroups": [
            "Monster",
            "Field"
        ],
        "evYield": {
            "spa": 1
        },
        "catchRate": 235,
        "baseExp": 64,
        "growthRate": "Medium Slow"
    }
} as const;

export default POKEDEX_DATA;