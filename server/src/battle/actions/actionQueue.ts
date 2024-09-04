import Battle from "battle/battle";
import Move from "pokedex/move";
import Pokemon from "pokemon";

/** A move action */
export interface MoveAction {
	priority: number;
	speed: number;
	pokemon: Pokemon;
	targetLoc: number;
	move: Move;
}

export type Action = MoveAction;

export default class ActionQueue {
    battle: Battle;
	actions: Action[];

	constructor(battle: Battle) {
		this.battle = battle;
		this.actions = [];
	}

    shift() {
		return this.actions.shift();
	}

    sort() {
        this.actions.sort((a, b) => b.priority - a.priority || b.speed - a.speed);
    }
}