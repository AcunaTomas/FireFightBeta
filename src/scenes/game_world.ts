import Phaser from 'phaser'
import {scene} from './menu'
import bomber from './control_the_bomber'
import { sharedInstance as eventards }  from './EventCenter' 
import TreeController from './control_the_trees'
import FireController from './control_the_fire'


export default class Lvl extends Phaser.Scene
{
    private player?: Phaser.Physics.Arcade.Sprite
    private fires: FireController[] = []
    private foreste: TreeController[] = []
    private bomber?: bomber
    private pointer?: Phaser.Input.Pointer
    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys
    private coolcam: Phaser.Cameras.Scene2D.Camera | undefined
    private fire: Phaser.Physics.Arcade.Group
    private water: Phaser.Physics.Arcade.Sprite
    private wshot: Phaser.Physics.Arcade.Sprite
    private wshot2: Phaser.Physics.Arcade.Sprite
    private paused!: Boolean
    private firesnd
    private mus
    private waterbott
	constructor()
	{
		super('Lvl');
	}

    create()
    {
                //Creation - Camera, Physics Groups, Solid Objects, Controls
                this.sound.stopAll()
                this.mus = this.sound.add('game')
                this.mus.play()
                this.scene.launch('HUD')
                this.cursors = this.input.keyboard.createCursorKeys()
                const walls = this.physics.add.staticGroup()
                const plants = this.physics.add.staticGroup()
                this.fire = this.physics.add.group()
                this.water = this.physics.add.group()
                const spark = this.physics.add.group()

                this.paused = false
                this.firesnd = this.sound.add('fire')

                this.fires = []
                this.foreste = []
        
                //Load Tilemaps
                var mapx = this.make.tilemap({key: ('map' + scene.toString())})
                const tilemapx = mapx.addTilesetImage('Tilemap' + scene.toString(), 'Tilemap' + scene.toString(), 128, 64)
                var treemap = mapx.addTilesetImage('Trees', 'Treeset', 70,126)
                
        
        
                //Get the camera bounds based of the map's width and height
                const mapsizex = mapx.widthInPixels
                const mapsizey = (mapx.heightInPixels)/2
                
                this.coolcam= this.cameras.main;
                this.cameras.main.setBounds(0,0,mapsizex,mapsizey);
        
        
                
                //Parse Level Data and Objects
                const level = mapx.createLayer('Ground', tilemapx);
                level.setCollisionByProperty({collides : true});
                var solid = mapx.createLayer('Solid', tilemapx);
        
        
                solid.forEachTile(tile =>  {
                    if (tile.properties.Rock == true)
                        {
                            var a = walls.create(tile.pixelX + 64, tile.pixelY + 32, 'rock' + (Math.floor(Math.random() * 3) + 1));
                            a.body.setSize(32, 48);
                            solid.removeTileAt(tile.x, tile.y);
                        }
                    })
                var trees = mapx.createFromObjects('Trees',{name : 'Tree', key: 'trecol'});
                trees.forEach(tree => {
                    this.foreste.push(new TreeController(this,tree))
                })
                plants.addMultiple(trees)

                console.log(walls)
        
        
                var sp = mapx.findObject("Points", obj => obj.name === "sp");
                var wb = mapx.findObject("Points", obj => obj.name === "wp");
                console.log(sp)
                
                //Controls
        


        
                //Collision
                this.wshot = this.physics.add.sprite(sp.x,sp.y,'shoot');
                this.wshot2 = this.physics.add.sprite(sp.x,sp.y,'shooty');
                this.player = this.physics.add.sprite(sp.x,sp.y,'marselo');
                this.waterbott = this.physics.add.sprite(wb.x,wb.y, 'wsbutton').anims.play('walk')
                this.pointer = this.input.activePointer;
                this.bomber = new bomber(
                    this,
                    this.player,
                    this.cursors,
                    this.pointer,
                    this.wshot,
                    this.wshot2
                )
                this.player.setScale(0.6)
                //Colliders
                //this.physics.add.collider(this.player, level);
                this.physics.add.collider(this.player, walls);
                this.physics.add.collider(this.player, plants);
                this.physics.add.overlap(this.wshot, this.fire,this.killfire, null, this);
                this.physics.add.overlap(this.wshot2, this.fire,this.killfire, null, this);
                this.physics.add.overlap(this.player, this.waterbott, this.collectwat, null, this)
                //this.physics.add.overlap(spark, plants, this.sparku, null, this);
                eventards.on('unpause', this.resume,this)
                eventards.on('pause', this.pause,this)
    }
    update(delta, dt: number)
    {   console.log(this.paused)
        if (this.paused == false)
        {
            this.physics.resume()
            this.winlose()
            this.bomber?.update(dt)
            this.foreste.forEach(tree => tree.update(dt))
            this.fires.forEach(fire => fire.update(dt))
            this.coolcam.startFollow(this.player)
        }
        else
        {
            this.physics.pause()
        }


    }

    collectwat(wat,ply)
    {
        ply.destroy(true,true)
        
    }

    killfire(wshot, fire)
    {
        console.log(fire.x)
        var a: FireController[] | void[]
        for (let i = 0; i < this.fires.length; i++)
        {
            if (fire.x == this.fires[i].x  && fire.y == this.fires[i].y)
            {
               this.fires[i].stateMachine.setState('dead')

            }
        }
        
    }
    winlose()
    {

        var ded = 0
        var alive = 0
        this.fires.forEach(function (fire)
        {
            if (fire.stateMachine.isCurrentState('dead'))
            {
                ded += 1
            }
            if (fire.stateMachine.isCurrentState('burn'))
            {
                alive += 1
            }
        }
        )
        if (alive >= this.foreste.length - 6)
        {
            eventards.emit('lose')
            this.physics.pause()
            this.paused = true
            this.scene.restart()
        }
        if (ded >= this.fires.length)
        {
            eventards.emit('lose')
            console.log('win')
            this.physics.pause()
            this.paused = true
            this.scene.restart()
        }
        //console.log(ded)
    }

    resume()
    {
        this.paused = false
    }
    pause()
    {
        this.paused = true
        console.log(this.paused)
    }
}