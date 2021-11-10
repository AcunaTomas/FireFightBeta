import Phaser from 'phaser'


export default class ugly extends Phaser.Scene
{
private proceed
constructor()
{
    super('ugly')
}

preload()
{

    for (var i = 0;i<40;i++)
    {
        this.load.image(i.toString(),'assets/logo/' + i + '.png')
        console.log(i)
        if (i == 39)
        {
            this.proceed = true
        }
    }
}

update(time: number, delta: number): void {
    if (this.proceed)
    {
        this.scene.start('actualpreloader')
    }
}


}