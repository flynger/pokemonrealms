import Pokemon from "./pokemon";

var loot = {
    common: [
        {
            species: "CATERPIE",
            level: 1,
        },
        {
            species: "RATTATA",
            level: 1,
        },
        {
            species: "ZUBAT",
            level: 1,
        },
        {
            species: "MAGIKARP",
            level: 1,
        }
    ],
    uncommon: [
        {
            species: "PIDGEOTTO",
            level: 1,
        },
        {
            species: "RATICATE",
            level: 1,
        },
        {
            species: "MANKEY",
            level: 1,
        },
        {
            species: "GROWLITHE",
            level: 1,
        }

    ],
    rare: [
        {
            species: "PIKACHU",
            level: 1,
        },
        {
            species: "KADABRA",
            level: 1,
        },
        {
            species: "HAUNTER",
            level: 1,
        },
        {
            species: "VOLTORB",
            level: 1,
        }
    ],
    epic: [
        {
            species: "CHARIZARD",
            level: 1,
            shiny: randomNumber(1, 16) == 1
        },
        {
            species: "VAPOREON",
            level: 1,
            shiny: randomNumber(1, 16) == 1
        },
        {
            species: "GYARADOS",
            level: 1,
            shiny: randomNumber(1, 16) == 1
        },
        {
            species: "DRAGONITE",
            level: 1,
            shiny: randomNumber(1, 16) == 1
        }
    ],
    legendary: [
        {
            species: "MOLTRES",
            level: 1,
            shiny: randomNumber(1, 8) == 1
        },
        {
            species: "LUGIA",
            level: 1,
            shiny: randomNumber(1, 8) == 1
        },
        {
            species: "RAYQUAZA",
            level: 1,
            shiny: randomNumber(1, 8) == 1
        },
        {
            species: "ARCEUS",
            level: 1,
            shiny: randomNumber(1, 8) == 1
        }
    ],
    mythic: [
        {
            species: "MEW",
            level: 1,
            shiny: randomNumber(1, 4) == 1
        },
        {
            species: "MEWTWO",
            level: 1,
            shiny: randomNumber(1, 4) == 1
        }
    ]
}
var lootbox = {
    common: {
        chances: {
            common: 0.7,
            uncommon: 0.2039,
            rare: 0.08,
            epic: 0.015,
            legendary: 0.001,
            mythic: 0.0001
        }
    },
    uncommon: {
        chances: {
            common: 0.3,
            uncommon: 0.5,
            rare: 0.1805,
            epic: 0.015,
            legendary: 0.004,
            mythic: 0.0005
        }
    },
    rare: {
        chances: {
            common: 0.2,
            uncommon: 0.35,
            rare: 0.38,
            epic: 0.065,
            legendary: 0.004,
            mythic: 0.001
        }
    },
    epic: {
        chances: {
            common: 0.1,
            uncommon: 0.2,
            rare: 0.4,
            epic: 0.2,
            legendary: 0.075,
            mythic: 0.025
        }
    },
    legendary: {
        chances: {
            common: 0.1,
            uncommon: 0.1,
            rare: 0.15,
            epic: 0.45,
            legendary: 0.14,
            mythic: 0.06
        }
    },
    mythic: {
        chances: {
            common: 0.0,
            uncommon: 0.0,
            rare: 0.05,
            epic: 0.5,
            legendary: 0.3,
            mythic: 0.15
        }
    }
}
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}