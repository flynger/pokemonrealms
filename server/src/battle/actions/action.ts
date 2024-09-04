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