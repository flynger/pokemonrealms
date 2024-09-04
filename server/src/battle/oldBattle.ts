import Pokemon from "pokemon";
import Field from "./field";
import Side from "./oldSide";
import BattleParty, { InputKind } from "./battleParty";
import BattleSpot from "./battleSpot";
import Move, { Moves } from "../pokedex/move";
// import { executeMove, executeRun } from "./battleMove";
import BattleMon from "./battleMon";
import BattleData from "./battleData";

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
    currentSpotId = 0;
    spots: BattleSpot[] = [];
    messages: unknown[] = [];

    constructor(sides: BattleParty[][], { field = new Field(), spotsPerParty = 1 }: BattleConfig = {}) {
        this.sides = sides.map(side => new Side(this, side, spotsPerParty));
        this.field = field;
        // console.log(this.messages)
        for (const spot of this.spots) {
            spot.getTurnInput(Battle.INPUT_OPTIONS);
        }
        this.nextTurn();
    }

    nextTurn() {
        if (this.isOver() || !this.spots.every(spot => spot.isReady())) return;
        
        this.messages = [];
        
        // gets occupied spots by move order
        let occupiedSpots = this.spots.filter(this.isSpotWithMon).sort((s1, s2) => s2.mon.spe - s1.mon.spe);

        while (occupiedSpots.length > 0) {
            const currentSpot = occupiedSpots.shift()!;
            // if (!currentSpot.mon) continue;
            const currentMon = currentSpot.mon;
            const turnInput = currentSpot.turnInput!;
            switch (turnInput.kind) {
                case "move":
                    const move = currentMon.moves[turnInput.id];
                    const moveEntry = Moves.get(move);
                    
                    // FIXME: Get proper targets (I think implement the target logic in SingleBattle, DoubleBattle, etc.)
                    const targets = moveEntry.target === "self" ? [currentSpot] : this.spots.filter(spot => spot !== currentSpot && spot.mon);
                    currentMon.useMove(move, targets);
                    break;
                // case "run":
                //     executeRun();
                default:
                    throw new Error("Unknown input " + turnInput.kind + " by " + currentMon.getName());
            }
            currentSpot.turnInput = undefined;

            occupiedSpots = occupiedSpots.filter(this.isSpotWithMon).sort((s1, s2) => s2.mon.spe - s1.mon.spe);
        }

        if (this.isOver()) {
            console.log("Battle over");
        } else {
            for (const spot of this.spots) {
                spot.getTurnInput(Battle.INPUT_OPTIONS);
            }
        }
    }

    isOver() {
        return this.sides.filter(side => side.isAlive()).length <= 1;
    }

    isSpotWithMon(spot: BattleSpot): spot is BattleSpot & { mon: BattleMon } {
        return spot.mon !== undefined;
    }

    getHighestOpposingSpeed(side: Side) {
        let livingOpposingSpots = this.sides
            .filter(thisSide => thisSide !== side)
            .map(thisSide => thisSide.getAliveSpots())
            .flat()
            .reduce((max, spot) => Math.max(max, spot.mon!.spe), 0);
    }
}