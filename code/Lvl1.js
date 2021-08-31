class Lvl extends Phaser.Scene
{
    constructor()
    {
        super('Lvl')
    }

    create()
    {
        //Creation - Camera, Physics Groups, Solid Objects, Controls

        
        walls = this.physics.add.staticGroup()

        //Load Tilemaps
        mapx = this.make.tilemap({key: ('map' + scene.toString())})
        tilemapx = mapx.addTilesetImage('Tilemap' + scene.toString(), 'Tilemap' + scene.toString(), 128, 64)
        var treemap = mapx.addTilesetImage('Trees', 'Treeset', 128,64)
        


        //Get the camera bounds based of the map's width and height
        mapsizex = mapx.widthInPixels
        mapsizey = (mapx.heightInPixels)/2
        
        coolcam= this.cameras.main;
        this.cameras.main.setBounds(0,0,mapsizex,mapsizey);


        
        //Parse Level Data and Objects
        level = mapx.createLayer('Ground', tilemapx);
        level.setCollisionByProperty({collides : true});
        var solid = mapx.createLayer('Solid', tilemapx);



        var trees = mapx.createLayer('Trees', treemap);
        trees.forEachTile(tile =>  {
            if (tile.properties.collides == true)
            {
                var a = walls.create(tile.pixelX + 64, tile.pixelY + 32, 'Treeset');
                a.body.setSize(32, 64);
                trees.removeTileAt(tile.x, tile.y);
            }
            else if (tile.properties.Rock == true)
            {
                var a = walls.create(tile.pixelX + 64, tile.pixelY + 32, 'rock1');
                a.body.setSize(32, 48);
                trees.removeTileAt(tile.x, tile.y);
            }
        })
        console.log(walls)


        var sp = mapx.findObject("Points", obj => obj.name === "sp");
        console.log(sp)
        
        //Controls

        cursors = this.input.keyboard.createCursorKeys();
        keya = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keys = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyd = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyw = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);


        //HUD
        combotext = this.add.text(16, 90, '', { fontSize: '28px', fill: '#000' });
        timetext = this.add.text(40, 8, '', { fontSize: '28px', fill: '#000' });
        ringtext = this.add.text(32, 50, '', { fontSize: '28px', fill: '#000' });
        scoretext = this.add.text(8, 150, '', { fontSize: '28px', fill: '#000' });
        livestext = this.add.text(32, 100, '', { fontSize: '28px', fill: '#000' });

        ringtext.scrollFactorX = 0
        ringtext.scrollFactorY = 0
        combotext.scrollFactorX = 0
        combotext.scrollFactorY = 0
        timetext.scrollFactorX = 0
        timetext.scrollFactorY = 0
        livestext.scrollFactorX = 0
        livestext.scrollFactorY = 0
        scoretext.scrollFactorX = 0
        scoretext.scrollFactorY = 0

        //Collision

        player = this.physics.add.sprite(sp.x,sp.y,'marselo');

        //Colliders
        this.physics.add.collider(player, level);
        this.physics.add.collider(player, walls);


    }

    update(delta)
    {

            coolcam.centerOn(player.x,player.y);
            if (keya.isDown)
            {
                player.setVelocityX(-200)
                player.flipX = true

            }
            else if (keyd.isDown)
            {
                player.setVelocityX(200)
                player.flipX = false

            }
            else
            {
                player.setVelocityX(0);

            }

            if (keyw.isDown)
            {
                player.setVelocityY(-200)
            }
            else if (keys.isDown)
            {
                player.setVelocityY(200)
            }
            else
            {
                player.setVelocityY(0)
            }
            
            


    }
}