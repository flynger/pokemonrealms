import { Pokemon, Ability, AbilitySlot, Gender, Move, Species, Stats, Type } from './pokemon'
import { Party, Input } from './party'

class PokemonBattle {

    partyArray: Party[];
    currentTurn: number;
    canRun: boolean;
    terrain: string
    weather: string

    constructor(...parties: Party[]) {
        this.partyArray = parties;
        this.currentTurn = 1;
        console.log(parties);
        this.partyArray[0].input = [0, 0, 0];
        this.partyArray[1].input = [0, 0, 0];
    }

    startTurn() {
        // check pokemon items
        // check pokemon abilities

        if (this.partyArray.length > 0) {
            console.log(`Turn ${this.currentTurn}`);

            // calculate speed
            if(this.partyArray[0].pokemon[this.partyArray[0].input[1]].s > this.partyArray[1].pokemon[this.partyArray[1].input[1]])
            // make move loop

            //
        }
        else {
            return;
        }
    }
}
