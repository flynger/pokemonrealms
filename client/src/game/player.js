import Phaser from 'phaser';
import ExampleScene from './scene';

export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(name = "Unnamed", x = 100, y = 450) {
        super(ExampleScene, x, y, 'red');
        this.setDrag(DRAG_AMOUNT);
        this.setCollideWorldBounds(true);
        this.tag = new PlayerTag(this);
    }

    update() {

    }
}

class PlayerTag extends Phaser.GameObjects.Text {
    static style = { font: '20px Futura', fill: '#000000' };

    constructor(player) {
        super(ExampleScene, player.x, player.y - 30);
        this.setOrigin(0.5);
    }
}