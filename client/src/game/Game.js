import './Game.css';
import { useEffect } from 'react';
import Phaser from 'phaser';
import FontFaceObserver from 'fontfaceobserver';
import MainScene from './MainScene';

export default function Game() {
    useEffect(() => {
        setup();

        const gameConfig = {
            // width: 960,
            // height: 640,
            // pixelArt: true,
            // roundPixels: true,
            scale: {
                mode: Phaser.Scale.FIT,
                parent: "Game",
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            physics: { default: "arcade" },
            parent: "game",
            scene: [MainScene]
        }
        const game = new Phaser.Game(gameConfig);

        return () => {
            game.destroy(true); // Cleanup Phaser game instance
        }
    }, []);
    return <div id="game" >

    </div>;
}

async function setup() {
    // setup promises
    const font = new FontFaceObserver('Power Clear', {});
    // $('#message-body').text("Loading fonts...");
    await font.load(null);
    // await fetch('../res/data/moves.json').then((response) => response.json()).then((json) => Moves = json);
    // $('#message-body').text("Establishing connection to server...");
    // client.setup();
    // $('#message-body').text("Setting up game...");
    // await setupGame();
}