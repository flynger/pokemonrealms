import { TMsByRarity } from "./tm.js";
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
    const lootTier = roll(rarity);
    const TM = TMsByRarity[lootTier].random();
    return TM;
    // console.log(`${TM.name} - ${TM.containsMove}`);
}

const lootboxTier = "epic";
const rolls = 10;
const results = {
    common: [],
    uncommon: [],
    rare: [],
    epic: [],
    legendary: [],
    mythic: []
};

for (let i = 0; i < rolls; i++) {
    const TM = openLootbox(lootboxTier);
    results[TM.rarity].push(`${TM.name} - ${TM.containsMove}`);
}

for (const rarity in results) {
    const drops = results[rarity];
    if (drops.length > 0) {
        console.log(`Received ${drops.length} ${rarity.toUpperCase()} drop${drops.length > 1 ? "s" : ""}`);
        console.log(drops.join("\n"));
        console.log();
    }
}