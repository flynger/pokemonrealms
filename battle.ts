class PokemonBattle {

    partyArray: Party[];
    currentTurn: number;

    constructor(...parties:Party[][]) {
        this.partyArray = parties;
        this.currentTurn = 1;
        console.log(parties)
    }

    startTurn() {
        //check pokemon items
        //check pokemon abilities
        if (this.partyArray.length > 0) {
            console.log(`Turn ${this.currentTurn}`);

            //calculate speed

            //make move loop

            //
        }
        else {

        }
    }
}

new PokemonBattle(["hi", "l"], ["abc", "fig"]);
