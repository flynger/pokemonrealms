import Pokemon from "pokemon";
import Battle from "./battle";
import Field from "./field";
import Side from "./side";

export default class SingleBattle extends Battle {
    constructor(team1: Pokemon[], team2: Pokemon[], field?: Field) {
        const side1 = new Side(0, team1, [0]);
        const side2 = new Side(1, team2, [1]);
        super([[side1], [side2]], field);
        this.activePokemon = [null!, null!];
    }

    startBattle(): void {
        // sets the active pokemon to the first in the team
        this.switchIn(0, this.sides[0][0].team[0]);
        this.switchIn(0, this.sides[0][0].team[1]);

        super.startBattle();
    }
}