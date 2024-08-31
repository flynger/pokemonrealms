import Pokemon from "pokemon";
import BattleSpot from "./battleSpot";
import Battle from "./battle";
import Player from "players/player";
import BattleAI from "./AI/battleAI";

/* Every trainer is represented as a BattleParty */
export default class BattleParty {
    controller: Player | BattleAI;
    spots: BattleSpot[];
    battle: Battle;
    members: Pokemon[];

    constructor(battle: Battle, members: Pokemon[], spots: number, controller?: Player) {
        this.controller = controller ?? new BattleAI();
        this.battle = battle;
        this.members = members;
        this.spots = new Array(spots).fill(0).map((_, i) => new BattleSpot(battle, this, this.members[i]));
    }

    takeInput(partyId: number, input: BattleInput) {
        if (!this.spots[partyId].nextInput)
            this.spots[partyId].takeInput(input);
    }

    askForInput(input: Set<InputKind>, onlyActiveSpots: boolean = true) {
        for (const spot of this.spots) {
            if (!onlyActiveSpots || spot.mon)
                spot.requiredInput = input;
        }
    }
}

export type InputKind = "move" | "run";

export type BattleInput = MoveInput // | SwitchInput | ItemInput | RunInput

// type SwitchInput = { switchTo: 0 | 1 | 2 | 3 | 4 | 5 }
export type MoveInput = { kind: "move", id: 0 | 1 | 2 | 3, targets: number[] }
// type ItemInput = { useItem: Item }
// type RunInput = { kind: "run" }