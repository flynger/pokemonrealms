// import Pokemon from "./pokemon.js";
Array.prototype.random = function () {
    return this[randomNumber(0, this.length - 1)];
}

// const loot = {
//     common: [
//         {
//             species: "CATERPIE",
//             level: 1,
//         },
//         {
//             species: "RATTATA",
//             level: 1,
//         },
//         {
//             species: "ZUBAT",
//             level: 1,
//         },
//         {
//             species: "MAGIKARP",
//             level: 1,
//         },
//         {
//             item: "pokeball",
//             quantity: [1, 3]
//         }
//     ],
//     uncommon: [
//         {
//             species: "PIDGEOTTO",
//             level: 1,
//         },
//         {
//             species: "RATICATE",
//             level: 1,
//         },
//         {
//             species: "MANKEY",
//             level: 1,
//         },
//         {
//             species: "GROWLITHE",
//             level: 1,
//         }

//     ],
//     rare: [
//         {
//             species: "PIKACHU",
//             level: 1,
//         },
//         {
//             species: "KADABRA",
//             level: 1,
//         },
//         {
//             species: "HAUNTER",
//             level: 1,
//         },
//         {
//             species: "VOLTORB",
//             level: 1,
//         }
//     ],
//     epic: [
//         {
//             species: "CHARIZARD",
//             level: 1,
//             shinyChance: 16
//         },
//         {
//             species: "VAPOREON",
//             level: 1,
//             shinyChance: 16
//         },
//         {
//             species: "GYARADOS",
//             level: 1,
//             shinyChance: 16
//         },
//         {
//             species: "DRAGONITE",
//             level: 1,
//             shinyChance: 16
//         }
//     ],
//     legendary: [
//         {
//             species: "MOLTRES",
//             level: 1,
//             shinyChance: 8
//         },
//         {
//             species: "LUGIA",
//             level: 1,
//             shinyChance: 8
//         },
//         {
//             species: "RAYQUAZA",
//             level: 1,
//             shinyChance: 8
//         },
//         {
//             species: "ARCEUS",
//             level: 1,
//             shinyChance: 8
//         }
//     ],
//     mythic: [
//         {
//             species: "MEW",
//             level: 1,
//             shinyChance: 4
//         },
//         {
//             species: "MEWTWO",
//             level: 1,
//             shinyChance: 4
//         }
//     ]
// }

const tmLoot = {
    common: [
        // Fire
        "Fire Spin",
        "Flame Charge",
        "Fire Fang",
        "Burning Jealousy",
        "Temper Flare", // sub 
        "Fire Punch",
        "Fire Pledge",
        "Sunny Day",

        "Flamethrower",
        "Heat Wave",
        "Fire Blast",
        "Flare Blitz",
        "Overheat",
        "Blast Burn",
        "Heat Crash",
        "Will-O-Wisp",

        // Others
        "Mud-Slap",
        "Scary Face",
        "Fake Tears",
        "Confuse Ray",
        "Disarming Voice",
        "Roar",
        "Struggle Bug",
        "Metal Claw",
        "Night Shade",
        "Sleep Talk",
        "Charge",
        "Haze",
        "Sand Tomb",
        "Gravity",
        "Psych Up",
        "Feather Dance",
        "Agility",
        "Acid Spray",
        "Trailblaze",
        "Pounce",
        "Charge Beam",
        "Poison Tail",
        "Draining Kiss"
    ],
    uncommon: [
        // Fire
        "Fire Fang",
        // Others
        "Swift",
        "Spite",
        "Low Kick",
        "Air Cutter",
        "False Swipe",
        "Metronome",
        "Thunder Wave",
        "Rest",
        "Helping Hand",
        "Thunder Fang",
        "Ice Fang",
        "Psybeam",
        "Aerial Ace",
        "Snarl",
        "Icy Wind",
        "Mud Shot",
    ],
    rare: [
        "Take Down",
        "Curse",
        "Protect"
    ]
}

// Common tms: Mud-Slap, Scary Face
// Uncommon tms: Agility
// Rare tms:
// Epic tms: Flamethrower
// Legendary tms:
// Mythic tms:

const lootbox = {
    common: {
        chances: {
            // common: ~0.64
            uncommon: 0.25,
            rare: 0.1,
            epic: 0.01,
            legendary: 0.001,
            mythic: 0.00005
        }
    },
    uncommon: {
        chances: {
            // common: ~0.379
            uncommon: 0.4,
            rare: 0.2,
            epic: 0.02,
            legendary: 0.001,
            mythic: 0.00005
        }
    },
    rare: {
        chances: {
            uncommon: 0.4979,
            rare: 0.4,
            epic: 0.1,
            legendary: 0.002,
            mythic: 0.0001
        }
    },
    epic: {
        chances: {
            rare: 0.64,
            epic: 0.25,
            legendary: 0.1,
            mythic: 0.01
        }
    },
    legendary: {
        chances: {
            epic: 0.6,
            legendary: 0.35,
            mythic: 0.05
        }
    },
    mythic: {
        chances: {
            legendary: 0.75,
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
            return tier; // return loot[tier].random();
        }
    }
    return "common"; // loot.common.random();
}

function openLootbox(rarity) {
    let loot = roll(rarity);
    let pokemon = new Pokemon(loot.species, loot.level);
    console.log(pokemon);
}
// openLootbox("mythic");

const rolls = 100000;
const results = {
    common: 0,
    uncommon: 0,
    rare: 0,
    epic: 0,
    legendary: 0,
    mythic: 0
};

for (const rarity in results) {
    const thisResult = results[rarity] = {
        common: 0,
        uncommon: 0,
        rare: 0,
        epic: 0,
        legendary: 0,
        mythic: 0
    };
    for (let i = 0; i < rolls; i++) {
        const result = roll(rarity);
        thisResult[result]++;
    }
    for (const rarity in thisResult) {
        if (thisResult[rarity] == 0) delete thisResult[rarity];
    }
}

console.log(results);