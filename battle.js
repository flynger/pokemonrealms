var PokemonBattle = /** @class */ (function () {
    function PokemonBattle() {
        var parties = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parties[_i] = arguments[_i];
        }
        this.partyArray = parties;
        this.currentTurn = 1;
        console.log(parties);
    }
    PokemonBattle.prototype.startTurn = function () {
        //check pokemon items
        //check pokemon abilities
        if (this.partyArray.length > 0) {
            console.log("Turn ".concat(this.currentTurn));
            //calculate speed
            //make move loop
            //
        }
        else {
        }
    };
    return PokemonBattle;
}());
new PokemonBattle(["hi", "l"], ["abc", "fig"]);
//# sourceMappingURL=battle.js.map