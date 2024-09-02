import { Input, Types } from "phaser";
import { EventBus } from "../EventBus";
import Player from "./Player";
import MainScene from "../scenes/MainScene";
import socket from "../../socket/socket";
import { Vector2 } from "@/shared/maps/types";

export default class LocalPlayer extends Player {
    timeUntilEncounter: number = this.getTimeUntilNextEncounter();
    nextPosEmit: number = Player.POSITION_UPDATE_INTERVAL;

    cursors: Types.Input.Keyboard.CursorKeys;
    wasd: any;

    isInBattle: boolean = false;

    constructor(scene: MainScene, x: number, y: number, avatar: string, name: string) {
        super(scene, x, y, avatar, name);

        // define inputs
        const keyboard = scene.input.keyboard as Input.Keyboard.KeyboardPlugin;
        this.cursors = keyboard.createCursorKeys();
        this.wasd = keyboard.addKeys('W,S,A,D');

        // set depths
        this.nameTag.setDepth(200000);
        this.nameTagBackground.setDepth(199999);
    }

    update(time: number, delta: number) {
        // handle input logic first
        this.handleInput();

        super.update(time, delta);

        if (socket.connected) {
            this.nextPosEmit -= delta;
            if (this.nextPosEmit <= 0) {
                this.nextPosEmit = Player.POSITION_UPDATE_INTERVAL;
                socket.emit("movePlayer", { x: this.x, y: this.y });
            }
        }
    }

    handleInput() {
        let velocityX = 0, velocityY = 0;
        if (!this.isInBattle && socket.connected) {
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
        this.body.setVelocity(velocityX, velocityY);
    }

    getVelocity(delta: number): Vector2 {
        return this.body.velocity;
    }

    onGrass(delta: number) {
        this.timeUntilEncounter -= delta / 1000;
        if (this.timeUntilEncounter <= 0) {
            socket.emit('startEncounter');
            this.isInBattle = true;
            EventBus.emit('startBattle');
            this.timeUntilEncounter = this.getTimeUntilNextEncounter();
        }
    }

    getTimeUntilNextEncounter(): number {
        return Phaser.Math.FloatBetween(1, 5);
    }
}