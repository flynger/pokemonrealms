import Pokemon from "pokemon";
import Battle from "./battle";
import Player from "players/player";
import BattleAI from "./AI/battleAI";
import { Action } from "./actions/action";

/* Every trainer is represented as a BattleParty */
export default class BattleParty {
    // Before the battle
    controller: Player | BattleAI;
    members: Pokemon[];

    // After battle is created
    actions: Action[];
    active: Pokemon[];
    battle!: Battle;

    constructor(members: Pokemon[], controller: Player | BattleAI = new BattleAI(this)) {
        this.controller = controller;
        this.members = members;
        this.active = [];
        this.actions = [];
    }

    joinBattle(battle: Battle, monCount: number): void {
        this.active = this.members.filter(mon => mon.hp).slice(0, monCount);
        this.battle = battle;
    }

    useMove(mon: number, moveId: 0 | 1 | 2 | 3): void {
        if (!this.active[mon]) return;

        const pokemon = this.active[mon];
        const move = pokemon.moves[moveId];
        // const moveEntry = Moves.get(pokemon.moves[moveId]);

        this.actions[mon] = {
            choice: "move",
            priority: 0,
            pokemon: pokemon,
            targetLocations: [],
            move
        };
    }

    hasAlive(count: number): boolean {
        return this.members.filter(p => p.hp).length >= count;
    }
}