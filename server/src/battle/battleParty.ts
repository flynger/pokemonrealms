import Pokemon from "pokemon";
import BattleSpot from "./battleSpot";
import Battle from "./oldBattle";
import Player from "players/player";
import BattleAI from "./AI/battleAI";
import BattleMon from "./battleMon";

/* Every trainer is represented as a BattleParty */
export default class BattleParty {
    // Before the battle
    controller: Player | BattleAI;
    members: BattleMon[];

    // After battle is created
    spots?: BattleSpot[];
    battle?: Battle;

    constructor(members: BattleMon[], controller: Player | BattleAI = new BattleAI(this)) {
        this.controller = controller;
        this.members = members;
    }

    setBattle(battle: Battle, spots: BattleSpot[]) {
        this.battle = battle;
        this.spots = spots;
    }
}

export type InputKind = "move" | "run";

export type BattleInput = MoveInput // | SwitchInput | ItemInput | RunInput

// type SwitchInput = { switchTo: 0 | 1 | 2 | 3 | 4 | 5 }
export type MoveInput = { kind: "move", id: 0 | 1 | 2 | 3, target?: number }
// type ItemInput = { useItem: Item }
// type RunInput = { kind: "run" }