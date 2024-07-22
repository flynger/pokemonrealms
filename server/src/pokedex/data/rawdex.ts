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
                1: "Tackle"
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
            "Amnesia",
            "Charm",
            "Curse",
            "Endure",
            "Giga Drain",
            "Grass Whistle",
            "Ingrain",
            "Leaf Storm",
            "Magical Leaf",
            "Nature Power",
            "Petal Dance",
            "Power Whip",
            "Skull Bash",
            "Sludge"
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
} as const;

export default POKEDEX_DATA;