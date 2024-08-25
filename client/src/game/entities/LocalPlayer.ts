import { Input, Types } from "phaser";
import { EventBus } from "../EventBus";
import Player from "./Player";
import MainScene from "../scenes/MainScene";

export default class LocalPlayer extends Player {
    timeUntilEncounter: number = this.getTimeUntilNextEncounter();
    cursors: Types.Input.Keyboard.CursorKeys;
    wasd: any;

    constructor(scene: MainScene, x: number, y: number, avatar: string, name: string) {
        super(scene, x, y, avatar, name);

        // define inputs
        const keyboard = scene.input.keyboard as Input.Keyboard.KeyboardPlugin;
        this.cursors = keyboard.createCursorKeys();
        this.wasd = keyboard.addKeys('W,S,A,D');
    }
    
    getVelocity(): [velocityX: number, velocityY: number] {
        let velocityX = 0, velocityY = 0;
        if (this.scene.input.keyboard?.enabled) {
            velocityX = (this.cursors.left.isDown || this.wasd.A.isDown ? -Player.speed : 0) +
                (this.cursors.right.isDown || this.wasd.D.isDown ? Player.speed : 0);
            velocityY = (this.cursors.up.isDown || this.wasd.W.isDown ? -Player.speed : 0) +
                (this.cursors.down.isDown || this.wasd.S.isDown ? Player.speed : 0);

            // Normalize diagonal movement
            if (velocityX !== 0 && velocityY !== 0) {
                velocityX *= Math.SQRT1_2;
                velocityY *= Math.SQRT1_2;
            }
        }
        return [velocityX, velocityY];
    }
    
    onGrass(delta: number) {
        this.timeUntilEncounter -= delta / 1000;
        if (this.timeUntilEncounter <= 0) {
            EventBus.emit('startBattle');
            if (this.scene.input.keyboard) this.scene.input.keyboard.enabled = false;
            this.timeUntilEncounter = this.getTimeUntilNextEncounter();
        }
    }

    getTimeUntilNextEncounter(): number {
        return Phaser.Math.FloatBetween(1, 5);
    }   
}