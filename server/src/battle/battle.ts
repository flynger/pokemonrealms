import Pokemon from "pokemon";
import BattleQueue from "./BattleQueue";
import Field from "./field";
import Side from "./side";
import BattleParty, { InputKind } from "./battleParty";
import BattleSpot from "./battleSpot";
import Move, { Moves } from "../pokedex/move";
// import { executeMove, executeRun } from "./battleMove";
import BattleMon from "./battleMon";

export interface BattleConfig {
    field?: Field,
    spotsPerParty?: number
}

type DamageOutput = {

}

import { Moves } from "pokedex/move";
import BattleData from "./battleData";
import BattleAction from "./battleAction";

type BattleOutput = string | DamageOutput

export default class Battle {
    readonly field: Field;
    readonly sides: Side[];
    output: BattleOutput[] = [];
    readonly queue: BattleQueue;
    turn: number;

    constructor(sides: BattleParty[][], { field = new Field(), spotsPerParty = 1 }: BattleConfig = {}) {
        this.sides = sides.map(side => new Side(this, side, spotsPerParty));
        this.field = field;
        // console.log(this.messages)
        // for (const spot of this.spots) {
        //     spot.getTurnInput(Battle.INPUT_OPTIONS);
        // }
        this.nextTurn();
    }

    nextTurn() {
        if (this.isOver() || !this.spots.every(spot => spot.isReady())) return;
        
        this.output = [];
        
        // gets occupied spots by move order
        let occupiedSpots = this.spots.filter(this.isSpotWithMon).sort((s1, s2) => s2.mon.spe - s1.mon.spe);
    

    constructor(sides: Side[][], field?: Field) {
        if (field) {
            this.field = field;
        } else {
            this.field = new Field();
        }
        this.battleAction = new BattleAction(this);
        this.queue = new BattleQueue(this);
        this.turn = 0;
        this.sides = sides;
    }

    startBattle(): void {
        for (let side of this.sides) {
            for (let team of side) {
                team.battle = this;
                team.team.forEach((pokemon, index) => {
                    pokemon.battle = this;
                });
            }
        }
    }

    runTurn(): void {
        while (!this.queue.isEmpty()) {
            const action = this.queue.pop();
            if (!action) {
                throw new Error("Action is undefined");
            }
            switch (action.type) {
                case "move":
                    // getting move data
                    const targets: Pokemon[] = action.targetLocations.map(loc => this.activePokemon[loc]);
                    this.battleAction.useMove(action.move, action.pokemon, targets);
                    break;
                default:
                    // throw new Error("Unknown input " + turnInput.kind + " by " + currentMon.name);
                    // throw new Error("Unknown input " + action.type + " by " + action.pokemon.getName());
            }
        }
        this.turn++;
    }

    switchIn(index: number, target: Pokemon): void {
        if (this.activePokemon && this.activePokemon[index]) {
            // console.log(`${this.activePokemon[index].name} has been switched with ${target.name}`);
            this.activePokemon[index].activeInd = -1;
        }

        this.activePokemon[index] = target;
        target.activeInd = index;
    }
}
