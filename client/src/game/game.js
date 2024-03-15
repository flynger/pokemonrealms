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
            scene: [ExampleScene]
        }
        new Phaser.Game(gameConfig);
    }, []);
    return <div id="game">
        <canvas></canvas>
    </div>;
}