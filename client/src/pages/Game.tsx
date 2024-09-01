import "./Game.css";
import { useEffect, useRef, useState } from "react";
import { IRefPhaserGame, PhaserGame } from "../game/PhaserGame";
import Battle from "../components/Game/Battle/Battle";
import { EventBus } from "../game/EventBus";
import socket from "../socket/socket";
import MainScene from "../game/scenes/MainScene";
import { InitialMapData, PlayerMovementData } from "@/shared/maps/types";

function Game() {
    //  References to the PhaserGame component (game and scene are exposed)
    const phaserRef = useRef<IRefPhaserGame | null>(null);

    const [isConnected, setIsConnected] = useState<boolean>(socket.connected);
    const [isInBattle, setIsInBattle] = useState(false);
    const [mapData, setMapData] = useState<InitialMapData | null>(null); // State to store map data


    //Run on startup
    useEffect(() => {
        // FIXME: Ghost player is created (second socket connection doesnt override first)
        //console.log("socket useEffect ran")
        socket.on('connect', () => { setIsConnected(true); console.log("Socket connected") });
        socket.on('disconnect', () => setIsConnected(false));

        socket.on('loadMap', setMapData);

        socket.on('movePlayer', (data: PlayerMovementData) => {
            const scene = phaserRef.current?.scene as MainScene;
            if (scene) scene.movePlayer(data);
        });

        socket.on('disconnectPlayer', (name: string) => {
            const scene = phaserRef.current?.scene as MainScene;
            if (scene) scene.removePlayer(name);
        });

        EventBus.on('startBattle', () => {
            setIsInBattle(true);
            console.log("set is in battle to true")
        });

        // Cleanup on component unmount
        return () => {
            socket.removeAllListeners();
            EventBus.removeAllListeners();
        };
    }, []);

    // socket.on("movePlayer", (data: PlayerMovementData) => {
    //     console.log(data);
    // });

    return (
        <div id="game">
            {mapData && <PhaserGame ref={phaserRef} mapData={mapData} />}
            <div id="ui-container">
                {isInBattle && <Battle />}
                {!isConnected && "Not Connected"}
            </div>
        </div>
    );
}

export default Game;