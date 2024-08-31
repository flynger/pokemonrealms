import Pokemon, { Stats } from "pokemon";
import Battle from "./battle";
import { createStatStages } from "../util/util";
import BattleParty, { BattleInput, InputKind } from "./battleParty";

/* Every spot on the field is represented as a BattleSpot */
export default class BattleSpot {
    mon?: Pokemon;
    party: BattleParty;
    nextInput?: BattleInput;
    requiredInput: Set<InputKind>;

    battle: Battle;
    id: number;
    stages: StatStages;
    flags = {};

    constructor(battle: Battle, party: BattleParty, mon?: Pokemon) {
        this.battle = battle;
        this.party = party;
        this.id = battle.nextSpotId++;
        this.changeMon(mon);
        this.stages = createStatStages();
        this.requiredInput = Battle.INPUT_OPTIONS; //new Set<InputKind>();
        this.battle.spots.push(this);

    }

    takeInput(input: BattleInput) {
        if (!this.nextInput && this.requiredInput.has(input.kind)) {
            this.nextInput = input;
            this.battle.nextTurn();
        } else console.log("Invalid input for battler " + this.id);
    }

    changeMon(mon?: Pokemon) {
        this.mon = mon;
        if (mon) {
            const switchIn = {
                name: mon.getName(),
                species: mon.species,
                level: mon.level,
                gender: mon.gender,
                isShiny: mon.isShiny
            }
            this.battle.messages.push({ spot: this.id, switchIn });
        }
    }

    isReady(): boolean {
        return this.requiredInput.size === 0 || this.nextInput !== undefined;
    }
}

export type StatStages = Stats & { acc: number, eva: number, crit: number };