import Lvl from "./scenes/game_world";
import HelloWorldScene from "./scenes/HelloWorldScene";
import menu from "./scenes/menu";
var config = {
    type: Phaser.WEBGL,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1280,
        height: 720,
    },

    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    scene: [menu,HelloWorldScene, Lvl]
    
};

export default new Phaser.Game(config)
