import Phaser from 'phaser'


export default class ugly extends Phaser.Scene
{
private proceed
constructor()
{
    super('ugly')
}
init()
{
    this.add.text(420,300,'Cargando Traducciones...',{fontFamily:'Wood',fontSize:'72px', align:'center'})
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
    this.load.json('eng', 'assets/eng.json')
    this.load.json('spa', 'assets/spa.json')
}

update(time: number, delta: number): void {
    if (this.proceed)
    {
        this.scene.start('actualpreloader')
    }
}


}