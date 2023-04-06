import { Stats, Type } from "./pokemon"
interface MoveEntry {
    id: string,
    num: number,
    accuracy: number|true
    basePower: number,
    category: "PHYSICAL"|"SPECIAL"|"STATUS",
    desc: string,
    name: string,
    pp: number,
    priority: number,
    flags: {
        authentic?: 1,
        bite?: 1,
        bullet?: 1,
        charge?: 1,
        contact?: 1,
        dance?: 1,
        defrost?: 1,
        distance?: 1,
        gravity?: 1,
        heal?: 1,
        mirror?: 1,
        mystery?: 1,
        nonsky?: 1,
        powder?: 1,
        protect?: 1,
        pulse?: 1,
        punch?: 1,
        recharge?: 1,
        reflectable?: 1,
        snatch?: 1,
        sound?: 1
    },
    target: "ANY"|"SELF"|"ADJACENTALLY"|"ADJACENTALLYORSELF"|"ALLYSIDE"|"ALLYTEAM"|"ALLADJACENT"|"NORMAL"|"ADJACENTFOE"|"ALLADJACENTFOES"|"FOESIDE"|"ALL"|"SCRIPTED"|"RANDOMNORMAL",
    type: Type,
    contestType: "COOL"|"CLEVER"|"TOUGH"|"BEAUTIFUL"|"CUTE",
    drain?: [number, number],
    isViable?: true,
    recoil?: number[],
    multihit?: number|[number, number],
    multiaccuracy?: true,
    breaksProtect?: true,
    ignoreEvasion?: true,
    sleepUsable?: true,
    zMovePower?: number,
    boosts?: Stats,
    selfSwitch?: boolean|"copyvolatile",
    sideCondition?: string,
    zMoveEffect?: string,
    status?: "slp"|"par"|"brn"|"tox"|"psn",
    zMoveBoost?: Stats,
    critRatio?: number,
    isZ?: string
}
export const Moves: {[moveId: string]: MoveEntry} = {
    "10000000VOLTTHUNDERBOLT": {
      "id": "10000000VOLTTHUNDERBOLT",
      "num": 719,
      "accuracy": true,
      "basePower": 195,
      "category": "SPECIAL",
      "desc": "Very high critical hit ratio.",
      "name": "10,000,000 Volt Thunderbolt",
      "pp": 1,
      "priority": 0,
      "flags": {},
      "target": "NORMAL",
      "type": "ELECTRIC",
      "contestType": "COOL",
      "critRatio": 3,
      "isZ": "pikashuniumz"
    },
    "ABSORB": {
      "id": "ABSORB",
      "num": 71,
      "accuracy": 100,
      "basePower": 20,
      "category": "SPECIAL",
      "desc": "User recovers 50% of the damage dealt.",
      "name": "Absorb",
      "pp": 25,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "heal": 1
      },
      "target": "NORMAL",
      "type": "GRASS",
      "contestType": "CLEVER",
      "drain": [
        1,
        2
      ],
      "zMovePower": 100
    },
    "ACCELEROCK": {
      "id": "ACCELEROCK",
      "num": 709,
      "accuracy": 100,
      "basePower": 40,
      "category": "PHYSICAL",
      "desc": "Usually goes first.",
      "name": "Accelerock",
      "pp": 20,
      "priority": 1,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "ROCK",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 100
    },
    "ACID": {
      "id": "ACID",
      "num": 51,
      "accuracy": 100,
      "basePower": 40,
      "category": "SPECIAL",
      "desc": "10% chance to lower the foe(s) Sp. Def by 1.",
      "name": "Acid",
      "pp": 30,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "POISON",
      "contestType": "CLEVER",
      "zMovePower": 100
    },
    "ACIDARMOR": {
      "id": "ACIDARMOR",
      "num": 151,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Raises the user's Defense by 2.",
      "name": "Acid Armor",
      "pp": 20,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "SELF",
      "type": "POISON",
      "contestType": "TOUGH",
      "boosts": {
        "def": 2
      },
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "ACIDDOWNPOUR": {
      "id": "ACIDDOWNPOUR",
      "num": 628,
      "accuracy": true,
      "basePower": 1,
      "category": "PHYSICAL",
      "desc": "Power is equal to the base move's Z-Power.",
      "name": "Acid Downpour",
      "pp": 1,
      "priority": 0,
      "flags": {},
      "target": "NORMAL",
      "type": "POISON",
      "contestType": "COOL",
      "isViable": true,
      "isZ": "poisoniumz"
    },
    "ACIDSPRAY": {
      "id": "ACIDSPRAY",
      "num": 491,
      "accuracy": 100,
      "basePower": 40,
      "category": "SPECIAL",
      "desc": "100% chance to lower the target's Sp. Def by 2.",
      "name": "Acid Spray",
      "pp": 20,
      "priority": 0,
      "flags": {
        "bullet": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "POISON",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 100
    },
    "ACROBATICS": {
      "id": "ACROBATICS",
      "num": 512,
      "accuracy": 100,
      "basePower": 55,
      "category": "PHYSICAL",
      "desc": "Power doubles if the user has no held item.",
      "name": "Acrobatics",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1,
        "distance": 1
      },
      "target": "ANY",
      "type": "FLYING",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 100
    },
    "ACUPRESSURE": {
      "id": "ACUPRESSURE",
      "num": 367,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Raises a random stat of the user or an ally by 2.",
      "name": "Acupressure",
      "pp": 30,
      "priority": 0,
      "flags": {},
      "target": "ADJACENTALLYORSELF",
      "type": "NORMAL",
      "contestType": "TOUGH",
      "zMoveEffect": "CRIT2"
    },
    "AERIALACE": {
      "id": "AERIALACE",
      "num": 332,
      "accuracy": true,
      "basePower": 60,
      "category": "PHYSICAL",
      "desc": "This move does not check accuracy.",
      "name": "Aerial Ace",
      "pp": 20,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1,
        "distance": 1
      },
      "target": "ANY",
      "type": "FLYING",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 120
    },
    "AEROBLAST": {
      "id": "AEROBLAST",
      "num": 177,
      "accuracy": 95,
      "basePower": 100,
      "category": "SPECIAL",
      "desc": "High critical hit ratio.",
      "name": "Aeroblast",
      "pp": 5,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "distance": 1
      },
      "target": "ANY",
      "type": "FLYING",
      "contestType": "COOL",
      "critRatio": 2,
      "isViable": true,
      "zMovePower": 180
    },
    "AFTERYOU": {
      "id": "AFTERYOU",
      "num": 495,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "The target makes its move right after the user.",
      "name": "After You",
      "pp": 15,
      "priority": 0,
      "flags": {
        "authentic": 1,
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CUTE",
      "zMoveBoost": {
        "spe": 1
      }
    },
    "AGILITY": {
      "id": "AGILITY",
      "num": 97,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Raises the user's Speed by 2.",
      "name": "Agility",
      "pp": 30,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "SELF",
      "type": "PSYCHIC",
      "contestType": "COOL",
      "isViable": true,
      "boosts": {
        "spe": 2
      },
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "AIRCUTTER": {
      "id": "AIRCUTTER",
      "num": 314,
      "accuracy": 95,
      "basePower": 60,
      "category": "SPECIAL",
      "desc": "High critical hit ratio. Hits adjacent foes.",
      "name": "Air Cutter",
      "pp": 25,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "FLYING",
      "contestType": "COOL",
      "critRatio": 2,
      "zMovePower": 120
    },
    "AIRSLASH": {
      "id": "AIRSLASH",
      "num": 403,
      "accuracy": 95,
      "basePower": 75,
      "category": "SPECIAL",
      "desc": "30% chance to flinch the target.",
      "name": "Air Slash",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "distance": 1
      },
      "target": "ANY",
      "type": "FLYING",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 140
    },
    "ALLOUTPUMMELING": {
      "id": "ALLOUTPUMMELING",
      "num": 624,
      "accuracy": true,
      "basePower": 1,
      "category": "PHYSICAL",
      "desc": "Power is equal to the base move's Z-Power.",
      "name": "All-Out Pummeling",
      "pp": 1,
      "priority": 0,
      "flags": {},
      "target": "NORMAL",
      "type": "FIGHTING",
      "contestType": "COOL",
      "isViable": true,
      "isZ": "fightiniumz"
    },
    "ALLYSWITCH": {
      "id": "ALLYSWITCH",
      "num": 502,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "The user swaps positions with its ally.",
      "name": "Ally Switch",
      "pp": 15,
      "priority": 2,
      "flags": {},
      "target": "SELF",
      "type": "PSYCHIC",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "spe": 2
      }
    },
    "AMNESIA": {
      "id": "AMNESIA",
      "num": 133,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Raises the user's Sp. Def by 2.",
      "name": "Amnesia",
      "pp": 20,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "SELF",
      "type": "PSYCHIC",
      "contestType": "CUTE",
      "boosts": {
        "spd": 2
      },
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "ANCHORSHOT": {
      "id": "ANCHORSHOT",
      "num": 677,
      "accuracy": 100,
      "basePower": 80,
      "category": "PHYSICAL",
      "desc": "Prevents the target from switching out.",
      "name": "Anchor Shot",
      "pp": 20,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "STEEL",
      "contestType": "TOUGH",
      "isViable": true,
      "zMovePower": 160
    },
    "ANCIENTPOWER": {
      "id": "ANCIENTPOWER",
      "num": 246,
      "accuracy": 100,
      "basePower": 60,
      "category": "SPECIAL",
      "desc": "10% chance to raise all stats by 1 (not acc/eva).",
      "name": "Ancient Power",
      "pp": 5,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "ROCK",
      "contestType": "TOUGH",
      "zMovePower": 120
    },
    "AQUAJET": {
      "id": "AQUAJET",
      "num": 453,
      "accuracy": 100,
      "basePower": 40,
      "category": "PHYSICAL",
      "desc": "Usually goes first.",
      "name": "Aqua Jet",
      "pp": 20,
      "priority": 1,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "WATER",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 100
    },
    "AQUARING": {
      "id": "AQUARING",
      "num": 392,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "User recovers 1/16 max HP per turn.",
      "name": "Aqua Ring",
      "pp": 20,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "SELF",
      "type": "WATER",
      "contestType": "BEAUTIFUL",
      "zMoveBoost": {
        "def": 1
      }
    },
    "AQUATAIL": {
      "id": "AQUATAIL",
      "num": 401,
      "accuracy": 90,
      "basePower": 90,
      "category": "PHYSICAL",
      "desc": "No additional effect.",
      "name": "Aqua Tail",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "WATER",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 175
    },
    "ARMTHRUST": {
      "id": "ARMTHRUST",
      "num": 292,
      "accuracy": 100,
      "basePower": 15,
      "category": "PHYSICAL",
      "desc": "Hits 2-5 times in one turn.",
      "name": "Arm Thrust",
      "pp": 20,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FIGHTING",
      "contestType": "TOUGH",
      "multihit": [
        2,
        5
      ],
      "zMovePower": 100
    },
    "AROMATHERAPY": {
      "id": "AROMATHERAPY",
      "num": 312,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Cures the user's party of all status conditions.",
      "name": "Aromatherapy",
      "pp": 5,
      "priority": 0,
      "flags": {
        "snatch": 1,
        "distance": 1
      },
      "target": "ALLYTEAM",
      "type": "GRASS",
      "contestType": "CLEVER",
      "isViable": true,
      "zMoveEffect": "HEAL"
    },
    "AROMATICMIST": {
      "id": "AROMATICMIST",
      "num": 597,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Raises an ally's Sp. Def by 1.",
      "name": "Aromatic Mist",
      "pp": 20,
      "priority": 0,
      "flags": {
        "authentic": 1
      },
      "target": "ADJACENTALLY",
      "type": "FAIRY",
      "contestType": "BEAUTIFUL",
      "boosts": {
        "spd": 1
      },
      "zMoveBoost": {
        "spd": 2
      }
    },
    "ASSIST": {
      "id": "ASSIST",
      "num": 274,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Uses a random move known by a team member.",
      "name": "Assist",
      "pp": 20,
      "priority": 0,
      "flags": {},
      "target": "SELF",
      "type": "NORMAL",
      "contestType": "CUTE"
    },
    "ASSURANCE": {
      "id": "ASSURANCE",
      "num": 372,
      "accuracy": 100,
      "basePower": 60,
      "category": "PHYSICAL",
      "desc": "Power doubles if target was damaged this turn.",
      "name": "Assurance",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "DARK",
      "contestType": "CLEVER",
      "zMovePower": 120
    },
    "ASTONISH": {
      "id": "ASTONISH",
      "num": 310,
      "accuracy": 100,
      "basePower": 30,
      "category": "PHYSICAL",
      "desc": "30% chance to flinch the target.",
      "name": "Astonish",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GHOST",
      "contestType": "CUTE",
      "zMovePower": 100
    },
    "ATTACKORDER": {
      "id": "ATTACKORDER",
      "num": 454,
      "accuracy": 100,
      "basePower": 90,
      "category": "PHYSICAL",
      "desc": "High critical hit ratio.",
      "name": "Attack Order",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "BUG",
      "contestType": "CLEVER",
      "critRatio": 2,
      "isViable": true,
      "zMovePower": 175
    },
    "ATTRACT": {
      "id": "ATTRACT",
      "num": 213,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "A target of the opposite gender gets infatuated.",
      "name": "Attract",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1,
        "authentic": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CUTE",
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "AURASPHERE": {
      "id": "AURASPHERE",
      "num": 396,
      "accuracy": true,
      "basePower": 80,
      "category": "SPECIAL",
      "desc": "This move does not check accuracy.",
      "name": "Aura Sphere",
      "pp": 20,
      "priority": 0,
      "flags": {
        "bullet": 1,
        "protect": 1,
        "pulse": 1,
        "mirror": 1,
        "distance": 1
      },
      "target": "ANY",
      "type": "FIGHTING",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 160
    },
    "AURORABEAM": {
      "id": "AURORABEAM",
      "num": 62,
      "accuracy": 100,
      "basePower": 65,
      "category": "SPECIAL",
      "desc": "10% chance to lower the foe's Attack by 1.",
      "name": "Aurora Beam",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "ICE",
      "contestType": "BEAUTIFUL",
      "zMovePower": 120
    },
    "AURORAVEIL": {
      "id": "AURORAVEIL",
      "num": 694,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "For 5 turns, damage to allies is halved. Hail only.",
      "name": "Aurora Veil",
      "pp": 20,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "ALLYSIDE",
      "type": "ICE",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "sideCondition": "auroraveil",
      "zMoveBoost": {
        "spe": 1
      }
    },
    "AUTOTOMIZE": {
      "id": "AUTOTOMIZE",
      "num": 475,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Raises the user's Speed by 2; user loses 100 kg.",
      "name": "Autotomize",
      "pp": 15,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "SELF",
      "type": "STEEL",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "boosts": {
        "spe": 2
      },
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "AVALANCHE": {
      "id": "AVALANCHE",
      "num": 419,
      "accuracy": 100,
      "basePower": 60,
      "category": "PHYSICAL",
      "desc": "Power doubles if user is damaged by the target.",
      "name": "Avalanche",
      "pp": 10,
      "priority": -4,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "ICE",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 120
    },
    "BABYDOLLEYES": {
      "id": "BABYDOLLEYES",
      "num": 608,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Lowers the target's Attack by 1.",
      "name": "Baby-Doll Eyes",
      "pp": 30,
      "priority": 1,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1,
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "FAIRY",
      "contestType": "CUTE",
      "boosts": {
        "atk": -1
      },
      "zMoveBoost": {
        "def": 1
      }
    },
    "BANEFULBUNKER": {
      "id": "BANEFULBUNKER",
      "num": 661,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Protects from moves. Contact: poison.",
      "name": "Baneful Bunker",
      "pp": 10,
      "priority": 4,
      "flags": {},
      "target": "SELF",
      "type": "POISON",
      "contestType": "TOUGH",
      "isViable": true,
      "zMoveBoost": {
        "def": 1
      }
    },
    "BARRAGE": {
      "id": "BARRAGE",
      "num": 140,
      "accuracy": 85,
      "basePower": 15,
      "category": "PHYSICAL",
      "desc": "Hits 2-5 times in one turn.",
      "name": "Barrage",
      "pp": 20,
      "priority": 0,
      "flags": {
        "bullet": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CUTE",
      "multihit": [
        2,
        5
      ],
      "zMovePower": 100
    },
    "BARRIER": {
      "id": "BARRIER",
      "num": 112,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Raises the user's Defense by 2.",
      "name": "Barrier",
      "pp": 20,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "SELF",
      "type": "PSYCHIC",
      "contestType": "COOL",
      "boosts": {
        "def": 2
      },
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "BATONPASS": {
      "id": "BATONPASS",
      "num": 226,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "User switches, passing stat changes and more.",
      "name": "Baton Pass",
      "pp": 40,
      "priority": 0,
      "flags": {},
      "target": "SELF",
      "type": "NORMAL",
      "contestType": "CUTE",
      "isViable": true,
      "selfSwitch": "copyvolatile",
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "BEAKBLAST": {
      "id": "BEAKBLAST",
      "num": 690,
      "accuracy": 100,
      "basePower": 100,
      "category": "PHYSICAL",
      "desc": "Burns on contact with the user before it moves.",
      "name": "Beak Blast",
      "pp": 15,
      "priority": -3,
      "flags": {
        "bullet": 1,
        "protect": 1
      },
      "target": "NORMAL",
      "type": "FLYING",
      "contestType": "TOUGH",
      "isViable": true,
      "zMovePower": 180
    },
    "BEATUP": {
      "id": "BEATUP",
      "num": 251,
      "accuracy": 100,
      "basePower": 0,
      "category": "PHYSICAL",
      "desc": "All healthy allies aid in damaging the target.",
      "name": "Beat Up",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "DARK",
      "contestType": "CLEVER",
      "zMovePower": 100
    },
    "BELCH": {
      "id": "BELCH",
      "num": 562,
      "accuracy": 90,
      "basePower": 120,
      "category": "SPECIAL",
      "desc": "Cannot be selected until the user eats a Berry.",
      "name": "Belch",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1
      },
      "target": "NORMAL",
      "type": "POISON",
      "contestType": "TOUGH",
      "zMovePower": 190
    },
    "BELLYDRUM": {
      "id": "BELLYDRUM",
      "num": 187,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "User loses 50% max HP. Maximizes Attack.",
      "name": "Belly Drum",
      "pp": 10,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "SELF",
      "type": "NORMAL",
      "contestType": "CUTE",
      "zMoveEffect": "HEAL"
    },
    "BESTOW": {
      "id": "BESTOW",
      "num": 516,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "User passes its held item to the target.",
      "name": "Bestow",
      "pp": 15,
      "priority": 0,
      "flags": {
        "mirror": 1,
        "authentic": 1,
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CUTE",
      "zMoveBoost": {
        "spe": 2
      }
    },
    "BIDE": {
      "id": "BIDE",
      "num": 117,
      "accuracy": true,
      "basePower": 0,
      "category": "PHYSICAL",
      "desc": "Waits 2 turns; deals double the damage taken.",
      "name": "Bide",
      "pp": 10,
      "priority": 1,
      "flags": {
        "contact": 1,
        "protect": 1
      },
      "target": "SELF",
      "type": "NORMAL",
      "contestType": "TOUGH",
      "zMovePower": 100
    },
    "BIND": {
      "id": "BIND",
      "num": 20,
      "accuracy": 85,
      "basePower": 15,
      "category": "PHYSICAL",
      "desc": "Traps and damages the target for 4-5 turns.",
      "name": "Bind",
      "pp": 20,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "TOUGH",
      "zMovePower": 100
    },
    "BITE": {
      "id": "BITE",
      "num": 44,
      "accuracy": 100,
      "basePower": 60,
      "category": "PHYSICAL",
      "desc": "30% chance to flinch the target.",
      "name": "Bite",
      "pp": 25,
      "priority": 0,
      "flags": {
        "bite": 1,
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "DARK",
      "contestType": "TOUGH",
      "zMovePower": 120
    },
    "BLACKHOLEECLIPSE": {
      "id": "BLACKHOLEECLIPSE",
      "num": 654,
      "accuracy": true,
      "basePower": 1,
      "category": "PHYSICAL",
      "desc": "Power is equal to the base move's Z-Power.",
      "name": "Black Hole Eclipse",
      "pp": 1,
      "priority": 0,
      "flags": {},
      "target": "NORMAL",
      "type": "DARK",
      "contestType": "COOL",
      "isViable": true,
      "isZ": "darkiniumz"
    },
    "BLASTBURN": {
      "id": "BLASTBURN",
      "num": 307,
      "accuracy": 90,
      "basePower": 150,
      "category": "SPECIAL",
      "desc": "User cannot move next turn.",
      "name": "Blast Burn",
      "pp": 5,
      "priority": 0,
      "flags": {
        "recharge": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FIRE",
      "contestType": "BEAUTIFUL",
      "zMovePower": 200
    },
    "BLAZEKICK": {
      "id": "BLAZEKICK",
      "num": 299,
      "accuracy": 90,
      "basePower": 85,
      "category": "PHYSICAL",
      "desc": "High critical hit ratio. 10% chance to burn.",
      "name": "Blaze Kick",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FIRE",
      "contestType": "COOL",
      "critRatio": 2,
      "isViable": true,
      "zMovePower": 160
    },
    "BLIZZARD": {
      "id": "BLIZZARD",
      "num": 59,
      "accuracy": 70,
      "basePower": 110,
      "category": "SPECIAL",
      "desc": "10% chance to freeze foe(s). Can't miss in hail.",
      "name": "Blizzard",
      "pp": 5,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "ICE",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 185
    },
    "BLOCK": {
      "id": "BLOCK",
      "num": 335,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "The target cannot switch out.",
      "name": "Block",
      "pp": 5,
      "priority": 0,
      "flags": {
        "reflectable": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CUTE",
      "zMoveBoost": {
        "def": 1
      }
    },
    "BLOOMDOOM": {
      "id": "BLOOMDOOM",
      "num": 644,
      "accuracy": true,
      "basePower": 1,
      "category": "PHYSICAL",
      "desc": "Power is equal to the base move's Z-Power.",
      "name": "Bloom Doom",
      "pp": 1,
      "priority": 0,
      "flags": {},
      "target": "NORMAL",
      "type": "GRASS",
      "contestType": "COOL",
      "isViable": true,
      "isZ": "grassiumz"
    },
    "BLUEFLARE": {
      "id": "BLUEFLARE",
      "num": 551,
      "accuracy": 85,
      "basePower": 130,
      "category": "SPECIAL",
      "desc": "20% chance to burn the target.",
      "name": "Blue Flare",
      "pp": 5,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FIRE",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 195
    },
    "BODYSLAM": {
      "id": "BODYSLAM",
      "num": 34,
      "accuracy": 100,
      "basePower": 85,
      "category": "PHYSICAL",
      "desc": "30% chance to paralyze the target.",
      "name": "Body Slam",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1,
        "nonsky": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "TOUGH",
      "isViable": true,
      "zMovePower": 160
    },
    "BOLTSTRIKE": {
      "id": "BOLTSTRIKE",
      "num": 550,
      "accuracy": 85,
      "basePower": 130,
      "category": "PHYSICAL",
      "desc": "20% chance to paralyze the target.",
      "name": "Bolt Strike",
      "pp": 5,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "ELECTRIC",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 195
    },
    "BONECLUB": {
      "id": "BONECLUB",
      "num": 125,
      "accuracy": 85,
      "basePower": 65,
      "category": "PHYSICAL",
      "desc": "10% chance to flinch the target.",
      "name": "Bone Club",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GROUND",
      "contestType": "TOUGH",
      "zMovePower": 120
    },
    "BONERUSH": {
      "id": "BONERUSH",
      "num": 198,
      "accuracy": 90,
      "basePower": 25,
      "category": "PHYSICAL",
      "desc": "Hits 2-5 times in one turn.",
      "name": "Bone Rush",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GROUND",
      "contestType": "TOUGH",
      "multihit": [
        2,
        5
      ],
      "zMovePower": 140
    },
    "BONEMERANG": {
      "id": "BONEMERANG",
      "num": 155,
      "accuracy": 90,
      "basePower": 50,
      "category": "PHYSICAL",
      "desc": "Hits 2 times in one turn.",
      "name": "Bonemerang",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GROUND",
      "contestType": "TOUGH",
      "isViable": true,
      "multihit": 2,
      "zMovePower": 100
    },
    "BOOMBURST": {
      "id": "BOOMBURST",
      "num": 586,
      "accuracy": 100,
      "basePower": 140,
      "category": "SPECIAL",
      "desc": "No additional effect. Hits adjacent Pokemon.",
      "name": "Boomburst",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "sound": 1,
        "authentic": 1
      },
      "target": "ALLADJACENT",
      "type": "NORMAL",
      "contestType": "TOUGH",
      "isViable": true,
      "zMovePower": 200
    },
    "BOUNCE": {
      "id": "BOUNCE",
      "num": 340,
      "accuracy": 85,
      "basePower": 85,
      "category": "PHYSICAL",
      "desc": "Bounces turn 1. Hits turn 2. 30% paralyze.",
      "name": "Bounce",
      "pp": 5,
      "priority": 0,
      "flags": {
        "contact": 1,
        "charge": 1,
        "protect": 1,
        "mirror": 1,
        "gravity": 1,
        "distance": 1
      },
      "target": "ANY",
      "type": "FLYING",
      "contestType": "CUTE",
      "zMovePower": 160
    },
    "BRAVEBIRD": {
      "id": "BRAVEBIRD",
      "num": 413,
      "accuracy": 100,
      "basePower": 120,
      "category": "PHYSICAL",
      "desc": "Has 33% recoil.",
      "name": "Brave Bird",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1,
        "distance": 1
      },
      "target": "ANY",
      "type": "FLYING",
      "contestType": "COOL",
      "isViable": true,
      "recoil": [
        33,
        100
      ],
      "zMovePower": 190
    },
    "BREAKNECKBLITZ": {
      "id": "BREAKNECKBLITZ",
      "num": 622,
      "accuracy": true,
      "basePower": 1,
      "category": "PHYSICAL",
      "desc": "Power is equal to the base move's Z-Power.",
      "name": "Breakneck Blitz",
      "pp": 1,
      "priority": 0,
      "flags": {},
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "COOL",
      "isViable": true,
      "isZ": "normaliumz"
    },
    "BRICKBREAK": {
      "id": "BRICKBREAK",
      "num": 280,
      "accuracy": 100,
      "basePower": 75,
      "category": "PHYSICAL",
      "desc": "Destroys screens, unless the target is immune.",
      "name": "Brick Break",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FIGHTING",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 140
    },
    "BRINE": {
      "id": "BRINE",
      "num": 362,
      "accuracy": 100,
      "basePower": 65,
      "category": "SPECIAL",
      "desc": "Power doubles if the target's HP is 50% or less.",
      "name": "Brine",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "WATER",
      "contestType": "TOUGH",
      "zMovePower": 120
    },
    "BRUTALSWING": {
      "id": "BRUTALSWING",
      "num": 693,
      "accuracy": 100,
      "basePower": 60,
      "category": "PHYSICAL",
      "desc": "No additional effect. Hits adjacent Pokemon.",
      "name": "Brutal Swing",
      "pp": 20,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "ALLADJACENT",
      "type": "DARK",
      "contestType": "TOUGH",
      "zMovePower": 120
    },
    "BUBBLE": {
      "id": "BUBBLE",
      "num": 145,
      "accuracy": 100,
      "basePower": 40,
      "category": "SPECIAL",
      "desc": "10% chance to lower the foe(s) Speed by 1.",
      "name": "Bubble",
      "pp": 30,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "WATER",
      "contestType": "CUTE",
      "zMovePower": 100
    },
    "BUBBLEBEAM": {
      "id": "BUBBLEBEAM",
      "num": 61,
      "accuracy": 100,
      "basePower": 65,
      "category": "SPECIAL",
      "desc": "10% chance to lower the target's Speed by 1.",
      "name": "Bubble Beam",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "WATER",
      "contestType": "BEAUTIFUL",
      "zMovePower": 120
    },
    "BUGBITE": {
      "id": "BUGBITE",
      "num": 450,
      "accuracy": 100,
      "basePower": 60,
      "category": "PHYSICAL",
      "desc": "User steals and eats the target's Berry.",
      "name": "Bug Bite",
      "pp": 20,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "BUG",
      "contestType": "CUTE",
      "zMovePower": 120
    },
    "BUGBUZZ": {
      "id": "BUGBUZZ",
      "num": 405,
      "accuracy": 100,
      "basePower": 90,
      "category": "SPECIAL",
      "desc": "10% chance to lower the target's Sp. Def by 1.",
      "name": "Bug Buzz",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "sound": 1,
        "authentic": 1
      },
      "target": "NORMAL",
      "type": "BUG",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 175
    },
    "BULKUP": {
      "id": "BULKUP",
      "num": 339,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Raises the user's Attack and Defense by 1.",
      "name": "Bulk Up",
      "pp": 20,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "SELF",
      "type": "FIGHTING",
      "contestType": "COOL",
      "isViable": true,
      "boosts": {
        "atk": 1,
        "def": 1
      },
      "zMoveBoost": {
        "atk": 1
      }
    },
    "BULLDOZE": {
      "id": "BULLDOZE",
      "num": 523,
      "accuracy": 100,
      "basePower": 60,
      "category": "PHYSICAL",
      "desc": "100% chance to lower adjacent Pkmn Speed by 1.",
      "name": "Bulldoze",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "nonsky": 1
      },
      "target": "ALLADJACENT",
      "type": "GROUND",
      "contestType": "TOUGH",
      "zMovePower": 120
    },
    "BULLETPUNCH": {
      "id": "BULLETPUNCH",
      "num": 418,
      "accuracy": 100,
      "basePower": 40,
      "category": "PHYSICAL",
      "desc": "Usually goes first.",
      "name": "Bullet Punch",
      "pp": 30,
      "priority": 1,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1,
        "punch": 1
      },
      "target": "NORMAL",
      "type": "STEEL",
      "contestType": "TOUGH",
      "isViable": true,
      "zMovePower": 100
    },
    "BULLETSEED": {
      "id": "BULLETSEED",
      "num": 331,
      "accuracy": 100,
      "basePower": 25,
      "category": "PHYSICAL",
      "desc": "Hits 2-5 times in one turn.",
      "name": "Bullet Seed",
      "pp": 30,
      "priority": 0,
      "flags": {
        "bullet": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GRASS",
      "contestType": "COOL",
      "isViable": true,
      "multihit": [
        2,
        5
      ],
      "zMovePower": 140
    },
    "BURNUP": {
      "id": "BURNUP",
      "num": 682,
      "accuracy": 100,
      "basePower": 130,
      "category": "SPECIAL",
      "desc": "User's Fire type becomes typeless; must be Fire.",
      "name": "Burn Up",
      "pp": 5,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "defrost": 1
      },
      "target": "NORMAL",
      "type": "FIRE",
      "contestType": "CLEVER",
      "zMovePower": 195
    },
    "CALMMIND": {
      "id": "CALMMIND",
      "num": 347,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Raises the user's Sp. Atk and Sp. Def by 1.",
      "name": "Calm Mind",
      "pp": 20,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "SELF",
      "type": "PSYCHIC",
      "contestType": "CLEVER",
      "isViable": true,
      "boosts": {
        "spa": 1,
        "spd": 1
      },
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "CAMOUFLAGE": {
      "id": "CAMOUFLAGE",
      "num": 293,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Changes user's type by terrain (default Normal).",
      "name": "Camouflage",
      "pp": 20,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "SELF",
      "type": "NORMAL",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "evasion": 1
      }
    },
    "CAPTIVATE": {
      "id": "CAPTIVATE",
      "num": 445,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Lowers the foe(s) Sp. Atk by 2 if opposite gender.",
      "name": "Captivate",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "NORMAL",
      "contestType": "CUTE",
      "boosts": {
        "spa": -2
      },
      "zMoveBoost": {
        "spd": 2
      }
    },
    "CATASTROPIKA": {
      "id": "CATASTROPIKA",
      "num": 658,
      "accuracy": true,
      "basePower": 210,
      "category": "PHYSICAL",
      "desc": "No additional effect.",
      "name": "Catastropika",
      "pp": 1,
      "priority": 0,
      "flags": {
        "contact": 1
      },
      "target": "NORMAL",
      "type": "ELECTRIC",
      "contestType": "COOL",
      "isZ": "pikaniumz"
    },
    "CELEBRATE": {
      "id": "CELEBRATE",
      "num": 606,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "No competitive use. Or any use.",
      "name": "Celebrate",
      "pp": 40,
      "priority": 0,
      "flags": {},
      "target": "SELF",
      "type": "NORMAL",
      "contestType": "CUTE",
      "zMoveBoost": {
        "atk": 1,
        "def": 1,
        "spa": 1,
        "spd": 1,
        "spe": 1
      }
    },
    "CHARGE": {
      "id": "CHARGE",
      "num": 268,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Boosts next Electric move and user's Sp. Def by 1.",
      "name": "Charge",
      "pp": 20,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "SELF",
      "type": "ELECTRIC",
      "contestType": "CLEVER",
      "boosts": {
        "spd": 1
      },
      "zMoveBoost": {
        "spd": 1
      }
    },
    "CHARGEBEAM": {
      "id": "CHARGEBEAM",
      "num": 451,
      "accuracy": 90,
      "basePower": 50,
      "category": "SPECIAL",
      "desc": "70% chance to raise the user's Sp. Atk by 1.",
      "name": "Charge Beam",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "ELECTRIC",
      "contestType": "BEAUTIFUL",
      "zMovePower": 100
    },
    "CHARM": {
      "id": "CHARM",
      "num": 204,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Lowers the target's Attack by 2.",
      "name": "Charm",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1,
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "FAIRY",
      "contestType": "CUTE",
      "boosts": {
        "atk": -2
      },
      "zMoveBoost": {
        "def": 1
      }
    },
    "CHATTER": {
      "id": "CHATTER",
      "num": 448,
      "accuracy": 100,
      "basePower": 65,
      "category": "SPECIAL",
      "desc": "100% chance to confuse the target.",
      "name": "Chatter",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "sound": 1,
        "distance": 1,
        "authentic": 1
      },
      "target": "ANY",
      "type": "FLYING",
      "contestType": "CUTE",
      "isViable": true,
      "zMovePower": 120
    },
    "CHIPAWAY": {
      "id": "CHIPAWAY",
      "num": 498,
      "accuracy": 100,
      "basePower": 70,
      "category": "PHYSICAL",
      "desc": "Ignores the target's stat stage changes.",
      "name": "Chip Away",
      "pp": 20,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "TOUGH",
      "ignoreEvasion": true,
      "zMovePower": 140
    },
    "CIRCLETHROW": {
      "id": "CIRCLETHROW",
      "num": 509,
      "accuracy": 90,
      "basePower": 60,
      "category": "PHYSICAL",
      "desc": "Forces the target to switch to a random ally.",
      "name": "Circle Throw",
      "pp": 10,
      "priority": -6,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FIGHTING",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 120
    },
    "CLAMP": {
      "id": "CLAMP",
      "num": 128,
      "accuracy": 85,
      "basePower": 35,
      "category": "PHYSICAL",
      "desc": "Traps and damages the target for 4-5 turns.",
      "name": "Clamp",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "WATER",
      "contestType": "TOUGH",
      "zMovePower": 100
    },
    "CLANGINGSCALES": {
      "id": "CLANGINGSCALES",
      "num": 691,
      "accuracy": 100,
      "basePower": 110,
      "category": "SPECIAL",
      "desc": "Lowers the user's Defense by 1.",
      "name": "Clanging Scales",
      "pp": 5,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "sound": 1,
        "authentic": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "DRAGON",
      "contestType": "TOUGH",
      "isViable": true,
      "zMovePower": 185
    },
    "CLANGOROUSSOULBLAZE": {
      "id": "CLANGOROUSSOULBLAZE",
      "num": 728,
      "accuracy": true,
      "basePower": 185,
      "category": "SPECIAL",
      "desc": "Raises the user's Atk/Def/SpAtk/SpDef/Spe by 1.",
      "name": "Clangorous Soulblaze",
      "pp": 1,
      "priority": 0,
      "flags": {
        "sound": 1,
        "authentic": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "DRAGON",
      "contestType": "COOL",
      "isZ": "kommoniumz"
    },
    "CLEARSMOG": {
      "id": "CLEARSMOG",
      "num": 499,
      "accuracy": true,
      "basePower": 50,
      "category": "SPECIAL",
      "desc": "Eliminates the target's stat changes.",
      "name": "Clear Smog",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "POISON",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 100
    },
    "CLOSECOMBAT": {
      "id": "CLOSECOMBAT",
      "num": 370,
      "accuracy": 100,
      "basePower": 120,
      "category": "PHYSICAL",
      "desc": "Lowers the user's Defense and Sp. Def by 1.",
      "name": "Close Combat",
      "pp": 5,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FIGHTING",
      "contestType": "TOUGH",
      "isViable": true,
      "zMovePower": 190
    },
    "COIL": {
      "id": "COIL",
      "num": 489,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Raises user's Attack, Defense, and accuracy by 1.",
      "name": "Coil",
      "pp": 20,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "SELF",
      "type": "POISON",
      "contestType": "TOUGH",
      "isViable": true,
      "boosts": {
        "atk": 1,
        "def": 1,
        "accuracy": 1
      },
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "COMETPUNCH": {
      "id": "COMETPUNCH",
      "num": 4,
      "accuracy": 85,
      "basePower": 18,
      "category": "PHYSICAL",
      "desc": "Hits 2-5 times in one turn.",
      "name": "Comet Punch",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1,
        "punch": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "TOUGH",
      "multihit": [
        2,
        5
      ],
      "zMovePower": 100
    },
    "CONFIDE": {
      "id": "CONFIDE",
      "num": 590,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Lowers the target's Sp. Atk by 1.",
      "name": "Confide",
      "pp": 20,
      "priority": 0,
      "flags": {
        "reflectable": 1,
        "mirror": 1,
        "sound": 1,
        "authentic": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CUTE",
      "boosts": {
        "spa": -1
      },
      "zMoveBoost": {
        "spd": 1
      }
    },
    "CONFUSERAY": {
      "id": "CONFUSERAY",
      "num": 109,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Confuses the target.",
      "name": "Confuse Ray",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GHOST",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "spa": 1
      }
    },
    "CONFUSION": {
      "id": "CONFUSION",
      "num": 93,
      "accuracy": 100,
      "basePower": 50,
      "category": "SPECIAL",
      "desc": "10% chance to confuse the target.",
      "name": "Confusion",
      "pp": 25,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "PSYCHIC",
      "contestType": "CLEVER",
      "zMovePower": 100
    },
    "CONSTRICT": {
      "id": "CONSTRICT",
      "num": 132,
      "accuracy": 100,
      "basePower": 10,
      "category": "PHYSICAL",
      "desc": "10% chance to lower the target's Speed by 1.",
      "name": "Constrict",
      "pp": 35,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "TOUGH",
      "zMovePower": 100
    },
    "CONTINENTALCRUSH": {
      "id": "CONTINENTALCRUSH",
      "num": 632,
      "accuracy": true,
      "basePower": 1,
      "category": "PHYSICAL",
      "desc": "Power is equal to the base move's Z-Power.",
      "name": "Continental Crush",
      "pp": 1,
      "priority": 0,
      "flags": {},
      "target": "NORMAL",
      "type": "ROCK",
      "contestType": "COOL",
      "isViable": true,
      "isZ": "rockiumz"
    },
    "CONVERSION": {
      "id": "CONVERSION",
      "num": 160,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Changes user's type to match its first move.",
      "name": "Conversion",
      "pp": 30,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "SELF",
      "type": "NORMAL",
      "contestType": "BEAUTIFUL",
      "zMoveBoost": {
        "atk": 1,
        "def": 1,
        "spa": 1,
        "spd": 1,
        "spe": 1
      }
    },
    "CONVERSION2": {
      "id": "CONVERSION2",
      "num": 176,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Changes user's type to resist target's last move.",
      "name": "Conversion 2",
      "pp": 30,
      "priority": 0,
      "flags": {
        "authentic": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "BEAUTIFUL",
      "zMoveEffect": "HEAL"
    },
    "COPYCAT": {
      "id": "COPYCAT",
      "num": 383,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Uses the last move used in the battle.",
      "name": "Copycat",
      "pp": 20,
      "priority": 0,
      "flags": {},
      "target": "SELF",
      "type": "NORMAL",
      "contestType": "CUTE",
      "zMoveBoost": {
        "accuracy": 1
      }
    },
    "COREENFORCER": {
      "id": "COREENFORCER",
      "num": 687,
      "accuracy": 100,
      "basePower": 100,
      "category": "SPECIAL",
      "desc": "Nullifies the foe(s) Ability if the target moves first.",
      "name": "Core Enforcer",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "DRAGON",
      "contestType": "TOUGH",
      "isViable": true,
      "zMovePower": 140
    },
    "CORKSCREWCRASH": {
      "id": "CORKSCREWCRASH",
      "num": 638,
      "accuracy": true,
      "basePower": 1,
      "category": "PHYSICAL",
      "desc": "Power is equal to the base move's Z-Power.",
      "name": "Corkscrew Crash",
      "pp": 1,
      "priority": 0,
      "flags": {},
      "target": "NORMAL",
      "type": "STEEL",
      "contestType": "COOL",
      "isViable": true,
      "isZ": "steeliumz"
    },
    "COSMICPOWER": {
      "id": "COSMICPOWER",
      "num": 322,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Raises the user's Defense and Sp. Def by 1.",
      "name": "Cosmic Power",
      "pp": 20,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "SELF",
      "type": "PSYCHIC",
      "contestType": "BEAUTIFUL",
      "boosts": {
        "def": 1,
        "spd": 1
      },
      "zMoveBoost": {
        "spd": 1
      }
    },
    "COTTONGUARD": {
      "id": "COTTONGUARD",
      "num": 538,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Raises the user's Defense by 3.",
      "name": "Cotton Guard",
      "pp": 10,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "SELF",
      "type": "GRASS",
      "contestType": "CUTE",
      "isViable": true,
      "boosts": {
        "def": 3
      },
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "COTTONSPORE": {
      "id": "COTTONSPORE",
      "num": 178,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Lowers the target's Speed by 2.",
      "name": "Cotton Spore",
      "pp": 40,
      "priority": 0,
      "flags": {
        "powder": 1,
        "protect": 1,
        "reflectable": 1,
        "mirror": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "GRASS",
      "contestType": "BEAUTIFUL",
      "boosts": {
        "spe": -2
      },
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "COUNTER": {
      "id": "COUNTER",
      "num": 68,
      "accuracy": 100,
      "basePower": 0,
      "category": "PHYSICAL",
      "desc": "If hit by physical attack, returns double damage.",
      "name": "Counter",
      "pp": 20,
      "priority": -5,
      "flags": {
        "contact": 1,
        "protect": 1
      },
      "target": "SCRIPTED",
      "type": "FIGHTING",
      "contestType": "TOUGH",
      "zMovePower": 100
    },
    "COVET": {
      "id": "COVET",
      "num": 343,
      "accuracy": 100,
      "basePower": 60,
      "category": "PHYSICAL",
      "desc": "If the user has no item, it steals the target's.",
      "name": "Covet",
      "pp": 25,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CUTE",
      "zMovePower": 120
    },
    "CRABHAMMER": {
      "id": "CRABHAMMER",
      "num": 152,
      "accuracy": 90,
      "basePower": 100,
      "category": "PHYSICAL",
      "desc": "High critical hit ratio.",
      "name": "Crabhammer",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "WATER",
      "contestType": "TOUGH",
      "critRatio": 2,
      "isViable": true,
      "zMovePower": 180
    },
    "CRAFTYSHIELD": {
      "id": "CRAFTYSHIELD",
      "num": 578,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Protects allies from Status moves this turn.",
      "name": "Crafty Shield",
      "pp": 10,
      "priority": 3,
      "flags": {},
      "target": "ALLYSIDE",
      "type": "FAIRY",
      "contestType": "CLEVER",
      "sideCondition": "craftyshield",
      "zMoveBoost": {
        "spd": 1
      }
    },
    "CROSSCHOP": {
      "id": "CROSSCHOP",
      "num": 238,
      "accuracy": 80,
      "basePower": 100,
      "category": "PHYSICAL",
      "desc": "High critical hit ratio.",
      "name": "Cross Chop",
      "pp": 5,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FIGHTING",
      "contestType": "COOL",
      "critRatio": 2,
      "isViable": true,
      "zMovePower": 180
    },
    "CROSSPOISON": {
      "id": "CROSSPOISON",
      "num": 440,
      "accuracy": 100,
      "basePower": 70,
      "category": "PHYSICAL",
      "desc": "High critical hit ratio. 10% chance to poison.",
      "name": "Cross Poison",
      "pp": 20,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "POISON",
      "contestType": "COOL",
      "critRatio": 2,
      "zMovePower": 140
    },
    "CRUNCH": {
      "id": "CRUNCH",
      "num": 242,
      "accuracy": 100,
      "basePower": 80,
      "category": "PHYSICAL",
      "desc": "20% chance to lower the target's Defense by 1.",
      "name": "Crunch",
      "pp": 15,
      "priority": 0,
      "flags": {
        "bite": 1,
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "DARK",
      "contestType": "TOUGH",
      "isViable": true,
      "zMovePower": 160
    },
    "CRUSHCLAW": {
      "id": "CRUSHCLAW",
      "num": 306,
      "accuracy": 95,
      "basePower": 75,
      "category": "PHYSICAL",
      "desc": "50% chance to lower the target's Defense by 1.",
      "name": "Crush Claw",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "COOL",
      "zMovePower": 140
    },
    "CRUSHGRIP": {
      "id": "CRUSHGRIP",
      "num": 462,
      "accuracy": 100,
      "basePower": 0,
      "category": "PHYSICAL",
      "desc": "More power the more HP the target has left.",
      "name": "Crush Grip",
      "pp": 5,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "TOUGH",
      "zMovePower": 190
    },
    "CURSE": {
      "id": "CURSE",
      "num": 174,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Curses if Ghost, else +1 Atk, +1 Def, -1 Spe.",
      "name": "Curse",
      "pp": 10,
      "priority": 0,
      "flags": {
        "authentic": 1
      },
      "target": "NORMAL",
      "type": "GHOST",
      "contestType": "TOUGH",
      "zMoveEffect": "CURSE"
    },
    "CUT": {
      "id": "CUT",
      "num": 15,
      "accuracy": 95,
      "basePower": 50,
      "category": "PHYSICAL",
      "desc": "No additional effect.",
      "name": "Cut",
      "pp": 30,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "COOL",
      "zMovePower": 100
    },
    "DARKPULSE": {
      "id": "DARKPULSE",
      "num": 399,
      "accuracy": 100,
      "basePower": 80,
      "category": "SPECIAL",
      "desc": "20% chance to flinch the target.",
      "name": "Dark Pulse",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "pulse": 1,
        "mirror": 1,
        "distance": 1
      },
      "target": "ANY",
      "type": "DARK",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 160
    },
    "DARKVOID": {
      "id": "DARKVOID",
      "num": 464,
      "accuracy": 50,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Darkrai: Puts the foe(s) to sleep.",
      "name": "Dark Void",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "DARK",
      "contestType": "CLEVER",
      "isViable": true,
      "status": "slp",
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "DARKESTLARIAT": {
      "id": "DARKESTLARIAT",
      "num": 663,
      "accuracy": 100,
      "basePower": 85,
      "category": "PHYSICAL",
      "desc": "Ignores the target's stat stage changes.",
      "name": "Darkest Lariat",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "DARK",
      "contestType": "COOL",
      "isViable": true,
      "ignoreEvasion": true,
      "zMovePower": 160
    },
    "DAZZLINGGLEAM": {
      "id": "DAZZLINGGLEAM",
      "num": 605,
      "accuracy": 100,
      "basePower": 80,
      "category": "SPECIAL",
      "desc": "No additional effect. Hits adjacent foes.",
      "name": "Dazzling Gleam",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "FAIRY",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 160
    },
    "DEFENDORDER": {
      "id": "DEFENDORDER",
      "num": 455,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Raises the user's Defense and Sp. Def by 1.",
      "name": "Defend Order",
      "pp": 10,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "SELF",
      "type": "BUG",
      "contestType": "CLEVER",
      "isViable": true,
      "boosts": {
        "def": 1,
        "spd": 1
      },
      "zMoveBoost": {
        "def": 1
      }
    },
    "DEFENSECURL": {
      "id": "DEFENSECURL",
      "num": 111,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Raises the user's Defense by 1.",
      "name": "Defense Curl",
      "pp": 40,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "SELF",
      "type": "NORMAL",
      "contestType": "CUTE",
      "boosts": {
        "def": 1
      },
      "zMoveBoost": {
        "accuracy": 1
      }
    },
    "DEFOG": {
      "id": "DEFOG",
      "num": 432,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "-1 evasion; clears user and target side's hazards.",
      "name": "Defog",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1,
        "authentic": 1
      },
      "target": "NORMAL",
      "type": "FLYING",
      "contestType": "COOL",
      "isViable": true,
      "zMoveBoost": {
        "accuracy": 1
      }
    },
    "DESTINYBOND": {
      "id": "DESTINYBOND",
      "num": 194,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "If an opponent knocks out the user, it also faints.",
      "name": "Destiny Bond",
      "pp": 5,
      "priority": 0,
      "flags": {
        "authentic": 1
      },
      "target": "SELF",
      "type": "GHOST",
      "contestType": "CLEVER",
      "isViable": true,
      "zMoveEffect": "REDIRECT"
    },
    "DETECT": {
      "id": "DETECT",
      "num": 197,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Prevents moves from affecting the user this turn.",
      "name": "Detect",
      "pp": 5,
      "priority": 4,
      "flags": {},
      "target": "SELF",
      "type": "FIGHTING",
      "contestType": "COOL",
      "isViable": true,
      "zMoveBoost": {
        "evasion": 1
      }
    },
    "DEVASTATINGDRAKE": {
      "id": "DEVASTATINGDRAKE",
      "num": 652,
      "accuracy": true,
      "basePower": 1,
      "category": "PHYSICAL",
      "desc": "Power is equal to the base move's Z-Power.",
      "name": "Devastating Drake",
      "pp": 1,
      "priority": 0,
      "flags": {},
      "target": "NORMAL",
      "type": "DRAGON",
      "contestType": "COOL",
      "isZ": "dragoniumz"
    },
    "DIAMONDSTORM": {
      "id": "DIAMONDSTORM",
      "num": 591,
      "accuracy": 95,
      "basePower": 100,
      "category": "PHYSICAL",
      "desc": "50% chance to raise user's Def by 2 for each hit.",
      "name": "Diamond Storm",
      "pp": 5,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "ROCK",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 180
    },
    "DIG": {
      "id": "DIG",
      "num": 91,
      "accuracy": 100,
      "basePower": 80,
      "category": "PHYSICAL",
      "desc": "Digs underground turn 1, strikes turn 2.",
      "name": "Dig",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "charge": 1,
        "protect": 1,
        "mirror": 1,
        "nonsky": 1
      },
      "target": "NORMAL",
      "type": "GROUND",
      "contestType": "TOUGH",
      "zMovePower": 160
    },
    "DISABLE": {
      "id": "DISABLE",
      "num": 50,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "For 4 turns, disables the target's last move used.",
      "name": "Disable",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1,
        "authentic": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CLEVER",
      "isViable": true,
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "DISARMINGVOICE": {
      "id": "DISARMINGVOICE",
      "num": 574,
      "accuracy": true,
      "basePower": 40,
      "category": "SPECIAL",
      "desc": "This move does not check accuracy. Hits foes.",
      "name": "Disarming Voice",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "sound": 1,
        "authentic": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "FAIRY",
      "contestType": "CUTE",
      "zMovePower": 100
    },
    "DISCHARGE": {
      "id": "DISCHARGE",
      "num": 435,
      "accuracy": 100,
      "basePower": 80,
      "category": "SPECIAL",
      "desc": "30% chance to paralyze adjacent Pokemon.",
      "name": "Discharge",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "ALLADJACENT",
      "type": "ELECTRIC",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 160
    },
    "DIVE": {
      "id": "DIVE",
      "num": 291,
      "accuracy": 100,
      "basePower": 80,
      "category": "PHYSICAL",
      "desc": "Dives underwater turn 1, strikes turn 2.",
      "name": "Dive",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "charge": 1,
        "protect": 1,
        "mirror": 1,
        "nonsky": 1
      },
      "target": "NORMAL",
      "type": "WATER",
      "contestType": "BEAUTIFUL",
      "zMovePower": 160
    },
    "DIZZYPUNCH": {
      "id": "DIZZYPUNCH",
      "num": 146,
      "accuracy": 100,
      "basePower": 70,
      "category": "PHYSICAL",
      "desc": "20% chance to confuse the target.",
      "name": "Dizzy Punch",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1,
        "punch": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CUTE",
      "zMovePower": 140
    },
    "DOOMDESIRE": {
      "id": "DOOMDESIRE",
      "num": 353,
      "accuracy": 100,
      "basePower": 140,
      "category": "SPECIAL",
      "desc": "Hits two turns after being used.",
      "name": "Doom Desire",
      "pp": 5,
      "priority": 0,
      "flags": {},
      "target": "NORMAL",
      "type": "STEEL",
      "contestType": "BEAUTIFUL",
      "zMovePower": 200
    },
    "DOUBLEEDGE": {
      "id": "DOUBLEEDGE",
      "num": 38,
      "accuracy": 100,
      "basePower": 120,
      "category": "PHYSICAL",
      "desc": "Has 33% recoil.",
      "name": "Double-Edge",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "TOUGH",
      "isViable": true,
      "recoil": [
        33,
        100
      ],
      "zMovePower": 190
    },
    "DOUBLEHIT": {
      "id": "DOUBLEHIT",
      "num": 458,
      "accuracy": 90,
      "basePower": 35,
      "category": "PHYSICAL",
      "desc": "Hits 2 times in one turn.",
      "name": "Double Hit",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "COOL",
      "multihit": 2,
      "zMovePower": 140
    },
    "DOUBLEKICK": {
      "id": "DOUBLEKICK",
      "num": 24,
      "accuracy": 100,
      "basePower": 30,
      "category": "PHYSICAL",
      "desc": "Hits 2 times in one turn.",
      "name": "Double Kick",
      "pp": 30,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FIGHTING",
      "contestType": "COOL",
      "multihit": 2,
      "zMovePower": 100
    },
    "DOUBLESLAP": {
      "id": "DOUBLESLAP",
      "num": 3,
      "accuracy": 85,
      "basePower": 15,
      "category": "PHYSICAL",
      "desc": "Hits 2-5 times in one turn.",
      "name": "Double Slap",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CUTE",
      "multihit": [
        2,
        5
      ],
      "zMovePower": 100
    },
    "DOUBLETEAM": {
      "id": "DOUBLETEAM",
      "num": 104,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Raises the user's evasiveness by 1.",
      "name": "Double Team",
      "pp": 15,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "SELF",
      "type": "NORMAL",
      "contestType": "COOL",
      "boosts": {
        "evasion": 1
      },
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "DRACOMETEOR": {
      "id": "DRACOMETEOR",
      "num": 434,
      "accuracy": 90,
      "basePower": 130,
      "category": "SPECIAL",
      "desc": "Lowers the user's Sp. Atk by 2.",
      "name": "Draco Meteor",
      "pp": 5,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "DRAGON",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 195
    },
    "DRAGONASCENT": {
      "id": "DRAGONASCENT",
      "num": 620,
      "accuracy": 100,
      "basePower": 120,
      "category": "PHYSICAL",
      "desc": "Lowers the user's Defense and Sp. Def by 1.",
      "name": "Dragon Ascent",
      "pp": 5,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1,
        "distance": 1
      },
      "target": "ANY",
      "type": "FLYING",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 190
    },
    "DRAGONBREATH": {
      "id": "DRAGONBREATH",
      "num": 225,
      "accuracy": 100,
      "basePower": 60,
      "category": "SPECIAL",
      "desc": "30% chance to paralyze the target.",
      "name": "Dragon Breath",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "DRAGON",
      "contestType": "COOL",
      "zMovePower": 120
    },
    "DRAGONCLAW": {
      "id": "DRAGONCLAW",
      "num": 337,
      "accuracy": 100,
      "basePower": 80,
      "category": "PHYSICAL",
      "desc": "No additional effect.",
      "name": "Dragon Claw",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "DRAGON",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 160
    },
    "DRAGONDANCE": {
      "id": "DRAGONDANCE",
      "num": 349,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Raises the user's Attack and Speed by 1.",
      "name": "Dragon Dance",
      "pp": 20,
      "priority": 0,
      "flags": {
        "snatch": 1,
        "dance": 1
      },
      "target": "SELF",
      "type": "DRAGON",
      "contestType": "COOL",
      "isViable": true,
      "boosts": {
        "atk": 1,
        "spe": 1
      },
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "DRAGONHAMMER": {
      "id": "DRAGONHAMMER",
      "num": 692,
      "accuracy": 100,
      "basePower": 90,
      "category": "PHYSICAL",
      "desc": "No additional effect.",
      "name": "Dragon Hammer",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "DRAGON",
      "contestType": "TOUGH",
      "isViable": true,
      "zMovePower": 175
    },
    "DRAGONPULSE": {
      "id": "DRAGONPULSE",
      "num": 406,
      "accuracy": 100,
      "basePower": 85,
      "category": "SPECIAL",
      "desc": "No additional effect.",
      "name": "Dragon Pulse",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "pulse": 1,
        "mirror": 1,
        "distance": 1
      },
      "target": "ANY",
      "type": "DRAGON",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 160
    },
    "DRAGONRAGE": {
      "id": "DRAGONRAGE",
      "num": 82,
      "accuracy": 100,
      "basePower": 0,
      "category": "SPECIAL",
      "desc": "Always does 40 HP of damage.",
      "name": "Dragon Rage",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "DRAGON",
      "contestType": "COOL",
      "zMovePower": 100
    },
    "DRAGONRUSH": {
      "id": "DRAGONRUSH",
      "num": 407,
      "accuracy": 75,
      "basePower": 100,
      "category": "PHYSICAL",
      "desc": "20% chance to flinch the target.",
      "name": "Dragon Rush",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "DRAGON",
      "contestType": "TOUGH",
      "zMovePower": 180
    },
    "DRAGONTAIL": {
      "id": "DRAGONTAIL",
      "num": 525,
      "accuracy": 90,
      "basePower": 60,
      "category": "PHYSICAL",
      "desc": "Forces the target to switch to a random ally.",
      "name": "Dragon Tail",
      "pp": 10,
      "priority": -6,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "DRAGON",
      "contestType": "TOUGH",
      "isViable": true,
      "zMovePower": 120
    },
    "DRAININGKISS": {
      "id": "DRAININGKISS",
      "num": 577,
      "accuracy": 100,
      "basePower": 50,
      "category": "SPECIAL",
      "desc": "User recovers 75% of the damage dealt.",
      "name": "Draining Kiss",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1,
        "heal": 1
      },
      "target": "NORMAL",
      "type": "FAIRY",
      "contestType": "CUTE",
      "drain": [
        3,
        4
      ],
      "zMovePower": 100
    },
    "DRAINPUNCH": {
      "id": "DRAINPUNCH",
      "num": 409,
      "accuracy": 100,
      "basePower": 75,
      "category": "PHYSICAL",
      "desc": "User recovers 50% of the damage dealt.",
      "name": "Drain Punch",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1,
        "punch": 1,
        "heal": 1
      },
      "target": "NORMAL",
      "type": "FIGHTING",
      "contestType": "TOUGH",
      "drain": [
        1,
        2
      ],
      "isViable": true,
      "zMovePower": 140
    },
    "DREAMEATER": {
      "id": "DREAMEATER",
      "num": 138,
      "accuracy": 100,
      "basePower": 100,
      "category": "SPECIAL",
      "desc": "User gains 1/2 HP inflicted. Sleeping target only.",
      "name": "Dream Eater",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "heal": 1
      },
      "target": "NORMAL",
      "type": "PSYCHIC",
      "contestType": "CLEVER",
      "drain": [
        1,
        2
      ],
      "zMovePower": 180
    },
    "DRILLPECK": {
      "id": "DRILLPECK",
      "num": 65,
      "accuracy": 100,
      "basePower": 80,
      "category": "PHYSICAL",
      "desc": "No additional effect.",
      "name": "Drill Peck",
      "pp": 20,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1,
        "distance": 1
      },
      "target": "ANY",
      "type": "FLYING",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 160
    },
    "DRILLRUN": {
      "id": "DRILLRUN",
      "num": 529,
      "accuracy": 95,
      "basePower": 80,
      "category": "PHYSICAL",
      "desc": "High critical hit ratio.",
      "name": "Drill Run",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GROUND",
      "contestType": "TOUGH",
      "critRatio": 2,
      "isViable": true,
      "zMovePower": 160
    },
    "DUALCHOP": {
      "id": "DUALCHOP",
      "num": 530,
      "accuracy": 90,
      "basePower": 40,
      "category": "PHYSICAL",
      "desc": "Hits 2 times in one turn.",
      "name": "Dual Chop",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "DRAGON",
      "contestType": "TOUGH",
      "multihit": 2,
      "zMovePower": 100
    },
    "DYNAMICPUNCH": {
      "id": "DYNAMICPUNCH",
      "num": 223,
      "accuracy": 50,
      "basePower": 100,
      "category": "PHYSICAL",
      "desc": "100% chance to confuse the target.",
      "name": "Dynamic Punch",
      "pp": 5,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1,
        "punch": 1
      },
      "target": "NORMAL",
      "type": "FIGHTING",
      "contestType": "COOL",
      "zMovePower": 180
    },
    "EARTHPOWER": {
      "id": "EARTHPOWER",
      "num": 414,
      "accuracy": 100,
      "basePower": 90,
      "category": "SPECIAL",
      "desc": "10% chance to lower the target's Sp. Def by 1.",
      "name": "Earth Power",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "nonsky": 1
      },
      "target": "NORMAL",
      "type": "GROUND",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 175
    },
    "EARTHQUAKE": {
      "id": "EARTHQUAKE",
      "num": 89,
      "accuracy": 100,
      "basePower": 100,
      "category": "PHYSICAL",
      "desc": "Hits adjacent Pokemon. Power doubles on Dig.",
      "name": "Earthquake",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "nonsky": 1
      },
      "target": "ALLADJACENT",
      "type": "GROUND",
      "contestType": "TOUGH",
      "isViable": true,
      "zMovePower": 180
    },
    "ECHOEDVOICE": {
      "id": "ECHOEDVOICE",
      "num": 497,
      "accuracy": 100,
      "basePower": 40,
      "category": "SPECIAL",
      "desc": "Power increases when used on consecutive turns.",
      "name": "Echoed Voice",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "sound": 1,
        "authentic": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "BEAUTIFUL",
      "zMovePower": 100
    },
    "EERIEIMPULSE": {
      "id": "EERIEIMPULSE",
      "num": 598,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Lowers the target's Sp. Atk by 2.",
      "name": "Eerie Impulse",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "ELECTRIC",
      "contestType": "CLEVER",
      "boosts": {
        "spa": -2
      },
      "zMoveBoost": {
        "spd": 1
      }
    },
    "EGGBOMB": {
      "id": "EGGBOMB",
      "num": 121,
      "accuracy": 75,
      "basePower": 100,
      "category": "PHYSICAL",
      "desc": "No additional effect.",
      "name": "Egg Bomb",
      "pp": 10,
      "priority": 0,
      "flags": {
        "bullet": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CUTE",
      "zMovePower": 180
    },
    "ELECTRICTERRAIN": {
      "id": "ELECTRICTERRAIN",
      "num": 604,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "5 turns. Grounded: +Electric power, can't sleep.",
      "name": "Electric Terrain",
      "pp": 10,
      "priority": 0,
      "flags": {
        "nonsky": 1
      },
      "target": "ALL",
      "type": "ELECTRIC",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "spe": 1
      }
    },
    "ELECTRIFY": {
      "id": "ELECTRIFY",
      "num": 582,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Changes the target's move to Electric this turn.",
      "name": "Electrify",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "ELECTRIC",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "spa": 1
      }
    },
    "ELECTROBALL": {
      "id": "ELECTROBALL",
      "num": 486,
      "accuracy": 100,
      "basePower": 0,
      "category": "SPECIAL",
      "desc": "More power the faster the user is than the target.",
      "name": "Electro Ball",
      "pp": 10,
      "priority": 0,
      "flags": {
        "bullet": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "ELECTRIC",
      "contestType": "COOL",
      "zMovePower": 160
    },
    "ELECTROWEB": {
      "id": "ELECTROWEB",
      "num": 527,
      "accuracy": 95,
      "basePower": 55,
      "category": "SPECIAL",
      "desc": "100% chance to lower the foe(s) Speed by 1.",
      "name": "Electroweb",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "ELECTRIC",
      "contestType": "BEAUTIFUL",
      "zMovePower": 100
    },
    "EMBARGO": {
      "id": "EMBARGO",
      "num": 373,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "For 5 turns, the target's item has no effect.",
      "name": "Embargo",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "DARK",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "spa": 1
      }
    },
    "EMBER": {
      "id": "EMBER",
      "num": 52,
      "accuracy": 100,
      "basePower": 40,
      "category": "SPECIAL",
      "desc": "10% chance to burn the target.",
      "name": "Ember",
      "pp": 25,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FIRE",
      "contestType": "CUTE",
      "zMovePower": 100
    },
    "ENCORE": {
      "id": "ENCORE",
      "num": 227,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "The target repeats its last move for 3 turns.",
      "name": "Encore",
      "pp": 5,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1,
        "authentic": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CUTE",
      "isViable": true,
      "zMoveBoost": {
        "spe": 1
      }
    },
    "ENDEAVOR": {
      "id": "ENDEAVOR",
      "num": 283,
      "accuracy": 100,
      "basePower": 0,
      "category": "PHYSICAL",
      "desc": "Lowers the target's HP to the user's HP.",
      "name": "Endeavor",
      "pp": 5,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "TOUGH",
      "isViable": true,
      "zMovePower": 160
    },
    "ENDURE": {
      "id": "ENDURE",
      "num": 203,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "The user survives the next hit with at least 1 HP.",
      "name": "Endure",
      "pp": 10,
      "priority": 4,
      "flags": {},
      "target": "SELF",
      "type": "NORMAL",
      "contestType": "TOUGH",
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "ENERGYBALL": {
      "id": "ENERGYBALL",
      "num": 412,
      "accuracy": 100,
      "basePower": 90,
      "category": "SPECIAL",
      "desc": "10% chance to lower the target's Sp. Def by 1.",
      "name": "Energy Ball",
      "pp": 10,
      "priority": 0,
      "flags": {
        "bullet": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GRASS",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 175
    },
    "ENTRAINMENT": {
      "id": "ENTRAINMENT",
      "num": 494,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "The target's Ability changes to match the user's.",
      "name": "Entrainment",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1,
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CUTE",
      "zMoveBoost": {
        "spd": 1
      }
    },
    "ERUPTION": {
      "id": "ERUPTION",
      "num": 284,
      "accuracy": 100,
      "basePower": 150,
      "category": "SPECIAL",
      "desc": "Less power as user's HP decreases. Hits foe(s).",
      "name": "Eruption",
      "pp": 5,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "FIRE",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 200
    },
    "EXPLOSION": {
      "id": "EXPLOSION",
      "num": 153,
      "accuracy": 100,
      "basePower": 250,
      "category": "PHYSICAL",
      "desc": "Hits adjacent Pokemon. The user faints.",
      "name": "Explosion",
      "pp": 5,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "ALLADJACENT",
      "type": "NORMAL",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 200
    },
    "EXTRASENSORY": {
      "id": "EXTRASENSORY",
      "num": 326,
      "accuracy": 100,
      "basePower": 80,
      "category": "SPECIAL",
      "desc": "10% chance to flinch the target.",
      "name": "Extrasensory",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "PSYCHIC",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 160
    },
    "EXTREMEEVOBOOST": {
      "id": "EXTREMEEVOBOOST",
      "num": 702,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Raises user's Atk, Def, SpA, SpD, and Spe by 2.",
      "name": "Extreme Evoboost",
      "pp": 1,
      "priority": 0,
      "flags": {},
      "target": "SELF",
      "type": "NORMAL",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "boosts": {
        "atk": 2,
        "def": 2,
        "spa": 2,
        "spd": 2,
        "spe": 2
      },
      "isZ": "eeviumz"
    },
    "EXTREMESPEED": {
      "id": "EXTREMESPEED",
      "num": 245,
      "accuracy": 100,
      "basePower": 80,
      "category": "PHYSICAL",
      "desc": "Nearly always goes first.",
      "name": "Extreme Speed",
      "pp": 5,
      "priority": 2,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 160
    },
    "FACADE": {
      "id": "FACADE",
      "num": 263,
      "accuracy": 100,
      "basePower": 70,
      "category": "PHYSICAL",
      "desc": "Power doubles if user is burn/poison/paralyzed.",
      "name": "Facade",
      "pp": 20,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CUTE",
      "isViable": true,
      "zMovePower": 140
    },
    "FEINTATTACK": {
      "id": "FEINTATTACK",
      "num": 185,
      "accuracy": true,
      "basePower": 60,
      "category": "PHYSICAL",
      "desc": "This move does not check accuracy.",
      "name": "Feint Attack",
      "pp": 20,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "DARK",
      "contestType": "CLEVER",
      "zMovePower": 120
    },
    "FAIRYLOCK": {
      "id": "FAIRYLOCK",
      "num": 587,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Prevents all Pokemon from switching next turn.",
      "name": "Fairy Lock",
      "pp": 10,
      "priority": 0,
      "flags": {
        "mirror": 1,
        "authentic": 1
      },
      "target": "ALL",
      "type": "FAIRY",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "def": 1
      }
    },
    "FAIRYWIND": {
      "id": "FAIRYWIND",
      "num": 584,
      "accuracy": 100,
      "basePower": 40,
      "category": "SPECIAL",
      "desc": "No additional effect.",
      "name": "Fairy Wind",
      "pp": 30,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FAIRY",
      "contestType": "BEAUTIFUL",
      "zMovePower": 100
    },
    "FAKEOUT": {
      "id": "FAKEOUT",
      "num": 252,
      "accuracy": 100,
      "basePower": 40,
      "category": "PHYSICAL",
      "desc": "Hits first. First turn out only. 100% flinch chance.",
      "name": "Fake Out",
      "pp": 10,
      "priority": 3,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CUTE",
      "isViable": true,
      "zMovePower": 100
    },
    "FAKETEARS": {
      "id": "FAKETEARS",
      "num": 313,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Lowers the target's Sp. Def by 2.",
      "name": "Fake Tears",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1,
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "DARK",
      "contestType": "CUTE",
      "boosts": {
        "spd": -2
      },
      "zMoveBoost": {
        "spa": 1
      }
    },
    "FALSESWIPE": {
      "id": "FALSESWIPE",
      "num": 206,
      "accuracy": 100,
      "basePower": 40,
      "category": "PHYSICAL",
      "desc": "Always leaves the target with at least 1 HP.",
      "name": "False Swipe",
      "pp": 40,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "COOL",
      "zMovePower": 100
    },
    "FEATHERDANCE": {
      "id": "FEATHERDANCE",
      "num": 297,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Lowers the target's Attack by 2.",
      "name": "Feather Dance",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1,
        "mystery": 1,
        "dance": 1
      },
      "target": "NORMAL",
      "type": "FLYING",
      "contestType": "BEAUTIFUL",
      "boosts": {
        "atk": -2
      },
      "zMoveBoost": {
        "def": 1
      }
    },
    "FEINT": {
      "id": "FEINT",
      "num": 364,
      "accuracy": 100,
      "basePower": 30,
      "category": "PHYSICAL",
      "desc": "Nullifies Detect, Protect, and Quick/Wide Guard.",
      "name": "Feint",
      "pp": 10,
      "priority": 2,
      "flags": {
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CLEVER",
      "breaksProtect": true,
      "zMovePower": 100
    },
    "FELLSTINGER": {
      "id": "FELLSTINGER",
      "num": 565,
      "accuracy": 100,
      "basePower": 50,
      "category": "PHYSICAL",
      "desc": "Raises user's Attack by 3 if this KOes the target.",
      "name": "Fell Stinger",
      "pp": 25,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "BUG",
      "contestType": "COOL",
      "zMovePower": 100
    },
    "FIERYDANCE": {
      "id": "FIERYDANCE",
      "num": 552,
      "accuracy": 100,
      "basePower": 80,
      "category": "SPECIAL",
      "desc": "50% chance to raise the user's Sp. Atk by 1.",
      "name": "Fiery Dance",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "dance": 1
      },
      "target": "NORMAL",
      "type": "FIRE",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 160
    },
    "FINALGAMBIT": {
      "id": "FINALGAMBIT",
      "num": 515,
      "accuracy": 100,
      "basePower": 0,
      "category": "SPECIAL",
      "desc": "Does damage equal to the user's HP. User faints.",
      "name": "Final Gambit",
      "pp": 5,
      "priority": 0,
      "flags": {
        "protect": 1
      },
      "target": "NORMAL",
      "type": "FIGHTING",
      "contestType": "TOUGH",
      "isViable": true,
      "zMovePower": 180
    },
    "FIREBLAST": {
      "id": "FIREBLAST",
      "num": 126,
      "accuracy": 85,
      "basePower": 110,
      "category": "SPECIAL",
      "desc": "10% chance to burn the target.",
      "name": "Fire Blast",
      "pp": 5,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FIRE",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 185
    },
    "FIREFANG": {
      "id": "FIREFANG",
      "num": 424,
      "accuracy": 95,
      "basePower": 65,
      "category": "PHYSICAL",
      "desc": "10% chance to burn. 10% chance to flinch.",
      "name": "Fire Fang",
      "pp": 15,
      "priority": 0,
      "flags": {
        "bite": 1,
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FIRE",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 120
    },
    "FIRELASH": {
      "id": "FIRELASH",
      "num": 680,
      "accuracy": 100,
      "basePower": 80,
      "category": "PHYSICAL",
      "desc": "100% chance to lower the target's Defense by 1.",
      "name": "Fire Lash",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FIRE",
      "contestType": "CUTE",
      "isViable": true,
      "zMovePower": 160
    },
    "FIREPLEDGE": {
      "id": "FIREPLEDGE",
      "num": 519,
      "accuracy": 100,
      "basePower": 80,
      "category": "SPECIAL",
      "desc": "Use with Grass or Water Pledge for added effect.",
      "name": "Fire Pledge",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "nonsky": 1
      },
      "target": "NORMAL",
      "type": "FIRE",
      "contestType": "BEAUTIFUL",
      "zMovePower": 160
    },
    "FIREPUNCH": {
      "id": "FIREPUNCH",
      "num": 7,
      "accuracy": 100,
      "basePower": 75,
      "category": "PHYSICAL",
      "desc": "10% chance to burn the target.",
      "name": "Fire Punch",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1,
        "punch": 1
      },
      "target": "NORMAL",
      "type": "FIRE",
      "contestType": "TOUGH",
      "isViable": true,
      "zMovePower": 140
    },
    "FIRESPIN": {
      "id": "FIRESPIN",
      "num": 83,
      "accuracy": 85,
      "basePower": 35,
      "category": "SPECIAL",
      "desc": "Traps and damages the target for 4-5 turns.",
      "name": "Fire Spin",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FIRE",
      "contestType": "BEAUTIFUL",
      "zMovePower": 100
    },
    "FIRSTIMPRESSION": {
      "id": "FIRSTIMPRESSION",
      "num": 660,
      "accuracy": 100,
      "basePower": 90,
      "category": "PHYSICAL",
      "desc": "Hits first. First turn out only.",
      "name": "First Impression",
      "pp": 10,
      "priority": 2,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "BUG",
      "contestType": "CUTE",
      "isViable": true,
      "zMovePower": 175
    },
    "FISSURE": {
      "id": "FISSURE",
      "num": 90,
      "accuracy": 30,
      "basePower": 0,
      "category": "PHYSICAL",
      "desc": "OHKOs the target. Fails if user is a lower level.",
      "name": "Fissure",
      "pp": 5,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "nonsky": 1
      },
      "target": "NORMAL",
      "type": "GROUND",
      "contestType": "TOUGH",
      "zMovePower": 180
    },
    "FLAIL": {
      "id": "FLAIL",
      "num": 175,
      "accuracy": 100,
      "basePower": 0,
      "category": "PHYSICAL",
      "desc": "More power the less HP the user has left.",
      "name": "Flail",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CUTE",
      "zMovePower": 160
    },
    "FLAMEBURST": {
      "id": "FLAMEBURST",
      "num": 481,
      "accuracy": 100,
      "basePower": 70,
      "category": "SPECIAL",
      "desc": "Damages Pokemon next to the target as well.",
      "name": "Flame Burst",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FIRE",
      "contestType": "BEAUTIFUL",
      "zMovePower": 140
    },
    "FLAMECHARGE": {
      "id": "FLAMECHARGE",
      "num": 488,
      "accuracy": 100,
      "basePower": 50,
      "category": "PHYSICAL",
      "desc": "100% chance to raise the user's Speed by 1.",
      "name": "Flame Charge",
      "pp": 20,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FIRE",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 100
    },
    "FLAMEWHEEL": {
      "id": "FLAMEWHEEL",
      "num": 172,
      "accuracy": 100,
      "basePower": 60,
      "category": "PHYSICAL",
      "desc": "10% chance to burn the target. Thaws user.",
      "name": "Flame Wheel",
      "pp": 25,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1,
        "defrost": 1
      },
      "target": "NORMAL",
      "type": "FIRE",
      "contestType": "BEAUTIFUL",
      "zMovePower": 120
    },
    "FLAMETHROWER": {
      "id": "FLAMETHROWER",
      "num": 53,
      "accuracy": 100,
      "basePower": 90,
      "category": "SPECIAL",
      "desc": "10% chance to burn the target.",
      "name": "Flamethrower",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FIRE",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 175
    },
    "FLAREBLITZ": {
      "id": "FLAREBLITZ",
      "num": 394,
      "accuracy": 100,
      "basePower": 120,
      "category": "PHYSICAL",
      "desc": "Has 33% recoil. 10% chance to burn. Thaws user.",
      "name": "Flare Blitz",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1,
        "defrost": 1
      },
      "target": "NORMAL",
      "type": "FIRE",
      "contestType": "COOL",
      "isViable": true,
      "recoil": [
        33,
        100
      ],
      "zMovePower": 190
    },
    "FLASH": {
      "id": "FLASH",
      "num": 148,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Lowers the target's accuracy by 1.",
      "name": "Flash",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "BEAUTIFUL",
      "boosts": {
        "accuracy": -1
      },
      "zMoveBoost": {
        "evasion": 1
      }
    },
    "FLASHCANNON": {
      "id": "FLASHCANNON",
      "num": 430,
      "accuracy": 100,
      "basePower": 80,
      "category": "SPECIAL",
      "desc": "10% chance to lower the target's Sp. Def by 1.",
      "name": "Flash Cannon",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "STEEL",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 160
    },
    "FLATTER": {
      "id": "FLATTER",
      "num": 260,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Raises the target's Sp. Atk by 1 and confuses it.",
      "name": "Flatter",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1,
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "DARK",
      "contestType": "CLEVER",
      "boosts": {
        "spa": 1
      },
      "zMoveBoost": {
        "spd": 1
      }
    },
    "FLEURCANNON": {
      "id": "FLEURCANNON",
      "num": 705,
      "accuracy": 90,
      "basePower": 130,
      "category": "SPECIAL",
      "desc": "Lowers the user's Sp. Atk by 2.",
      "name": "Fleur Cannon",
      "pp": 5,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FAIRY",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 195
    },
    "FLING": {
      "id": "FLING",
      "num": 374,
      "accuracy": 100,
      "basePower": 0,
      "category": "PHYSICAL",
      "desc": "Flings the user's item at the target. Power varies.",
      "name": "Fling",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "DARK",
      "contestType": "CUTE",
      "zMovePower": 100
    },
    "FLORALHEALING": {
      "id": "FLORALHEALING",
      "num": 666,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Heals the target by 50% of its max HP.",
      "name": "Floral Healing",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "heal": 1,
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "FAIRY",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "FLOWERSHIELD": {
      "id": "FLOWERSHIELD",
      "num": 579,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Raises Defense by 1 of all active Grass types.",
      "name": "Flower Shield",
      "pp": 10,
      "priority": 0,
      "flags": {
        "distance": 1
      },
      "target": "ALL",
      "type": "FAIRY",
      "contestType": "BEAUTIFUL",
      "zMoveBoost": {
        "def": 1
      }
    },
    "FLY": {
      "id": "FLY",
      "num": 19,
      "accuracy": 95,
      "basePower": 90,
      "category": "PHYSICAL",
      "desc": "Flies up on first turn, then strikes the next turn.",
      "name": "Fly",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "charge": 1,
        "protect": 1,
        "mirror": 1,
        "gravity": 1,
        "distance": 1
      },
      "target": "ANY",
      "type": "FLYING",
      "contestType": "CLEVER",
      "zMovePower": 175
    },
    "FLYINGPRESS": {
      "id": "FLYINGPRESS",
      "num": 560,
      "accuracy": 95,
      "basePower": 100,
      "category": "PHYSICAL",
      "desc": "Combines Flying in its type effectiveness.",
      "name": "Flying Press",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1,
        "gravity": 1,
        "distance": 1,
        "nonsky": 1
      },
      "target": "ANY",
      "type": "FIGHTING",
      "contestType": "TOUGH",
      "zMovePower": 170
    },
    "FOCUSBLAST": {
      "id": "FOCUSBLAST",
      "num": 411,
      "accuracy": 70,
      "basePower": 120,
      "category": "SPECIAL",
      "desc": "10% chance to lower the target's Sp. Def by 1.",
      "name": "Focus Blast",
      "pp": 5,
      "priority": 0,
      "flags": {
        "bullet": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FIGHTING",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 190
    },
    "FOCUSENERGY": {
      "id": "FOCUSENERGY",
      "num": 116,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Raises the user's critical hit ratio by 2.",
      "name": "Focus Energy",
      "pp": 30,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "SELF",
      "type": "NORMAL",
      "contestType": "COOL",
      "boosts": {
        "crit": 2
      },
      "zMoveBoost": {
        "accuracy": 1
      }
    },
    "FOCUSPUNCH": {
      "id": "FOCUSPUNCH",
      "num": 264,
      "accuracy": 100,
      "basePower": 150,
      "category": "PHYSICAL",
      "desc": "Fails if the user takes damage before it hits.",
      "name": "Focus Punch",
      "pp": 20,
      "priority": -3,
      "flags": {
        "contact": 1,
        "protect": 1,
        "punch": 1
      },
      "target": "NORMAL",
      "type": "FIGHTING",
      "contestType": "TOUGH",
      "isViable": true,
      "zMovePower": 200
    },
    "FOLLOWME": {
      "id": "FOLLOWME",
      "num": 266,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "The foes' moves target the user on the turn used.",
      "name": "Follow Me",
      "pp": 20,
      "priority": 2,
      "flags": {},
      "target": "SELF",
      "type": "NORMAL",
      "contestType": "CUTE",
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "FORCEPALM": {
      "id": "FORCEPALM",
      "num": 395,
      "accuracy": 100,
      "basePower": 60,
      "category": "PHYSICAL",
      "desc": "30% chance to paralyze the target.",
      "name": "Force Palm",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FIGHTING",
      "contestType": "COOL",
      "zMovePower": 120
    },
    "FORESIGHT": {
      "id": "FORESIGHT",
      "num": 193,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Fighting, Normal hit Ghost. Evasiveness ignored.",
      "name": "Foresight",
      "pp": 40,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1,
        "authentic": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CLEVER",
      "zMoveEffect": "CRIT2"
    },
    "FORESTSCURSE": {
      "id": "FORESTSCURSE",
      "num": 571,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Adds Grass to the target's type(s).",
      "name": "Forest's Curse",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1,
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "GRASS",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "atk": 1,
        "def": 1,
        "spa": 1,
        "spd": 1,
        "spe": 1
      }
    },
    "FOULPLAY": {
      "id": "FOULPLAY",
      "num": 492,
      "accuracy": 100,
      "basePower": 95,
      "category": "PHYSICAL",
      "desc": "Uses target's Attack stat in damage calculation.",
      "name": "Foul Play",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "DARK",
      "contestType": "CLEVER",
      "isViable": true,
      "zMovePower": 175
    },
    "FREEZEDRY": {
      "id": "FREEZEDRY",
      "num": 573,
      "accuracy": 100,
      "basePower": 70,
      "category": "SPECIAL",
      "desc": "10% chance to freeze. Super effective on Water.",
      "name": "Freeze-Dry",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "ICE",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 140
    },
    "FREEZESHOCK": {
      "id": "FREEZESHOCK",
      "num": 553,
      "accuracy": 90,
      "basePower": 140,
      "category": "PHYSICAL",
      "desc": "Charges turn 1. Hits turn 2. 30% paralyze.",
      "name": "Freeze Shock",
      "pp": 5,
      "priority": 0,
      "flags": {
        "charge": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "ICE",
      "contestType": "BEAUTIFUL",
      "zMovePower": 200
    },
    "FRENZYPLANT": {
      "id": "FRENZYPLANT",
      "num": 338,
      "accuracy": 90,
      "basePower": 150,
      "category": "SPECIAL",
      "desc": "User cannot move next turn.",
      "name": "Frenzy Plant",
      "pp": 5,
      "priority": 0,
      "flags": {
        "recharge": 1,
        "protect": 1,
        "mirror": 1,
        "nonsky": 1
      },
      "target": "NORMAL",
      "type": "GRASS",
      "contestType": "COOL",
      "zMovePower": 200
    },
    "FROSTBREATH": {
      "id": "FROSTBREATH",
      "num": 524,
      "accuracy": 90,
      "basePower": 60,
      "category": "SPECIAL",
      "desc": "Always results in a critical hit.",
      "name": "Frost Breath",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "ICE",
      "contestType": "BEAUTIFUL",
      "zMovePower": 120
    },
    "FRUSTRATION": {
      "id": "FRUSTRATION",
      "num": 218,
      "accuracy": 100,
      "basePower": 0,
      "category": "PHYSICAL",
      "desc": "Max 102 power at minimum Happiness.",
      "name": "Frustration",
      "pp": 20,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CUTE",
      "isViable": true,
      "zMovePower": 160
    },
    "FURYATTACK": {
      "id": "FURYATTACK",
      "num": 31,
      "accuracy": 85,
      "basePower": 15,
      "category": "PHYSICAL",
      "desc": "Hits 2-5 times in one turn.",
      "name": "Fury Attack",
      "pp": 20,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "COOL",
      "multihit": [
        2,
        5
      ],
      "zMovePower": 100
    },
    "FURYCUTTER": {
      "id": "FURYCUTTER",
      "num": 210,
      "accuracy": 95,
      "basePower": 40,
      "category": "PHYSICAL",
      "desc": "Power doubles with each hit, up to 160.",
      "name": "Fury Cutter",
      "pp": 20,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "BUG",
      "contestType": "COOL",
      "zMovePower": 100
    },
    "FURYSWIPES": {
      "id": "FURYSWIPES",
      "num": 154,
      "accuracy": 80,
      "basePower": 18,
      "category": "PHYSICAL",
      "desc": "Hits 2-5 times in one turn.",
      "name": "Fury Swipes",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "TOUGH",
      "multihit": [
        2,
        5
      ],
      "zMovePower": 100
    },
    "FUSIONBOLT": {
      "id": "FUSIONBOLT",
      "num": 559,
      "accuracy": 100,
      "basePower": 100,
      "category": "PHYSICAL",
      "desc": "Power doubles if used after Fusion Flare.",
      "name": "Fusion Bolt",
      "pp": 5,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "ELECTRIC",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 180
    },
    "FUSIONFLARE": {
      "id": "FUSIONFLARE",
      "num": 558,
      "accuracy": 100,
      "basePower": 100,
      "category": "SPECIAL",
      "desc": "Power doubles if used after Fusion Bolt.",
      "name": "Fusion Flare",
      "pp": 5,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "defrost": 1
      },
      "target": "NORMAL",
      "type": "FIRE",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 180
    },
    "FUTURESIGHT": {
      "id": "FUTURESIGHT",
      "num": 248,
      "accuracy": 100,
      "basePower": 120,
      "category": "SPECIAL",
      "desc": "Hits two turns after being used.",
      "name": "Future Sight",
      "pp": 10,
      "priority": 0,
      "flags": {},
      "target": "NORMAL",
      "type": "PSYCHIC",
      "contestType": "CLEVER",
      "zMovePower": 190
    },
    "GASTROACID": {
      "id": "GASTROACID",
      "num": 380,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Nullifies the target's Ability.",
      "name": "Gastro Acid",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1,
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "POISON",
      "contestType": "TOUGH",
      "zMoveBoost": {
        "spe": 1
      }
    },
    "GEARGRIND": {
      "id": "GEARGRIND",
      "num": 544,
      "accuracy": 85,
      "basePower": 50,
      "category": "PHYSICAL",
      "desc": "Hits 2 times in one turn.",
      "name": "Gear Grind",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "STEEL",
      "contestType": "CLEVER",
      "isViable": true,
      "multihit": 2,
      "zMovePower": 180
    },
    "GEARUP": {
      "id": "GEARUP",
      "num": 674,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Raises Atk, Sp. Atk of allies with Plus/Minus by 1.",
      "name": "Gear Up",
      "pp": 20,
      "priority": 0,
      "flags": {
        "snatch": 1,
        "authentic": 1
      },
      "target": "ALLYSIDE",
      "type": "STEEL",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "spa": 1
      }
    },
    "GENESISSUPERNOVA": {
      "id": "GENESISSUPERNOVA",
      "num": 703,
      "accuracy": true,
      "basePower": 185,
      "category": "SPECIAL",
      "desc": "Summons Psychic Terrain.",
      "name": "Genesis Supernova",
      "pp": 1,
      "priority": 0,
      "flags": {},
      "target": "NORMAL",
      "type": "PSYCHIC",
      "contestType": "COOL",
      "isZ": "mewniumz"
    },
    "GEOMANCY": {
      "id": "GEOMANCY",
      "num": 601,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Charges, then raises SpA, SpD, Spe by 2 turn 2.",
      "name": "Geomancy",
      "pp": 10,
      "priority": 0,
      "flags": {
        "charge": 1,
        "nonsky": 1
      },
      "target": "SELF",
      "type": "FAIRY",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "boosts": {
        "spa": 2,
        "spd": 2,
        "spe": 2
      },
      "zMoveBoost": {
        "atk": 1,
        "def": 1,
        "spa": 1,
        "spd": 1,
        "spe": 1
      }
    },
    "GIGADRAIN": {
      "id": "GIGADRAIN",
      "num": 202,
      "accuracy": 100,
      "basePower": 75,
      "category": "SPECIAL",
      "desc": "User recovers 50% of the damage dealt.",
      "name": "Giga Drain",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "heal": 1
      },
      "target": "NORMAL",
      "type": "GRASS",
      "contestType": "CLEVER",
      "drain": [
        1,
        2
      ],
      "isViable": true,
      "zMovePower": 140
    },
    "GIGAIMPACT": {
      "id": "GIGAIMPACT",
      "num": 416,
      "accuracy": 90,
      "basePower": 150,
      "category": "PHYSICAL",
      "desc": "User cannot move next turn.",
      "name": "Giga Impact",
      "pp": 5,
      "priority": 0,
      "flags": {
        "contact": 1,
        "recharge": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "TOUGH",
      "zMovePower": 200
    },
    "GIGAVOLTHAVOC": {
      "id": "GIGAVOLTHAVOC",
      "num": 646,
      "accuracy": true,
      "basePower": 1,
      "category": "PHYSICAL",
      "desc": "Power is equal to the base move's Z-Power.",
      "name": "Gigavolt Havoc",
      "pp": 1,
      "priority": 0,
      "flags": {},
      "target": "NORMAL",
      "type": "ELECTRIC",
      "contestType": "COOL",
      "isViable": true,
      "isZ": "electriumz"
    },
    "GLACIATE": {
      "id": "GLACIATE",
      "num": 549,
      "accuracy": 95,
      "basePower": 65,
      "category": "SPECIAL",
      "desc": "100% chance to lower the foe(s) Speed by 1.",
      "name": "Glaciate",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "ICE",
      "contestType": "BEAUTIFUL",
      "zMovePower": 120
    },
    "GLARE": {
      "id": "GLARE",
      "num": 137,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Paralyzes the target.",
      "name": "Glare",
      "pp": 30,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "TOUGH",
      "isViable": true,
      "status": "par",
      "zMoveBoost": {
        "spd": 1
      }
    },
    "GRASSKNOT": {
      "id": "GRASSKNOT",
      "num": 447,
      "accuracy": 100,
      "basePower": 0,
      "category": "SPECIAL",
      "desc": "More power the heavier the target.",
      "name": "Grass Knot",
      "pp": 20,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1,
        "nonsky": 1
      },
      "target": "NORMAL",
      "type": "GRASS",
      "contestType": "CUTE",
      "isViable": true,
      "zMovePower": 160
    },
    "GRASSPLEDGE": {
      "id": "GRASSPLEDGE",
      "num": 520,
      "accuracy": 100,
      "basePower": 80,
      "category": "SPECIAL",
      "desc": "Use with Fire or Water Pledge for added effect.",
      "name": "Grass Pledge",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "nonsky": 1
      },
      "target": "NORMAL",
      "type": "GRASS",
      "contestType": "BEAUTIFUL",
      "zMovePower": 160
    },
    "GRASSWHISTLE": {
      "id": "GRASSWHISTLE",
      "num": 320,
      "accuracy": 55,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Puts the target to sleep.",
      "name": "Grass Whistle",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1,
        "sound": 1,
        "authentic": 1
      },
      "target": "NORMAL",
      "type": "GRASS",
      "contestType": "CLEVER",
      "status": "slp",
      "zMoveBoost": {
        "spe": 1
      }
    },
    "GRASSYTERRAIN": {
      "id": "GRASSYTERRAIN",
      "num": 580,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "5 turns. Grounded: +Grass power,+1/16 max HP.",
      "name": "Grassy Terrain",
      "pp": 10,
      "priority": 0,
      "flags": {
        "nonsky": 1
      },
      "target": "ALL",
      "type": "GRASS",
      "contestType": "BEAUTIFUL",
      "zMoveBoost": {
        "def": 1
      }
    },
    "GRAVITY": {
      "id": "GRAVITY",
      "num": 356,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "For 5 turns, negates all Ground immunities.",
      "name": "Gravity",
      "pp": 5,
      "priority": 0,
      "flags": {
        "nonsky": 1
      },
      "target": "ALL",
      "type": "PSYCHIC",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "spa": 1
      }
    },
    "GROWL": {
      "id": "GROWL",
      "num": 45,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Lowers the foe(s) Attack by 1.",
      "name": "Growl",
      "pp": 40,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1,
        "sound": 1,
        "authentic": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "NORMAL",
      "contestType": "CUTE",
      "boosts": {
        "atk": -1
      },
      "zMoveBoost": {
        "def": 1
      }
    },
    "GROWTH": {
      "id": "GROWTH",
      "num": 74,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Raises user's Attack and Sp. Atk by 1; 2 in Sun.",
      "name": "Growth",
      "pp": 20,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "SELF",
      "type": "NORMAL",
      "contestType": "BEAUTIFUL",
      "boosts": {
        "atk": 1,
        "spa": 1
      },
      "zMoveBoost": {
        "spa": 1
      }
    },
    "GRUDGE": {
      "id": "GRUDGE",
      "num": 288,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "If the user faints, the attack used loses all its PP.",
      "name": "Grudge",
      "pp": 5,
      "priority": 0,
      "flags": {
        "authentic": 1
      },
      "target": "SELF",
      "type": "GHOST",
      "contestType": "TOUGH",
      "zMoveEffect": "REDIRECT"
    },
    "GUARDSPLIT": {
      "id": "GUARDSPLIT",
      "num": 470,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Averages Defense and Sp. Def stats with target.",
      "name": "Guard Split",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "PSYCHIC",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "spe": 1
      }
    },
    "GUARDSWAP": {
      "id": "GUARDSWAP",
      "num": 385,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Swaps Defense and Sp. Def changes with target.",
      "name": "Guard Swap",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "authentic": 1,
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "PSYCHIC",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "spe": 1
      }
    },
    "GUARDIANOFALOLA": {
      "id": "GUARDIANOFALOLA",
      "num": 698,
      "accuracy": true,
      "basePower": 0,
      "category": "SPECIAL",
      "desc": "Does damage equal to 3/4 target's current HP.",
      "name": "Guardian of Alola",
      "pp": 1,
      "priority": 0,
      "flags": {},
      "target": "NORMAL",
      "type": "FAIRY",
      "contestType": "TOUGH",
      "isZ": "tapuniumz"
    },
    "GUILLOTINE": {
      "id": "GUILLOTINE",
      "num": 12,
      "accuracy": 30,
      "basePower": 0,
      "category": "PHYSICAL",
      "desc": "OHKOs the target. Fails if user is a lower level.",
      "name": "Guillotine",
      "pp": 5,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "COOL",
      "zMovePower": 180
    },
    "GUNKSHOT": {
      "id": "GUNKSHOT",
      "num": 441,
      "accuracy": 80,
      "basePower": 120,
      "category": "PHYSICAL",
      "desc": "30% chance to poison the target.",
      "name": "Gunk Shot",
      "pp": 5,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "POISON",
      "contestType": "TOUGH",
      "isViable": true,
      "zMovePower": 190
    },
    "GUST": {
      "id": "GUST",
      "num": 16,
      "accuracy": 100,
      "basePower": 40,
      "category": "SPECIAL",
      "desc": "Power doubles during Fly, Bounce, and Sky Drop.",
      "name": "Gust",
      "pp": 35,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "distance": 1
      },
      "target": "ANY",
      "type": "FLYING",
      "contestType": "CLEVER",
      "zMovePower": 100
    },
    "GYROBALL": {
      "id": "GYROBALL",
      "num": 360,
      "accuracy": 100,
      "basePower": 0,
      "category": "PHYSICAL",
      "desc": "More power the slower the user than the target.",
      "name": "Gyro Ball",
      "pp": 5,
      "priority": 0,
      "flags": {
        "bullet": 1,
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "STEEL",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 160
    },
    "HAIL": {
      "id": "HAIL",
      "num": 258,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "For 5 turns, hail crashes down.",
      "name": "Hail",
      "pp": 10,
      "priority": 0,
      "flags": {},
      "target": "ALL",
      "type": "ICE",
      "contestType": "BEAUTIFUL",
      "zMoveBoost": {
        "spe": 1
      }
    },
    "HAMMERARM": {
      "id": "HAMMERARM",
      "num": 359,
      "accuracy": 90,
      "basePower": 100,
      "category": "PHYSICAL",
      "desc": "Lowers the user's Speed by 1.",
      "name": "Hammer Arm",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1,
        "punch": 1
      },
      "target": "NORMAL",
      "type": "FIGHTING",
      "contestType": "TOUGH",
      "isViable": true,
      "zMovePower": 180
    },
    "HAPPYHOUR": {
      "id": "HAPPYHOUR",
      "num": 603,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "No competitive use.",
      "name": "Happy Hour",
      "pp": 30,
      "priority": 0,
      "flags": {},
      "target": "ALLYSIDE",
      "type": "NORMAL",
      "contestType": "CUTE",
      "zMoveBoost": {
        "atk": 1,
        "def": 1,
        "spa": 1,
        "spd": 1,
        "spe": 1
      }
    },
    "HARDEN": {
      "id": "HARDEN",
      "num": 106,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Raises the user's Defense by 1.",
      "name": "Harden",
      "pp": 30,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "SELF",
      "type": "NORMAL",
      "contestType": "TOUGH",
      "boosts": {
        "def": 1
      },
      "zMoveBoost": {
        "def": 1
      }
    },
    "HAZE": {
      "id": "HAZE",
      "num": 114,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Eliminates all stat changes.",
      "name": "Haze",
      "pp": 30,
      "priority": 0,
      "flags": {
        "authentic": 1
      },
      "target": "ALL",
      "type": "ICE",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMoveEffect": "HEAL"
    },
    "HEADCHARGE": {
      "id": "HEADCHARGE",
      "num": 543,
      "accuracy": 100,
      "basePower": 120,
      "category": "PHYSICAL",
      "desc": "Has 1/4 recoil.",
      "name": "Head Charge",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "TOUGH",
      "isViable": true,
      "recoil": [
        1,
        4
      ],
      "zMovePower": 190
    },
    "HEADSMASH": {
      "id": "HEADSMASH",
      "num": 457,
      "accuracy": 80,
      "basePower": 150,
      "category": "PHYSICAL",
      "desc": "Has 1/2 recoil.",
      "name": "Head Smash",
      "pp": 5,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "ROCK",
      "contestType": "TOUGH",
      "isViable": true,
      "recoil": [
        1,
        2
      ],
      "zMovePower": 200
    },
    "HEADBUTT": {
      "id": "HEADBUTT",
      "num": 29,
      "accuracy": 100,
      "basePower": 70,
      "category": "PHYSICAL",
      "desc": "30% chance to flinch the target.",
      "name": "Headbutt",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "TOUGH",
      "zMovePower": 140
    },
    "HEALBELL": {
      "id": "HEALBELL",
      "num": 215,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Cures the user's party of all status conditions.",
      "name": "Heal Bell",
      "pp": 5,
      "priority": 0,
      "flags": {
        "snatch": 1,
        "sound": 1,
        "distance": 1,
        "authentic": 1
      },
      "target": "ALLYTEAM",
      "type": "NORMAL",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMoveEffect": "HEAL"
    },
    "HEALBLOCK": {
      "id": "HEALBLOCK",
      "num": 377,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "For 5 turns, the foe(s) is prevented from healing.",
      "name": "Heal Block",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "PSYCHIC",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "spa": 2
      }
    },
    "HEALORDER": {
      "id": "HEALORDER",
      "num": 456,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Heals the user by 50% of its max HP.",
      "name": "Heal Order",
      "pp": 10,
      "priority": 0,
      "flags": {
        "snatch": 1,
        "heal": 1
      },
      "target": "SELF",
      "type": "BUG",
      "contestType": "CLEVER",
      "isViable": true,
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "HEALPULSE": {
      "id": "HEALPULSE",
      "num": 505,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Heals the target by 50% of its max HP.",
      "name": "Heal Pulse",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "pulse": 1,
        "reflectable": 1,
        "distance": 1,
        "heal": 1,
        "mystery": 1
      },
      "target": "ANY",
      "type": "PSYCHIC",
      "contestType": "BEAUTIFUL",
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "HEALINGWISH": {
      "id": "HEALINGWISH",
      "num": 361,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "User faints. Replacement is fully healed.",
      "name": "Healing Wish",
      "pp": 10,
      "priority": 0,
      "flags": {
        "snatch": 1,
        "heal": 1
      },
      "target": "SELF",
      "type": "PSYCHIC",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "sideCondition": "healingwish"
    },
    "HEARTSTAMP": {
      "id": "HEARTSTAMP",
      "num": 531,
      "accuracy": 100,
      "basePower": 60,
      "category": "PHYSICAL",
      "desc": "30% chance to flinch the target.",
      "name": "Heart Stamp",
      "pp": 25,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "PSYCHIC",
      "contestType": "CUTE",
      "zMovePower": 120
    },
    "HEARTSWAP": {
      "id": "HEARTSWAP",
      "num": 391,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Swaps all stat changes with target.",
      "name": "Heart Swap",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "authentic": 1,
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "PSYCHIC",
      "contestType": "CLEVER",
      "zMoveEffect": "CRIT2"
    },
    "HEATCRASH": {
      "id": "HEATCRASH",
      "num": 535,
      "accuracy": 100,
      "basePower": 0,
      "category": "PHYSICAL",
      "desc": "More power the heavier the user than the target.",
      "name": "Heat Crash",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1,
        "nonsky": 1
      },
      "target": "NORMAL",
      "type": "FIRE",
      "contestType": "TOUGH",
      "zMovePower": 160
    },
    "HEATWAVE": {
      "id": "HEATWAVE",
      "num": 257,
      "accuracy": 90,
      "basePower": 95,
      "category": "SPECIAL",
      "desc": "10% chance to burn the foe(s).",
      "name": "Heat Wave",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "FIRE",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 175
    },
    "HEAVYSLAM": {
      "id": "HEAVYSLAM",
      "num": 484,
      "accuracy": 100,
      "basePower": 0,
      "category": "PHYSICAL",
      "desc": "More power the heavier the user than the target.",
      "name": "Heavy Slam",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1,
        "nonsky": 1
      },
      "target": "NORMAL",
      "type": "STEEL",
      "contestType": "TOUGH",
      "isViable": true,
      "zMovePower": 160
    },
    "HELPINGHAND": {
      "id": "HELPINGHAND",
      "num": 270,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "One adjacent ally's move power is 1.5x this turn.",
      "name": "Helping Hand",
      "pp": 20,
      "priority": 5,
      "flags": {
        "authentic": 1
      },
      "target": "ADJACENTALLY",
      "type": "NORMAL",
      "contestType": "CLEVER",
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "HEX": {
      "id": "HEX",
      "num": 506,
      "accuracy": 100,
      "basePower": 65,
      "category": "SPECIAL",
      "desc": "Power doubles if the target has a status ailment.",
      "name": "Hex",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GHOST",
      "contestType": "CLEVER",
      "isViable": true,
      "zMovePower": 160
    },
    "HIDDENPOWER": {
      "id": "HIDDENPOWER",
      "num": 237,
      "accuracy": 100,
      "basePower": 60,
      "category": "SPECIAL",
      "desc": "Varies in type based on the user's IVs.",
      "name": "Hidden Power",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CLEVER",
      "zMovePower": 120
    },
    "HIDDENPOWERBUG": {
      "id": "HIDDENPOWER",
      "num": 237,
      "accuracy": 100,
      "basePower": 60,
      "category": "SPECIAL",
      "desc": "",
      "name": "Hidden Power Bug",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "BUG",
      "contestType": "CLEVER"
    },
    "HIDDENPOWERDARK": {
      "id": "HIDDENPOWER",
      "num": 237,
      "accuracy": 100,
      "basePower": 60,
      "category": "SPECIAL",
      "desc": "",
      "name": "Hidden Power Dark",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "DARK",
      "contestType": "CLEVER"
    },
    "HIDDENPOWERDRAGON": {
      "id": "HIDDENPOWER",
      "num": 237,
      "accuracy": 100,
      "basePower": 60,
      "category": "SPECIAL",
      "desc": "",
      "name": "Hidden Power Dragon",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "DRAGON",
      "contestType": "CLEVER"
    },
    "HIDDENPOWERELECTRIC": {
      "id": "HIDDENPOWER",
      "num": 237,
      "accuracy": 100,
      "basePower": 60,
      "category": "SPECIAL",
      "desc": "",
      "name": "Hidden Power Electric",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "ELECTRIC",
      "contestType": "CLEVER",
      "isViable": true
    },
    "HIDDENPOWERFIGHTING": {
      "id": "HIDDENPOWER",
      "num": 237,
      "accuracy": 100,
      "basePower": 60,
      "category": "SPECIAL",
      "desc": "",
      "name": "Hidden Power Fighting",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FIGHTING",
      "contestType": "CLEVER",
      "isViable": true
    },
    "HIDDENPOWERFIRE": {
      "id": "HIDDENPOWER",
      "num": 237,
      "accuracy": 100,
      "basePower": 60,
      "category": "SPECIAL",
      "desc": "",
      "name": "Hidden Power Fire",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FIRE",
      "contestType": "CLEVER",
      "isViable": true
    },
    "HIDDENPOWERFLYING": {
      "id": "HIDDENPOWER",
      "num": 237,
      "accuracy": 100,
      "basePower": 60,
      "category": "SPECIAL",
      "desc": "",
      "name": "Hidden Power Flying",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FLYING",
      "contestType": "CLEVER"
    },
    "HIDDENPOWERGHOST": {
      "id": "HIDDENPOWER",
      "num": 237,
      "accuracy": 100,
      "basePower": 60,
      "category": "SPECIAL",
      "desc": "",
      "name": "Hidden Power Ghost",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GHOST",
      "contestType": "CLEVER"
    },
    "HIDDENPOWERGRASS": {
      "id": "HIDDENPOWER",
      "num": 237,
      "accuracy": 100,
      "basePower": 60,
      "category": "SPECIAL",
      "desc": "",
      "name": "Hidden Power Grass",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GRASS",
      "contestType": "CLEVER",
      "isViable": true
    },
    "HIDDENPOWERGROUND": {
      "id": "HIDDENPOWER",
      "num": 237,
      "accuracy": 100,
      "basePower": 60,
      "category": "SPECIAL",
      "desc": "",
      "name": "Hidden Power Ground",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GROUND",
      "contestType": "CLEVER"
    },
    "HIDDENPOWERICE": {
      "id": "HIDDENPOWER",
      "num": 237,
      "accuracy": 100,
      "basePower": 60,
      "category": "SPECIAL",
      "desc": "",
      "name": "Hidden Power Ice",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "ICE",
      "contestType": "CLEVER",
      "isViable": true
    },
    "HIDDENPOWERPOISON": {
      "id": "HIDDENPOWER",
      "num": 237,
      "accuracy": 100,
      "basePower": 60,
      "category": "SPECIAL",
      "desc": "",
      "name": "Hidden Power Poison",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "POISON",
      "contestType": "CLEVER"
    },
    "HIDDENPOWERPSYCHIC": {
      "id": "HIDDENPOWER",
      "num": 237,
      "accuracy": 100,
      "basePower": 60,
      "category": "SPECIAL",
      "desc": "",
      "name": "Hidden Power Psychic",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "PSYCHIC",
      "contestType": "CLEVER"
    },
    "HIDDENPOWERROCK": {
      "id": "HIDDENPOWER",
      "num": 237,
      "accuracy": 100,
      "basePower": 60,
      "category": "SPECIAL",
      "desc": "",
      "name": "Hidden Power Rock",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "ROCK",
      "contestType": "CLEVER"
    },
    "HIDDENPOWERSTEEL": {
      "id": "HIDDENPOWER",
      "num": 237,
      "accuracy": 100,
      "basePower": 60,
      "category": "SPECIAL",
      "desc": "",
      "name": "Hidden Power Steel",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "STEEL",
      "contestType": "CLEVER"
    },
    "HIDDENPOWERWATER": {
      "id": "HIDDENPOWER",
      "num": 237,
      "accuracy": 100,
      "basePower": 60,
      "category": "SPECIAL",
      "desc": "",
      "name": "Hidden Power Water",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "WATER",
      "contestType": "CLEVER"
    },
    "HIGHHORSEPOWER": {
      "id": "HIGHHORSEPOWER",
      "num": 667,
      "accuracy": 95,
      "basePower": 95,
      "category": "PHYSICAL",
      "desc": "No additional effect.",
      "name": "High Horsepower",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GROUND",
      "contestType": "TOUGH",
      "zMovePower": 175
    },
    "HIGHJUMPKICK": {
      "id": "HIGHJUMPKICK",
      "num": 136,
      "accuracy": 90,
      "basePower": 130,
      "category": "PHYSICAL",
      "desc": "User is hurt by 50% of its max HP if it misses.",
      "name": "High Jump Kick",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1,
        "gravity": 1
      },
      "target": "NORMAL",
      "type": "FIGHTING",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 195
    },
    "HOLDBACK": {
      "id": "HOLDBACK",
      "num": 610,
      "accuracy": 100,
      "basePower": 40,
      "category": "PHYSICAL",
      "desc": "Always leaves the target with at least 1 HP.",
      "name": "Hold Back",
      "pp": 40,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "COOL",
      "zMovePower": 100
    },
    "HOLDHANDS": {
      "id": "HOLDHANDS",
      "num": 615,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "No competitive use. Or any use.",
      "name": "Hold Hands",
      "pp": 40,
      "priority": 0,
      "flags": {
        "authentic": 1
      },
      "target": "ADJACENTALLY",
      "type": "NORMAL",
      "contestType": "CUTE",
      "zMoveBoost": {
        "atk": 1,
        "def": 1,
        "spa": 1,
        "spd": 1,
        "spe": 1
      }
    },
    "HONECLAWS": {
      "id": "HONECLAWS",
      "num": 468,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Raises the user's Attack and accuracy by 1.",
      "name": "Hone Claws",
      "pp": 15,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "SELF",
      "type": "DARK",
      "contestType": "CUTE",
      "isViable": true,
      "boosts": {
        "atk": 1,
        "accuracy": 1
      },
      "zMoveBoost": {
        "atk": 1
      }
    },
    "HORNATTACK": {
      "id": "HORNATTACK",
      "num": 30,
      "accuracy": 100,
      "basePower": 65,
      "category": "PHYSICAL",
      "desc": "No additional effect.",
      "name": "Horn Attack",
      "pp": 25,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "COOL",
      "zMovePower": 120
    },
    "HORNDRILL": {
      "id": "HORNDRILL",
      "num": 32,
      "accuracy": 30,
      "basePower": 0,
      "category": "PHYSICAL",
      "desc": "OHKOs the target. Fails if user is a lower level.",
      "name": "Horn Drill",
      "pp": 5,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "COOL",
      "zMovePower": 180
    },
    "HORNLEECH": {
      "id": "HORNLEECH",
      "num": 532,
      "accuracy": 100,
      "basePower": 75,
      "category": "PHYSICAL",
      "desc": "User recovers 50% of the damage dealt.",
      "name": "Horn Leech",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1,
        "heal": 1
      },
      "target": "NORMAL",
      "type": "GRASS",
      "contestType": "TOUGH",
      "drain": [
        1,
        2
      ],
      "isViable": true,
      "zMovePower": 140
    },
    "HOWL": {
      "id": "HOWL",
      "num": 336,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Raises the user's Attack by 1.",
      "name": "Howl",
      "pp": 40,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "SELF",
      "type": "NORMAL",
      "contestType": "COOL",
      "boosts": {
        "atk": 1
      },
      "zMoveBoost": {
        "atk": 1
      }
    },
    "HURRICANE": {
      "id": "HURRICANE",
      "num": 542,
      "accuracy": 70,
      "basePower": 110,
      "category": "SPECIAL",
      "desc": "30% chance to confuse target. Can't miss in rain.",
      "name": "Hurricane",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "distance": 1
      },
      "target": "ANY",
      "type": "FLYING",
      "contestType": "TOUGH",
      "isViable": true,
      "zMovePower": 185
    },
    "HYDROCANNON": {
      "id": "HYDROCANNON",
      "num": 308,
      "accuracy": 90,
      "basePower": 150,
      "category": "SPECIAL",
      "desc": "User cannot move next turn.",
      "name": "Hydro Cannon",
      "pp": 5,
      "priority": 0,
      "flags": {
        "recharge": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "WATER",
      "contestType": "BEAUTIFUL",
      "zMovePower": 200
    },
    "HYDROPUMP": {
      "id": "HYDROPUMP",
      "num": 56,
      "accuracy": 80,
      "basePower": 110,
      "category": "SPECIAL",
      "desc": "No additional effect.",
      "name": "Hydro Pump",
      "pp": 5,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "WATER",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 185
    },
    "HYDROVORTEX": {
      "id": "HYDROVORTEX",
      "num": 642,
      "accuracy": true,
      "basePower": 1,
      "category": "PHYSICAL",
      "desc": "Power is equal to the base move's Z-Power.",
      "name": "Hydro Vortex",
      "pp": 1,
      "priority": 0,
      "flags": {},
      "target": "NORMAL",
      "type": "WATER",
      "contestType": "COOL",
      "isViable": true,
      "isZ": "wateriumz"
    },
    "HYPERBEAM": {
      "id": "HYPERBEAM",
      "num": 63,
      "accuracy": 90,
      "basePower": 150,
      "category": "SPECIAL",
      "desc": "User cannot move next turn.",
      "name": "Hyper Beam",
      "pp": 5,
      "priority": 0,
      "flags": {
        "recharge": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "COOL",
      "zMovePower": 200
    },
    "HYPERFANG": {
      "id": "HYPERFANG",
      "num": 158,
      "accuracy": 90,
      "basePower": 80,
      "category": "PHYSICAL",
      "desc": "10% chance to flinch the target.",
      "name": "Hyper Fang",
      "pp": 15,
      "priority": 0,
      "flags": {
        "bite": 1,
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "COOL",
      "zMovePower": 160
    },
    "HYPERSPACEFURY": {
      "id": "HYPERSPACEFURY",
      "num": 621,
      "accuracy": true,
      "basePower": 100,
      "category": "PHYSICAL",
      "desc": "Hoopa-U: Lowers user's Def by 1; breaks protection.",
      "name": "Hyperspace Fury",
      "pp": 5,
      "priority": 0,
      "flags": {
        "mirror": 1,
        "authentic": 1
      },
      "target": "NORMAL",
      "type": "DARK",
      "contestType": "TOUGH",
      "isViable": true,
      "breaksProtect": true,
      "zMovePower": 180
    },
    "HYPERSPACEHOLE": {
      "id": "HYPERSPACEHOLE",
      "num": 593,
      "accuracy": true,
      "basePower": 80,
      "category": "SPECIAL",
      "desc": "Breaks the target's protection for this turn.",
      "name": "Hyperspace Hole",
      "pp": 5,
      "priority": 0,
      "flags": {
        "mirror": 1,
        "authentic": 1
      },
      "target": "NORMAL",
      "type": "PSYCHIC",
      "contestType": "CLEVER",
      "breaksProtect": true,
      "zMovePower": 160
    },
    "HYPERVOICE": {
      "id": "HYPERVOICE",
      "num": 304,
      "accuracy": 100,
      "basePower": 90,
      "category": "SPECIAL",
      "desc": "No additional effect. Hits adjacent foes.",
      "name": "Hyper Voice",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "sound": 1,
        "authentic": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "NORMAL",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 175
    },
    "HYPNOSIS": {
      "id": "HYPNOSIS",
      "num": 95,
      "accuracy": 60,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Puts the target to sleep.",
      "name": "Hypnosis",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "PSYCHIC",
      "contestType": "CLEVER",
      "status": "slp",
      "zMoveBoost": {
        "spe": 1
      }
    },
    "ICEBALL": {
      "id": "ICEBALL",
      "num": 301,
      "accuracy": 90,
      "basePower": 30,
      "category": "PHYSICAL",
      "desc": "Power doubles with each hit. Repeats for 5 turns.",
      "name": "Ice Ball",
      "pp": 20,
      "priority": 0,
      "flags": {
        "bullet": 1,
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "ICE",
      "contestType": "BEAUTIFUL",
      "zMovePower": 100
    },
    "ICEBEAM": {
      "id": "ICEBEAM",
      "num": 58,
      "accuracy": 100,
      "basePower": 90,
      "category": "SPECIAL",
      "desc": "10% chance to freeze the target.",
      "name": "Ice Beam",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "ICE",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 175
    },
    "ICEBURN": {
      "id": "ICEBURN",
      "num": 554,
      "accuracy": 90,
      "basePower": 140,
      "category": "SPECIAL",
      "desc": "Charges turn 1. Hits turn 2. 30% burn.",
      "name": "Ice Burn",
      "pp": 5,
      "priority": 0,
      "flags": {
        "charge": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "ICE",
      "contestType": "BEAUTIFUL",
      "zMovePower": 200
    },
    "ICEFANG": {
      "id": "ICEFANG",
      "num": 423,
      "accuracy": 95,
      "basePower": 65,
      "category": "PHYSICAL",
      "desc": "10% chance to freeze. 10% chance to flinch.",
      "name": "Ice Fang",
      "pp": 15,
      "priority": 0,
      "flags": {
        "bite": 1,
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "ICE",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 120
    },
    "ICEHAMMER": {
      "id": "ICEHAMMER",
      "num": 665,
      "accuracy": 90,
      "basePower": 100,
      "category": "PHYSICAL",
      "desc": "Lowers the user's Speed by 1.",
      "name": "Ice Hammer",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1,
        "punch": 1
      },
      "target": "NORMAL",
      "type": "ICE",
      "contestType": "TOUGH",
      "isViable": true,
      "zMovePower": 180
    },
    "ICEPUNCH": {
      "id": "ICEPUNCH",
      "num": 8,
      "accuracy": 100,
      "basePower": 75,
      "category": "PHYSICAL",
      "desc": "10% chance to freeze the target.",
      "name": "Ice Punch",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1,
        "punch": 1
      },
      "target": "NORMAL",
      "type": "ICE",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 140
    },
    "ICESHARD": {
      "id": "ICESHARD",
      "num": 420,
      "accuracy": 100,
      "basePower": 40,
      "category": "PHYSICAL",
      "desc": "Usually goes first.",
      "name": "Ice Shard",
      "pp": 30,
      "priority": 1,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "ICE",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 100
    },
    "ICICLECRASH": {
      "id": "ICICLECRASH",
      "num": 556,
      "accuracy": 90,
      "basePower": 85,
      "category": "PHYSICAL",
      "desc": "30% chance to flinch the target.",
      "name": "Icicle Crash",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "ICE",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 160
    },
    "ICICLESPEAR": {
      "id": "ICICLESPEAR",
      "num": 333,
      "accuracy": 100,
      "basePower": 25,
      "category": "PHYSICAL",
      "desc": "Hits 2-5 times in one turn.",
      "name": "Icicle Spear",
      "pp": 30,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "ICE",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "multihit": [
        2,
        5
      ],
      "zMovePower": 140
    },
    "ICYWIND": {
      "id": "ICYWIND",
      "num": 196,
      "accuracy": 95,
      "basePower": 55,
      "category": "SPECIAL",
      "desc": "100% chance to lower the foe(s) Speed by 1.",
      "name": "Icy Wind",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "ICE",
      "contestType": "BEAUTIFUL",
      "zMovePower": 100
    },
    "IMPRISON": {
      "id": "IMPRISON",
      "num": 286,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "No foe can use any move known by the user.",
      "name": "Imprison",
      "pp": 10,
      "priority": 0,
      "flags": {
        "snatch": 1,
        "authentic": 1
      },
      "target": "SELF",
      "type": "PSYCHIC",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "spd": 2
      }
    },
    "INCINERATE": {
      "id": "INCINERATE",
      "num": 510,
      "accuracy": 100,
      "basePower": 60,
      "category": "SPECIAL",
      "desc": "Destroys the foe(s) Berry/Gem.",
      "name": "Incinerate",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "FIRE",
      "contestType": "TOUGH",
      "zMovePower": 120
    },
    "INFERNO": {
      "id": "INFERNO",
      "num": 517,
      "accuracy": 50,
      "basePower": 100,
      "category": "SPECIAL",
      "desc": "100% chance to burn the target.",
      "name": "Inferno",
      "pp": 5,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FIRE",
      "contestType": "BEAUTIFUL",
      "zMovePower": 180
    },
    "INFERNOOVERDRIVE": {
      "id": "INFERNOOVERDRIVE",
      "num": 640,
      "accuracy": true,
      "basePower": 1,
      "category": "PHYSICAL",
      "desc": "Power is equal to the base move's Z-Power.",
      "name": "Inferno Overdrive",
      "pp": 1,
      "priority": 0,
      "flags": {},
      "target": "NORMAL",
      "type": "FIRE",
      "contestType": "COOL",
      "isViable": true,
      "isZ": "firiumz"
    },
    "INFESTATION": {
      "id": "INFESTATION",
      "num": 611,
      "accuracy": 100,
      "basePower": 20,
      "category": "SPECIAL",
      "desc": "Traps and damages the target for 4-5 turns.",
      "name": "Infestation",
      "pp": 20,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "BUG",
      "contestType": "CUTE",
      "zMovePower": 100
    },
    "INGRAIN": {
      "id": "INGRAIN",
      "num": 275,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Traps/grounds user; heals 1/16 max HP per turn.",
      "name": "Ingrain",
      "pp": 20,
      "priority": 0,
      "flags": {
        "snatch": 1,
        "nonsky": 1
      },
      "target": "SELF",
      "type": "GRASS",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "spd": 1
      }
    },
    "INSTRUCT": {
      "id": "INSTRUCT",
      "num": 689,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "The target immediately uses its last used move.",
      "name": "Instruct",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "authentic": 1,
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "PSYCHIC",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "spa": 1
      }
    },
    "IONDELUGE": {
      "id": "IONDELUGE",
      "num": 569,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Normal moves become Electric type this turn.",
      "name": "Ion Deluge",
      "pp": 25,
      "priority": 1,
      "flags": {},
      "target": "ALL",
      "type": "ELECTRIC",
      "contestType": "BEAUTIFUL",
      "zMoveBoost": {
        "spa": 1
      }
    },
    "IRONDEFENSE": {
      "id": "IRONDEFENSE",
      "num": 334,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Raises the user's Defense by 2.",
      "name": "Iron Defense",
      "pp": 15,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "SELF",
      "type": "STEEL",
      "contestType": "TOUGH",
      "boosts": {
        "def": 2
      },
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "IRONHEAD": {
      "id": "IRONHEAD",
      "num": 442,
      "accuracy": 100,
      "basePower": 80,
      "category": "PHYSICAL",
      "desc": "30% chance to flinch the target.",
      "name": "Iron Head",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "STEEL",
      "contestType": "TOUGH",
      "isViable": true,
      "zMovePower": 160
    },
    "IRONTAIL": {
      "id": "IRONTAIL",
      "num": 231,
      "accuracy": 75,
      "basePower": 100,
      "category": "PHYSICAL",
      "desc": "30% chance to lower the target's Defense by 1.",
      "name": "Iron Tail",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "STEEL",
      "contestType": "COOL",
      "zMovePower": 180
    },
    "JUDGMENT": {
      "id": "JUDGMENT",
      "num": 449,
      "accuracy": 100,
      "basePower": 100,
      "category": "SPECIAL",
      "desc": "Type varies based on the held Plate.",
      "name": "Judgment",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 180
    },
    "JUMPKICK": {
      "id": "JUMPKICK",
      "num": 26,
      "accuracy": 95,
      "basePower": 100,
      "category": "PHYSICAL",
      "desc": "User is hurt by 50% of its max HP if it misses.",
      "name": "Jump Kick",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1,
        "gravity": 1
      },
      "target": "NORMAL",
      "type": "FIGHTING",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 180
    },
    "KARATECHOP": {
      "id": "KARATECHOP",
      "num": 2,
      "accuracy": 100,
      "basePower": 50,
      "category": "PHYSICAL",
      "desc": "High critical hit ratio.",
      "name": "Karate Chop",
      "pp": 25,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FIGHTING",
      "contestType": "TOUGH",
      "critRatio": 2,
      "zMovePower": 100
    },
    "KINESIS": {
      "id": "KINESIS",
      "num": 134,
      "accuracy": 80,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Lowers the target's accuracy by 1.",
      "name": "Kinesis",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "PSYCHIC",
      "contestType": "CLEVER",
      "boosts": {
        "accuracy": -1
      },
      "zMoveBoost": {
        "evasion": 1
      }
    },
    "KINGSSHIELD": {
      "id": "KINGSSHIELD",
      "num": 588,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Protects from attacks. Contact: lowers Atk by 2.",
      "name": "King's Shield",
      "pp": 10,
      "priority": 4,
      "flags": {},
      "target": "SELF",
      "type": "STEEL",
      "contestType": "COOL",
      "isViable": true,
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "KNOCKOFF": {
      "id": "KNOCKOFF",
      "num": 282,
      "accuracy": 100,
      "basePower": 65,
      "category": "PHYSICAL",
      "desc": "1.5x damage if foe holds an item. Removes item.",
      "name": "Knock Off",
      "pp": 20,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "DARK",
      "contestType": "CLEVER",
      "isViable": true,
      "zMovePower": 120
    },
    "LANDSWRATH": {
      "id": "LANDSWRATH",
      "num": 616,
      "accuracy": 100,
      "basePower": 90,
      "category": "PHYSICAL",
      "desc": "No additional effect. Hits adjacent foes.",
      "name": "Land's Wrath",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "nonsky": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "GROUND",
      "contestType": "BEAUTIFUL",
      "zMovePower": 185
    },
    "LASERFOCUS": {
      "id": "LASERFOCUS",
      "num": 673,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Next turn, the user's attack will be a critical hit.",
      "name": "Laser Focus",
      "pp": 30,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "SELF",
      "type": "NORMAL",
      "contestType": "COOL",
      "zMoveBoost": {
        "atk": 1
      }
    },
    "LASTRESORT": {
      "id": "LASTRESORT",
      "num": 387,
      "accuracy": 100,
      "basePower": 140,
      "category": "PHYSICAL",
      "desc": "Fails unless each known move has been used.",
      "name": "Last Resort",
      "pp": 5,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CUTE",
      "zMovePower": 200
    },
    "LAVAPLUME": {
      "id": "LAVAPLUME",
      "num": 436,
      "accuracy": 100,
      "basePower": 80,
      "category": "SPECIAL",
      "desc": "30% chance to burn adjacent Pokemon.",
      "name": "Lava Plume",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "ALLADJACENT",
      "type": "FIRE",
      "contestType": "TOUGH",
      "isViable": true,
      "zMovePower": 160
    },
    "LEAFBLADE": {
      "id": "LEAFBLADE",
      "num": 348,
      "accuracy": 100,
      "basePower": 90,
      "category": "PHYSICAL",
      "desc": "High critical hit ratio.",
      "name": "Leaf Blade",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GRASS",
      "contestType": "COOL",
      "critRatio": 2,
      "isViable": true,
      "zMovePower": 175
    },
    "LEAFSTORM": {
      "id": "LEAFSTORM",
      "num": 437,
      "accuracy": 90,
      "basePower": 130,
      "category": "SPECIAL",
      "desc": "Lowers the user's Sp. Atk by 2.",
      "name": "Leaf Storm",
      "pp": 5,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GRASS",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 195
    },
    "LEAFTORNADO": {
      "id": "LEAFTORNADO",
      "num": 536,
      "accuracy": 90,
      "basePower": 65,
      "category": "SPECIAL",
      "desc": "50% chance to lower the target's accuracy by 1.",
      "name": "Leaf Tornado",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GRASS",
      "contestType": "COOL",
      "zMovePower": 120
    },
    "LEAFAGE": {
      "id": "LEAFAGE",
      "num": 670,
      "accuracy": 100,
      "basePower": 40,
      "category": "PHYSICAL",
      "desc": "No additional effect.",
      "name": "Leafage",
      "pp": 40,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GRASS",
      "contestType": "TOUGH",
      "zMovePower": 100
    },
    "LEECHLIFE": {
      "id": "LEECHLIFE",
      "num": 141,
      "accuracy": 100,
      "basePower": 80,
      "category": "PHYSICAL",
      "desc": "User recovers 50% of the damage dealt.",
      "name": "Leech Life",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1,
        "heal": 1
      },
      "target": "NORMAL",
      "type": "BUG",
      "contestType": "CLEVER",
      "drain": [
        1,
        2
      ],
      "isViable": true,
      "zMovePower": 160
    },
    "LEECHSEED": {
      "id": "LEECHSEED",
      "num": 73,
      "accuracy": 90,
      "basePower": 0,
      "category": "STATUS",
      "desc": "1/8 of target's HP is restored to user every turn.",
      "name": "Leech Seed",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GRASS",
      "contestType": "CLEVER",
      "isViable": true,
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "LEER": {
      "id": "LEER",
      "num": 43,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Lowers the foe(s) Defense by 1.",
      "name": "Leer",
      "pp": 30,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "NORMAL",
      "contestType": "COOL",
      "boosts": {
        "def": -1
      },
      "zMoveBoost": {
        "atk": 1
      }
    },
    "LETSSNUGGLEFOREVER": {
      "id": "LETSSNUGGLEFOREVER",
      "num": 726,
      "accuracy": true,
      "basePower": 190,
      "category": "PHYSICAL",
      "desc": "No additional effect.",
      "name": "Let's Snuggle Forever",
      "pp": 1,
      "priority": 0,
      "flags": {
        "contact": 1
      },
      "target": "NORMAL",
      "type": "FAIRY",
      "contestType": "COOL",
      "isZ": "mimikiumz"
    },
    "LICK": {
      "id": "LICK",
      "num": 122,
      "accuracy": 100,
      "basePower": 30,
      "category": "PHYSICAL",
      "desc": "30% chance to paralyze the target.",
      "name": "Lick",
      "pp": 30,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GHOST",
      "contestType": "CUTE",
      "zMovePower": 100
    },
    "LIGHTOFRUIN": {
      "id": "LIGHTOFRUIN",
      "num": 617,
      "accuracy": 90,
      "basePower": 140,
      "category": "SPECIAL",
      "desc": "Has 1/2 recoil.",
      "name": "Light of Ruin",
      "pp": 5,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FAIRY",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "recoil": [
        1,
        2
      ],
      "zMovePower": 200
    },
    "LIGHTSCREEN": {
      "id": "LIGHTSCREEN",
      "num": 113,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "For 5 turns, special damage to allies is halved.",
      "name": "Light Screen",
      "pp": 30,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "ALLYSIDE",
      "type": "PSYCHIC",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "sideCondition": "lightscreen",
      "zMoveBoost": {
        "spd": 1
      }
    },
    "LIGHTTHATBURNSTHESKY": {
      "id": "LIGHTTHATBURNSTHESKY",
      "num": 723,
      "accuracy": true,
      "basePower": 200,
      "category": "SPECIAL",
      "desc": "Physical if user's Atk > Sp. Atk. Ignores Abilities.",
      "name": "Light That Burns the Sky",
      "pp": 1,
      "priority": 0,
      "flags": {},
      "target": "NORMAL",
      "type": "PSYCHIC",
      "contestType": "COOL",
      "isZ": "ultranecroziumz"
    },
    "LIQUIDATION": {
      "id": "LIQUIDATION",
      "num": 710,
      "accuracy": 100,
      "basePower": 85,
      "category": "PHYSICAL",
      "desc": "20% chance to lower the target's Defense by 1.",
      "name": "Liquidation",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "WATER",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 160
    },
    "LOCKON": {
      "id": "LOCKON",
      "num": 199,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "User's next move will not miss the target.",
      "name": "Lock-On",
      "pp": 5,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "spe": 1
      }
    },
    "LOVELYKISS": {
      "id": "LOVELYKISS",
      "num": 142,
      "accuracy": 75,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Puts the target to sleep.",
      "name": "Lovely Kiss",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "status": "slp",
      "zMoveBoost": {
        "spe": 1
      }
    },
    "LOWKICK": {
      "id": "LOWKICK",
      "num": 67,
      "accuracy": 100,
      "basePower": 0,
      "category": "PHYSICAL",
      "desc": "More power the heavier the target.",
      "name": "Low Kick",
      "pp": 20,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FIGHTING",
      "contestType": "TOUGH",
      "isViable": true,
      "zMovePower": 160
    },
    "LOWSWEEP": {
      "id": "LOWSWEEP",
      "num": 490,
      "accuracy": 100,
      "basePower": 65,
      "category": "PHYSICAL",
      "desc": "100% chance to lower the target's Speed by 1.",
      "name": "Low Sweep",
      "pp": 20,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FIGHTING",
      "contestType": "CLEVER",
      "zMovePower": 120
    },
    "LUCKYCHANT": {
      "id": "LUCKYCHANT",
      "num": 381,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "For 5 turns, shields user's party from critical hits.",
      "name": "Lucky Chant",
      "pp": 30,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "ALLYSIDE",
      "type": "NORMAL",
      "contestType": "CUTE",
      "sideCondition": "luckychant",
      "zMoveBoost": {
        "evasion": 1
      }
    },
    "LUNARDANCE": {
      "id": "LUNARDANCE",
      "num": 461,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "User faints. Replacement is fully healed, with PP.",
      "name": "Lunar Dance",
      "pp": 10,
      "priority": 0,
      "flags": {
        "snatch": 1,
        "heal": 1,
        "dance": 1
      },
      "target": "SELF",
      "type": "PSYCHIC",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "sideCondition": "lunardance"
    },
    "LUNGE": {
      "id": "LUNGE",
      "num": 679,
      "accuracy": 100,
      "basePower": 80,
      "category": "PHYSICAL",
      "desc": "100% chance to lower the target's Attack by 1.",
      "name": "Lunge",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "BUG",
      "contestType": "CUTE",
      "isViable": true,
      "zMovePower": 160
    },
    "LUSTERPURGE": {
      "id": "LUSTERPURGE",
      "num": 295,
      "accuracy": 100,
      "basePower": 70,
      "category": "SPECIAL",
      "desc": "50% chance to lower the target's Sp. Def by 1.",
      "name": "Luster Purge",
      "pp": 5,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "PSYCHIC",
      "contestType": "CLEVER",
      "zMovePower": 140
    },
    "MACHPUNCH": {
      "id": "MACHPUNCH",
      "num": 183,
      "accuracy": 100,
      "basePower": 40,
      "category": "PHYSICAL",
      "desc": "Usually goes first.",
      "name": "Mach Punch",
      "pp": 30,
      "priority": 1,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1,
        "punch": 1
      },
      "target": "NORMAL",
      "type": "FIGHTING",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 100
    },
    "MAGICCOAT": {
      "id": "MAGICCOAT",
      "num": 277,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Bounces back certain non-damaging moves.",
      "name": "Magic Coat",
      "pp": 15,
      "priority": 4,
      "flags": {},
      "target": "SELF",
      "type": "PSYCHIC",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMoveBoost": {
        "spd": 2
      }
    },
    "MAGICROOM": {
      "id": "MAGICROOM",
      "num": 478,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "For 5 turns, all held items have no effect.",
      "name": "Magic Room",
      "pp": 10,
      "priority": 0,
      "flags": {
        "mirror": 1
      },
      "target": "ALL",
      "type": "PSYCHIC",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "spd": 1
      }
    },
    "MAGICALLEAF": {
      "id": "MAGICALLEAF",
      "num": 345,
      "accuracy": true,
      "basePower": 60,
      "category": "SPECIAL",
      "desc": "This move does not check accuracy.",
      "name": "Magical Leaf",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GRASS",
      "contestType": "BEAUTIFUL",
      "zMovePower": 120
    },
    "MAGMASTORM": {
      "id": "MAGMASTORM",
      "num": 463,
      "accuracy": 75,
      "basePower": 100,
      "category": "SPECIAL",
      "desc": "Traps and damages the target for 4-5 turns.",
      "name": "Magma Storm",
      "pp": 5,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FIRE",
      "contestType": "TOUGH",
      "isViable": true,
      "zMovePower": 180
    },
    "MAGNETBOMB": {
      "id": "MAGNETBOMB",
      "num": 443,
      "accuracy": true,
      "basePower": 60,
      "category": "PHYSICAL",
      "desc": "This move does not check accuracy.",
      "name": "Magnet Bomb",
      "pp": 20,
      "priority": 0,
      "flags": {
        "bullet": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "STEEL",
      "contestType": "COOL",
      "zMovePower": 120
    },
    "MAGNETICFLUX": {
      "id": "MAGNETICFLUX",
      "num": 602,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Raises Def, Sp. Def of allies with Plus/Minus by 1.",
      "name": "Magnetic Flux",
      "pp": 20,
      "priority": 0,
      "flags": {
        "snatch": 1,
        "distance": 1,
        "authentic": 1
      },
      "target": "ALLYSIDE",
      "type": "ELECTRIC",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "spd": 1
      }
    },
    "MAGNETRISE": {
      "id": "MAGNETRISE",
      "num": 393,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "For 5 turns, the user is immune to Ground moves.",
      "name": "Magnet Rise",
      "pp": 10,
      "priority": 0,
      "flags": {
        "snatch": 1,
        "gravity": 1
      },
      "target": "SELF",
      "type": "ELECTRIC",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "evasion": 1
      }
    },
    "MAGNITUDE": {
      "id": "MAGNITUDE",
      "num": 222,
      "accuracy": 100,
      "basePower": 0,
      "category": "PHYSICAL",
      "desc": "Hits adjacent Pokemon. Power varies; 2x on Dig.",
      "name": "Magnitude",
      "pp": 30,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "nonsky": 1
      },
      "target": "ALLADJACENT",
      "type": "GROUND",
      "contestType": "TOUGH",
      "zMovePower": 140
    },
    "MALICIOUSMOONSAULT": {
      "id": "MALICIOUSMOONSAULT",
      "num": 696,
      "accuracy": true,
      "basePower": 180,
      "category": "PHYSICAL",
      "desc": "No additional effect.",
      "name": "Malicious Moonsault",
      "pp": 1,
      "priority": 0,
      "flags": {
        "contact": 1
      },
      "target": "NORMAL",
      "type": "DARK",
      "contestType": "COOL",
      "isZ": "inciniumz"
    },
    "MATBLOCK": {
      "id": "MATBLOCK",
      "num": 561,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Protects allies from attacks. First turn out only.",
      "name": "Mat Block",
      "pp": 10,
      "priority": 0,
      "flags": {
        "snatch": 1,
        "nonsky": 1
      },
      "target": "ALLYSIDE",
      "type": "FIGHTING",
      "contestType": "COOL",
      "sideCondition": "matblock",
      "zMoveBoost": {
        "def": 1
      }
    },
    "MEFIRST": {
      "id": "MEFIRST",
      "num": 382,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Copies a foe at 1.5x power. User must be faster.",
      "name": "Me First",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "authentic": 1
      },
      "target": "ADJACENTFOE",
      "type": "NORMAL",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "spe": 2
      }
    },
    "MEANLOOK": {
      "id": "MEANLOOK",
      "num": 212,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "The target cannot switch out.",
      "name": "Mean Look",
      "pp": 5,
      "priority": 0,
      "flags": {
        "reflectable": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "BEAUTIFUL",
      "zMoveBoost": {
        "spd": 1
      }
    },
    "MEDITATE": {
      "id": "MEDITATE",
      "num": 96,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Raises the user's Attack by 1.",
      "name": "Meditate",
      "pp": 40,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "SELF",
      "type": "PSYCHIC",
      "contestType": "BEAUTIFUL",
      "boosts": {
        "atk": 1
      },
      "zMoveBoost": {
        "atk": 1
      }
    },
    "MEGADRAIN": {
      "id": "MEGADRAIN",
      "num": 72,
      "accuracy": 100,
      "basePower": 40,
      "category": "SPECIAL",
      "desc": "User recovers 50% of the damage dealt.",
      "name": "Mega Drain",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "heal": 1
      },
      "target": "NORMAL",
      "type": "GRASS",
      "contestType": "CLEVER",
      "drain": [
        1,
        2
      ],
      "zMovePower": 120
    },
    "MEGAKICK": {
      "id": "MEGAKICK",
      "num": 25,
      "accuracy": 75,
      "basePower": 120,
      "category": "PHYSICAL",
      "desc": "No additional effect.",
      "name": "Mega Kick",
      "pp": 5,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "COOL",
      "zMovePower": 190
    },
    "MEGAPUNCH": {
      "id": "MEGAPUNCH",
      "num": 5,
      "accuracy": 85,
      "basePower": 80,
      "category": "PHYSICAL",
      "desc": "No additional effect.",
      "name": "Mega Punch",
      "pp": 20,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1,
        "punch": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "TOUGH",
      "zMovePower": 160
    },
    "MEGAHORN": {
      "id": "MEGAHORN",
      "num": 224,
      "accuracy": 85,
      "basePower": 120,
      "category": "PHYSICAL",
      "desc": "No additional effect.",
      "name": "Megahorn",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "BUG",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 190
    },
    "MEMENTO": {
      "id": "MEMENTO",
      "num": 262,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Lowers target's Attack, Sp. Atk by 2. User faints.",
      "name": "Memento",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "DARK",
      "contestType": "TOUGH",
      "isViable": true,
      "boosts": {
        "atk": -2,
        "spa": -2
      },
      "zMoveEffect": "HEALREPLACEMENT"
    },
    "MENACINGMOONRAZEMAELSTROM": {
      "id": "MENACINGMOONRAZEMAELSTROM",
      "num": 725,
      "accuracy": true,
      "basePower": 200,
      "category": "SPECIAL",
      "desc": "Ignores the Abilities of other Pokemon.",
      "name": "Menacing Moonraze Maelstrom",
      "pp": 1,
      "priority": 0,
      "flags": {},
      "target": "NORMAL",
      "type": "GHOST",
      "contestType": "COOL",
      "isZ": "lunaliumz"
    },
    "METALBURST": {
      "id": "METALBURST",
      "num": 368,
      "accuracy": 100,
      "basePower": 0,
      "category": "PHYSICAL",
      "desc": "If hit by an attack, returns 1.5x damage.",
      "name": "Metal Burst",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "SCRIPTED",
      "type": "STEEL",
      "contestType": "COOL",
      "zMovePower": 100
    },
    "METALCLAW": {
      "id": "METALCLAW",
      "num": 232,
      "accuracy": 95,
      "basePower": 50,
      "category": "PHYSICAL",
      "desc": "10% chance to raise the user's Attack by 1.",
      "name": "Metal Claw",
      "pp": 35,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "STEEL",
      "contestType": "COOL",
      "zMovePower": 100
    },
    "METALSOUND": {
      "id": "METALSOUND",
      "num": 319,
      "accuracy": 85,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Lowers the target's Sp. Def by 2.",
      "name": "Metal Sound",
      "pp": 40,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1,
        "sound": 1,
        "authentic": 1,
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "STEEL",
      "contestType": "CLEVER",
      "boosts": {
        "spd": -2
      },
      "zMoveBoost": {
        "spa": 1
      }
    },
    "METEORMASH": {
      "id": "METEORMASH",
      "num": 309,
      "accuracy": 90,
      "basePower": 90,
      "category": "PHYSICAL",
      "desc": "20% chance to raise the user's Attack by 1.",
      "name": "Meteor Mash",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1,
        "punch": 1
      },
      "target": "NORMAL",
      "type": "STEEL",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 175
    },
    "METRONOME": {
      "id": "METRONOME",
      "num": 118,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Picks a random move.",
      "name": "Metronome",
      "pp": 10,
      "priority": 0,
      "flags": {},
      "target": "SELF",
      "type": "NORMAL",
      "contestType": "CUTE"
    },
    "MILKDRINK": {
      "id": "MILKDRINK",
      "num": 208,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Heals the user by 50% of its max HP.",
      "name": "Milk Drink",
      "pp": 10,
      "priority": 0,
      "flags": {
        "snatch": 1,
        "heal": 1
      },
      "target": "SELF",
      "type": "NORMAL",
      "contestType": "CUTE",
      "isViable": true,
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "MIMIC": {
      "id": "MIMIC",
      "num": 102,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "The last move the target used replaces this one.",
      "name": "Mimic",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "authentic": 1,
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CUTE",
      "zMoveBoost": {
        "accuracy": 1
      }
    },
    "MINDBLOWN": {
      "id": "MINDBLOWN",
      "num": 720,
      "accuracy": 100,
      "basePower": 150,
      "category": "SPECIAL",
      "desc": "User loses 50% max HP. Hits adjacent Pokemon.",
      "name": "Mind Blown",
      "pp": 5,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "ALLADJACENT",
      "type": "FIRE",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 200
    },
    "MINDREADER": {
      "id": "MINDREADER",
      "num": 170,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "User's next move will not miss the target.",
      "name": "Mind Reader",
      "pp": 5,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "spa": 1
      }
    },
    "MINIMIZE": {
      "id": "MINIMIZE",
      "num": 107,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Raises the user's evasiveness by 2.",
      "name": "Minimize",
      "pp": 10,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "SELF",
      "type": "NORMAL",
      "contestType": "CUTE",
      "boosts": {
        "evasion": 2
      },
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "MIRACLEEYE": {
      "id": "MIRACLEEYE",
      "num": 357,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Psychic hits Dark. Evasiveness ignored.",
      "name": "Miracle Eye",
      "pp": 40,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1,
        "authentic": 1
      },
      "target": "NORMAL",
      "type": "PSYCHIC",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "spa": 1
      }
    },
    "MIRRORCOAT": {
      "id": "MIRRORCOAT",
      "num": 243,
      "accuracy": 100,
      "basePower": 0,
      "category": "SPECIAL",
      "desc": "If hit by special attack, returns double damage.",
      "name": "Mirror Coat",
      "pp": 20,
      "priority": -5,
      "flags": {
        "protect": 1
      },
      "target": "SCRIPTED",
      "type": "PSYCHIC",
      "contestType": "BEAUTIFUL",
      "zMovePower": 100
    },
    "MIRRORMOVE": {
      "id": "MIRRORMOVE",
      "num": 119,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "User uses the target's last used move against it.",
      "name": "Mirror Move",
      "pp": 20,
      "priority": 0,
      "flags": {},
      "target": "NORMAL",
      "type": "FLYING",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "atk": 2
      }
    },
    "MIRRORSHOT": {
      "id": "MIRRORSHOT",
      "num": 429,
      "accuracy": 85,
      "basePower": 65,
      "category": "SPECIAL",
      "desc": "30% chance to lower the target's accuracy by 1.",
      "name": "Mirror Shot",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "STEEL",
      "contestType": "BEAUTIFUL",
      "zMovePower": 120
    },
    "MIST": {
      "id": "MIST",
      "num": 54,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "For 5 turns, protects user's party from stat drops.",
      "name": "Mist",
      "pp": 30,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "ALLYSIDE",
      "type": "ICE",
      "contestType": "BEAUTIFUL",
      "sideCondition": "mist",
      "zMoveEffect": "HEAL"
    },
    "MISTBALL": {
      "id": "MISTBALL",
      "num": 296,
      "accuracy": 100,
      "basePower": 70,
      "category": "SPECIAL",
      "desc": "50% chance to lower the target's Sp. Atk by 1.",
      "name": "Mist Ball",
      "pp": 5,
      "priority": 0,
      "flags": {
        "bullet": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "PSYCHIC",
      "contestType": "CLEVER",
      "zMovePower": 140
    },
    "MISTYTERRAIN": {
      "id": "MISTYTERRAIN",
      "num": 581,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "5 turns. Can't status,-Dragon power vs grounded.",
      "name": "Misty Terrain",
      "pp": 10,
      "priority": 0,
      "flags": {
        "nonsky": 1
      },
      "target": "ALL",
      "type": "FAIRY",
      "contestType": "BEAUTIFUL",
      "zMoveBoost": {
        "spd": 1
      }
    },
    "MOONBLAST": {
      "id": "MOONBLAST",
      "num": 585,
      "accuracy": 100,
      "basePower": 95,
      "category": "SPECIAL",
      "desc": "30% chance to lower the target's Sp. Atk by 1.",
      "name": "Moonblast",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FAIRY",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 175
    },
    "MOONGEISTBEAM": {
      "id": "MOONGEISTBEAM",
      "num": 714,
      "accuracy": 100,
      "basePower": 100,
      "category": "SPECIAL",
      "desc": "Ignores the Abilities of other Pokemon.",
      "name": "Moongeist Beam",
      "pp": 5,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GHOST",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 180
    },
    "MOONLIGHT": {
      "id": "MOONLIGHT",
      "num": 236,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Heals the user by a weather-dependent amount.",
      "name": "Moonlight",
      "pp": 5,
      "priority": 0,
      "flags": {
        "snatch": 1,
        "heal": 1
      },
      "target": "SELF",
      "type": "FAIRY",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "MORNINGSUN": {
      "id": "MORNINGSUN",
      "num": 234,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Heals the user by a weather-dependent amount.",
      "name": "Morning Sun",
      "pp": 5,
      "priority": 0,
      "flags": {
        "snatch": 1,
        "heal": 1
      },
      "target": "SELF",
      "type": "NORMAL",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "MUDSLAP": {
      "id": "MUDSLAP",
      "num": 189,
      "accuracy": 100,
      "basePower": 20,
      "category": "SPECIAL",
      "desc": "100% chance to lower the target's accuracy by 1.",
      "name": "Mud-Slap",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GROUND",
      "contestType": "CUTE",
      "zMovePower": 100
    },
    "MUDBOMB": {
      "id": "MUDBOMB",
      "num": 426,
      "accuracy": 85,
      "basePower": 65,
      "category": "SPECIAL",
      "desc": "30% chance to lower the target's accuracy by 1.",
      "name": "Mud Bomb",
      "pp": 10,
      "priority": 0,
      "flags": {
        "bullet": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GROUND",
      "contestType": "CUTE",
      "zMovePower": 120
    },
    "MUDSHOT": {
      "id": "MUDSHOT",
      "num": 341,
      "accuracy": 95,
      "basePower": 55,
      "category": "SPECIAL",
      "desc": "100% chance to lower the target's Speed by 1.",
      "name": "Mud Shot",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GROUND",
      "contestType": "TOUGH",
      "zMovePower": 100
    },
    "MUDSPORT": {
      "id": "MUDSPORT",
      "num": 300,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "For 5 turns, Electric-type attacks have 1/3 power.",
      "name": "Mud Sport",
      "pp": 15,
      "priority": 0,
      "flags": {
        "nonsky": 1
      },
      "target": "ALL",
      "type": "GROUND",
      "contestType": "CUTE",
      "zMoveBoost": {
        "spd": 1
      }
    },
    "MUDDYWATER": {
      "id": "MUDDYWATER",
      "num": 330,
      "accuracy": 85,
      "basePower": 90,
      "category": "SPECIAL",
      "desc": "30% chance to lower the foe(s) accuracy by 1.",
      "name": "Muddy Water",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "nonsky": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "WATER",
      "contestType": "TOUGH",
      "zMovePower": 175
    },
    "MULTIATTACK": {
      "id": "MULTIATTACK",
      "num": 718,
      "accuracy": 100,
      "basePower": 90,
      "category": "PHYSICAL",
      "desc": "Type varies based on the held Memory.",
      "name": "Multi-Attack",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "TOUGH",
      "isViable": true,
      "zMovePower": 185
    },
    "MYSTICALFIRE": {
      "id": "MYSTICALFIRE",
      "num": 595,
      "accuracy": 100,
      "basePower": 75,
      "category": "SPECIAL",
      "desc": "100% chance to lower the target's Sp. Atk by 1.",
      "name": "Mystical Fire",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FIRE",
      "contestType": "BEAUTIFUL",
      "zMovePower": 140
    },
    "NASTYPLOT": {
      "id": "NASTYPLOT",
      "num": 417,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Raises the user's Sp. Atk by 2.",
      "name": "Nasty Plot",
      "pp": 20,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "SELF",
      "type": "DARK",
      "contestType": "CLEVER",
      "isViable": true,
      "boosts": {
        "spa": 2
      },
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "NATURALGIFT": {
      "id": "NATURALGIFT",
      "num": 363,
      "accuracy": 100,
      "basePower": 0,
      "category": "PHYSICAL",
      "desc": "Power and type depends on the user's Berry.",
      "name": "Natural Gift",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CLEVER",
      "zMovePower": 160
    },
    "NATUREPOWER": {
      "id": "NATUREPOWER",
      "num": 267,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Attack depends on terrain (default Tri Attack).",
      "name": "Nature Power",
      "pp": 20,
      "priority": 0,
      "flags": {},
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "BEAUTIFUL",
      "isViable": true
    },
    "NATURESMADNESS": {
      "id": "NATURESMADNESS",
      "num": 717,
      "accuracy": 90,
      "basePower": 0,
      "category": "SPECIAL",
      "desc": "Does damage equal to 1/2 target's current HP.",
      "name": "Nature's Madness",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FAIRY",
      "contestType": "TOUGH",
      "isViable": true,
      "zMovePower": 100
    },
    "NEEDLEARM": {
      "id": "NEEDLEARM",
      "num": 302,
      "accuracy": 100,
      "basePower": 60,
      "category": "PHYSICAL",
      "desc": "30% chance to flinch the target.",
      "name": "Needle Arm",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GRASS",
      "contestType": "CLEVER",
      "zMovePower": 120
    },
    "NEVERENDINGNIGHTMARE": {
      "id": "NEVERENDINGNIGHTMARE",
      "num": 636,
      "accuracy": true,
      "basePower": 1,
      "category": "PHYSICAL",
      "desc": "Power is equal to the base move's Z-Power.",
      "name": "Never-Ending Nightmare",
      "pp": 1,
      "priority": 0,
      "flags": {},
      "target": "NORMAL",
      "type": "GHOST",
      "contestType": "COOL",
      "isViable": true,
      "isZ": "ghostiumz"
    },
    "NIGHTDAZE": {
      "id": "NIGHTDAZE",
      "num": 539,
      "accuracy": 95,
      "basePower": 85,
      "category": "SPECIAL",
      "desc": "40% chance to lower the target's accuracy by 1.",
      "name": "Night Daze",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "DARK",
      "contestType": "COOL",
      "zMovePower": 160
    },
    "NIGHTSHADE": {
      "id": "NIGHTSHADE",
      "num": 101,
      "accuracy": 100,
      "basePower": 0,
      "category": "SPECIAL",
      "desc": "Does damage equal to the user's level.",
      "name": "Night Shade",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GHOST",
      "contestType": "CLEVER",
      "isViable": true,
      "zMovePower": 100
    },
    "NIGHTSLASH": {
      "id": "NIGHTSLASH",
      "num": 400,
      "accuracy": 100,
      "basePower": 70,
      "category": "PHYSICAL",
      "desc": "High critical hit ratio.",
      "name": "Night Slash",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "DARK",
      "contestType": "COOL",
      "critRatio": 2,
      "isViable": true,
      "zMovePower": 140
    },
    "NIGHTMARE": {
      "id": "NIGHTMARE",
      "num": 171,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "A sleeping target is hurt by 1/4 max HP per turn.",
      "name": "Nightmare",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GHOST",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "spa": 1
      }
    },
    "NOBLEROAR": {
      "id": "NOBLEROAR",
      "num": 568,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Lowers the target's Attack and Sp. Atk by 1.",
      "name": "Noble Roar",
      "pp": 30,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1,
        "sound": 1,
        "authentic": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "TOUGH",
      "boosts": {
        "atk": -1,
        "spa": -1
      },
      "zMoveBoost": {
        "def": 1
      }
    },
    "NUZZLE": {
      "id": "NUZZLE",
      "num": 609,
      "accuracy": 100,
      "basePower": 20,
      "category": "PHYSICAL",
      "desc": "100% chance to paralyze the target.",
      "name": "Nuzzle",
      "pp": 20,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "ELECTRIC",
      "contestType": "CUTE",
      "isViable": true,
      "zMovePower": 100
    },
    "OBLIVIONWING": {
      "id": "OBLIVIONWING",
      "num": 613,
      "accuracy": 100,
      "basePower": 80,
      "category": "SPECIAL",
      "desc": "User recovers 75% of the damage dealt.",
      "name": "Oblivion Wing",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "distance": 1,
        "heal": 1
      },
      "target": "ANY",
      "type": "FLYING",
      "contestType": "COOL",
      "drain": [
        3,
        4
      ],
      "isViable": true,
      "zMovePower": 160
    },
    "OCEANICOPERETTA": {
      "id": "OCEANICOPERETTA",
      "num": 697,
      "accuracy": true,
      "basePower": 195,
      "category": "SPECIAL",
      "desc": "No additional effect.",
      "name": "Oceanic Operetta",
      "pp": 1,
      "priority": 0,
      "flags": {},
      "target": "NORMAL",
      "type": "WATER",
      "contestType": "COOL",
      "isZ": "primariumz"
    },
    "OCTAZOOKA": {
      "id": "OCTAZOOKA",
      "num": 190,
      "accuracy": 85,
      "basePower": 65,
      "category": "SPECIAL",
      "desc": "50% chance to lower the target's accuracy by 1.",
      "name": "Octazooka",
      "pp": 10,
      "priority": 0,
      "flags": {
        "bullet": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "WATER",
      "contestType": "TOUGH",
      "zMovePower": 120
    },
    "ODORSLEUTH": {
      "id": "ODORSLEUTH",
      "num": 316,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Fighting, Normal hit Ghost. Evasiveness ignored.",
      "name": "Odor Sleuth",
      "pp": 40,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1,
        "authentic": 1,
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "atk": 1
      }
    },
    "OMINOUSWIND": {
      "id": "OMINOUSWIND",
      "num": 466,
      "accuracy": 100,
      "basePower": 60,
      "category": "SPECIAL",
      "desc": "10% chance to raise all stats by 1 (not acc/eva).",
      "name": "Ominous Wind",
      "pp": 5,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GHOST",
      "contestType": "BEAUTIFUL",
      "zMovePower": 120
    },
    "ORIGINPULSE": {
      "id": "ORIGINPULSE",
      "num": 618,
      "accuracy": 85,
      "basePower": 110,
      "category": "SPECIAL",
      "desc": "No additional effect. Hits adjacent foes.",
      "name": "Origin Pulse",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "pulse": 1,
        "mirror": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "WATER",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 185
    },
    "OUTRAGE": {
      "id": "OUTRAGE",
      "num": 200,
      "accuracy": 100,
      "basePower": 120,
      "category": "PHYSICAL",
      "desc": "Lasts 2-3 turns. Confuses the user afterwards.",
      "name": "Outrage",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "RANDOMNORMAL",
      "type": "DRAGON",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 190
    },
    "OVERHEAT": {
      "id": "OVERHEAT",
      "num": 315,
      "accuracy": 90,
      "basePower": 130,
      "category": "SPECIAL",
      "desc": "Lowers the user's Sp. Atk by 2.",
      "name": "Overheat",
      "pp": 5,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FIRE",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 195
    },
    "PAINSPLIT": {
      "id": "PAINSPLIT",
      "num": 220,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Shares HP of user and target equally.",
      "name": "Pain Split",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CLEVER",
      "isViable": true,
      "zMoveBoost": {
        "def": 1
      }
    },
    "PARABOLICCHARGE": {
      "id": "PARABOLICCHARGE",
      "num": 570,
      "accuracy": 100,
      "basePower": 65,
      "category": "SPECIAL",
      "desc": "User recovers 50% of the damage dealt.",
      "name": "Parabolic Charge",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "heal": 1
      },
      "target": "ALLADJACENT",
      "type": "ELECTRIC",
      "contestType": "CLEVER",
      "drain": [
        1,
        2
      ],
      "zMovePower": 120
    },
    "PARTINGSHOT": {
      "id": "PARTINGSHOT",
      "num": 575,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Lowers target's Atk, Sp. Atk by 1. User switches.",
      "name": "Parting Shot",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1,
        "sound": 1,
        "authentic": 1
      },
      "target": "NORMAL",
      "type": "DARK",
      "contestType": "COOL",
      "isViable": true,
      "boosts": {
        "atk": -1,
        "spa": -1
      },
      "selfSwitch": true,
      "zMoveEffect": "HEALREPLACEMENT"
    },
    "PAYDAY": {
      "id": "PAYDAY",
      "num": 6,
      "accuracy": 100,
      "basePower": 40,
      "category": "PHYSICAL",
      "desc": "Scatters coins.",
      "name": "Pay Day",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CLEVER",
      "zMovePower": 100
    },
    "PAYBACK": {
      "id": "PAYBACK",
      "num": 371,
      "accuracy": 100,
      "basePower": 50,
      "category": "PHYSICAL",
      "desc": "Power doubles if the user moves after the target.",
      "name": "Payback",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "DARK",
      "contestType": "TOUGH",
      "zMovePower": 100
    },
    "PECK": {
      "id": "PECK",
      "num": 64,
      "accuracy": 100,
      "basePower": 35,
      "category": "PHYSICAL",
      "desc": "No additional effect.",
      "name": "Peck",
      "pp": 35,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1,
        "distance": 1
      },
      "target": "ANY",
      "type": "FLYING",
      "contestType": "COOL",
      "zMovePower": 100
    },
    "PERISHSONG": {
      "id": "PERISHSONG",
      "num": 195,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "All active Pokemon will faint in 3 turns.",
      "name": "Perish Song",
      "pp": 5,
      "priority": 0,
      "flags": {
        "sound": 1,
        "distance": 1,
        "authentic": 1
      },
      "target": "ALL",
      "type": "NORMAL",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "PETALBLIZZARD": {
      "id": "PETALBLIZZARD",
      "num": 572,
      "accuracy": 100,
      "basePower": 90,
      "category": "PHYSICAL",
      "desc": "No additional effect. Hits adjacent Pokemon.",
      "name": "Petal Blizzard",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "ALLADJACENT",
      "type": "GRASS",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 175
    },
    "PETALDANCE": {
      "id": "PETALDANCE",
      "num": 80,
      "accuracy": 100,
      "basePower": 120,
      "category": "SPECIAL",
      "desc": "Lasts 2-3 turns. Confuses the user afterwards.",
      "name": "Petal Dance",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1,
        "dance": 1
      },
      "target": "RANDOMNORMAL",
      "type": "GRASS",
      "contestType": "BEAUTIFUL",
      "zMovePower": 190
    },
    "PHANTOMFORCE": {
      "id": "PHANTOMFORCE",
      "num": 566,
      "accuracy": 100,
      "basePower": 90,
      "category": "PHYSICAL",
      "desc": "Disappears turn 1. Hits turn 2. Breaks protection.",
      "name": "Phantom Force",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "charge": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GHOST",
      "contestType": "COOL",
      "breaksProtect": true,
      "zMovePower": 175
    },
    "PHOTONGEYSER": {
      "id": "PHOTONGEYSER",
      "num": 722,
      "accuracy": 100,
      "basePower": 100,
      "category": "SPECIAL",
      "desc": "Physical if user's Atk > Sp. Atk. Ignores Abilities.",
      "name": "Photon Geyser",
      "pp": 5,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "PSYCHIC",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 180
    },
    "PINMISSILE": {
      "id": "PINMISSILE",
      "num": 42,
      "accuracy": 95,
      "basePower": 25,
      "category": "PHYSICAL",
      "desc": "Hits 2-5 times in one turn.",
      "name": "Pin Missile",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "BUG",
      "contestType": "COOL",
      "multihit": [
        2,
        5
      ],
      "zMovePower": 140
    },
    "PLASMAFISTS": {
      "id": "PLASMAFISTS",
      "num": 721,
      "accuracy": 100,
      "basePower": 100,
      "category": "PHYSICAL",
      "desc": "Normal moves become Electric type this turn.",
      "name": "Plasma Fists",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1,
        "punch": 1
      },
      "target": "NORMAL",
      "type": "ELECTRIC",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 180
    },
    "PLAYNICE": {
      "id": "PLAYNICE",
      "num": 589,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Lowers the target's Attack by 1.",
      "name": "Play Nice",
      "pp": 20,
      "priority": 0,
      "flags": {
        "reflectable": 1,
        "mirror": 1,
        "authentic": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CUTE",
      "boosts": {
        "atk": -1
      },
      "zMoveBoost": {
        "def": 1
      }
    },
    "PLAYROUGH": {
      "id": "PLAYROUGH",
      "num": 583,
      "accuracy": 90,
      "basePower": 90,
      "category": "PHYSICAL",
      "desc": "10% chance to lower the target's Attack by 1.",
      "name": "Play Rough",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FAIRY",
      "contestType": "CUTE",
      "isViable": true,
      "zMovePower": 175
    },
    "PLUCK": {
      "id": "PLUCK",
      "num": 365,
      "accuracy": 100,
      "basePower": 60,
      "category": "PHYSICAL",
      "desc": "User steals and eats the target's Berry.",
      "name": "Pluck",
      "pp": 20,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1,
        "distance": 1
      },
      "target": "ANY",
      "type": "FLYING",
      "contestType": "CUTE",
      "zMovePower": 120
    },
    "POISONFANG": {
      "id": "POISONFANG",
      "num": 305,
      "accuracy": 100,
      "basePower": 50,
      "category": "PHYSICAL",
      "desc": "50% chance to badly poison the target.",
      "name": "Poison Fang",
      "pp": 15,
      "priority": 0,
      "flags": {
        "bite": 1,
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "POISON",
      "contestType": "CLEVER",
      "zMovePower": 100
    },
    "POISONGAS": {
      "id": "POISONGAS",
      "num": 139,
      "accuracy": 90,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Poisons the foe(s).",
      "name": "Poison Gas",
      "pp": 40,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "POISON",
      "contestType": "CLEVER",
      "status": "psn",
      "zMoveBoost": {
        "def": 1
      }
    },
    "POISONJAB": {
      "id": "POISONJAB",
      "num": 398,
      "accuracy": 100,
      "basePower": 80,
      "category": "PHYSICAL",
      "desc": "30% chance to poison the target.",
      "name": "Poison Jab",
      "pp": 20,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "POISON",
      "contestType": "TOUGH",
      "isViable": true,
      "zMovePower": 160
    },
    "POISONPOWDER": {
      "id": "POISONPOWDER",
      "num": 77,
      "accuracy": 75,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Poisons the target.",
      "name": "Poison Powder",
      "pp": 35,
      "priority": 0,
      "flags": {
        "powder": 1,
        "protect": 1,
        "reflectable": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "POISON",
      "contestType": "CLEVER",
      "status": "psn",
      "zMoveBoost": {
        "def": 1
      }
    },
    "POISONSTING": {
      "id": "POISONSTING",
      "num": 40,
      "accuracy": 100,
      "basePower": 15,
      "category": "PHYSICAL",
      "desc": "30% chance to poison the target.",
      "name": "Poison Sting",
      "pp": 35,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "POISON",
      "contestType": "CLEVER",
      "zMovePower": 100
    },
    "POISONTAIL": {
      "id": "POISONTAIL",
      "num": 342,
      "accuracy": 100,
      "basePower": 50,
      "category": "PHYSICAL",
      "desc": "High critical hit ratio. 10% chance to poison.",
      "name": "Poison Tail",
      "pp": 25,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "POISON",
      "contestType": "CLEVER",
      "critRatio": 2,
      "zMovePower": 100
    },
    "POLLENPUFF": {
      "id": "POLLENPUFF",
      "num": 676,
      "accuracy": 100,
      "basePower": 90,
      "category": "SPECIAL",
      "desc": "If the target is an ally, heals 50% of its max HP.",
      "name": "Pollen Puff",
      "pp": 15,
      "priority": 0,
      "flags": {
        "bullet": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "BUG",
      "contestType": "CUTE",
      "zMovePower": 175
    },
    "POUND": {
      "id": "POUND",
      "num": 1,
      "accuracy": 100,
      "basePower": 40,
      "category": "PHYSICAL",
      "desc": "No additional effect.",
      "name": "Pound",
      "pp": 35,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "TOUGH",
      "zMovePower": 100
    },
    "POWDER": {
      "id": "POWDER",
      "num": 600,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "If using a Fire move, target loses 1/4 max HP.",
      "name": "Powder",
      "pp": 20,
      "priority": 1,
      "flags": {
        "powder": 1,
        "protect": 1,
        "reflectable": 1,
        "mirror": 1,
        "authentic": 1
      },
      "target": "NORMAL",
      "type": "BUG",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "spd": 2
      }
    },
    "POWDERSNOW": {
      "id": "POWDERSNOW",
      "num": 181,
      "accuracy": 100,
      "basePower": 40,
      "category": "SPECIAL",
      "desc": "10% chance to freeze the foe(s).",
      "name": "Powder Snow",
      "pp": 25,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "ICE",
      "contestType": "BEAUTIFUL",
      "zMovePower": 100
    },
    "POWERGEM": {
      "id": "POWERGEM",
      "num": 408,
      "accuracy": 100,
      "basePower": 80,
      "category": "SPECIAL",
      "desc": "No additional effect.",
      "name": "Power Gem",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "ROCK",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 160
    },
    "POWERSPLIT": {
      "id": "POWERSPLIT",
      "num": 471,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Averages Attack and Sp. Atk stats with target.",
      "name": "Power Split",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "PSYCHIC",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "spe": 1
      }
    },
    "POWERSWAP": {
      "id": "POWERSWAP",
      "num": 384,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Swaps Attack and Sp. Atk stat stages with target.",
      "name": "Power Swap",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "authentic": 1,
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "PSYCHIC",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "spe": 1
      }
    },
    "POWERTRICK": {
      "id": "POWERTRICK",
      "num": 379,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Switches user's Attack and Defense stats.",
      "name": "Power Trick",
      "pp": 10,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "SELF",
      "type": "PSYCHIC",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "atk": 1
      }
    },
    "POWERTRIP": {
      "id": "POWERTRIP",
      "num": 681,
      "accuracy": 100,
      "basePower": 20,
      "category": "PHYSICAL",
      "desc": " + 20 power for each of the user's stat boosts.",
      "name": "Power Trip",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "DARK",
      "contestType": "CLEVER",
      "zMovePower": 160
    },
    "POWERUPPUNCH": {
      "id": "POWERUPPUNCH",
      "num": 612,
      "accuracy": 100,
      "basePower": 40,
      "category": "PHYSICAL",
      "desc": "100% chance to raise the user's Attack by 1.",
      "name": "Power-Up Punch",
      "pp": 20,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1,
        "punch": 1
      },
      "target": "NORMAL",
      "type": "FIGHTING",
      "contestType": "TOUGH",
      "isViable": true,
      "zMovePower": 100
    },
    "POWERWHIP": {
      "id": "POWERWHIP",
      "num": 438,
      "accuracy": 85,
      "basePower": 120,
      "category": "PHYSICAL",
      "desc": "No additional effect.",
      "name": "Power Whip",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GRASS",
      "contestType": "TOUGH",
      "isViable": true,
      "zMovePower": 190
    },
    "PRECIPICEBLADES": {
      "id": "PRECIPICEBLADES",
      "num": 619,
      "accuracy": 85,
      "basePower": 120,
      "category": "PHYSICAL",
      "desc": "No additional effect. Hits adjacent foes.",
      "name": "Precipice Blades",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "nonsky": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "GROUND",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 190
    },
    "PRESENT": {
      "id": "PRESENT",
      "num": 217,
      "accuracy": 90,
      "basePower": 0,
      "category": "PHYSICAL",
      "desc": "40, 80, 120 power, or heals target by 1/4 max HP.",
      "name": "Present",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CUTE",
      "zMovePower": 100
    },
    "PRISMATICLASER": {
      "id": "PRISMATICLASER",
      "num": 711,
      "accuracy": 100,
      "basePower": 160,
      "category": "SPECIAL",
      "desc": "User cannot move next turn.",
      "name": "Prismatic Laser",
      "pp": 10,
      "priority": 0,
      "flags": {
        "recharge": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "PSYCHIC",
      "contestType": "COOL",
      "zMovePower": 200
    },
    "PROTECT": {
      "id": "PROTECT",
      "num": 182,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Prevents moves from affecting the user this turn.",
      "name": "Protect",
      "pp": 10,
      "priority": 4,
      "flags": {},
      "target": "SELF",
      "type": "NORMAL",
      "contestType": "CUTE",
      "isViable": true,
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "PSYBEAM": {
      "id": "PSYBEAM",
      "num": 60,
      "accuracy": 100,
      "basePower": 65,
      "category": "SPECIAL",
      "desc": "10% chance to confuse the target.",
      "name": "Psybeam",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "PSYCHIC",
      "contestType": "BEAUTIFUL",
      "zMovePower": 120
    },
    "PSYCHUP": {
      "id": "PSYCHUP",
      "num": 244,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Copies the target's current stat stages.",
      "name": "Psych Up",
      "pp": 10,
      "priority": 0,
      "flags": {
        "authentic": 1,
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CLEVER",
      "zMoveEffect": "HEAL"
    },
    "PSYCHIC": {
      "id": "PSYCHIC",
      "num": 94,
      "accuracy": 100,
      "basePower": 90,
      "category": "SPECIAL",
      "desc": "10% chance to lower the target's Sp. Def by 1.",
      "name": "Psychic",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "PSYCHIC",
      "contestType": "CLEVER",
      "isViable": true,
      "zMovePower": 175
    },
    "PSYCHICFANGS": {
      "id": "PSYCHICFANGS",
      "num": 706,
      "accuracy": 100,
      "basePower": 85,
      "category": "PHYSICAL",
      "desc": "Destroys screens, unless the target is immune.",
      "name": "Psychic Fangs",
      "pp": 10,
      "priority": 0,
      "flags": {
        "bite": 1,
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "PSYCHIC",
      "contestType": "CLEVER",
      "isViable": true,
      "zMovePower": 160
    },
    "PSYCHICTERRAIN": {
      "id": "PSYCHICTERRAIN",
      "num": 678,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "5 turns. Grounded: +Psychic power, priority-safe.",
      "name": "Psychic Terrain",
      "pp": 10,
      "priority": 0,
      "flags": {
        "nonsky": 1
      },
      "target": "ALL",
      "type": "PSYCHIC",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "spa": 1
      }
    },
    "PSYCHOBOOST": {
      "id": "PSYCHOBOOST",
      "num": 354,
      "accuracy": 90,
      "basePower": 140,
      "category": "SPECIAL",
      "desc": "Lowers the user's Sp. Atk by 2.",
      "name": "Psycho Boost",
      "pp": 5,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "PSYCHIC",
      "contestType": "CLEVER",
      "isViable": true,
      "zMovePower": 200
    },
    "PSYCHOCUT": {
      "id": "PSYCHOCUT",
      "num": 427,
      "accuracy": 100,
      "basePower": 70,
      "category": "PHYSICAL",
      "desc": "High critical hit ratio.",
      "name": "Psycho Cut",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "PSYCHIC",
      "contestType": "COOL",
      "critRatio": 2,
      "isViable": true,
      "zMovePower": 140
    },
    "PSYCHOSHIFT": {
      "id": "PSYCHOSHIFT",
      "num": 375,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Transfers the user's status ailment to the target.",
      "name": "Psycho Shift",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "PSYCHIC",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "spa": 2
      }
    },
    "PSYSHOCK": {
      "id": "PSYSHOCK",
      "num": 473,
      "accuracy": 100,
      "basePower": 80,
      "category": "SPECIAL",
      "desc": "Damages target based on Defense, not Sp. Def.",
      "name": "Psyshock",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "PSYCHIC",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 160
    },
    "PSYSTRIKE": {
      "id": "PSYSTRIKE",
      "num": 540,
      "accuracy": 100,
      "basePower": 100,
      "category": "SPECIAL",
      "desc": "Damages target based on Defense, not Sp. Def.",
      "name": "Psystrike",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "PSYCHIC",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 180
    },
    "PSYWAVE": {
      "id": "PSYWAVE",
      "num": 149,
      "accuracy": 100,
      "basePower": 0,
      "category": "SPECIAL",
      "desc": "Random damage equal to 0.5x-1.5x user's level.",
      "name": "Psywave",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "PSYCHIC",
      "contestType": "CLEVER",
      "zMovePower": 100
    },
    "PULVERIZINGPANCAKE": {
      "id": "PULVERIZINGPANCAKE",
      "num": 701,
      "accuracy": true,
      "basePower": 210,
      "category": "PHYSICAL",
      "desc": "No additional effect.",
      "name": "Pulverizing Pancake",
      "pp": 1,
      "priority": 0,
      "flags": {
        "contact": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "COOL",
      "isZ": "snorliumz"
    },
    "PUNISHMENT": {
      "id": "PUNISHMENT",
      "num": 386,
      "accuracy": 100,
      "basePower": 0,
      "category": "PHYSICAL",
      "desc": "60 power +20 for each of the target's stat boosts.",
      "name": "Punishment",
      "pp": 5,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "DARK",
      "contestType": "COOL",
      "zMovePower": 160
    },
    "PURIFY": {
      "id": "PURIFY",
      "num": 685,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Cures target's status; heals user 1/2 maxHP if so.",
      "name": "Purify",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "heal": 1
      },
      "target": "NORMAL",
      "type": "POISON",
      "contestType": "BEAUTIFUL",
      "zMoveBoost": {
        "atk": 1,
        "def": 1,
        "spa": 1,
        "spd": 1,
        "spe": 1
      }
    },
    "PURSUIT": {
      "id": "PURSUIT",
      "num": 228,
      "accuracy": 100,
      "basePower": 40,
      "category": "PHYSICAL",
      "desc": "Power doubles if a foe is switching out.",
      "name": "Pursuit",
      "pp": 20,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "DARK",
      "contestType": "CLEVER",
      "isViable": true,
      "zMovePower": 100
    },
    "QUASH": {
      "id": "QUASH",
      "num": 511,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Forces the target to move last this turn.",
      "name": "Quash",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "DARK",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "spe": 1
      }
    },
    "QUICKATTACK": {
      "id": "QUICKATTACK",
      "num": 98,
      "accuracy": 100,
      "basePower": 40,
      "category": "PHYSICAL",
      "desc": "Usually goes first.",
      "name": "Quick Attack",
      "pp": 30,
      "priority": 1,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 100
    },
    "QUICKGUARD": {
      "id": "QUICKGUARD",
      "num": 501,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Protects allies from priority attacks this turn.",
      "name": "Quick Guard",
      "pp": 15,
      "priority": 3,
      "flags": {
        "snatch": 1
      },
      "target": "ALLYSIDE",
      "type": "FIGHTING",
      "contestType": "COOL",
      "sideCondition": "quickguard",
      "zMoveBoost": {
        "def": 1
      }
    },
    "QUIVERDANCE": {
      "id": "QUIVERDANCE",
      "num": 483,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Raises the user's Sp. Atk, Sp. Def, Speed by 1.",
      "name": "Quiver Dance",
      "pp": 20,
      "priority": 0,
      "flags": {
        "snatch": 1,
        "dance": 1
      },
      "target": "SELF",
      "type": "BUG",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "boosts": {
        "spa": 1,
        "spd": 1,
        "spe": 1
      },
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "RAGE": {
      "id": "RAGE",
      "num": 99,
      "accuracy": 100,
      "basePower": 20,
      "category": "PHYSICAL",
      "desc": "Raises the user's Attack by 1 if hit during use.",
      "name": "Rage",
      "pp": 20,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "TOUGH",
      "zMovePower": 100
    },
    "RAGEPOWDER": {
      "id": "RAGEPOWDER",
      "num": 476,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "The foes' moves target the user on the turn used.",
      "name": "Rage Powder",
      "pp": 20,
      "priority": 2,
      "flags": {
        "powder": 1
      },
      "target": "SELF",
      "type": "BUG",
      "contestType": "CLEVER",
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "RAINDANCE": {
      "id": "RAINDANCE",
      "num": 240,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "For 5 turns, heavy rain powers Water moves.",
      "name": "Rain Dance",
      "pp": 5,
      "priority": 0,
      "flags": {},
      "target": "ALL",
      "type": "WATER",
      "contestType": "BEAUTIFUL",
      "zMoveBoost": {
        "spe": 1
      }
    },
    "RAPIDSPIN": {
      "id": "RAPIDSPIN",
      "num": 229,
      "accuracy": 100,
      "basePower": 20,
      "category": "PHYSICAL",
      "desc": "Frees user from hazards/partial trap/Leech Seed.",
      "name": "Rapid Spin",
      "pp": 40,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 100
    },
    "RAZORLEAF": {
      "id": "RAZORLEAF",
      "num": 75,
      "accuracy": 95,
      "basePower": 55,
      "category": "PHYSICAL",
      "desc": "High critical hit ratio. Hits adjacent foes.",
      "name": "Razor Leaf",
      "pp": 25,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "GRASS",
      "contestType": "COOL",
      "critRatio": 2,
      "zMovePower": 100
    },
    "RAZORSHELL": {
      "id": "RAZORSHELL",
      "num": 534,
      "accuracy": 95,
      "basePower": 75,
      "category": "PHYSICAL",
      "desc": "50% chance to lower the target's Defense by 1.",
      "name": "Razor Shell",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "WATER",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 140
    },
    "RAZORWIND": {
      "id": "RAZORWIND",
      "num": 13,
      "accuracy": 100,
      "basePower": 80,
      "category": "SPECIAL",
      "desc": "Charges, then hits foe(s) turn 2. High crit ratio.",
      "name": "Razor Wind",
      "pp": 10,
      "priority": 0,
      "flags": {
        "charge": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "NORMAL",
      "contestType": "COOL",
      "critRatio": 2,
      "zMovePower": 160
    },
    "RECOVER": {
      "id": "RECOVER",
      "num": 105,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Heals the user by 50% of its max HP.",
      "name": "Recover",
      "pp": 10,
      "priority": 0,
      "flags": {
        "snatch": 1,
        "heal": 1
      },
      "target": "SELF",
      "type": "NORMAL",
      "contestType": "CLEVER",
      "isViable": true,
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "RECYCLE": {
      "id": "RECYCLE",
      "num": 278,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Restores the item the user last used.",
      "name": "Recycle",
      "pp": 10,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "SELF",
      "type": "NORMAL",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "spe": 2
      }
    },
    "REFLECT": {
      "id": "REFLECT",
      "num": 115,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "For 5 turns, physical damage to allies is halved.",
      "name": "Reflect",
      "pp": 20,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "ALLYSIDE",
      "type": "PSYCHIC",
      "contestType": "CLEVER",
      "isViable": true,
      "sideCondition": "reflect",
      "zMoveBoost": {
        "def": 1
      }
    },
    "REFLECTTYPE": {
      "id": "REFLECTTYPE",
      "num": 513,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "User becomes the same type as the target.",
      "name": "Reflect Type",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "authentic": 1,
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "spa": 1
      }
    },
    "REFRESH": {
      "id": "REFRESH",
      "num": 287,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "User cures its burn, poison, or paralysis.",
      "name": "Refresh",
      "pp": 20,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "SELF",
      "type": "NORMAL",
      "contestType": "CUTE",
      "isViable": true,
      "zMoveEffect": "HEAL"
    },
    "RELICSONG": {
      "id": "RELICSONG",
      "num": 547,
      "accuracy": 100,
      "basePower": 75,
      "category": "SPECIAL",
      "desc": "10% chance to sleep foe(s). Meloetta transforms.",
      "name": "Relic Song",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "sound": 1,
        "authentic": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "NORMAL",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 140
    },
    "REST": {
      "id": "REST",
      "num": 156,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "User sleeps 2 turns and restores HP and status.",
      "name": "Rest",
      "pp": 10,
      "priority": 0,
      "flags": {
        "snatch": 1,
        "heal": 1
      },
      "target": "SELF",
      "type": "PSYCHIC",
      "contestType": "CUTE",
      "isViable": true,
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "RETALIATE": {
      "id": "RETALIATE",
      "num": 514,
      "accuracy": 100,
      "basePower": 70,
      "category": "PHYSICAL",
      "desc": "Power doubles if an ally fainted last turn.",
      "name": "Retaliate",
      "pp": 5,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "COOL",
      "zMovePower": 140
    },
    "RETURN": {
      "id": "RETURN",
      "num": 216,
      "accuracy": 100,
      "basePower": 0,
      "category": "PHYSICAL",
      "desc": "Max 102 power at maximum Happiness.",
      "name": "Return",
      "pp": 20,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CUTE",
      "isViable": true,
      "zMovePower": 160
    },
    "REVELATIONDANCE": {
      "id": "REVELATIONDANCE",
      "num": 686,
      "accuracy": 100,
      "basePower": 90,
      "category": "SPECIAL",
      "desc": "Type varies based on the user's primary type.",
      "name": "Revelation Dance",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "dance": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 175
    },
    "REVENGE": {
      "id": "REVENGE",
      "num": 279,
      "accuracy": 100,
      "basePower": 60,
      "category": "PHYSICAL",
      "desc": "Power doubles if user is damaged by the target.",
      "name": "Revenge",
      "pp": 10,
      "priority": -4,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FIGHTING",
      "contestType": "TOUGH",
      "zMovePower": 120
    },
    "REVERSAL": {
      "id": "REVERSAL",
      "num": 179,
      "accuracy": 100,
      "basePower": 0,
      "category": "PHYSICAL",
      "desc": "More power the less HP the user has left.",
      "name": "Reversal",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FIGHTING",
      "contestType": "COOL",
      "zMovePower": 160
    },
    "ROAR": {
      "id": "ROAR",
      "num": 46,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Forces the target to switch to a random ally.",
      "name": "Roar",
      "pp": 20,
      "priority": -6,
      "flags": {
        "reflectable": 1,
        "mirror": 1,
        "sound": 1,
        "authentic": 1,
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "COOL",
      "isViable": true,
      "zMoveBoost": {
        "def": 1
      }
    },
    "ROAROFTIME": {
      "id": "ROAROFTIME",
      "num": 459,
      "accuracy": 90,
      "basePower": 150,
      "category": "SPECIAL",
      "desc": "User cannot move next turn.",
      "name": "Roar of Time",
      "pp": 5,
      "priority": 0,
      "flags": {
        "recharge": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "DRAGON",
      "contestType": "BEAUTIFUL",
      "zMovePower": 200
    },
    "ROCKBLAST": {
      "id": "ROCKBLAST",
      "num": 350,
      "accuracy": 90,
      "basePower": 25,
      "category": "PHYSICAL",
      "desc": "Hits 2-5 times in one turn.",
      "name": "Rock Blast",
      "pp": 10,
      "priority": 0,
      "flags": {
        "bullet": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "ROCK",
      "contestType": "TOUGH",
      "isViable": true,
      "multihit": [
        2,
        5
      ],
      "zMovePower": 140
    },
    "ROCKCLIMB": {
      "id": "ROCKCLIMB",
      "num": 431,
      "accuracy": 85,
      "basePower": 90,
      "category": "PHYSICAL",
      "desc": "20% chance to confuse the target.",
      "name": "Rock Climb",
      "pp": 20,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "TOUGH",
      "zMovePower": 175
    },
    "ROCKPOLISH": {
      "id": "ROCKPOLISH",
      "num": 397,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Raises the user's Speed by 2.",
      "name": "Rock Polish",
      "pp": 20,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "SELF",
      "type": "ROCK",
      "contestType": "TOUGH",
      "isViable": true,
      "boosts": {
        "spe": 2
      },
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "ROCKSLIDE": {
      "id": "ROCKSLIDE",
      "num": 157,
      "accuracy": 90,
      "basePower": 75,
      "category": "PHYSICAL",
      "desc": "30% chance to flinch the foe(s).",
      "name": "Rock Slide",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "ROCK",
      "contestType": "TOUGH",
      "isViable": true,
      "zMovePower": 140
    },
    "ROCKSMASH": {
      "id": "ROCKSMASH",
      "num": 249,
      "accuracy": 100,
      "basePower": 40,
      "category": "PHYSICAL",
      "desc": "50% chance to lower the target's Defense by 1.",
      "name": "Rock Smash",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FIGHTING",
      "contestType": "TOUGH",
      "zMovePower": 100
    },
    "ROCKTHROW": {
      "id": "ROCKTHROW",
      "num": 88,
      "accuracy": 90,
      "basePower": 50,
      "category": "PHYSICAL",
      "desc": "No additional effect.",
      "name": "Rock Throw",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "ROCK",
      "contestType": "TOUGH",
      "zMovePower": 100
    },
    "ROCKTOMB": {
      "id": "ROCKTOMB",
      "num": 317,
      "accuracy": 95,
      "basePower": 60,
      "category": "PHYSICAL",
      "desc": "100% chance to lower the target's Speed by 1.",
      "name": "Rock Tomb",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "ROCK",
      "contestType": "CLEVER",
      "zMovePower": 120
    },
    "ROCKWRECKER": {
      "id": "ROCKWRECKER",
      "num": 439,
      "accuracy": 90,
      "basePower": 150,
      "category": "PHYSICAL",
      "desc": "User cannot move next turn.",
      "name": "Rock Wrecker",
      "pp": 5,
      "priority": 0,
      "flags": {
        "bullet": 1,
        "recharge": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "ROCK",
      "contestType": "TOUGH",
      "zMovePower": 200
    },
    "ROLEPLAY": {
      "id": "ROLEPLAY",
      "num": 272,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "User replaces its Ability with the target's.",
      "name": "Role Play",
      "pp": 10,
      "priority": 0,
      "flags": {
        "authentic": 1,
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "PSYCHIC",
      "contestType": "CUTE",
      "zMoveBoost": {
        "spe": 1
      }
    },
    "ROLLINGKICK": {
      "id": "ROLLINGKICK",
      "num": 27,
      "accuracy": 85,
      "basePower": 60,
      "category": "PHYSICAL",
      "desc": "30% chance to flinch the target.",
      "name": "Rolling Kick",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FIGHTING",
      "contestType": "COOL",
      "zMovePower": 120
    },
    "ROLLOUT": {
      "id": "ROLLOUT",
      "num": 205,
      "accuracy": 90,
      "basePower": 30,
      "category": "PHYSICAL",
      "desc": "Power doubles with each hit. Repeats for 5 turns.",
      "name": "Rollout",
      "pp": 20,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "ROCK",
      "contestType": "CUTE",
      "zMovePower": 100
    },
    "ROOST": {
      "id": "ROOST",
      "num": 355,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Heals 50% HP. Flying-type removed 'til turn ends.",
      "name": "Roost",
      "pp": 10,
      "priority": 0,
      "flags": {
        "snatch": 1,
        "heal": 1
      },
      "target": "SELF",
      "type": "FLYING",
      "contestType": "CLEVER",
      "isViable": true,
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "ROTOTILLER": {
      "id": "ROTOTILLER",
      "num": 563,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Raises Atk, Sp. Atk of grounded Grass types by 1.",
      "name": "Rototiller",
      "pp": 10,
      "priority": 0,
      "flags": {
        "distance": 1,
        "nonsky": 1
      },
      "target": "ALL",
      "type": "GROUND",
      "contestType": "TOUGH",
      "zMoveBoost": {
        "atk": 1
      }
    },
    "ROUND": {
      "id": "ROUND",
      "num": 496,
      "accuracy": 100,
      "basePower": 60,
      "category": "SPECIAL",
      "desc": "Power doubles if others used Round this turn.",
      "name": "Round",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "sound": 1,
        "authentic": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "BEAUTIFUL",
      "zMovePower": 120
    },
    "SACREDFIRE": {
      "id": "SACREDFIRE",
      "num": 221,
      "accuracy": 95,
      "basePower": 100,
      "category": "PHYSICAL",
      "desc": "50% chance to burn the target. Thaws user.",
      "name": "Sacred Fire",
      "pp": 5,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "defrost": 1
      },
      "target": "NORMAL",
      "type": "FIRE",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 180
    },
    "SACREDSWORD": {
      "id": "SACREDSWORD",
      "num": 533,
      "accuracy": 100,
      "basePower": 90,
      "category": "PHYSICAL",
      "desc": "Ignores the target's stat stage changes.",
      "name": "Sacred Sword",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FIGHTING",
      "contestType": "COOL",
      "isViable": true,
      "ignoreEvasion": true,
      "zMovePower": 175
    },
    "SAFEGUARD": {
      "id": "SAFEGUARD",
      "num": 219,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "For 5 turns, protects user's party from status.",
      "name": "Safeguard",
      "pp": 25,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "ALLYSIDE",
      "type": "NORMAL",
      "contestType": "BEAUTIFUL",
      "sideCondition": "safeguard",
      "zMoveBoost": {
        "spe": 1
      }
    },
    "SANDATTACK": {
      "id": "SANDATTACK",
      "num": 28,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Lowers the target's accuracy by 1.",
      "name": "Sand Attack",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GROUND",
      "contestType": "CUTE",
      "boosts": {
        "accuracy": -1
      },
      "zMoveBoost": {
        "evasion": 1
      }
    },
    "SANDTOMB": {
      "id": "SANDTOMB",
      "num": 328,
      "accuracy": 85,
      "basePower": 35,
      "category": "PHYSICAL",
      "desc": "Traps and damages the target for 4-5 turns.",
      "name": "Sand Tomb",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GROUND",
      "contestType": "CLEVER",
      "zMovePower": 100
    },
    "SANDSTORM": {
      "id": "SANDSTORM",
      "num": 201,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "For 5 turns, a sandstorm rages.",
      "name": "Sandstorm",
      "pp": 10,
      "priority": 0,
      "flags": {},
      "target": "ALL",
      "type": "ROCK",
      "contestType": "TOUGH",
      "zMoveBoost": {
        "spe": 1
      }
    },
    "SAVAGESPINOUT": {
      "id": "SAVAGESPINOUT",
      "num": 634,
      "accuracy": true,
      "basePower": 1,
      "category": "PHYSICAL",
      "desc": "Power is equal to the base move's Z-Power.",
      "name": "Savage Spin-Out",
      "pp": 1,
      "priority": 0,
      "flags": {},
      "target": "NORMAL",
      "type": "BUG",
      "contestType": "COOL",
      "isZ": "buginiumz"
    },
    "SCALD": {
      "id": "SCALD",
      "num": 503,
      "accuracy": 100,
      "basePower": 80,
      "category": "SPECIAL",
      "desc": "30% chance to burn the target. Thaws target.",
      "name": "Scald",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "defrost": 1
      },
      "target": "NORMAL",
      "type": "WATER",
      "contestType": "TOUGH",
      "isViable": true,
      "zMovePower": 160
    },
    "SCARYFACE": {
      "id": "SCARYFACE",
      "num": 184,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Lowers the target's Speed by 2.",
      "name": "Scary Face",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1,
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "TOUGH",
      "boosts": {
        "spe": -2
      },
      "zMoveBoost": {
        "spe": 1
      }
    },
    "SCRATCH": {
      "id": "SCRATCH",
      "num": 10,
      "accuracy": 100,
      "basePower": 40,
      "category": "PHYSICAL",
      "desc": "No additional effect.",
      "name": "Scratch",
      "pp": 35,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "TOUGH",
      "zMovePower": 100
    },
    "SCREECH": {
      "id": "SCREECH",
      "num": 103,
      "accuracy": 85,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Lowers the target's Defense by 2.",
      "name": "Screech",
      "pp": 40,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1,
        "sound": 1,
        "authentic": 1,
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CLEVER",
      "boosts": {
        "def": -2
      },
      "zMoveBoost": {
        "atk": 1
      }
    },
    "SEARINGSHOT": {
      "id": "SEARINGSHOT",
      "num": 545,
      "accuracy": 100,
      "basePower": 100,
      "category": "SPECIAL",
      "desc": "30% chance to burn adjacent Pokemon.",
      "name": "Searing Shot",
      "pp": 5,
      "priority": 0,
      "flags": {
        "bullet": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "ALLADJACENT",
      "type": "FIRE",
      "contestType": "COOL",
      "zMovePower": 180
    },
    "SEARINGSUNRAZESMASH": {
      "id": "SEARINGSUNRAZESMASH",
      "num": 724,
      "accuracy": true,
      "basePower": 200,
      "category": "PHYSICAL",
      "desc": "Ignores the Abilities of other Pokemon.",
      "name": "Searing Sunraze Smash",
      "pp": 1,
      "priority": 0,
      "flags": {
        "contact": 1
      },
      "target": "NORMAL",
      "type": "STEEL",
      "contestType": "COOL",
      "isZ": "solganiumz"
    },
    "SECRETPOWER": {
      "id": "SECRETPOWER",
      "num": 290,
      "accuracy": 100,
      "basePower": 70,
      "category": "PHYSICAL",
      "desc": "Effect varies with terrain. (30% paralysis chance)",
      "name": "Secret Power",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CLEVER",
      "zMovePower": 140
    },
    "SECRETSWORD": {
      "id": "SECRETSWORD",
      "num": 548,
      "accuracy": 100,
      "basePower": 85,
      "category": "SPECIAL",
      "desc": "Damages target based on Defense, not Sp. Def.",
      "name": "Secret Sword",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FIGHTING",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 160
    },
    "SEEDBOMB": {
      "id": "SEEDBOMB",
      "num": 402,
      "accuracy": 100,
      "basePower": 80,
      "category": "PHYSICAL",
      "desc": "No additional effect.",
      "name": "Seed Bomb",
      "pp": 15,
      "priority": 0,
      "flags": {
        "bullet": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GRASS",
      "contestType": "TOUGH",
      "isViable": true,
      "zMovePower": 160
    },
    "SEEDFLARE": {
      "id": "SEEDFLARE",
      "num": 465,
      "accuracy": 85,
      "basePower": 120,
      "category": "SPECIAL",
      "desc": "40% chance to lower the target's Sp. Def by 2.",
      "name": "Seed Flare",
      "pp": 5,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GRASS",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 190
    },
    "SEISMICTOSS": {
      "id": "SEISMICTOSS",
      "num": 69,
      "accuracy": 100,
      "basePower": 0,
      "category": "PHYSICAL",
      "desc": "Does damage equal to the user's level.",
      "name": "Seismic Toss",
      "pp": 20,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1,
        "nonsky": 1
      },
      "target": "NORMAL",
      "type": "FIGHTING",
      "contestType": "TOUGH",
      "isViable": true,
      "zMovePower": 100
    },
    "SELFDESTRUCT": {
      "id": "SELFDESTRUCT",
      "num": 120,
      "accuracy": 100,
      "basePower": 200,
      "category": "PHYSICAL",
      "desc": "Hits adjacent Pokemon. The user faints.",
      "name": "Self-Destruct",
      "pp": 5,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "ALLADJACENT",
      "type": "NORMAL",
      "contestType": "BEAUTIFUL",
      "zMovePower": 200
    },
    "SHADOWBALL": {
      "id": "SHADOWBALL",
      "num": 247,
      "accuracy": 100,
      "basePower": 80,
      "category": "SPECIAL",
      "desc": "20% chance to lower the target's Sp. Def by 1.",
      "name": "Shadow Ball",
      "pp": 15,
      "priority": 0,
      "flags": {
        "bullet": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GHOST",
      "contestType": "CLEVER",
      "isViable": true,
      "zMovePower": 160
    },
    "SHADOWBONE": {
      "id": "SHADOWBONE",
      "num": 708,
      "accuracy": 100,
      "basePower": 85,
      "category": "PHYSICAL",
      "desc": "20% chance to lower the target's Defense by 1.",
      "name": "Shadow Bone",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GHOST",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 160
    },
    "SHADOWCLAW": {
      "id": "SHADOWCLAW",
      "num": 421,
      "accuracy": 100,
      "basePower": 70,
      "category": "PHYSICAL",
      "desc": "High critical hit ratio.",
      "name": "Shadow Claw",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GHOST",
      "contestType": "COOL",
      "critRatio": 2,
      "isViable": true,
      "zMovePower": 140
    },
    "SHADOWFORCE": {
      "id": "SHADOWFORCE",
      "num": 467,
      "accuracy": 100,
      "basePower": 120,
      "category": "PHYSICAL",
      "desc": "Disappears turn 1. Hits turn 2. Breaks protection.",
      "name": "Shadow Force",
      "pp": 5,
      "priority": 0,
      "flags": {
        "contact": 1,
        "charge": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GHOST",
      "contestType": "COOL",
      "isViable": true,
      "breaksProtect": true,
      "zMovePower": 190
    },
    "SHADOWPUNCH": {
      "id": "SHADOWPUNCH",
      "num": 325,
      "accuracy": true,
      "basePower": 60,
      "category": "PHYSICAL",
      "desc": "This move does not check accuracy.",
      "name": "Shadow Punch",
      "pp": 20,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1,
        "punch": 1
      },
      "target": "NORMAL",
      "type": "GHOST",
      "contestType": "CLEVER",
      "isViable": true,
      "zMovePower": 120
    },
    "SHADOWSNEAK": {
      "id": "SHADOWSNEAK",
      "num": 425,
      "accuracy": 100,
      "basePower": 40,
      "category": "PHYSICAL",
      "desc": "Usually goes first.",
      "name": "Shadow Sneak",
      "pp": 30,
      "priority": 1,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GHOST",
      "contestType": "CLEVER",
      "isViable": true,
      "zMovePower": 100
    },
    "SHARPEN": {
      "id": "SHARPEN",
      "num": 159,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Raises the user's Attack by 1.",
      "name": "Sharpen",
      "pp": 30,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "SELF",
      "type": "NORMAL",
      "contestType": "CUTE",
      "boosts": {
        "atk": 1
      },
      "zMoveBoost": {
        "atk": 1
      }
    },
    "SHATTEREDPSYCHE": {
      "id": "SHATTEREDPSYCHE",
      "num": 648,
      "accuracy": true,
      "basePower": 1,
      "category": "PHYSICAL",
      "desc": "Power is equal to the base move's Z-Power.",
      "name": "Shattered Psyche",
      "pp": 1,
      "priority": 0,
      "flags": {},
      "target": "NORMAL",
      "type": "PSYCHIC",
      "contestType": "COOL",
      "isViable": true,
      "isZ": "psychiumz"
    },
    "SHEERCOLD": {
      "id": "SHEERCOLD",
      "num": 329,
      "accuracy": 30,
      "basePower": 0,
      "category": "SPECIAL",
      "desc": "OHKOs non-Ice targets. Fails if user's lower level.",
      "name": "Sheer Cold",
      "pp": 5,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "ICE",
      "contestType": "BEAUTIFUL",
      "zMovePower": 180
    },
    "SHELLSMASH": {
      "id": "SHELLSMASH",
      "num": 504,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Lowers Def, SpD by 1; raises Atk, SpA, Spe by 2.",
      "name": "Shell Smash",
      "pp": 15,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "SELF",
      "type": "NORMAL",
      "contestType": "TOUGH",
      "isViable": true,
      "boosts": {
        "def": -1,
        "spd": -1,
        "atk": 2,
        "spa": 2,
        "spe": 2
      },
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "SHELLTRAP": {
      "id": "SHELLTRAP",
      "num": 704,
      "accuracy": 100,
      "basePower": 150,
      "category": "SPECIAL",
      "desc": "User must take physical damage before moving.",
      "name": "Shell Trap",
      "pp": 5,
      "priority": -3,
      "flags": {
        "protect": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "FIRE",
      "contestType": "TOUGH",
      "zMovePower": 200
    },
    "SHIFTGEAR": {
      "id": "SHIFTGEAR",
      "num": 508,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Raises the user's Speed by 2 and Attack by 1.",
      "name": "Shift Gear",
      "pp": 10,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "SELF",
      "type": "STEEL",
      "contestType": "CLEVER",
      "isViable": true,
      "boosts": {
        "spe": 2,
        "atk": 1
      },
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "SHOCKWAVE": {
      "id": "SHOCKWAVE",
      "num": 351,
      "accuracy": true,
      "basePower": 60,
      "category": "SPECIAL",
      "desc": "This move does not check accuracy.",
      "name": "Shock Wave",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "ELECTRIC",
      "contestType": "COOL",
      "zMovePower": 120
    },
    "SHOREUP": {
      "id": "SHOREUP",
      "num": 659,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "User restores 1/2 its max HP; 2/3 in Sandstorm.",
      "name": "Shore Up",
      "pp": 10,
      "priority": 0,
      "flags": {
        "snatch": 1,
        "heal": 1
      },
      "target": "SELF",
      "type": "GROUND",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "SIGNALBEAM": {
      "id": "SIGNALBEAM",
      "num": 324,
      "accuracy": 100,
      "basePower": 75,
      "category": "SPECIAL",
      "desc": "10% chance to confuse the target.",
      "name": "Signal Beam",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "BUG",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 140
    },
    "SILVERWIND": {
      "id": "SILVERWIND",
      "num": 318,
      "accuracy": 100,
      "basePower": 60,
      "category": "SPECIAL",
      "desc": "10% chance to raise all stats by 1 (not acc/eva).",
      "name": "Silver Wind",
      "pp": 5,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "BUG",
      "contestType": "BEAUTIFUL",
      "zMovePower": 120
    },
    "SIMPLEBEAM": {
      "id": "SIMPLEBEAM",
      "num": 493,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "The target's Ability becomes Simple.",
      "name": "Simple Beam",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1,
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CUTE",
      "zMoveBoost": {
        "spa": 1
      }
    },
    "SING": {
      "id": "SING",
      "num": 47,
      "accuracy": 55,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Puts the target to sleep.",
      "name": "Sing",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1,
        "sound": 1,
        "authentic": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CUTE",
      "status": "slp",
      "zMoveBoost": {
        "spe": 1
      }
    },
    "SINISTERARROWRAID": {
      "id": "SINISTERARROWRAID",
      "num": 695,
      "accuracy": true,
      "basePower": 180,
      "category": "PHYSICAL",
      "desc": "No additional effect.",
      "name": "Sinister Arrow Raid",
      "pp": 1,
      "priority": 0,
      "flags": {},
      "target": "NORMAL",
      "type": "GHOST",
      "contestType": "COOL",
      "isZ": "decidiumz"
    },
    "SKETCH": {
      "id": "SKETCH",
      "num": 166,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Permanently copies the last move target used.",
      "name": "Sketch",
      "pp": 1,
      "priority": 0,
      "flags": {
        "authentic": 1,
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "atk": 1,
        "def": 1,
        "spa": 1,
        "spd": 1,
        "spe": 1
      }
    },
    "SKILLSWAP": {
      "id": "SKILLSWAP",
      "num": 285,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "The user and the target trade Abilities.",
      "name": "Skill Swap",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "authentic": 1,
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "PSYCHIC",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "spe": 1
      }
    },
    "SKULLBASH": {
      "id": "SKULLBASH",
      "num": 130,
      "accuracy": 100,
      "basePower": 130,
      "category": "PHYSICAL",
      "desc": "Raises user's Defense by 1 on turn 1. Hits turn 2.",
      "name": "Skull Bash",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "charge": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "TOUGH",
      "zMovePower": 195
    },
    "SKYATTACK": {
      "id": "SKYATTACK",
      "num": 143,
      "accuracy": 90,
      "basePower": 140,
      "category": "PHYSICAL",
      "desc": "Charges, then hits turn 2. 30% flinch. High crit.",
      "name": "Sky Attack",
      "pp": 5,
      "priority": 0,
      "flags": {
        "charge": 1,
        "protect": 1,
        "mirror": 1,
        "distance": 1
      },
      "target": "ANY",
      "type": "FLYING",
      "contestType": "COOL",
      "critRatio": 2,
      "zMovePower": 200
    },
    "SKYDROP": {
      "id": "SKYDROP",
      "num": 507,
      "accuracy": 100,
      "basePower": 60,
      "category": "PHYSICAL",
      "desc": "User and foe fly up turn 1. Damages on turn 2.",
      "name": "Sky Drop",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "charge": 1,
        "protect": 1,
        "mirror": 1,
        "gravity": 1,
        "distance": 1
      },
      "target": "ANY",
      "type": "FLYING",
      "contestType": "TOUGH",
      "zMovePower": 120
    },
    "SKYUPPERCUT": {
      "id": "SKYUPPERCUT",
      "num": 327,
      "accuracy": 90,
      "basePower": 85,
      "category": "PHYSICAL",
      "desc": "Can hit Pokemon using Bounce, Fly, or Sky Drop.",
      "name": "Sky Uppercut",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1,
        "punch": 1
      },
      "target": "NORMAL",
      "type": "FIGHTING",
      "contestType": "COOL",
      "zMovePower": 160
    },
    "SLACKOFF": {
      "id": "SLACKOFF",
      "num": 303,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Heals the user by 50% of its max HP.",
      "name": "Slack Off",
      "pp": 10,
      "priority": 0,
      "flags": {
        "snatch": 1,
        "heal": 1
      },
      "target": "SELF",
      "type": "NORMAL",
      "contestType": "CUTE",
      "isViable": true,
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "SLAM": {
      "id": "SLAM",
      "num": 21,
      "accuracy": 75,
      "basePower": 80,
      "category": "PHYSICAL",
      "desc": "No additional effect.",
      "name": "Slam",
      "pp": 20,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1,
        "nonsky": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "TOUGH",
      "zMovePower": 160
    },
    "SLASH": {
      "id": "SLASH",
      "num": 163,
      "accuracy": 100,
      "basePower": 70,
      "category": "PHYSICAL",
      "desc": "High critical hit ratio.",
      "name": "Slash",
      "pp": 20,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "COOL",
      "critRatio": 2,
      "zMovePower": 140
    },
    "SLEEPPOWDER": {
      "id": "SLEEPPOWDER",
      "num": 79,
      "accuracy": 75,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Puts the target to sleep.",
      "name": "Sleep Powder",
      "pp": 15,
      "priority": 0,
      "flags": {
        "powder": 1,
        "protect": 1,
        "reflectable": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GRASS",
      "contestType": "CLEVER",
      "isViable": true,
      "status": "slp",
      "zMoveBoost": {
        "spe": 1
      }
    },
    "SLEEPTALK": {
      "id": "SLEEPTALK",
      "num": 214,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "User must be asleep. Uses another known move.",
      "name": "Sleep Talk",
      "pp": 10,
      "priority": 0,
      "flags": {},
      "target": "SELF",
      "type": "NORMAL",
      "contestType": "CUTE",
      "isViable": true,
      "sleepUsable": true,
      "zMoveEffect": "CRIT2"
    },
    "SLUDGE": {
      "id": "SLUDGE",
      "num": 124,
      "accuracy": 100,
      "basePower": 65,
      "category": "SPECIAL",
      "desc": "30% chance to poison the target.",
      "name": "Sludge",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "POISON",
      "contestType": "TOUGH",
      "zMovePower": 120
    },
    "SLUDGEBOMB": {
      "id": "SLUDGEBOMB",
      "num": 188,
      "accuracy": 100,
      "basePower": 90,
      "category": "SPECIAL",
      "desc": "30% chance to poison the target.",
      "name": "Sludge Bomb",
      "pp": 10,
      "priority": 0,
      "flags": {
        "bullet": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "POISON",
      "contestType": "TOUGH",
      "isViable": true,
      "zMovePower": 175
    },
    "SLUDGEWAVE": {
      "id": "SLUDGEWAVE",
      "num": 482,
      "accuracy": 100,
      "basePower": 95,
      "category": "SPECIAL",
      "desc": "10% chance to poison adjacent Pokemon.",
      "name": "Sludge Wave",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "ALLADJACENT",
      "type": "POISON",
      "contestType": "TOUGH",
      "isViable": true,
      "zMovePower": 175
    },
    "SMACKDOWN": {
      "id": "SMACKDOWN",
      "num": 479,
      "accuracy": 100,
      "basePower": 50,
      "category": "PHYSICAL",
      "desc": "Removes the target's Ground immunity.",
      "name": "Smack Down",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "nonsky": 1
      },
      "target": "NORMAL",
      "type": "ROCK",
      "contestType": "TOUGH",
      "zMovePower": 100
    },
    "SMARTSTRIKE": {
      "id": "SMARTSTRIKE",
      "num": 684,
      "accuracy": true,
      "basePower": 70,
      "category": "PHYSICAL",
      "desc": "This move does not check accuracy.",
      "name": "Smart Strike",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "STEEL",
      "contestType": "COOL",
      "zMovePower": 140
    },
    "SMELLINGSALTS": {
      "id": "SMELLINGSALTS",
      "num": 265,
      "accuracy": 100,
      "basePower": 70,
      "category": "PHYSICAL",
      "desc": "Power doubles if target is paralyzed, and cures it.",
      "name": "Smelling Salts",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "TOUGH",
      "zMovePower": 140
    },
    "SMOG": {
      "id": "SMOG",
      "num": 123,
      "accuracy": 70,
      "basePower": 30,
      "category": "SPECIAL",
      "desc": "40% chance to poison the target.",
      "name": "Smog",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "POISON",
      "contestType": "TOUGH",
      "zMovePower": 100
    },
    "SMOKESCREEN": {
      "id": "SMOKESCREEN",
      "num": 108,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Lowers the target's accuracy by 1.",
      "name": "Smokescreen",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CLEVER",
      "boosts": {
        "accuracy": -1
      },
      "zMoveBoost": {
        "evasion": 1
      }
    },
    "SNARL": {
      "id": "SNARL",
      "num": 555,
      "accuracy": 95,
      "basePower": 55,
      "category": "SPECIAL",
      "desc": "100% chance to lower the foe(s) Sp. Atk by 1.",
      "name": "Snarl",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "sound": 1,
        "authentic": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "DARK",
      "contestType": "TOUGH",
      "zMovePower": 100
    },
    "SNATCH": {
      "id": "SNATCH",
      "num": 289,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "User steals certain support moves to use itself.",
      "name": "Snatch",
      "pp": 10,
      "priority": 4,
      "flags": {
        "authentic": 1
      },
      "target": "SELF",
      "type": "DARK",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "spe": 2
      }
    },
    "SNORE": {
      "id": "SNORE",
      "num": 173,
      "accuracy": 100,
      "basePower": 50,
      "category": "SPECIAL",
      "desc": "User must be asleep. 30% chance to flinch target.",
      "name": "Snore",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "sound": 1,
        "authentic": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CUTE",
      "sleepUsable": true,
      "zMovePower": 100
    },
    "SPECTRALTHIEF": {
      "id": "SPECTRALTHIEF",
      "num": 712,
      "accuracy": 100,
      "basePower": 90,
      "category": "PHYSICAL",
      "desc": "Steals target's boosts before dealing damage.",
      "name": "Spectral Thief",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1,
        "authentic": 1
      },
      "target": "NORMAL",
      "type": "GHOST",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 175
    },
    "SPEEDSWAP": {
      "id": "SPEEDSWAP",
      "num": 683,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Swaps Speed stat with target.",
      "name": "Speed Swap",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "authentic": 1,
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "PSYCHIC",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "spe": 1
      }
    },
    "SPIKYSHIELD": {
      "id": "SPIKYSHIELD",
      "num": 596,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Protects from moves. Contact: loses 1/8 max HP.",
      "name": "Spiky Shield",
      "pp": 10,
      "priority": 4,
      "flags": {},
      "target": "SELF",
      "type": "GRASS",
      "contestType": "TOUGH",
      "isViable": true,
      "zMoveBoost": {
        "def": 1
      }
    },
    "SPIRITSHACKLE": {
      "id": "SPIRITSHACKLE",
      "num": 662,
      "accuracy": 100,
      "basePower": 80,
      "category": "PHYSICAL",
      "desc": "Prevents the target from switching out.",
      "name": "Spirit Shackle",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GHOST",
      "contestType": "TOUGH",
      "isViable": true,
      "zMovePower": 160
    },
    "SOAK": {
      "id": "SOAK",
      "num": 487,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Changes the target's type to Water.",
      "name": "Soak",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1,
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "WATER",
      "contestType": "CUTE",
      "zMoveBoost": {
        "spa": 1
      }
    },
    "SOFTBOILED": {
      "id": "SOFTBOILED",
      "num": 135,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Heals the user by 50% of its max HP.",
      "name": "Soft-Boiled",
      "pp": 10,
      "priority": 0,
      "flags": {
        "snatch": 1,
        "heal": 1
      },
      "target": "SELF",
      "type": "NORMAL",
      "contestType": "CUTE",
      "isViable": true,
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "SOLARBEAM": {
      "id": "SOLARBEAM",
      "num": 76,
      "accuracy": 100,
      "basePower": 120,
      "category": "SPECIAL",
      "desc": "Charges turn 1. Hits turn 2. No charge in sunlight.",
      "name": "Solar Beam",
      "pp": 10,
      "priority": 0,
      "flags": {
        "charge": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GRASS",
      "contestType": "COOL",
      "zMovePower": 190
    },
    "SOLARBLADE": {
      "id": "SOLARBLADE",
      "num": 669,
      "accuracy": 100,
      "basePower": 125,
      "category": "PHYSICAL",
      "desc": "Charges turn 1. Hits turn 2. No charge in sunlight.",
      "name": "Solar Blade",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "charge": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GRASS",
      "contestType": "COOL",
      "zMovePower": 190
    },
    "SONICBOOM": {
      "id": "SONICBOOM",
      "num": 49,
      "accuracy": 90,
      "basePower": 0,
      "category": "SPECIAL",
      "desc": "Always does 20 HP of damage.",
      "name": "Sonic Boom",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "COOL",
      "zMovePower": 100
    },
    "SOULSTEALING7STARSTRIKE": {
      "id": "SOULSTEALING7STARSTRIKE",
      "num": 699,
      "accuracy": true,
      "basePower": 195,
      "category": "PHYSICAL",
      "desc": "No additional effect.",
      "name": "Soul-Stealing 7-Star Strike",
      "pp": 1,
      "priority": 0,
      "flags": {
        "contact": 1
      },
      "target": "NORMAL",
      "type": "GHOST",
      "contestType": "COOL",
      "isZ": "marshadiumz"
    },
    "SPACIALREND": {
      "id": "SPACIALREND",
      "num": 460,
      "accuracy": 95,
      "basePower": 100,
      "category": "SPECIAL",
      "desc": "High critical hit ratio.",
      "name": "Spacial Rend",
      "pp": 5,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "DRAGON",
      "contestType": "BEAUTIFUL",
      "critRatio": 2,
      "isViable": true,
      "zMovePower": 180
    },
    "SPARK": {
      "id": "SPARK",
      "num": 209,
      "accuracy": 100,
      "basePower": 65,
      "category": "PHYSICAL",
      "desc": "30% chance to paralyze the target.",
      "name": "Spark",
      "pp": 20,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "ELECTRIC",
      "contestType": "COOL",
      "zMovePower": 120
    },
    "SPARKLINGARIA": {
      "id": "SPARKLINGARIA",
      "num": 664,
      "accuracy": 100,
      "basePower": 90,
      "category": "SPECIAL",
      "desc": "The target is cured of its burn.",
      "name": "Sparkling Aria",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "sound": 1,
        "authentic": 1
      },
      "target": "ALLADJACENT",
      "type": "WATER",
      "contestType": "TOUGH",
      "zMovePower": 175
    },
    "SPIDERWEB": {
      "id": "SPIDERWEB",
      "num": 169,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "The target cannot switch out.",
      "name": "Spider Web",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "BUG",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "def": 1
      }
    },
    "SPIKECANNON": {
      "id": "SPIKECANNON",
      "num": 131,
      "accuracy": 100,
      "basePower": 20,
      "category": "PHYSICAL",
      "desc": "Hits 2-5 times in one turn.",
      "name": "Spike Cannon",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "COOL",
      "multihit": [
        2,
        5
      ],
      "zMovePower": 100
    },
    "SPIKES": {
      "id": "SPIKES",
      "num": 191,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Hurts grounded foes on switch-in. Max 3 layers.",
      "name": "Spikes",
      "pp": 20,
      "priority": 0,
      "flags": {
        "reflectable": 1,
        "nonsky": 1
      },
      "target": "FOESIDE",
      "type": "GROUND",
      "contestType": "CLEVER",
      "isViable": true,
      "sideCondition": "spikes",
      "zMoveBoost": {
        "def": 1
      }
    },
    "SPITUP": {
      "id": "SPITUP",
      "num": 255,
      "accuracy": 100,
      "basePower": 0,
      "category": "SPECIAL",
      "desc": "More power with more uses of Stockpile.",
      "name": "Spit Up",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "TOUGH",
      "zMovePower": 100
    },
    "SPITE": {
      "id": "SPITE",
      "num": 180,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Lowers the PP of the target's last move by 4.",
      "name": "Spite",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1,
        "authentic": 1
      },
      "target": "NORMAL",
      "type": "GHOST",
      "contestType": "TOUGH",
      "zMoveEffect": "HEAL"
    },
    "SPLASH": {
      "id": "SPLASH",
      "num": 150,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Does nothing (but we still love it).",
      "name": "Splash",
      "pp": 40,
      "priority": 0,
      "flags": {
        "gravity": 1
      },
      "target": "SELF",
      "type": "NORMAL",
      "contestType": "CUTE",
      "zMoveBoost": {
        "atk": 3
      }
    },
    "SPLINTEREDSTORMSHARDS": {
      "id": "SPLINTEREDSTORMSHARDS",
      "num": 727,
      "accuracy": true,
      "basePower": 190,
      "category": "PHYSICAL",
      "desc": "Ends the effects of Terrain.",
      "name": "Splintered Stormshards",
      "pp": 1,
      "priority": 0,
      "flags": {},
      "target": "NORMAL",
      "type": "ROCK",
      "contestType": "COOL",
      "isZ": "lycaniumz"
    },
    "SPORE": {
      "id": "SPORE",
      "num": 147,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Puts the target to sleep.",
      "name": "Spore",
      "pp": 15,
      "priority": 0,
      "flags": {
        "powder": 1,
        "protect": 1,
        "reflectable": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GRASS",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "status": "slp",
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "SPOTLIGHT": {
      "id": "SPOTLIGHT",
      "num": 671,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Target's foes' moves are redirected to it this turn.",
      "name": "Spotlight",
      "pp": 15,
      "priority": 3,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CUTE",
      "zMoveBoost": {
        "spd": 1
      }
    },
    "STEALTHROCK": {
      "id": "STEALTHROCK",
      "num": 446,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Hurts foes on switch-in. Factors Rock weakness.",
      "name": "Stealth Rock",
      "pp": 20,
      "priority": 0,
      "flags": {
        "reflectable": 1
      },
      "target": "FOESIDE",
      "type": "ROCK",
      "contestType": "COOL",
      "isViable": true,
      "sideCondition": "stealthrock",
      "zMoveBoost": {
        "def": 1
      }
    },
    "STEAMERUPTION": {
      "id": "STEAMERUPTION",
      "num": 592,
      "accuracy": 95,
      "basePower": 110,
      "category": "SPECIAL",
      "desc": "30% chance to burn the target.",
      "name": "Steam Eruption",
      "pp": 5,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "defrost": 1
      },
      "target": "NORMAL",
      "type": "WATER",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 185
    },
    "STEELWING": {
      "id": "STEELWING",
      "num": 211,
      "accuracy": 90,
      "basePower": 70,
      "category": "PHYSICAL",
      "desc": "10% chance to raise the user's Defense by 1.",
      "name": "Steel Wing",
      "pp": 25,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "STEEL",
      "contestType": "COOL",
      "zMovePower": 140
    },
    "STICKYWEB": {
      "id": "STICKYWEB",
      "num": 564,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Lowers Speed of grounded foes by 1 on switch-in.",
      "name": "Sticky Web",
      "pp": 20,
      "priority": 0,
      "flags": {
        "reflectable": 1
      },
      "target": "FOESIDE",
      "type": "BUG",
      "contestType": "TOUGH",
      "isViable": true,
      "sideCondition": "stickyweb",
      "zMoveBoost": {
        "spe": 1
      }
    },
    "STOCKPILE": {
      "id": "STOCKPILE",
      "num": 254,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Raises user's Defense, Sp. Def by 1. Max 3 uses.",
      "name": "Stockpile",
      "pp": 20,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "SELF",
      "type": "NORMAL",
      "contestType": "TOUGH",
      "zMoveEffect": "HEAL"
    },
    "STOKEDSPARKSURFER": {
      "id": "STOKEDSPARKSURFER",
      "num": 700,
      "accuracy": true,
      "basePower": 175,
      "category": "SPECIAL",
      "desc": "100% chance to paralyze the target.",
      "name": "Stoked Sparksurfer",
      "pp": 1,
      "priority": 0,
      "flags": {},
      "target": "NORMAL",
      "type": "ELECTRIC",
      "contestType": "COOL",
      "isZ": "aloraichiumz"
    },
    "STOMP": {
      "id": "STOMP",
      "num": 23,
      "accuracy": 100,
      "basePower": 65,
      "category": "PHYSICAL",
      "desc": "30% chance to flinch the target.",
      "name": "Stomp",
      "pp": 20,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1,
        "nonsky": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "TOUGH",
      "zMovePower": 120
    },
    "STOMPINGTANTRUM": {
      "id": "STOMPINGTANTRUM",
      "num": 707,
      "accuracy": 100,
      "basePower": 75,
      "category": "PHYSICAL",
      "desc": "Power doubles if the user's last move failed.",
      "name": "Stomping Tantrum",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GROUND",
      "contestType": "TOUGH",
      "zMovePower": 140
    },
    "STONEEDGE": {
      "id": "STONEEDGE",
      "num": 444,
      "accuracy": 80,
      "basePower": 100,
      "category": "PHYSICAL",
      "desc": "High critical hit ratio.",
      "name": "Stone Edge",
      "pp": 5,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "ROCK",
      "contestType": "TOUGH",
      "critRatio": 2,
      "isViable": true,
      "zMovePower": 180
    },
    "STOREDPOWER": {
      "id": "STOREDPOWER",
      "num": 500,
      "accuracy": 100,
      "basePower": 20,
      "category": "SPECIAL",
      "desc": " + 20 power for each of the user's stat boosts.",
      "name": "Stored Power",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "PSYCHIC",
      "contestType": "CLEVER",
      "zMovePower": 160
    },
    "STORMTHROW": {
      "id": "STORMTHROW",
      "num": 480,
      "accuracy": 100,
      "basePower": 60,
      "category": "PHYSICAL",
      "desc": "Always results in a critical hit.",
      "name": "Storm Throw",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FIGHTING",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 120
    },
    "STEAMROLLER": {
      "id": "STEAMROLLER",
      "num": 537,
      "accuracy": 100,
      "basePower": 65,
      "category": "PHYSICAL",
      "desc": "30% chance to flinch the target.",
      "name": "Steamroller",
      "pp": 20,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "BUG",
      "contestType": "TOUGH",
      "zMovePower": 120
    },
    "STRENGTH": {
      "id": "STRENGTH",
      "num": 70,
      "accuracy": 100,
      "basePower": 80,
      "category": "PHYSICAL",
      "desc": "No additional effect.",
      "name": "Strength",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "TOUGH",
      "zMovePower": 160
    },
    "STRENGTHSAP": {
      "id": "STRENGTHSAP",
      "num": 668,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "User heals HP=target's Atk stat. Lowers Atk by 1.",
      "name": "Strength Sap",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1,
        "heal": 1
      },
      "target": "NORMAL",
      "type": "GRASS",
      "contestType": "CUTE",
      "isViable": true,
      "zMoveBoost": {
        "def": 1
      }
    },
    "STRINGSHOT": {
      "id": "STRINGSHOT",
      "num": 81,
      "accuracy": 95,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Lowers the foe(s) Speed by 2.",
      "name": "String Shot",
      "pp": 40,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "BUG",
      "contestType": "CLEVER",
      "boosts": {
        "spe": -2
      },
      "zMoveBoost": {
        "spe": 1
      }
    },
    "STRUGGLE": {
      "id": "STRUGGLE",
      "num": 165,
      "accuracy": true,
      "basePower": 50,
      "category": "PHYSICAL",
      "desc": "User loses 25% of its max HP as recoil.",
      "name": "Struggle",
      "pp": 1,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1
      },
      "target": "RANDOMNORMAL",
      "type": "NORMAL",
      "contestType": "TOUGH",
      "zMovePower": 1
    },
    "STRUGGLEBUG": {
      "id": "STRUGGLEBUG",
      "num": 522,
      "accuracy": 100,
      "basePower": 50,
      "category": "SPECIAL",
      "desc": "100% chance to lower the foe(s) Sp. Atk by 1.",
      "name": "Struggle Bug",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "BUG",
      "contestType": "CUTE",
      "zMovePower": 100
    },
    "STUNSPORE": {
      "id": "STUNSPORE",
      "num": 78,
      "accuracy": 75,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Paralyzes the target.",
      "name": "Stun Spore",
      "pp": 30,
      "priority": 0,
      "flags": {
        "powder": 1,
        "protect": 1,
        "reflectable": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GRASS",
      "contestType": "CLEVER",
      "status": "par",
      "zMoveBoost": {
        "spd": 1
      }
    },
    "SUBMISSION": {
      "id": "SUBMISSION",
      "num": 66,
      "accuracy": 80,
      "basePower": 80,
      "category": "PHYSICAL",
      "desc": "Has 1/4 recoil.",
      "name": "Submission",
      "pp": 20,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FIGHTING",
      "contestType": "COOL",
      "recoil": [
        1,
        4
      ],
      "zMovePower": 160
    },
    "SUBSTITUTE": {
      "id": "SUBSTITUTE",
      "num": 164,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "User takes 1/4 its max HP to put in a Substitute.",
      "name": "Substitute",
      "pp": 10,
      "priority": 0,
      "flags": {
        "snatch": 1,
        "nonsky": 1
      },
      "target": "SELF",
      "type": "NORMAL",
      "contestType": "CUTE",
      "isViable": true,
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "SUBZEROSLAMMER": {
      "id": "SUBZEROSLAMMER",
      "num": 650,
      "accuracy": true,
      "basePower": 1,
      "category": "PHYSICAL",
      "desc": "Power is equal to the base move's Z-Power.",
      "name": "Subzero Slammer",
      "pp": 1,
      "priority": 0,
      "flags": {},
      "target": "NORMAL",
      "type": "ICE",
      "contestType": "COOL",
      "isViable": true,
      "isZ": "iciumz"
    },
    "SUCKERPUNCH": {
      "id": "SUCKERPUNCH",
      "num": 389,
      "accuracy": 100,
      "basePower": 70,
      "category": "PHYSICAL",
      "desc": "Usually goes first. Fails if target is not attacking.",
      "name": "Sucker Punch",
      "pp": 5,
      "priority": 1,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "DARK",
      "contestType": "CLEVER",
      "isViable": true,
      "zMovePower": 140
    },
    "SUNNYDAY": {
      "id": "SUNNYDAY",
      "num": 241,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "For 5 turns, intense sunlight powers Fire moves.",
      "name": "Sunny Day",
      "pp": 5,
      "priority": 0,
      "flags": {},
      "target": "ALL",
      "type": "FIRE",
      "contestType": "BEAUTIFUL",
      "zMoveBoost": {
        "spe": 1
      }
    },
    "SUNSTEELSTRIKE": {
      "id": "SUNSTEELSTRIKE",
      "num": 713,
      "accuracy": 100,
      "basePower": 100,
      "category": "PHYSICAL",
      "desc": "Ignores the Abilities of other Pokemon.",
      "name": "Sunsteel Strike",
      "pp": 5,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "STEEL",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 180
    },
    "SUPERFANG": {
      "id": "SUPERFANG",
      "num": 162,
      "accuracy": 90,
      "basePower": 0,
      "category": "PHYSICAL",
      "desc": "Does damage equal to 1/2 target's current HP.",
      "name": "Super Fang",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "TOUGH",
      "isViable": true,
      "zMovePower": 100
    },
    "SUPERPOWER": {
      "id": "SUPERPOWER",
      "num": 276,
      "accuracy": 100,
      "basePower": 120,
      "category": "PHYSICAL",
      "desc": "Lowers the user's Attack and Defense by 1.",
      "name": "Superpower",
      "pp": 5,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FIGHTING",
      "contestType": "TOUGH",
      "isViable": true,
      "zMovePower": 190
    },
    "SUPERSONIC": {
      "id": "SUPERSONIC",
      "num": 48,
      "accuracy": 55,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Confuses the target.",
      "name": "Supersonic",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1,
        "sound": 1,
        "authentic": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "spe": 1
      }
    },
    "SUPERSONICSKYSTRIKE": {
      "id": "SUPERSONICSKYSTRIKE",
      "num": 626,
      "accuracy": true,
      "basePower": 1,
      "category": "PHYSICAL",
      "desc": "Power is equal to the base move's Z-Power.",
      "name": "Supersonic Skystrike",
      "pp": 1,
      "priority": 0,
      "flags": {},
      "target": "NORMAL",
      "type": "FLYING",
      "contestType": "COOL",
      "isViable": true,
      "isZ": "flyiniumz"
    },
    "SURF": {
      "id": "SURF",
      "num": 57,
      "accuracy": 100,
      "basePower": 90,
      "category": "SPECIAL",
      "desc": "Hits adjacent Pokemon. Power doubles on Dive.",
      "name": "Surf",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "nonsky": 1
      },
      "target": "ALLADJACENT",
      "type": "WATER",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 175
    },
    "SWAGGER": {
      "id": "SWAGGER",
      "num": 207,
      "accuracy": 85,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Raises the target's Attack by 2 and confuses it.",
      "name": "Swagger",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1,
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CUTE",
      "boosts": {
        "atk": 2
      },
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "SWALLOW": {
      "id": "SWALLOW",
      "num": 256,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Heals the user based on uses of Stockpile.",
      "name": "Swallow",
      "pp": 10,
      "priority": 0,
      "flags": {
        "snatch": 1,
        "heal": 1
      },
      "target": "SELF",
      "type": "NORMAL",
      "contestType": "TOUGH",
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "SWEETKISS": {
      "id": "SWEETKISS",
      "num": 186,
      "accuracy": 75,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Confuses the target.",
      "name": "Sweet Kiss",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FAIRY",
      "contestType": "CUTE",
      "zMoveBoost": {
        "spa": 1
      }
    },
    "SWEETSCENT": {
      "id": "SWEETSCENT",
      "num": 230,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Lowers the foe(s) evasiveness by 2.",
      "name": "Sweet Scent",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "NORMAL",
      "contestType": "CUTE",
      "boosts": {
        "evasion": -2
      },
      "zMoveBoost": {
        "accuracy": 1
      }
    },
    "SWIFT": {
      "id": "SWIFT",
      "num": 129,
      "accuracy": true,
      "basePower": 60,
      "category": "SPECIAL",
      "desc": "This move does not check accuracy. Hits foes.",
      "name": "Swift",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "NORMAL",
      "contestType": "COOL",
      "zMovePower": 120
    },
    "SWITCHEROO": {
      "id": "SWITCHEROO",
      "num": 415,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "User switches its held item with the target's.",
      "name": "Switcheroo",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "DARK",
      "contestType": "CLEVER",
      "isViable": true,
      "zMoveBoost": {
        "spe": 2
      }
    },
    "SWORDSDANCE": {
      "id": "SWORDSDANCE",
      "num": 14,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Raises the user's Attack by 2.",
      "name": "Swords Dance",
      "pp": 20,
      "priority": 0,
      "flags": {
        "snatch": 1,
        "dance": 1
      },
      "target": "SELF",
      "type": "NORMAL",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "boosts": {
        "atk": 2
      },
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "SYNCHRONOISE": {
      "id": "SYNCHRONOISE",
      "num": 485,
      "accuracy": 100,
      "basePower": 120,
      "category": "SPECIAL",
      "desc": "Hits adjacent Pokemon sharing the user's type.",
      "name": "Synchronoise",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "ALLADJACENT",
      "type": "PSYCHIC",
      "contestType": "CLEVER",
      "zMovePower": 190
    },
    "SYNTHESIS": {
      "id": "SYNTHESIS",
      "num": 235,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Heals the user by a weather-dependent amount.",
      "name": "Synthesis",
      "pp": 5,
      "priority": 0,
      "flags": {
        "snatch": 1,
        "heal": 1
      },
      "target": "SELF",
      "type": "GRASS",
      "contestType": "CLEVER",
      "isViable": true,
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "TACKLE": {
      "id": "TACKLE",
      "num": 33,
      "accuracy": 100,
      "basePower": 40,
      "category": "PHYSICAL",
      "desc": "No additional effect.",
      "name": "Tackle",
      "pp": 35,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "TOUGH",
      "zMovePower": 100
    },
    "TAILGLOW": {
      "id": "TAILGLOW",
      "num": 294,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Raises the user's Sp. Atk by 3.",
      "name": "Tail Glow",
      "pp": 20,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "SELF",
      "type": "BUG",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "boosts": {
        "spa": 3
      },
      "zMoveEffect": "CLEARNEGATIVEBOOST"
    },
    "TAILSLAP": {
      "id": "TAILSLAP",
      "num": 541,
      "accuracy": 85,
      "basePower": 25,
      "category": "PHYSICAL",
      "desc": "Hits 2-5 times in one turn.",
      "name": "Tail Slap",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CUTE",
      "isViable": true,
      "multihit": [
        2,
        5
      ],
      "zMovePower": 140
    },
    "TAILWHIP": {
      "id": "TAILWHIP",
      "num": 39,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Lowers the foe(s) Defense by 1.",
      "name": "Tail Whip",
      "pp": 30,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "NORMAL",
      "contestType": "CUTE",
      "boosts": {
        "def": -1
      },
      "zMoveBoost": {
        "atk": 1
      }
    },
    "TAILWIND": {
      "id": "TAILWIND",
      "num": 366,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "For 4 turns, allies' Speed is doubled.",
      "name": "Tailwind",
      "pp": 15,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "ALLYSIDE",
      "type": "FLYING",
      "contestType": "COOL",
      "isViable": true,
      "sideCondition": "tailwind",
      "zMoveEffect": "CRIT2"
    },
    "TAKEDOWN": {
      "id": "TAKEDOWN",
      "num": 36,
      "accuracy": 85,
      "basePower": 90,
      "category": "PHYSICAL",
      "desc": "Has 1/4 recoil.",
      "name": "Take Down",
      "pp": 20,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "TOUGH",
      "recoil": [
        1,
        4
      ],
      "zMovePower": 175
    },
    "TAUNT": {
      "id": "TAUNT",
      "num": 269,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "For 3 turns, the target can't use status moves.",
      "name": "Taunt",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1,
        "authentic": 1
      },
      "target": "NORMAL",
      "type": "DARK",
      "contestType": "CLEVER",
      "isViable": true,
      "zMoveBoost": {
        "atk": 1
      }
    },
    "TEARFULLOOK": {
      "id": "TEARFULLOOK",
      "num": 715,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Lowers the target's Attack and Sp. Atk by 1.",
      "name": "Tearful Look",
      "pp": 20,
      "priority": 0,
      "flags": {
        "reflectable": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CUTE",
      "boosts": {
        "atk": -1,
        "spa": -1
      },
      "zMoveBoost": {
        "def": 1
      }
    },
    "TECHNOBLAST": {
      "id": "TECHNOBLAST",
      "num": 546,
      "accuracy": 100,
      "basePower": 120,
      "category": "SPECIAL",
      "desc": "Type varies based on the held Drive.",
      "name": "Techno Blast",
      "pp": 5,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 190
    },
    "TECTONICRAGE": {
      "id": "TECTONICRAGE",
      "num": 630,
      "accuracy": true,
      "basePower": 1,
      "category": "PHYSICAL",
      "desc": "Power is equal to the base move's Z-Power.",
      "name": "Tectonic Rage",
      "pp": 1,
      "priority": 0,
      "flags": {},
      "target": "NORMAL",
      "type": "GROUND",
      "contestType": "COOL",
      "isViable": true,
      "isZ": "groundiumz"
    },
    "TEETERDANCE": {
      "id": "TEETERDANCE",
      "num": 298,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Confuses adjacent Pokemon.",
      "name": "Teeter Dance",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "dance": 1
      },
      "target": "ALLADJACENT",
      "type": "NORMAL",
      "contestType": "CUTE",
      "zMoveBoost": {
        "spa": 1
      }
    },
    "TELEKINESIS": {
      "id": "TELEKINESIS",
      "num": 477,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "For 3 turns, target floats but moves can't miss it.",
      "name": "Telekinesis",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1,
        "gravity": 1,
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "PSYCHIC",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "spa": 1
      }
    },
    "TELEPORT": {
      "id": "TELEPORT",
      "num": 100,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Flee from wild Pokemon battles.",
      "name": "Teleport",
      "pp": 20,
      "priority": 0,
      "flags": {},
      "target": "SELF",
      "type": "PSYCHIC",
      "contestType": "COOL",
      "zMoveEffect": "HEAL"
    },
    "THIEF": {
      "id": "THIEF",
      "num": 168,
      "accuracy": 100,
      "basePower": 60,
      "category": "PHYSICAL",
      "desc": "If the user has no item, it steals the target's.",
      "name": "Thief",
      "pp": 25,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "DARK",
      "contestType": "TOUGH",
      "zMovePower": 120
    },
    "THOUSANDARROWS": {
      "id": "THOUSANDARROWS",
      "num": 614,
      "accuracy": 100,
      "basePower": 90,
      "category": "PHYSICAL",
      "desc": "Grounds adjacent foes. First hit neutral on Flying.",
      "name": "Thousand Arrows",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "nonsky": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "GROUND",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 180
    },
    "THOUSANDWAVES": {
      "id": "THOUSANDWAVES",
      "num": 615,
      "accuracy": 100,
      "basePower": 90,
      "category": "PHYSICAL",
      "desc": "Hits adjacent foes. Prevents them from switching.",
      "name": "Thousand Waves",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "nonsky": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "GROUND",
      "contestType": "TOUGH",
      "zMovePower": 175
    },
    "THRASH": {
      "id": "THRASH",
      "num": 37,
      "accuracy": 100,
      "basePower": 120,
      "category": "PHYSICAL",
      "desc": "Lasts 2-3 turns. Confuses the user afterwards.",
      "name": "Thrash",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "RANDOMNORMAL",
      "type": "NORMAL",
      "contestType": "TOUGH",
      "zMovePower": 190
    },
    "THROATCHOP": {
      "id": "THROATCHOP",
      "num": 675,
      "accuracy": 100,
      "basePower": 80,
      "category": "PHYSICAL",
      "desc": "For 2 turns, the target cannot use sound moves.",
      "name": "Throat Chop",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "DARK",
      "contestType": "CLEVER",
      "zMovePower": 160
    },
    "THUNDER": {
      "id": "THUNDER",
      "num": 87,
      "accuracy": 70,
      "basePower": 110,
      "category": "SPECIAL",
      "desc": "30% chance to paralyze target. Can't miss in rain.",
      "name": "Thunder",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "ELECTRIC",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 185
    },
    "THUNDERFANG": {
      "id": "THUNDERFANG",
      "num": 422,
      "accuracy": 95,
      "basePower": 65,
      "category": "PHYSICAL",
      "desc": "10% chance to paralyze. 10% chance to flinch.",
      "name": "Thunder Fang",
      "pp": 15,
      "priority": 0,
      "flags": {
        "bite": 1,
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "ELECTRIC",
      "contestType": "COOL",
      "zMovePower": 120
    },
    "THUNDERPUNCH": {
      "id": "THUNDERPUNCH",
      "num": 9,
      "accuracy": 100,
      "basePower": 75,
      "category": "PHYSICAL",
      "desc": "10% chance to paralyze the target.",
      "name": "Thunder Punch",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1,
        "punch": 1
      },
      "target": "NORMAL",
      "type": "ELECTRIC",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 140
    },
    "THUNDERSHOCK": {
      "id": "THUNDERSHOCK",
      "num": 84,
      "accuracy": 100,
      "basePower": 40,
      "category": "SPECIAL",
      "desc": "10% chance to paralyze the target.",
      "name": "Thunder Shock",
      "pp": 30,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "ELECTRIC",
      "contestType": "COOL",
      "zMovePower": 100
    },
    "THUNDERWAVE": {
      "id": "THUNDERWAVE",
      "num": 86,
      "accuracy": 90,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Paralyzes the target.",
      "name": "Thunder Wave",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "ELECTRIC",
      "contestType": "COOL",
      "isViable": true,
      "status": "par",
      "zMoveBoost": {
        "spd": 1
      }
    },
    "THUNDERBOLT": {
      "id": "THUNDERBOLT",
      "num": 85,
      "accuracy": 100,
      "basePower": 90,
      "category": "SPECIAL",
      "desc": "10% chance to paralyze the target.",
      "name": "Thunderbolt",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "ELECTRIC",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 175
    },
    "TICKLE": {
      "id": "TICKLE",
      "num": 321,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Lowers the target's Attack and Defense by 1.",
      "name": "Tickle",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1,
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CUTE",
      "boosts": {
        "atk": -1,
        "def": -1
      },
      "zMoveBoost": {
        "def": 1
      }
    },
    "TOPSYTURVY": {
      "id": "TOPSYTURVY",
      "num": 576,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Inverts the target's stat stages.",
      "name": "Topsy-Turvy",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1,
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "DARK",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "atk": 1
      }
    },
    "TORMENT": {
      "id": "TORMENT",
      "num": 259,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Target can't select the same move twice in a row.",
      "name": "Torment",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1,
        "authentic": 1
      },
      "target": "NORMAL",
      "type": "DARK",
      "contestType": "TOUGH",
      "zMoveBoost": {
        "def": 1
      }
    },
    "TOXIC": {
      "id": "TOXIC",
      "num": 92,
      "accuracy": 90,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Badly poisons the target.",
      "name": "Toxic",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "POISON",
      "contestType": "CLEVER",
      "isViable": true,
      "status": "tox",
      "zMoveBoost": {
        "def": 1
      }
    },
    "TOXICSPIKES": {
      "id": "TOXICSPIKES",
      "num": 390,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Poisons grounded foes on switch-in. Max 2 layers.",
      "name": "Toxic Spikes",
      "pp": 20,
      "priority": 0,
      "flags": {
        "reflectable": 1,
        "nonsky": 1
      },
      "target": "FOESIDE",
      "type": "POISON",
      "contestType": "CLEVER",
      "isViable": true,
      "sideCondition": "toxicspikes",
      "zMoveBoost": {
        "def": 1
      }
    },
    "TOXICTHREAD": {
      "id": "TOXICTHREAD",
      "num": 672,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Lowers the target's Speed by 1 and poisons it.",
      "name": "Toxic Thread",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "POISON",
      "contestType": "TOUGH",
      "isViable": true,
      "boosts": {
        "spe": -1
      },
      "status": "psn",
      "zMoveBoost": {
        "spe": 1
      }
    },
    "TRANSFORM": {
      "id": "TRANSFORM",
      "num": 144,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Copies target's stats, moves, types, and Ability.",
      "name": "Transform",
      "pp": 10,
      "priority": 0,
      "flags": {
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CLEVER",
      "zMoveEffect": "HEAL"
    },
    "TRIATTACK": {
      "id": "TRIATTACK",
      "num": 161,
      "accuracy": 100,
      "basePower": 80,
      "category": "SPECIAL",
      "desc": "20% chance to paralyze or burn or freeze target.",
      "name": "Tri Attack",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 160
    },
    "TRICK": {
      "id": "TRICK",
      "num": 271,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "User switches its held item with the target's.",
      "name": "Trick",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "PSYCHIC",
      "contestType": "CLEVER",
      "isViable": true,
      "zMoveBoost": {
        "spe": 2
      }
    },
    "TRICKORTREAT": {
      "id": "TRICKORTREAT",
      "num": 567,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Adds Ghost to the target's type(s).",
      "name": "Trick-or-Treat",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1,
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "GHOST",
      "contestType": "CUTE",
      "zMoveBoost": {
        "atk": 1,
        "def": 1,
        "spa": 1,
        "spd": 1,
        "spe": 1
      }
    },
    "TRICKROOM": {
      "id": "TRICKROOM",
      "num": 433,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "For 5 turns, slower Pokemon move first.",
      "name": "Trick Room",
      "pp": 5,
      "priority": -7,
      "flags": {
        "mirror": 1
      },
      "target": "ALL",
      "type": "PSYCHIC",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "accuracy": 1
      }
    },
    "TRIPLEKICK": {
      "id": "TRIPLEKICK",
      "num": 167,
      "accuracy": 90,
      "basePower": 10,
      "category": "PHYSICAL",
      "desc": "Hits 3 times. Each hit can miss, but power rises.",
      "name": "Triple Kick",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FIGHTING",
      "contestType": "COOL",
      "multihit": 3,
      "multiaccuracy": true,
      "zMovePower": 120
    },
    "TROPKICK": {
      "id": "TROPKICK",
      "num": 688,
      "accuracy": 100,
      "basePower": 70,
      "category": "PHYSICAL",
      "desc": "100% chance to lower the target's Attack by 1.",
      "name": "Trop Kick",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GRASS",
      "contestType": "CUTE",
      "zMovePower": 140
    },
    "TRUMPCARD": {
      "id": "TRUMPCARD",
      "num": 376,
      "accuracy": true,
      "basePower": 0,
      "category": "SPECIAL",
      "desc": "More power the fewer PP this move has left.",
      "name": "Trump Card",
      "pp": 5,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "COOL",
      "zMovePower": 160
    },
    "TWINEEDLE": {
      "id": "TWINEEDLE",
      "num": 41,
      "accuracy": 100,
      "basePower": 25,
      "category": "PHYSICAL",
      "desc": "Hits 2 times. Each hit has 20% chance to poison.",
      "name": "Twineedle",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "BUG",
      "contestType": "COOL",
      "multihit": [
        2,
        2
      ],
      "zMovePower": 100
    },
    "TWINKLETACKLE": {
      "id": "TWINKLETACKLE",
      "num": 656,
      "accuracy": true,
      "basePower": 1,
      "category": "PHYSICAL",
      "desc": "Power is equal to the base move's Z-Power.",
      "name": "Twinkle Tackle",
      "pp": 1,
      "priority": 0,
      "flags": {},
      "target": "NORMAL",
      "type": "FAIRY",
      "contestType": "COOL",
      "isViable": true,
      "isZ": "fairiumz"
    },
    "TWISTER": {
      "id": "TWISTER",
      "num": 239,
      "accuracy": 100,
      "basePower": 40,
      "category": "SPECIAL",
      "desc": "20% chance to flinch the foe(s).",
      "name": "Twister",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "DRAGON",
      "contestType": "COOL",
      "zMovePower": 100
    },
    "UTURN": {
      "id": "UTURN",
      "num": 369,
      "accuracy": 100,
      "basePower": 70,
      "category": "PHYSICAL",
      "desc": "User switches out after damaging the target.",
      "name": "U-turn",
      "pp": 20,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "BUG",
      "contestType": "CUTE",
      "isViable": true,
      "selfSwitch": true,
      "zMovePower": 140
    },
    "UPROAR": {
      "id": "UPROAR",
      "num": 253,
      "accuracy": 100,
      "basePower": 90,
      "category": "SPECIAL",
      "desc": "Lasts 3 turns. Active Pokemon cannot fall asleep.",
      "name": "Uproar",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "sound": 1,
        "authentic": 1
      },
      "target": "RANDOMNORMAL",
      "type": "NORMAL",
      "contestType": "CUTE",
      "zMovePower": 175
    },
    "VCREATE": {
      "id": "VCREATE",
      "num": 557,
      "accuracy": 95,
      "basePower": 180,
      "category": "PHYSICAL",
      "desc": "Lowers the user's Defense, Sp. Def, Speed by 1.",
      "name": "V-create",
      "pp": 5,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FIRE",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 220
    },
    "VACUUMWAVE": {
      "id": "VACUUMWAVE",
      "num": 410,
      "accuracy": 100,
      "basePower": 40,
      "category": "SPECIAL",
      "desc": "Usually goes first.",
      "name": "Vacuum Wave",
      "pp": 30,
      "priority": 1,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FIGHTING",
      "contestType": "COOL",
      "zMovePower": 100
    },
    "VENOMDRENCH": {
      "id": "VENOMDRENCH",
      "num": 599,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Lowers Atk, Sp. Atk, Speed of poisoned foes by 1.",
      "name": "Venom Drench",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "POISON",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "def": 1
      }
    },
    "VENOSHOCK": {
      "id": "VENOSHOCK",
      "num": 474,
      "accuracy": 100,
      "basePower": 65,
      "category": "SPECIAL",
      "desc": "Power doubles if the target is poisoned.",
      "name": "Venoshock",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "POISON",
      "contestType": "BEAUTIFUL",
      "zMovePower": 120
    },
    "VICEGRIP": {
      "id": "VICEGRIP",
      "num": 11,
      "accuracy": 100,
      "basePower": 55,
      "category": "PHYSICAL",
      "desc": "No additional effect.",
      "name": "Vice Grip",
      "pp": 30,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "TOUGH",
      "zMovePower": 100
    },
    "VINEWHIP": {
      "id": "VINEWHIP",
      "num": 22,
      "accuracy": 100,
      "basePower": 45,
      "category": "PHYSICAL",
      "desc": "No additional effect.",
      "name": "Vine Whip",
      "pp": 25,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GRASS",
      "contestType": "COOL",
      "zMovePower": 100
    },
    "VITALTHROW": {
      "id": "VITALTHROW",
      "num": 233,
      "accuracy": true,
      "basePower": 70,
      "category": "PHYSICAL",
      "desc": "This move does not check accuracy. Goes last.",
      "name": "Vital Throw",
      "pp": 10,
      "priority": -1,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FIGHTING",
      "contestType": "COOL",
      "zMovePower": 140
    },
    "VOLTSWITCH": {
      "id": "VOLTSWITCH",
      "num": 521,
      "accuracy": 100,
      "basePower": 70,
      "category": "SPECIAL",
      "desc": "User switches out after damaging the target.",
      "name": "Volt Switch",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "ELECTRIC",
      "contestType": "COOL",
      "isViable": true,
      "selfSwitch": true,
      "zMovePower": 140
    },
    "VOLTTACKLE": {
      "id": "VOLTTACKLE",
      "num": 344,
      "accuracy": 100,
      "basePower": 120,
      "category": "PHYSICAL",
      "desc": "Has 33% recoil. 10% chance to paralyze target.",
      "name": "Volt Tackle",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "ELECTRIC",
      "contestType": "COOL",
      "isViable": true,
      "recoil": [
        33,
        100
      ],
      "zMovePower": 190
    },
    "WAKEUPSLAP": {
      "id": "WAKEUPSLAP",
      "num": 358,
      "accuracy": 100,
      "basePower": 70,
      "category": "PHYSICAL",
      "desc": "Power doubles if target is asleep, and wakes it.",
      "name": "Wake-Up Slap",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FIGHTING",
      "contestType": "TOUGH",
      "zMovePower": 140
    },
    "WATERGUN": {
      "id": "WATERGUN",
      "num": 55,
      "accuracy": 100,
      "basePower": 40,
      "category": "SPECIAL",
      "desc": "No additional effect.",
      "name": "Water Gun",
      "pp": 25,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "WATER",
      "contestType": "CUTE",
      "zMovePower": 100
    },
    "WATERPLEDGE": {
      "id": "WATERPLEDGE",
      "num": 518,
      "accuracy": 100,
      "basePower": 80,
      "category": "SPECIAL",
      "desc": "Use with Grass or Fire Pledge for added effect.",
      "name": "Water Pledge",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1,
        "nonsky": 1
      },
      "target": "NORMAL",
      "type": "WATER",
      "contestType": "BEAUTIFUL",
      "zMovePower": 160
    },
    "WATERPULSE": {
      "id": "WATERPULSE",
      "num": 352,
      "accuracy": 100,
      "basePower": 60,
      "category": "SPECIAL",
      "desc": "20% chance to confuse the target.",
      "name": "Water Pulse",
      "pp": 20,
      "priority": 0,
      "flags": {
        "protect": 1,
        "pulse": 1,
        "mirror": 1,
        "distance": 1
      },
      "target": "ANY",
      "type": "WATER",
      "contestType": "BEAUTIFUL",
      "zMovePower": 120
    },
    "WATERSPORT": {
      "id": "WATERSPORT",
      "num": 346,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "For 5 turns, Fire-type attacks have 1/3 power.",
      "name": "Water Sport",
      "pp": 15,
      "priority": 0,
      "flags": {
        "nonsky": 1
      },
      "target": "ALL",
      "type": "WATER",
      "contestType": "CUTE",
      "zMoveBoost": {
        "spd": 1
      }
    },
    "WATERSPOUT": {
      "id": "WATERSPOUT",
      "num": 323,
      "accuracy": 100,
      "basePower": 150,
      "category": "SPECIAL",
      "desc": "Less power as user's HP decreases. Hits foe(s).",
      "name": "Water Spout",
      "pp": 5,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "ALLADJACENTFOES",
      "type": "WATER",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "zMovePower": 200
    },
    "WATERFALL": {
      "id": "WATERFALL",
      "num": 127,
      "accuracy": 100,
      "basePower": 80,
      "category": "PHYSICAL",
      "desc": "20% chance to flinch the target.",
      "name": "Waterfall",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "WATER",
      "contestType": "TOUGH",
      "isViable": true,
      "zMovePower": 160
    },
    "WATERSHURIKEN": {
      "id": "WATERSHURIKEN",
      "num": 594,
      "accuracy": 100,
      "basePower": 15,
      "category": "SPECIAL",
      "desc": "Hits 2-5 times in one turn.",
      "name": "Water Shuriken",
      "pp": 20,
      "priority": 1,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "WATER",
      "contestType": "COOL",
      "multihit": [
        2,
        5
      ],
      "zMovePower": 100
    },
    "WEATHERBALL": {
      "id": "WEATHERBALL",
      "num": 311,
      "accuracy": 100,
      "basePower": 50,
      "category": "SPECIAL",
      "desc": "Power doubles and type varies in each weather.",
      "name": "Weather Ball",
      "pp": 10,
      "priority": 0,
      "flags": {
        "bullet": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "BEAUTIFUL",
      "zMovePower": 160
    },
    "WHIRLPOOL": {
      "id": "WHIRLPOOL",
      "num": 250,
      "accuracy": 85,
      "basePower": 35,
      "category": "SPECIAL",
      "desc": "Traps and damages the target for 4-5 turns.",
      "name": "Whirlpool",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "WATER",
      "contestType": "BEAUTIFUL",
      "zMovePower": 100
    },
    "WHIRLWIND": {
      "id": "WHIRLWIND",
      "num": 18,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Forces the target to switch to a random ally.",
      "name": "Whirlwind",
      "pp": 20,
      "priority": -6,
      "flags": {
        "reflectable": 1,
        "mirror": 1,
        "authentic": 1,
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CLEVER",
      "isViable": true,
      "zMoveBoost": {
        "spd": 1
      }
    },
    "WIDEGUARD": {
      "id": "WIDEGUARD",
      "num": 469,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Protects allies from multi-target moves this turn.",
      "name": "Wide Guard",
      "pp": 10,
      "priority": 3,
      "flags": {
        "snatch": 1
      },
      "target": "ALLYSIDE",
      "type": "ROCK",
      "contestType": "TOUGH",
      "sideCondition": "wideguard",
      "zMoveBoost": {
        "def": 1
      }
    },
    "WILDCHARGE": {
      "id": "WILDCHARGE",
      "num": 528,
      "accuracy": 100,
      "basePower": 90,
      "category": "PHYSICAL",
      "desc": "Has 1/4 recoil.",
      "name": "Wild Charge",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "ELECTRIC",
      "contestType": "TOUGH",
      "isViable": true,
      "recoil": [
        1,
        4
      ],
      "zMovePower": 175
    },
    "WILLOWISP": {
      "id": "WILLOWISP",
      "num": 261,
      "accuracy": 85,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Burns the target.",
      "name": "Will-O-Wisp",
      "pp": 15,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "FIRE",
      "contestType": "BEAUTIFUL",
      "isViable": true,
      "status": "brn",
      "zMoveBoost": {
        "atk": 1
      }
    },
    "WINGATTACK": {
      "id": "WINGATTACK",
      "num": 17,
      "accuracy": 100,
      "basePower": 60,
      "category": "PHYSICAL",
      "desc": "No additional effect.",
      "name": "Wing Attack",
      "pp": 35,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1,
        "distance": 1
      },
      "target": "ANY",
      "type": "FLYING",
      "contestType": "COOL",
      "zMovePower": 120
    },
    "WISH": {
      "id": "WISH",
      "num": 273,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Next turn, 50% of the user's max HP is restored.",
      "name": "Wish",
      "pp": 10,
      "priority": 0,
      "flags": {
        "snatch": 1,
        "heal": 1
      },
      "target": "SELF",
      "type": "NORMAL",
      "contestType": "CUTE",
      "isViable": true,
      "sideCondition": "Wish",
      "zMoveBoost": {
        "spd": 1
      }
    },
    "WITHDRAW": {
      "id": "WITHDRAW",
      "num": 110,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Raises the user's Defense by 1.",
      "name": "Withdraw",
      "pp": 40,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "SELF",
      "type": "WATER",
      "contestType": "CUTE",
      "boosts": {
        "def": 1
      },
      "zMoveBoost": {
        "def": 1
      }
    },
    "WONDERROOM": {
      "id": "WONDERROOM",
      "num": 472,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "For 5 turns, all Defense and Sp. Def stats switch.",
      "name": "Wonder Room",
      "pp": 10,
      "priority": 0,
      "flags": {
        "mirror": 1
      },
      "target": "ALL",
      "type": "PSYCHIC",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "spd": 1
      }
    },
    "WOODHAMMER": {
      "id": "WOODHAMMER",
      "num": 452,
      "accuracy": 100,
      "basePower": 120,
      "category": "PHYSICAL",
      "desc": "Has 33% recoil.",
      "name": "Wood Hammer",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "GRASS",
      "contestType": "TOUGH",
      "isViable": true,
      "recoil": [
        33,
        100
      ],
      "zMovePower": 190
    },
    "WORKUP": {
      "id": "WORKUP",
      "num": 526,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Raises the user's Attack and Sp. Atk by 1.",
      "name": "Work Up",
      "pp": 30,
      "priority": 0,
      "flags": {
        "snatch": 1
      },
      "target": "SELF",
      "type": "NORMAL",
      "contestType": "TOUGH",
      "boosts": {
        "atk": 1,
        "spa": 1
      },
      "zMoveBoost": {
        "atk": 1
      }
    },
    "WORRYSEED": {
      "id": "WORRYSEED",
      "num": 388,
      "accuracy": 100,
      "basePower": 0,
      "category": "STATUS",
      "desc": "The target's Ability becomes Insomnia.",
      "name": "Worry Seed",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1,
        "mystery": 1
      },
      "target": "NORMAL",
      "type": "GRASS",
      "contestType": "CLEVER",
      "zMoveBoost": {
        "spe": 1
      }
    },
    "WRAP": {
      "id": "WRAP",
      "num": 35,
      "accuracy": 90,
      "basePower": 15,
      "category": "PHYSICAL",
      "desc": "Traps and damages the target for 4-5 turns.",
      "name": "Wrap",
      "pp": 20,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "TOUGH",
      "zMovePower": 100
    },
    "WRINGOUT": {
      "id": "WRINGOUT",
      "num": 378,
      "accuracy": 100,
      "basePower": 0,
      "category": "SPECIAL",
      "desc": "More power the more HP the target has left.",
      "name": "Wring Out",
      "pp": 5,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "TOUGH",
      "zMovePower": 190
    },
    "XSCISSOR": {
      "id": "XSCISSOR",
      "num": 404,
      "accuracy": 100,
      "basePower": 80,
      "category": "PHYSICAL",
      "desc": "No additional effect.",
      "name": "X-Scissor",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "BUG",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 160
    },
    "YAWN": {
      "id": "YAWN",
      "num": 281,
      "accuracy": true,
      "basePower": 0,
      "category": "STATUS",
      "desc": "Puts the target to sleep after 1 turn.",
      "name": "Yawn",
      "pp": 10,
      "priority": 0,
      "flags": {
        "protect": 1,
        "reflectable": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "NORMAL",
      "contestType": "CUTE",
      "zMoveBoost": {
        "spe": 1
      }
    },
    "ZAPCANNON": {
      "id": "ZAPCANNON",
      "num": 192,
      "accuracy": 50,
      "basePower": 120,
      "category": "SPECIAL",
      "desc": "100% chance to paralyze the target.",
      "name": "Zap Cannon",
      "pp": 5,
      "priority": 0,
      "flags": {
        "bullet": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "ELECTRIC",
      "contestType": "COOL",
      "zMovePower": 190
    },
    "ZENHEADBUTT": {
      "id": "ZENHEADBUTT",
      "num": 428,
      "accuracy": 90,
      "basePower": 80,
      "category": "PHYSICAL",
      "desc": "20% chance to flinch the target.",
      "name": "Zen Headbutt",
      "pp": 15,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "PSYCHIC",
      "contestType": "CLEVER",
      "isViable": true,
      "zMovePower": 160
    },
    "ZINGZAP": {
      "id": "ZINGZAP",
      "num": 716,
      "accuracy": 100,
      "basePower": 80,
      "category": "PHYSICAL",
      "desc": "30% chance to flinch the target.",
      "name": "Zing Zap",
      "pp": 10,
      "priority": 0,
      "flags": {
        "contact": 1,
        "protect": 1,
        "mirror": 1
      },
      "target": "NORMAL",
      "type": "ELECTRIC",
      "contestType": "COOL",
      "isViable": true,
      "zMovePower": 160
    },
    // "PALEOWAVE": {
    //   "id": "PALEOWAVE",
    //   "accuracy": 100,
    //   "basePower": 85,
    //   "category": "SPECIAL",
    //   "desc": "20% chance to lower the target's Attack by 1.",
    //   "name": "Paleo Wave",
    //   "pp": 15,
    //   "priority": 0,
    //   "flags": {
    //     "protect": 1,
    //     "mirror": 1
    //   },
    //   "target": "NORMAL",
    //   "type": "ROCK",
    //   "contestType": "BEAUTIFUL",
    //   "isViable": true,
    //   "zMovePower": 160
    // },
    // "SHADOWSTRIKE": {
    //   "id": "SHADOWSTRIKE",
    //   "accuracy": 95,
    //   "basePower": 80,
    //   "category": "PHYSICAL",
    //   "desc": "50% chance to lower the target's Defense by 1.",
    //   "name": "Shadow Strike",
    //   "pp": 10,
    //   "priority": 0,
    //   "flags": {
    //     "contact": 1,
    //     "protect": 1,
    //     "mirror": 1
    //   },
    //   "target": "NORMAL",
    //   "type": "GHOST",
    //   "contestType": "CLEVER",
    //   "isViable": true,
    //   "zMovePower": 160
    // },
    // "MAGIKARPSREVENGE": {
    //   "id": "MAGIKARPSREVENGE",
    //   "accuracy": true,
    //   "basePower": 120,
    //   "category": "PHYSICAL",
    //   "desc": "Does many things turn 1. Can't move turn 2.",
    //   "name": "Magikarp's Revenge",
    //   "pp": 10,
    //   "priority": 0,
    //   "flags": {
    //     "contact": 1,
    //     "recharge": 1,
    //     "protect": 1,
    //     "mirror": 1
    //   },
    //   "target": "NORMAL",
    //   "type": "WATER",
    //   "contestType": "CUTE",
    //   "drain": [
    //     1,
    //     2
    //   ],
    //   "zMovePower": 190
    // }
  }