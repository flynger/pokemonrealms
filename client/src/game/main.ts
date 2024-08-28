import { AUTO, Game, Types } from 'phaser';
import MainScene from './scenes/MainScene';

import FontFaceObserver from "fontfaceobserver";
import { InitialMapData } from '@/shared/maps/types';

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

const StartGame = async (parent: string, mapData: InitialMapData): Promise<Game> => {
  const font = new FontFaceObserver('Power Clear');

  // Wait for the font to load
  await font.load();

  // After the font has loaded, return the new game instance
  const game = new Game({ ...config, parent });
  game.registry.set("mapData", mapData);

  return game;
};

export default StartGame;

