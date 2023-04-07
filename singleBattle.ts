import { PokemonBattle } from './battle'
import { Pokemon, Ability, AbilitySlot, Gender, Move, Species, Stats, Type } from './pokemon'
import { Party, Input } from './party'

class SingleBattle implements PokemonBattle {
    parties: Party[2];
    currentTurn: number;
    terrain:string
    weather:string
    canRun: boolean;
    pokemonOnField: Pokemon[];
    

    constructor(party1: Party, party2: Party, canRun: boolean = true) {
        this.parties[0] = party1;
        this.parties[1] = party2;
        this.canRun = canRun;
        this.currentTurn = 1;
    }

    makeInput(partyNumber: 0 | 1, input: Input) {
        this.parties[partyNumber].input = Input;
    }

    startTurn() {
        //check pokemon items
        //check pokemon abilities
        if (this.parties[0].length > 0 && this.parties[1].length > 0) {
            console.log(`Turn ${this.currentTurn}`);

            if (this.parties[0].input[0] == "MOVE" && this.parties[1].input[0] == "MOVE") {
                
            }

            //calculate speed
            if (this.parties[0].input[0] == "RUN") {
               
            } else if (this.parties[0]. input[0] == "BAG" || "POKEMON") {

            } else {

            }
            //make move loop 

            //
        }
        else {

        }
    }    
}