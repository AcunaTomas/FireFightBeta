import Phaser from 'phaser'
var a
export default class HelloWorldScene extends Phaser.Scene
{
	constructor()
	{
		super('menu')
	}
    preload()
    {
        this.load.image('menu1', "assets/Menu/Options1.png")
        this.load.image('base', "assets/Menu/base con agarradera.png")
        this.load.image('chain', "assets/Menu/CADENA1.png")
        this.load.image('play', "assets/Menu/jugar.png")
        this.load.image('levels', "assets/Menu/niveles.png")
        this.load.image('options', "assets/Menu/opciones.png")
        this.load.audio('game', 'assets/SFX/gametest.wav')
    }
    create()
    {  
        this.add.image(640,360, 'base')
        var men = this.add.image(670,250, 'play')
        var dad = this.add.image(660,350, 'levels')
        var ded = this.add.image(655,447, 'options')
        
        men.setInteractive()
        dad.setInteractive()
        ded.setInteractive() 
        a = 2
        
        men.on('pointerdown', () => this.scene.start('hello-world'));
        dad.on('pointerdown', () => this.scene.start('hello-world'));
        ded.on('pointerdown', () => this.scene.start('hello-world'));
    }
}
export var scene = 2