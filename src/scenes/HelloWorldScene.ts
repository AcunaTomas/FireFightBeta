import Phaser from 'phaser'
import {scene} from './menu'
export default class HelloWorldScene extends Phaser.Scene
{
	constructor()
	{
		super('hello-world')
	}

    preload()
    {
        this.load.audio('fire', 'assets/SFX/sel.wav')
        this.load.image('Treeset', 'assets/maps/Trees.png')
        this.load.spritesheet('trecol', 'assets/stuff/Trees.png', {frameWidth:70, frameHeight:126})
        this.load.spritesheet('fireidle', 'assets/Chars/fuegomovi.png', {frameWidth:165, frameHeight:163})
        this.load.image('pausewindow', 'assets/menu/plchldrpause.png')
        this.load.image('pausebutton', 'assets/menu/pbutton.png')
        this.load.image('menubutton', 'assets/menu/phmenu.png')
        this.load.spritesheet('wsbutton', 'assets/menu/wsbuttons.png', {frameWidth: 50})
        this.load.image('resumebutton', 'assets/menu/phresume.png')
        this.load.image('rock1', 'assets/Rock1.png')
        this.load.image('rock2', 'assets/Rock2.png')
        this.load.image('rock3', 'assets/Rock3.png')
        this.load.image('smallfire', 'assets/Chars/smallfire.png')
        this.load.image('shoot', 'assets/Chars/shoot.png')
        this.load.image('shooty', 'assets/Chars/shooty.png')
        this.load.spritesheet('marselo', 'assets/Chars/prueba1.png', {frameWidth:88, frameHeight:124});
        switch (scene)
        {
            case 0:
                console.log(0)
                break
            case 1:
                this.load.tilemapTiledJSON('map1', 'assets/maps/Lvltext.json');
                this.load.image('solidgrass', 'assets/solid.png');

                this.load.image('Tilemap1', 'assets/maps/Tilemap1.png');
                
                
                console.log(1)
                break
            case 2:
                this.load.tilemapTiledJSON('map2', 'assets/maps/Lvl2.json');
                this.load.image('solidgrass', 'assets/solid.png');
                this.load.image('Tilemap2', 'assets/maps/Tilemap2.png');
                
                
                console.log(2)
        }

    
    }
    
    create(delta)
    {
        if (scene == 0)
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

        var ta
        ta = this.add.text(400, 300, '', { fontSize: '28px', fill: '#FFF' });
        ta.setText('Objective: Debug the Fires');
        ta.setInteractive();
        ta.on('pointerdown', () => this.scene.start('Lvl'));
    }
    update(delta)
    {
        //time = delta;
    }
}
