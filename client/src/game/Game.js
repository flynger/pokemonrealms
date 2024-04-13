import './Game.css';
import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';
import ExampleScene from './scene';
import FontFaceObserver from 'fontfaceobserver';

export default function Game() {
    useEffect(() => {
        setup();

        const gameConfig = {
            // width: 960,
            // height: 640,
            // pixelArt: true,
            scale: {
                mode: Phaser.Scale.FIT,
                parent: "Game",
                autoCenter: Phaser.Scale.CENTER_BOTH,
            },
            physics: { default: "arcade" },
            parent: "game",
            scene: [ExampleScene]
        }
        const game = new Phaser.Game(gameConfig);

        return () => {
            // Cleanup Phaser game instance
            game.destroy(true);
        }
    }, []);
    return <div id="game">

    </div>;
}

async function setup() {
    // setup promises
    const font = new FontFaceObserver('Power Clear', {});
    // $('#message-body').text("Loading fonts...");
    await font.load(null, 30000);
    // await fetch('../res/data/moves.json').then((response) => response.json()).then((json) => Moves = json);
    // $('#message-body').text("Establishing connection to server...");
    // client.setup();
    // $('#message-body').text("Setting up game...");
    // await setupGame();
}