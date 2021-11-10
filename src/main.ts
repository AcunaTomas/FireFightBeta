import 'regenerator-runtime/runtime'

import menu from "./scenes/menu";
import Lvl from "./scenes/game_world";
import HelloWorldScene from "./scenes/HelloWorldScene";
import ugly from "./scenes/whydoineedtodothisuglyness"
localStorage.clear();

import HUD from "./scenes/HUD";
import gover from "./scenes/Gover";
import actualpreloader from './scenes/actualpreloader';
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
            debug: false
        }
    },
    scene: [ugly,actualpreloader,menu,HelloWorldScene, Lvl, HUD, gover]

    
};

export default new Phaser.Game(config)
