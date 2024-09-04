import Pokemon from "pokemon";
import Battle from "./battle";
import { Action } from "./BattleQueue";
import BattleAction from "./battleAction";
import { Moves } from "../pokedex/move";

export default class Side {
    battle: Battle = null!;
    readonly id: number;
    // set in battle.start()
    foe: Side[] = null!;
    // represents pokemon and the position in the battle
    activeIndices: number[] = null!;

    team: Pokemon[];

    constructor(sideID: number, team: Pokemon[], activeIndices: number[]) {
        // this.battle = battle;
        this.id = sideID;
        this.team = team;
        this.activeIndices = activeIndices;
    }

    chooseAction(action: { type: "move", moveID: number } | { type: "switch" } | { type: "item" }, monIndex: number, targetID?: number): void {
        if (!this.isUnderControl(monIndex)) return;

        // get the pokemon that is making the action
        let pokemon: Pokemon = this.battle.activePokemon[monIndex];
        switch (action.type) {
            case "move":
                const move = pokemon.moves[action.moveID];
                const moveEntry = Moves.get(move);
                if (!moveEntry) throw new Error("Move not found");

                const targetLocations: number[] = [];
                if(moveEntry.target === "self") {
                    targetLocations.push(monIndex);
                } else if (moveEntry.target === "normal" && targetID) {
                    targetLocations.push(targetID);
                }

                let moveAction: Action = {
                    type: "move",
                    priority: 0,
                    speed: pokemon.spe,
                    pokemon: pokemon,
                    targetLocations: targetLocations,
                    move: move
                }

                this.battle.queue.push(moveAction);
                break;
            case "switch":
            case "item":
        }
    }

    isUnderControl(monIndex: number): boolean {
        const existingmonIndex = this.activeIndices.findIndex((ind) => ind === monIndex);
        if (existingmonIndex !== -1) {
            return true;
        } else {
            console.log(`invalid monIndex ${monIndex} for side ${this.id}`);
            return false;
        }
    }
}
