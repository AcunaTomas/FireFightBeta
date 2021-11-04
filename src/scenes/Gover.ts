import Phaser from 'phaser'
export default class HelloWorldScene extends Phaser.Scene
{
    private scn
	constructor()
	{
		super('gover')
	}
    init(s)
    {
        this.scn = s.s
    }
    preload()
    {
        this.load.image('gover', 'assets/menu/GameOvah.png')
    }
    create()
    {
        this.sound.stopAll()
        this.add.image(1280/2,720/2, 'gover')
        this.add.image(244,203, 'prope')
        this.add.image(244,13, 'prope')
        this.add.image(994,203, 'prope')
        this.add.image(994,13, 'prope')
        var a = this.add.image(250,350, 'play')
        var b = this.add.image(1000,350, 'play')
        this.add.text(150, 330, 'Reintentar', { fontFamily:'Wood', fontSize: '72px', fill: '#663300' });
        this.add.text(950, 330, 'Menu', { fontFamily:'Wood', fontSize: '72px', fill: '#663300' });
        a.setInteractive()
        b.setInteractive()
        a.on('pointerdown', this.retry, this)
        b.on('pointerdown', this.menu, this)

    }

    retry()
    {
        this.scene.start('hello-world',{s:this.scn})
    }
    menu()
    {
        this.scene.start('menu')
    }
}