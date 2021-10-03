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
        this.load.image('Treeset', 'assets/maps/Trees.png')
        //this.load.image('Treeset', 'maps/Trees.png')
        this.load.image('rock1', 'assets/Rock1.png')
        this.load.image('rock2', 'assets/Rock2.png')
        this.load.image('rock3', 'assets/Rock3.png')
        this.load.image('smallfire', 'assets/Chars/smallfire.png')
        this.load.image('shoot', 'assets/Chars/shoot.png')
        this.load.image('shooty', 'assets/Chars/shooty.png')
        switch (scene)
        {
            case 0:
                console.log(0)
                break
            case 1:
                this.load.tilemapTiledJSON('map1', 'assets/maps/Lvltext.json');
                this.load.image('solidgrass', 'assets/solid.png');
                this.load.image('marselo', 'assets/Chars/char.png');
                this.load.image('Tilemap1', 'assets/maps/Tilemap1.png');
                
                
                console.log(1)
                break
            case 2:
                this.load.tilemapTiledJSON('map2', 'assets/maps/Lvl2.json');
                this.load.image('solidgrass', 'assets/solid.png');
                this.load.image('marselo', 'assets/Chars/char.png');  
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
