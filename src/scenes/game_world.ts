import Phaser from 'phaser'
import {scene} from './menu'
import bomber from './control_the_bomber'
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
	constructor()
	{
		super('Lvl')
	}

    create()
    {
                //Creation - Camera, Physics Groups, Solid Objects, Controls
                this.cursors = this.input.keyboard.createCursorKeys()
                const walls = this.physics.add.staticGroup()
                const plants = this.physics.add.staticGroup()
                this.fire = this.physics.add.group()
                this.water = this.physics.add.group()
                const spark = this.physics.add.group()
                
        
                //Load Tilemaps
                var mapx = this.make.tilemap({key: ('map' + scene.toString())})
                const tilemapx = mapx.addTilesetImage('Tilemap' + scene.toString(), 'Tilemap' + scene.toString(), 128, 64)
                var treemap = mapx.addTilesetImage('Trees', 'Treeset', 128,64)
                
        
        
                //Get the camera bounds based of the map's width and height
                const mapsizex = mapx.widthInPixels
                const mapsizey = (mapx.heightInPixels)/2
                
                this.coolcam= this.cameras.main;
                this.cameras.main.setBounds(0,0,mapsizex,mapsizey);
        
        
                
                //Parse Level Data and Objects
                const level = mapx.createLayer('Ground', tilemapx);
                level.setCollisionByProperty({collides : true});
                var solid = mapx.createLayer('Solid', tilemapx);
        
        
        
                var trees = mapx.createFromObjects('Trees',{name : 'Tree', key: 'Treeset'});
                trees.forEach(tree => {
                    this.foreste.push(new TreeController(this,tree))
                    if (tree.data.values.ignites == true)
                    {
                        //const f = this.fire.create(tree.x, tree.y, 'smallfire')
                        //f.setInteractive()
                        //this.fires.push(new FireController(this, f))
                    }
                })
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
        
                //HUD
                const combotext = this.add.text(16, 90, '', { fontSize: '28px', fill: '#000' });
                const timetext = this.add.text(40, 8, '', { fontSize: '28px', fill: '#000' });
                const ringtext = this.add.text(32, 50, '', { fontSize: '28px', fill: '#000' });
                const scoretext = this.add.text(8, 150, '', { fontSize: '28px', fill: '#000' });
                const livestext = this.add.text(32, 100, '', { fontSize: '28px', fill: '#000' });
        
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
        
                this.player = this.physics.add.sprite(sp.x,sp.y,'marselo');
                this.wshot = this.physics.add.sprite(sp.x,sp.y,'shoot');
                this.wshot2 = this.physics.add.sprite(sp.x,sp.y,'shooty');
                this.pointer = this.input.activePointer;
                this.bomber = new bomber(
                    this,
                    this.player,
                    this.cursors,
                    this.pointer,
                    this.wshot,
                    this.wshot2
                )
                this.player.setScale(0.8)
                //Colliders
                //this.physics.add.collider(this.player, level);
                this.physics.add.collider(this.player, walls);
                this.physics.add.collider(this.player, plants);
                this.physics.add.overlap(this.wshot, this.fire,this.killfire, null, this);
                this.physics.add.overlap(this.wshot2, this.fire,this.killfire, null, this);
                //this.physics.add.overlap(spark, plants, this.sparku, null, this);
    }
    update(delta, dt: number)
    {
        this.bomber?.update(dt)
        this.foreste.forEach(tree => tree.update(dt))
        this.fires.forEach(fire => fire.update(dt))
        this.coolcam.startFollow(this.player)
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
}