import Battle from "battle/battle";
import Item from "pokedex/item";
import Move from "pokedex/move";
import Pokemon from "pokemon";

/** A move action */
export interface MoveAction {
	choice: "move";
	priority: number;
    // taken from the pokemon that used it
	speed: number;
	/* the pokemon doing the move */
	pokemon: Pokemon;
	/* location of the target, relative to pokemon's side */
	targetLocations: number[];
	/* a move to use (move action only) */
	move: Move;
}

export interface SwitchAction {
    choice: "switch";
	priority: 10;
	/* speed of pokemon switching */
	speed: number;
	/* the pokemon doing the switch */
	pokemon: Pokemon;
	/* pokemon to switch to */
	target: Pokemon;
}

export interface ItemAction {
    choice: "item";
    priority: 12;
    speed: number;
    pokemon: Pokemon;
    item: Item;
}

export type Action = MoveAction | SwitchAction | ItemAction;

export default class ActionQueue {
    private readonly battle: Battle;
	private readonly actions: Action[];

	constructor(battle: Battle) {
		this.battle = battle;
		this.actions = [];
	}

	// Add an action to the queue
    push(action: Action): void {
        // Check if the same pokemon has already taken an action
        this.actions.push(action);
        // const hasRepeatAction = this.actions.some((queuedAction) => {
        //     return queuedAction.pokemon === action.pokemon;
        // });
    
        // if (!hasRepeatAction) {
        //     this.actions.push(action);
        //     this.sort();
        //     if (this.isFull()) {
        //         this.battle.runTurn();
        //     }
        // } else {
        //     console.log("Pokemon has already taken an action");
        // }
    }

	// Get the next action from the queue
    shift(): Action {
        const action = this.actions.shift();
        if (!action) throw new Error("Tried to shift empty battle queue");
		return action;
	}

	isEmpty(): boolean {
        return this.actions.length === 0;
    }

    sort() {
        this.actions.sort((a, b) => b.priority - a.priority || b.speed - a.speed);
    }
}