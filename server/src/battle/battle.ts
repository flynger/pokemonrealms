import Pokemon from "pokemon";
import Field from "./field";
import Side from "./side";
import BattleParty from "./battleParty";
import ActionHandler from "./actions/actionHandler";
import ActionQueue from "./actions/actionQueue";
import BattleOutput from "./battleOutput";

export interface BattleConfig {
    field?: Field,
    spotsPerParty?: number
}

export default class Battle {
    readonly field: Field;
    readonly sides: Side[];
    
    get active(): Pokemon[] {
        return this.sides.map(s => s.active).flat();
    }

    actionHandler: ActionHandler;
    readonly queue: ActionQueue;

    turn: number;
    output: BattleOutput[] = [];

    constructor(sides: BattleParty[][], { field = new Field(), spotsPerParty = 1 }: BattleConfig = {}) {
        this.sides = sides.map((side, id) => new Side(id, this, side, spotsPerParty));
        this.field = field;
        this.actionHandler = new ActionHandler(this);
        this.queue = new ActionQueue(this);
        this.turn = 0;

        this.nextTurn();
    }

    // startBattle(): void {
    //     this.nextTurn();
    // }

    nextTurn(): void {
        if (this.isOver()) return;
        this.turn++;
        this.output = [];
        this.runTurn();
    }

    runTurn(): void {
        while (!this.queue.isEmpty()) {
            const action = this.queue.shift();
            switch (action.choice) {
                case "move":
                    // getting move data
                    const targets: Pokemon[] = action.targetLocations.map(loc => this.active[loc]);
                    this.actionHandler.useMove(action.move, action.pokemon, targets);
                    break;
                default:
                    throw new Error("Unknown input " + action.choice + " by " + action.pokemon.name);
            }
        }
        this.turn++;
    }

    isOver(): boolean {
        return this.sides.filter(side => side.isAlive()).length < 2;
    }
}

// const calculateRun = (userSpe: number, foeSpe: number, runTimes: number = 1): boolean => {
//     let runChance = (userSpe*32/(foeSpe/4))+30*runTimes; 
//     return Math.random() * 255 < runChance;
// }