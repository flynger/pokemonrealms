import Pokemon from "pokemon";
import Field from "./field";
import Side from "./side";
import BattleParty, { InputKind } from "./battleParty";
import BattleSpot from "./battleSpot";
import Move, { Moves } from "../pokedex/move";
import { executeMove } from "./battleMove";

export interface BattleConfig {
    field?: Field,
    spotsPerParty?: number
}

type BattleAction = DamageAction

interface DamageAction {
    user: BattleSpot,
    recipients: BattleSpot[]
}

export default class Battle {
    static readonly INPUT_OPTIONS: Set<InputKind> = new Set(["move"]);
    field: Field;
    sides: Side[];
    nextSpotId = 0;
    spots: BattleSpot[] = [];
    messages: unknown[] = [];

    constructor(sides: Pokemon[][][], { field = new Field(), spotsPerParty = 1 }: BattleConfig = {}) {
        this.sides = sides.map(side => new Side(this, side, spotsPerParty));
        this.field = field;
        console.log(this.messages)
        this.nextTurn();
    }

    nextTurn() {
        if (!this.spots.every(spot => spot.isReady())) return;
        let occupiedSpots = this.spots.filter(this.isSpotWithMon).sort((s1, s2) => s2.mon.spe - s1.mon.spe);
        while (occupiedSpots.length > 0) {
            occupiedSpots = occupiedSpots.filter(this.isSpotWithMon).sort((s1, s2) => s2.mon.spe - s1.mon.spe);
            const nextSpot = occupiedSpots.shift()!;
            const nextInput = nextSpot.nextInput!;
            const nextMon = nextSpot.mon;
            switch (nextInput.kind) {
                case "move":
                    executeMove(nextInput, nextMon, this.spots);
                    break;
                default:
                    throw new Error("Unknown input " + nextInput.kind + " by " + nextMon.getName());
            }
            nextSpot.nextInput = undefined;
        }
        for (const side of this.sides) {
            side.askForInput(Battle.INPUT_OPTIONS);
        }
    }

    isSpotWithMon(spot: BattleSpot): spot is BattleSpot & { mon: Pokemon } {
        return spot.mon !== undefined;
    }
}