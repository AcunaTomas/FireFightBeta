import Phaser from 'phaser'
import bomber from './control_the_bomber'
import { sharedInstance as eventards }  from './EventCenter' 
import TreeController from './control_the_trees'
import FireController from './control_the_fire'


export default class Lvl extends Phaser.Scene
{
    private scn!: number
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
    private psnd
    private timer
    private winc
    private losec
    private spawntmr
    private wlchk
	constructor()
	{
		super('Lvl');

	}
    init(s)
    {
        this.scn = s.s
    }
    create()
    {
                //Creation - Camera, Physics Groups, Solid Objects, Controls
                this.sound.stopAll()
                this.mus = this.sound.add('game')
                this.mus.play()
                this.scene.launch('HUD',{s:this.scn})
                this.wlchk = false
                this.timer = this.time.delayedCall(120000, this.gameovr,[true],this)
                this.spawntmr = this.time.delayedCall(4000, this.startcheck,[true],this)
                this.cursors = this.input.keyboard.createCursorKeys()
                const walls = this.physics.add.staticGroup()
                const plants = this.physics.add.staticGroup()
                this.fire = this.physics.add.group()
                this.water = this.physics.add.group()
                const spark = this.physics.add.group()
                
                this.paused = false
                this.firesnd = this.sound.add('fire')
                this.psnd = this.sound.add('pstep')
                this.fires = []
                this.foreste = []

        
                //Load Tilemaps
                var mapx = this.make.tilemap({key: ('map' + this.scn)})
                const tilemapx = mapx.addTilesetImage('Tilemap2', 'Tilemap2', 128, 64)
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
        
                //Convert the data to usuable objects
                solid.forEachTile(tile =>  {
                    if (tile.properties.Rock == true)
                        {
                            var a = walls.create(tile.pixelX + 64, tile.pixelY + 32, 'rock' + (Math.floor(Math.random() * 3) + 1));
                            a.body.setSize(32, 48);
                            solid.removeTileAt(tile.x, tile.y);
                        }
                    })
                var trees = mapx.createFromObjects('Trees',{name : 'Tree', key: 'trecol'});
                plants.addMultiple(trees)
                plants.children.iterate(tree => {
                    tree.body.setSize(50,70)
                    this.foreste.push(new TreeController(this,tree))
                })
                plants.addMultiple(trees)
        
        
                //Find Spawn Locations and Level info
                var sp = mapx.findObject("Points", obj => obj.name === "sp");
                var wb = mapx.findObject("Points", obj => obj.name === "wp");
                console.log(sp)
                this.winc = sp.properties[1].value
                this.losec = sp.properties[0].value
                
                


        
                //Collision
                this.wshot = this.physics.add.sprite(sp.x,sp.y,'shoot');
                this.wshot2 = this.physics.add.sprite(sp.x,sp.y,'shooty');
                this.player = this.physics.add.sprite(sp.x,sp.y,'marselo');
                this.waterbott = this.physics.add.sprite(wb.x,wb.y, 'waterbot').setScale(0.5)
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
                eventards.on('end', this.gameovr,this)
                eventards.on('stop', this.stp,this)
    }
    update(delta, dt: number)
    {   //console.log(this.paused)
        if (this.paused == false)
        {
            this.time.paused = false
            this.physics.resume()
            this.anims.resumeAll()
            this.winlose()
            this.bomber?.update(dt)
            this.foreste.forEach(tree => tree.update(dt))
            this.fires.forEach(fire => fire.update(dt))
            this.coolcam.startFollow(this.player)
            console.log(this.fires.length)
        }
        else
        {
            this.physics.pause()
            this.anims.pauseAll()
            this.time.paused = true
        }


    }

    collectwat(wat,ply)
    {
        ply.destroy(true,true)
        eventards.emit('healthchanged', 50)     
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
        if (this.wlchk)
        {
            //console.log(this.losec)

            var alive = 0
            this.fires.forEach(function (fire)
            {
                if (fire.stateMachine.isCurrentState('burn'))
                {
                    alive += 1
                }
            }
            )
            eventards.emit('firecount', {a:alive,b:this.losec})
            if (alive >= this.losec)
            {
                this.gameovr(false)
            }
            if (alive <= this.winc)
            {
                this.gameovr(true)
            }
        }

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
    gameovr(a)
    {
        if (a)
        {
            eventards.emit('win')
            this.paused = true
            this.physics.pause()
            this.paused = true
            //this.time.paused = true
            
        }
        else
        {
            eventards.emit('lose')
            this.paused = true
            this.physics.pause()
            this.scene.stop('HUD')
            this.scene.start('gover',{s:this.scn})
        }



    }
    startcheck(a:boolean)
    {
        this.wlchk = a
    }
    stp()
    {
        this.scene.stop()
    }
}