// import './App.css';
import React, { useEffect, useState } from 'react';
import Phaser from 'phaser';
import ExampleScene from './scene';

export default function Game() {
    const [isReady, setReady] = useState(false);
    // const [game, setGame] = useState();

    useEffect(() => {
        // const config1 = {
        //     callbacks: {
        //         preBoot: game => {
        //             // A good way to get data state into the game.
        //             game.registry.merge(someState)
        //             // This is a good way to catch when that data changes.
        //             game.registry.events.on("changedata", (par, key, val, prevVal) => {
        //                 // Simply call whatever functions you want outside.
        //                 dataService({ [key]: val })
        //             })
        //         },
        //     },
        //     type: Phaser.AUTO,
        //     parent: "phaser-example",
        //     width: 800,
        //     height: 600,
        //     scene: [ExampleScene],
        // }

        const gameConfig = {
            height: 640,
            width: 960,
            physics: { default: "arcade" },
            scale: {
                // Except this should match the ID of your component host element.
                parent: "game",
                // mode: Phaser.Scale.FIT
            },
            transparent: true,
            type: Phaser.AUTO,
            scene: [ExampleScene]
        }

        const game = new Phaser.Game(gameConfig);
        game.events.on("READY", setReady);
        // If you don't do this, you get duplicates of the canvas piling up.
        return () => {
            setReady(false);
            game.destroy(true);
        }
    }, []);

    return <div id="game" className={isReady ? "visible" : "invisible"} />;
}