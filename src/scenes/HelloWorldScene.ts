import Phaser from 'phaser'
import { getPhrase } from '~/services/translations'

//The level loader
export default class HelloWorldScene extends Phaser.Scene
{
    private scn
	constructor()
	{
		super('hello-world')

	}
    init(s)
    {
        this.scn = s.s
        this.scene.stop('HUD')
        this.add.image(1280/2,720/2, 'tback')
    }
    preload()
    {    var progress = this.add.graphics();

        this.load.on('progress', function (value) {
            
            progress.clear();
            progress.fillStyle(0xffffff, 1);
            progress.fillRect(0, 70, 800 * value, 60);
    
        });
    
        this.load.on('complete', function () {
    
            progress.destroy();
    
        });
        this.load.image('ficon','assets/Menu/ficon.png')
        this.load.image('wicon','assets/Menu/wicon.png')
        this.load.audio('fire', 'assets/SFX/sel.wav')
        this.load.image('Treeset', 'assets/maps/Trees.png')
        this.load.spritesheet('trecol', 'assets/stuff/Trees.png', {frameWidth:70, frameHeight:126})
        this.load.spritesheet('fireidle', 'assets/Chars/fuegomovi.png', {frameWidth:165, frameHeight:163})
        this.load.image('pausewindow', 'assets/Menu/plchldrpause.png')
        this.load.image('pausebutton', 'assets/Menu/pbutton.png')
        this.load.image('menubutton', 'assets/Menu/phmenu.png')
        this.load.spritesheet('wsbutton', 'assets/Menu/wsbuttons.png', {frameWidth: 128})
        this.load.image('resumebutton', 'assets/Menu/phresume.png')
        this.load.image('rock1', 'assets/Rock1.png')
        this.load.image('rock2', 'assets/Rock2.png')
        this.load.image('rock3', 'assets/Rock3.png')
        this.load.image('smallfire', 'assets/Chars/smallfire.png')
        this.load.spritesheet('shoot', 'assets/Chars/shootx.png', {frameWidth:210, frameHeight:82, spacing:23})
        this.load.spritesheet('shooty', 'assets/Chars/shooty.png', {frameWidth:82, frameHeight:210, spacing:23})
        this.load.spritesheet('marselo', 'assets/Chars/Spritebombero.png', {frameWidth:92, frameHeight:129,spacing:26});
        this.load.image('waterbot','assets/Chars/water.png')
        switch (this.scn)
        {
            case 0:
                console.log(0)
                break
            case 1:
                this.load.tilemapTiledJSON('map1', 'assets/maps/Lvl1.json');
                this.load.image('solidgrass', 'assets/solid.png');

                
                this.load.image('Tilemap2', 'assets/maps/Tilemap2.png');
                
                
                console.log(1)
                break
            case 2:
                this.load.tilemapTiledJSON('map2', 'assets/maps/Lvl2.json');
                this.load.image('solidgrass', 'assets/solid.png');
                this.load.image('Tilemap2', 'assets/maps/Tilemap2.png');
                
                
                console.log(2)
                break
            case 3:
                this.load.tilemapTiledJSON('map3', 'assets/maps/Lvl3.json');
                this.load.image('solidgrass', 'assets/solid.png');
                this.load.image('Tilemap2', 'assets/maps/Tilemap2.png');

                break
            case 4:
                this.load.tilemapTiledJSON('map4', 'assets/maps/Lvl4.json');
                this.load.image('solidgrass', 'assets/solid.png');
                this.load.image('Tilemap2', 'assets/maps/Tilemap2.png');
                break
            case 5:
                this.load.tilemapTiledJSON('map5', 'assets/maps/Lvl5.json');
                this.load.image('solidgrass', 'assets/solid.png');
                this.load.image('Tilemap2', 'assets/maps/Tilemap2.png');
                break
        }

    
    }
    
    create(delta)
    {
        if (this.scn == 0 || this.scn > 5) //catch invalid entries, send the user back to the main menu
        {
            this.scene.start('menu');
        }
        this.sound.stopAll();
        this.anims.create(
            {
                key: 'idle',
                frames: this.anims.generateFrameNumbers('fireidle',{start: 0, end: 5}),
                frameRate: 10,
                repeat: -1
                
            }

        )

        this.anims.create(
            {
                key: 'walk',
                frames: this.anims.generateFrameNumbers('wsbutton',{start: 0, end: 0}),
                frameRate: 10,
                repeat: -1
                
            }

        )
        this.anims.create(
            {
                key: 'shootb',
                frames: this.anims.generateFrameNumbers('wsbutton',{start: 1, end: 1}),
                frameRate: 10,
                repeat: -1
                
            }

        )
        this.anims.create(
            {
                key: 'pwalk',
                frames: this.anims.generateFrameNumbers('marselo',{start: 0, end: 3}),
                frameRate: 10,
                repeat: -1
                
            }

        )
        this.anims.create(
            {
                key: 'pidle',
                frames: this.anims.generateFrameNumbers('marselo',{start: 3, end: 3}),
                frameRate: 10,
                repeat: -1
                
            }

        )
        this.anims.create(
            {
                key: 'psd',
                frames: this.anims.generateFrameNumbers('marselo',{start: 4, end: 4}),
                frameRate: 10,
                repeat: -1
                
            }

        )
        this.anims.create(
            {
                key: 'psu',
                frames: this.anims.generateFrameNumbers('marselo',{start: 5, end: 5}),
                frameRate: 10,
                repeat: -1
                
            }

        )

        this.anims.create(
            {
                key: 'tree1',
                frames: this.anims.generateFrameNumbers('trecol',{start: 0, end: 0}),
                frameRate: 10,
                repeat: -1
                
            }

        )
        this.anims.create(
            {
                key: 'tree2',
                frames: this.anims.generateFrameNumbers('trecol',{start: 1, end: 1}),
                frameRate: 10,
                repeat: -1
                
            }

        )
        this.anims.create(
            {
                key: 'tree3',
                frames: this.anims.generateFrameNumbers('trecol',{start: 2, end: 2}),
                frameRate: 10,
                repeat: -1
                
            }

        )

        this.anims.create(
            {
                key: 'sx',
                frames: this.anims.generateFrameNumbers('shoot',{start: 0, end: 2}),
                frameRate: 4,
                repeat: -1
                
            }

        )

                this.anims.create(
            {
                key: 'sy',
                frames: this.anims.generateFrameNumbers('shooty',{start: 0, end: 2}),
                frameRate: 4,
                repeat: -1
                
            }

        )

        var ta
        var hof
        if (Math.floor(Math.random() * 2) == 0)
        {
            hof = 'Hint'
        }
        else
        {
            hof = 'Fact'
        }
        this.add.image(640,360,'box').setScale(2.0)
        this.add.text(600,70, getPhrase(hof), {fontFamily:'Wood', fontSize:'72px'})
        this.add.text(240, 200, getPhrase(hof + Math.floor(Math.random() * 3 + 1)), {fontSize: '28px', fill: '#FFF'})
        this.add.image(640,525,'Hbutt')
        ta = this.add.text(600, 500, '', {fontFamily:'Wood', fontSize: '72px', fill: '#FFF' });
        ta.setText(getPhrase('Play') + '!');
        ta.setInteractive();
        ta.on('pointerdown', () => this.scene.start('Lvl', {s:this.scn}));
    }
    update(delta)
    {
        //time = delta;
    }
}
