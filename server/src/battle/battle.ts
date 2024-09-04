import Pokemon from "pokemon";
import BattleQueue from "./BattleQueue";
import Field from "./field";
import Side from "./side";
import { Moves } from "pokedex/move";
import BattleData from "./battleData";
import BattleAction from "./battleAction";

export default class Battle {
    readonly field: Field;
    //sides[x] is an alliance, sides[x][y].team is a team, sides[x][y].team[z] is a pokemon
    readonly sides: Side[][] = null!;
    activePokemon: Pokemon[] = null!;

    data: BattleData[] = [];
    battleAction: BattleAction;
    queue: BattleQueue;
    turn: number;

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
                    throw new Error("Unknown input " + action.type + " by " + action.pokemon.getName());
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


