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
        plants = this.physics.add.staticGroup()
        fire = this.physics.add.group()
        spark = this.physics.add.group()

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



        var trees = mapx.createFromObjects('Trees',{name : 'Tree', key: 'Treeset'});
        plants.addMultiple(trees)
        solid.forEachTile(tile =>  {
        if (tile.properties.Rock == true)
            {
                var a = walls.create(tile.pixelX + 64, tile.pixelY + 32, 'rock1');
                a.body.setSize(32, 48);
                solid.removeTileAt(tile.x, tile.y);
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
        player.setScale(0.8)
        //Colliders
        this.physics.add.collider(player, level);
        this.physics.add.collider(player, walls);
        this.physics.add.collider(player, plants);
        this.physics.add.overlap(spark, plants, this.sparku, null, this);

        this.firestart(fire,plants)
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
            
            this.fireupdate(fire)


    }


    fireupdate(fire, delta)
    {
        fire.children.iterate(function (f)
        {
            var spread = 0;
            //console.log(f.data.get('s'))
            if (!f.data.get('s'))
            {
                f.data.set('s', 1)
            }
            else if (f.data.get('s') < 15000)
            {
                spread = f.data.get('s')
                f.data.set('s', spread += 17)
            }
            else
            {
                var a = Math.floor(Math.random() * (32 - 64))  + -32;
                var b = Math.floor(Math.random() * (32 - 64))  + -32;
                spark.create(f.x + a, f.y + b, 'smallfire').setScale(0.5)
                f.data.set('s', 0)
            }
        })
    }
    firestart(fire, plants)
    {
        plants.children.iterate( function (child)
        {
            child.body.setSize(32,96);
            if (child.data.values.ignites == true)
            {
                console.log('fire')
                fire.create(child.x, child.y-16, 'smallfire').setDataEnabled()
                child.setData('ignites', false)
            }
        })
    }
    firespread(fire)
    {
        plants.children.iterate( function (child)
        {
            child.body.setSize(32,96);
            if (child.data.values.ignites == true)
            {
                console.log('fire')
                fire.create(child.x, child.y-16, 'smallfire')
            }
        })
    }
    sparku(spark, plant)
    {
        plant.data.set('ignites', true)
        spark.destroy(true,true)
        this.firestart(fire, plants)
    }
    



    rand(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
      }
}