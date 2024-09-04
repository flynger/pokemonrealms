import Pokemon from "pokemon";
import Battle from "./battle";
import Move from "../pokedex/move";

export interface MoveAction {
    type: "move";
	priority: number;
    // taken from the pokemon that used it
	speed: number;
	/** the pokemon doing the move */
	pokemon: Pokemon;
	/** location of the target, relative to pokemon's side */
	targetLocations: number[];
	/** a move to use (move action only) */
	move: Move;
}

export interface SwitchAction {
    type: "switch";
	priority: number;
	/** speed of pokemon switching (*/
	speed: number;
	/** the pokemon doing the switch */
	pokemon: Pokemon;
	/** pokemon to switch to */
	target: Pokemon;
}

export interface ItemAction {
    type: "item";
    priority: number;
    speed: number;
    pokemon: Pokemon;
}

export type Action = MoveAction | SwitchAction | ItemAction;

export default class BattleQueue {
    battle: Battle;
    private actions: Action[] = [];

    constructor(battle: Battle) {
        this.battle = battle;
    }

    // Add an action to the queue
    push(action: Action): void {
        // Check if the same pokemon has already taken an action
        const hasRepeatAction = this.actions.some((queuedAction) => {
            return queuedAction.pokemon === action.pokemon;
        });
    
        if (!hasRepeatAction) {
            this.actions.push(action);
            this.sort();
            if (this.isFull()) {
                this.battle.runTurn();
            }
        } else {
            console.log("Pokemon has already taken an action");
        }
    }

    // Get the next action from the queue
    pop(): Action | undefined {
        return this.actions.shift();
    }

    peek(): Action | undefined {
        return this.actions[0];
    }

    isEmpty(): boolean {
        return this.actions.length === 0;
    }

    isFull(): boolean {
        return this.battle.activePokemon.length === this.actions.length;
    }

    size(): number {
        return this.actions.length;
    }

    // Sort the queue based on priority, then speed
    private sort(): void {
        this.actions.sort((a, b) => {
            return b.speed - a.speed;
        });
        this.actions.sort((a, b) => {
            return b.priority - a.priority;
        });
    }
}
