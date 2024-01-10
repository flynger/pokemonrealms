"use client"
import React, { useEffect, useState } from 'react';
import World from '@/game/world';

export const Game = () => {
  const [game, setGame] = useState();
  // Create the game inside a useEffect
  // Creates it only once
  useEffect(() => {
    if (!game) {
      async function initPhaser() {
        const Phaser = await import('phaser');
        const config = {
          type: Phaser.AUTO,
          title: "Pokemon Test",
          parent: 'game-content',
          scene: World,
          width: 800,
          height: 600,
          physics: {
            default: 'matter',
            matter: {
              gravity: false,
              debug: true
            }
          }
        };

        const game = new Phaser.Game(config);
        setGame(game);
      }
      initPhaser();
    }
  }, []);

  return (
    <>
      <div id="game-content" key="game-content">
        {/* this is where the game canvas will be rendered */}
      </div>
    </>
  );
};

export default Game;