import Phaser from 'phaser';

export default class ExampleScene extends Phaser.Scene {
    preload() {
        this.load.image("logo", logoImage)
    }
    create() {
        // You made this!
        const text = this.add.text(250, 250, "Phaser")
        text.setInteractive({ useHandCursor: true })
        this.add.image(400, 300, "logo")
        /** @tutorial I made this! */
        // Get all that lovely dataState into your scene,
        let { clickCount } = this.registry.getAll()
        text.on("pointerup", () => {
            // This will trigger the "changedata" event handled by the component.
            this.registry.merge({ clickCount: clickCount++ })
        })
        // This will trigger the scene as now being ready.
        this.game.events.emit("READY", true)
    }
}