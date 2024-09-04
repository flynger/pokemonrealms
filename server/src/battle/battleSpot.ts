import Pokemon, { Stats } from "../pokemon";
import Battle from "./oldBattle";
import { createStatStages } from "../util/util";
import BattleParty, { BattleInput, InputKind } from "./battleParty";
import BattleMon from "./battleMon";

/* Every spot on the field is represented as a BattleSpot */
export default class BattleSpot {
    mon?: BattleMon;
    party: BattleParty;
    turnInput?: BattleInput;
    requiredInput: Set<InputKind>;

    battle: Battle;
    id: number;
    stages: StatStages;
    flags = {};

    constructor(battle: Battle, party: BattleParty, mon?: BattleMon) {
        this.battle = battle;
        this.party = party;
        this.id = battle.currentSpotId++;
        this.changeMon(mon);
        this.stages = createStatStages();
        this.requiredInput = Battle.INPUT_OPTIONS; //new Set<InputKind>();
        this.battle.spots.push(this);

    }

    takeInput(input: BattleInput) {
        if (!this.turnInput && this.requiredInput.has(input.kind)) {
            this.turnInput = input;
            this.battle.nextTurn();
        } else console.log("Invalid input for battler " + this.id);
    }

    getTurnInput(input: Set<InputKind>) {
        this.requiredInput = input;
        this.party.controller.getTurnInput(this.battle.messages);
    }

    changeMon(mon?: BattleMon) {
        if (this.mon) {
            delete this.mon.spot;
            this.battle.messages.push(`Come back, ${this.mon.getName()}!`);
            // console.log(`Come back, ${this.mon.getName()}!`)
        }
        this.mon = mon;
        if (mon) {
            const isWild = this.party.controller.name.length === 0;
            this.battle.messages.push(!isWild ? `Go, ${mon.getName()}!` : `A wild ${mon.getName()} appeared!`);
            // console.log(`Go, ${mon.getName()}!`)
            mon.spot = this;
            // const switchIn = {
            //     name: mon.getName(),
            //     species: mon.species,
            //     level: mon.level,
            //     gender: mon.gender,
            //     isShiny: mon.isShiny
            // }
            // this.battle.messages.push({ spot: this.id, switchIn });
        }
    }

    isReady(): boolean {
        return this.requiredInput.size === 0 || this.turnInput !== undefined;
    }
}

export type StatStages = Stats & { acc: number, eva: number, crit: number };