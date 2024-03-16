// import './App.css';
import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';
import ExampleScene from './scene';

export default function Game() {
    useEffect(() => {
        const gameConfig = {
            width: 960,
            height: 640,
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