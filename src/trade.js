import { players } from './loginHandler.js';
import { pokemon } from './pokemon.js'

class trade {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.pokemonIndex1 = 0;
        this.pokemonIndex2 = 0;
        this.p1Ready = false;
        this.p2Ready = false;
    }
}