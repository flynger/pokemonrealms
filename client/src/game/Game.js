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
            // roundPixels: false,
            scale: {
                mode: Phaser.Scale.FIT,
                parent: "Game",
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            physics: {
                default: "arcade",
                // arcade: {
                //     debug: true // Enable debug mode for the Arcade Physics system
                // }
            },
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
    await font.load(null);
    // await fetch('../res/data/moves.json').then((response) => response.json()).then((json) => Moves = json);
    // client.setup();
    // await setupGame();
}