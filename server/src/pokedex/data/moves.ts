const MOVE_DATA = {
    "Tackle": {
        num: 33,
        type: "Normal",
        category: "Physical",
        power: 40,
        pp: 35,
        flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
    },
    "Growl": {
        num: 45,
        type: "Normal",
        category: "Status",
        pp: 40,
        stages: {
            atk: -1,
        },
        flags: { protect: 1, reflectable: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1 },
        // target: "allAdjacentFoes",
    },
    "Focus Energy": {
        num: 116,
        type: "Normal",
        category: "Status",
        accuracy: Infinity,
        pp: 30,
        volatileStatus: "pumped",
        flags: {snatch: 1, metronome: 1},
        target: "self"
    }
} as const;

export default MOVE_DATA;