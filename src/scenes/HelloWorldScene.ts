import Phaser from 'phaser'
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
    }
    preload()
    {
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
        this.load.image('shoot', 'assets/Chars/shoot.png')
        this.load.image('shooty', 'assets/Chars/shooty.png')
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
        if (this.scn == 0)
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

        var ta
        ta = this.add.text(400, 300, '', { fontSize: '28px', fill: '#FFF' });
        ta.setText('Objective: Debug the Fires');
        ta.setInteractive();
        ta.on('pointerdown', () => this.scene.start('Lvl', {s:this.scn}));
    }
    update(delta)
    {
        //time = delta;
    }
}
