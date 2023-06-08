/*
Alex Ge, Arnav Singh, Richard Wei, Will Gannon, Harry Liu

This file implements lootbox functionality 
*/
import Pokemon from "./pokemon.js";
Array.prototype.random = function () {
    return this[randomNumber(0, this.length - 1)];
}

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
        },
        {
            item: "pokeball",
            quantity: [1, 3]
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
            shinyChance: 16
        },
        {
            species: "VAPOREON",
            level: 1,
            shinyChance: 16
        },
        {
            species: "GYARADOS",
            level: 1,
            shinyChance: 16
        },
        {
            species: "DRAGONITE",
            level: 1,
            shinyChance: 16
        }
    ],
    legendary: [
        {
            species: "MOLTRES",
            level: 1,
            shinyChance: 8
        },
        {
            species: "LUGIA",
            level: 1,
            shinyChance: 8
        },
        {
            species: "RAYQUAZA",
            level: 1,
            shinyChance: 8
        },
        {
            species: "ARCEUS",
            level: 1,
            shinyChance: 8
        }
    ],
    mythic: [
        {
            species: "MEW",
            level: 1,
            shinyChance: 4
        },
        {
            species: "MEWTWO",
            level: 1,
            shinyChance: 4
        }
    ]
}
var lootbox = {
    common: {
        chances: {
            uncommon: 0.125,
            rare: 0.025,
            epic: 0.001,
            legendary: 0.000075,
            mythic: 0.000005
        }
    },
    uncommon: {
        chances: {
            uncommon: 0.375,
            rare: 0.1,
            epic: 0.005,
            legendary: 0.000075,
            mythic: 0.000005
        }
    },
    rare: {
        chances: {
            uncommon: 0.5,
            rare: 0.25,
            epic: 0.025,
            legendary: 0.0001,
            mythic: 0.0000075
        }
    },
    epic: {
        chances: {
            uncommon: 0.25,
            rare: 0.4,
            epic: 0.125,
            legendary: 0.0005,
            mythic: 0.00005
        }
    },
    legendary: {
        chances: {
            rare: 0.20,
            epic: 0.55,
            legendary: 0.2,
            mythic: 0.05
        }
    },
    mythic: {
        chances: {
            epic: 0.35,
            legendary: 0.4,
            mythic: 0.25
        }
    }
}
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function roll(rarity) {
    let chances = lootbox[rarity].chances;
    let i = Math.random();
    let sum = 0;
    for (let tier in chances) {
        sum += chances[tier];
        if (i <= sum) {
            return loot[tier].random();
        }
    }
    return loot.common.random();
}
function openLootbox(rarity){
    let loot = roll(rarity);
    let pokemon = new Pokemon(loot.species, loot.level);
    console.log(pokemon);
}
openLootbox("mythic");