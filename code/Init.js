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
    scene: [menu, loader, Lvl]
    
};

//LEVEL SELECT - this number determines which level to load!
var scene = 1


//basic objects
var player;
var floors;
var platforms;
var background;
var level;
var walls;
var fire;
var spark;
var plants;

//Movement keys
var cursors;
var keya;
var keys;
var keyd;
var keyw;


//Informational - HUD
var combotext;
var timetext;
var ringtext;
var livestext;
var scoretext;
var coolcam;
var jscore;
var time = 0;
var limit;
var jhud;

//Functionality
var gameover = false
var lvlcomplete = false
var paths
var lives = 3
var deathcause = 0
var scenename = ""

var mapsizex
var mapsizey
var mapx
var tilemapx
var tileset

//Music
var mus
var gameplay
var gover

//Sounds
var jump
var hurt
var explode
var power
var ringsnd
var baloob

var game = new Phaser.Game(config);
