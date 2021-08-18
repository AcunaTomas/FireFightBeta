class loader extends Phaser.Scene
{
    constructor()
    {
        super('loader')
    }

    preload()
    {
        switch (scene)
        {
            case 0:
                console.log(0)
                break
            case 1:
                this.load.tilemapTiledJSON('map1', 'maps/Lvltext.json');
                this.load.image('solidgrass', 'assets/solid.png');
                this.load.image('marselo', 'assets/Marselo.png');
                this.load.image('Tilemap1', 'maps/Tilemap1.png');
                mapsizex = 1280;
                mapsizey = 800;
                
                
                console.log(1)
                break
            case 2:
                this.load.tilemapTiledJSON('map2', 'maps/Lvl2.json');
                this.load.image('solidgrass', 'assets/solid.png');
                this.load.image('marselo', 'assets/Marselo.png');   
                this.load.image('Tilemap2', 'maps/Tilemap2.png');
                mapsizex = 3800;
                mapsizey = 1300;
                
                
                console.log(2)
        }

    
    }
    
    create(delta)
    {
        this.sound.stopAll();
        var ta;
        ta = this.add.text(125, 300, '', { fontSize: '28px', fill: '#FFF' });
        ta.setText('Objective: debug this shit');
        ta.setInteractive();
        ta.on('pointerdown', () => this.scene.start('Lvl'));
    }
    update(delta)
    {
        time = delta;
    }
}
