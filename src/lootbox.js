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
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}