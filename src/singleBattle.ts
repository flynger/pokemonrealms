import { PokemonBattle } from './battle'
import { Pokemon, Ability, AbilitySlot, Gender, Move, Species, Stats, Type } from './pokemon'
import { Party, Input } from './party'

class SingleBattle implements PokemonBattle {
    parties: [Party, Party];
    currentTurn: number;
    terrain: string
    weather: string
    canRun: boolean;
    pokemonOnField: Pokemon[];


    constructor(party1: Party, party2: Party, canRun: boolean = true) {
        this.parties[0] = party1;
        this.parties[1] = party2;
        this.canRun = canRun;
        this.pokemonOnField.push(this.parties[0].pokemon[0], this.parties[1].pokemon[0]);
        this.currentTurn = 1;

        //reset all stat stages

    }

    makeInput(partyNumber: 0 | 1, input: Input) {
        this.parties[partyNumber].input = input;
    }

    startTurn() {
        //check pokemon items
        //check pokemon abilities
        if (this.parties[0].pokemon.length > 0 && this.parties[1].pokemon.length > 0) {
            console.log(`Turn ${this.currentTurn}`);
        
            if (this.parties[0].pokemon.length > 0 && this.parties[1].pokemon.length > 0) {
                console.log(`Turn ${this.currentTurn}`);
              
                this.parties[0].input[0] == "RUN"
                  ? this.canRun ? this.Run() : this.DisplayDialog("You cannot run from this battle.")
                  : this.parties[1].input[0] == "RUN"
                    ? this.canRun ? this.Run() : this.DisplayDialog("You cannot run from this battle.")
                    : this.parties[0].input[0] == "BAG"
                      ? null // do something for bag
                      : this.parties[1].input[0] == "BAG"
                        ? null // do something for bag
                        : this.parties[0].input[0] == "POKEMON"
                          ? this.pokemonOnField[0] = this.parties[0].pokemon[this.parties[0].input[1]]
                          : this.parties[1].input[0] == "POKEMON"
                            ? this.pokemonOnField[1] = this.parties[1].pokemon[this.parties[1].input[1]]
                            : null;
              }

            if (this.parties[0].input[0] == "MOVE" && this.parties[1].input[0] == "MOVE") {
                //calculate speed
                let speed1: number = this.pokemonOnField[0].stats.spe + this.pokemonOnField[0].ivs.spe + this.pokemonOnField[0].evs.spe / 4;
                let speed2: number = this.pokemonOnField[1].stats.spe + this.pokemonOnField[1].ivs.spe + this.pokemonOnField[1].evs.spe / 4;

                if (speed1 > speed2) {
                    // Pokémon 1 goes first
                    this.Move(this.pokemonOnField[0], this.pokemonOnField[0].moves[this.parties[0].input[1]]);
                    this.Move(this.pokemonOnField[1], this.pokemonOnField[1].moves[this.parties[1].input[1]]);
                } else if (speed2 > speed1) {
                    // Pokémon 2 goes first
                    this.Move(this.pokemonOnField[1], this.pokemonOnField[1].moves[this.parties[1].input[1]]);
                    this.Move(this.pokemonOnField[0], this.pokemonOnField[0].moves[this.parties[0].input[1]]);
                } else {
                    // Speed tie - randomly decide which Pokémon goes first
                    const random = Math.random();
                    if (random < 0.5) {
                        // Pokémon 1 goes first
                        this.Move(this.pokemonOnField[0], this.pokemonOnField[0].moves[this.parties[0].input[1]]);
                        this.Move(this.pokemonOnField[1], this.pokemonOnField[1].moves[this.parties[1].input[1]]);
                    } else {
                        // Pokémon 2 goes first
                        this.Move(this.pokemonOnField[1], this.pokemonOnField[1].moves[this.parties[1].input[1]]);
                        this.Move(this.pokemonOnField[0], this.pokemonOnField[0].moves[this.parties[0].input[1]]);
                    }
                }
            }
            else if (this.parties[0].input[0] == "MOVE") {
                this.Move(this.pokemonOnField[0], this.pokemonOnField[0].moves[this.parties[0].input[1]]);
            }
        } else {
            if (this.parties[0].pokemon.length > 0) {
                console.log("Party 1 wins");
            } else {
                console.log("Party2 wins");
            }
        }
    }

    Move(pokemon: Pokemon, move: Move) {

    }

    Run() {

    }

    DisplayDialog(message: string) {

    }
}