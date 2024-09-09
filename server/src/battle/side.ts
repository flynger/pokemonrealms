import Pokemon from "pokemon";
import Battle from "./battle";
import BattleParty from "./battleParty";

export default class Side {
    readonly id: number;
    private readonly battle: Battle;
    readonly parties: BattleParty[];

    get active(): Pokemon[] {
        return this.parties.map(p => p.active).flat();
    }

    constructor(id: number, battle: Battle, parties: BattleParty[], monsPerParty: number) {
        this.id = id;
        this.battle = battle;
        this.parties = parties;

        for (const party of parties) {
            party.joinBattle(this.battle, monsPerParty);
        }
    }

    isAlive(): boolean {
        return this.active.some(mon => mon);
    }

    getAliveMons(): Pokemon[] {
        return this.active.filter(mon => mon);
    }

    // chooseAction(action: { type: "move", moveID: number } | { type: "switch" } | { type: "item" }, monIndex: number, targetID?: number): void {
    //     if (!this.isUnderControl(monIndex)) return;

    //     // get the pokemon that is making the action
    //     let pokemon: Pokemon = this.battle.activePokemon[monIndex];
    //     switch (action.type) {
    //         case "move":
    //             const move = pokemon.moves[action.moveID];
    //             const moveEntry = Moves.get(move);
    //             if (!moveEntry) throw new Error("Move not found");

    //             const targetLocations: number[] = [];
    //             if(moveEntry.target === "self") {
    //                 targetLocations.push(monIndex);
    //             } else if (moveEntry.target === "normal" && targetID) {
    //                 targetLocations.push(targetID);
    //             }

    //             let moveAction: Action = {
    //                 type: "move",
    //                 priority: 0,
    //                 speed: pokemon.spe,
    //                 pokemon: pokemon,
    //                 targetLocations: targetLocations,
    //                 move: move
    //             }

    //             this.battle.queue.push(moveAction);
    //             break;
    //         case "switch":
    //         case "item":
    //     }
    // }

    // isUnderControl(monIndex: number): boolean {
    //     const existingmonIndex = this.active.findIndex((ind) => ind === monIndex);
    //     if (existingmonIndex !== -1) {
    //         return true;
    //     } else {
    //         console.log(`invalid monIndex ${monIndex} for side ${this.id}`);
    //         return false;
    //     }
    // }
}

export interface BattlePosition {
    side: number;
    pos: number;
}