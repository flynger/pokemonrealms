const MOVE_DATA = {
    "Tackle": {
        num: 33,
        basePower: 40,
        category: "Physical",
        name: "Tackle",
        pp: 35,
        flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
        type: "Normal"
    },
    "Growl": {
        num: 45,
        category: "Status",
        name: "Growl",
        pp: 40,
        flags: { protect: 1, reflectable: 1, mirror: 1, sound: 1, bypasssub: 1, metronome: 1 },
        stages: {
            atk: -1,
        },
        target: "allAdjacentFoes",
        type: "Normal"
    },
} as const;

export default MOVE_DATA;