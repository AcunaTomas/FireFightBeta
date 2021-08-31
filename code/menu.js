class menu extends Phaser.Scene
{
    constructor()
    {
        super('menu')
    }
    preload()
    {
        this.load.image('menu1', 'assets/menu/Options1.png')
    }
    create()
    {
        var men = this.add.image(400,300, 'menu1')
        men.setInteractive()
        scene = 2
        men.on('pointerdown', () => this.scene.start('loader'));
    }
}
