import "./Game.css";
import { useRef } from "react";
import { IRefPhaserGame, PhaserGame } from "../game/PhaserGame";

function Game() {
    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);

    return (
        <div id="game">
            <PhaserGame ref={phaserRef} />
        </div>
    );
}

export default Game;