import { AUTO, Game, Types } from 'phaser';
import MainScene from './scenes/MainScene';

import FontFaceObserver from "fontfaceobserver";

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
    type: AUTO,
    // width: 1200,
    // height: 800,
    parent: 'game-container',
    scale: {
        mode: Phaser.Scale.RESIZE
    },
    physics: {
        default: "arcade",
        arcade: {
            fixedStep: false,
            // debug: true
        }
    },
    scene: [
        MainScene
    ]
};

const StartGame = async (parent: string): Promise<Game> => {
  const font = new FontFaceObserver('Power Clear');

  // Wait for the font to load
  await font.load();

  // After the font has loaded, return the new game instance
  return new Game({ ...config, parent });
};

export default StartGame;

