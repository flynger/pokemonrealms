import "./Game.css";
import { useRef, useState } from "react";
import { IRefPhaserGame, PhaserGame } from "../game/PhaserGame";
import Battle from "../components/Game/Battle/Battle";
import { EventBus } from "../game/EventBus";

function Game() {
    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);
    const [isInBattle, setIsInBattle] = useState(false);

    EventBus.on('startBattle', () => {
        setIsInBattle(true);
        console.log("set is in battle to true")
    });

    return (
        <div id="game">
            <PhaserGame ref={phaserRef} />
            <div id="ui-container">
                {isInBattle && <Battle />}
            </div>
        </div>
    );
}

export default Game;