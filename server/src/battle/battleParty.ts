import Pokemon from "pokemon";
import Battle from "./battle";
import Player from "players/player";
import BattleAI from "./AI/battleAI";

/* Every trainer is represented as a BattleParty */
export default class BattleParty {
    // Before the battle
    controller: Player | BattleAI;
    members: Pokemon[];

    // After battle is created
    active: Pokemon[];
    battle!: Battle;

    constructor(members: Pokemon[], controller: Player | BattleAI = new BattleAI(this)) {
        this.controller = controller;
        this.members = members;
        this.active = [];
    }

    joinBattle(battle: Battle, monCount: number): void {
        this.active = this.members.filter(mon => mon.hp).slice(0, monCount);
        this.battle = battle;
    }

    hasAlive(count: number): boolean {
        return this.members.filter(p => p.hp).length >= count;
    }
}