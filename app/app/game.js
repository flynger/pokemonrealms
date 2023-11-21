"use client";
import Phaser from 'phaser';
import React, { useEffect } from 'react';

const Game = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
      };
      
      new Phaser.Game(config);

      function preload() {
        this.load.image('sky', 'assets/sky.png');
      }

      function create() {
        this.add.image(400, 300, 'sky');
      }
    }
  }, []);

  return <div id="phaser-game"></div>;
};

export default Game;