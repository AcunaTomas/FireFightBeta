import Phaser from 'phaser'
import { sharedInstance as events } from './EventCenter'
import { getPhrase } from '../services/translations'

export default class HUD extends Phaser.Scene
{
	private scn
	private starsLabel!: Phaser.GameObjects.Text
	private starsCollected = 0
	private graphics!: Phaser.GameObjects.Graphics
    private pausemenu!: Phaser.Physics.Arcade.Image
    private pausebut!: Phaser.Physics.Arcade.Image
	private menbut!: Phaser.Physics.Arcade.Image
	private watertxt!: Phaser.GameObjects.Text
	private timetxt!: Phaser.GameObjects.Text
    private resbut!: Phaser.Physics.Arcade.Image
	private wsbut!: Phaser.Physics.Arcade.Sprite
	private an!: boolean
	private txt1!: Phaser.GameObjects.Text
	private txt2!: Phaser.GameObjects.Text
	private c!: number
	private endlvl!: boolean
	private p: boolean
	private decor
	private decortxt
	private firetxt
	private dfire
	constructor() 
	{
		super('HUD')
	}

    init(s)
    {
		
		this.scn = s.s
		this.c = 0
		this.an = false
		this.p = false
		this.endlvl = false
		this.add.image(75,20,'options').setScale(0.4)
		this.add.image(75,57,'options').setScale(0.4)
		this.add.image(75,97,'options').setScale(0.4)
        this.pausemenu = this.physics.add.image(653,100, 'prope').setVisible(false)
		this.decor = this.physics.add.image(660,100, 'play').setVisible(false)
		this.decortxt = this.add.text(600,85, getPhrase('Pause'), { fontFamily:'Wood', fontSize: '72px', fill: '#663300' }).setVisible(false)
		this.pausebut = this.physics.add.image(1230,30, 'pausebutton')
		this.menbut = this.physics.add.image(660,247, 'play').setVisible(false)
		this.resbut = this.physics.add.image(640,347, 'options').setVisible(false)
		this.wsbut = this.physics.add.sprite(1180,128, 'wsbutton')
		this.add.image(45,25,'wicon')
		this.dfire = this.add.image(45,100,'ficon')
		this.watertxt = this.add.text(40,13, '    : 100', { fontFamily:'Wood', fontSize: '28px', fill: '#663300' })
		this.timetxt = this.add.text(40,50, 'Time:', { fontFamily:'Wood', fontSize: '28px', fill: '#663300' })
		this.firetxt = this.add.text(80,90, '', { fontFamily:'Wood', fontSize: '28px', fill: '#663300' })
		this.txt1 = this.add.text(600,227, 'Menu', { fontFamily:'Wood', fontSize: '72px', fill: '#663300' }).setVisible(false)
		this.txt2 = this.add.text(560,327, getPhrase('Continue'), { fontFamily:'Wood', fontSize: '72px', fill: '#663300' }).setVisible(false)
		this.wsbut.anims.play('shootb')
		this.pausemenu.setInteractive()
		this.pausebut.setInteractive()
		this.resbut.setInteractive()
		this.menbut.setInteractive()
		this.wsbut.setInteractive()
		this.resbut.on('pointerdown', this.unpause,this)
		this.pausebut.on('pointerdown', this.pause,this)
		this.wsbut.on('pointerdown', this.walkshoothandler, this)
		this.menbut.on('pointerdown',this.menu,this)

		events.on('waterchange', this.hudpdate, this)
		events.on('win', this.lvlend, this)
		events.on('lose', this.shutdown, this)
		events.on('firecount',this.drawfire,this)
		events.on('hudupdate', this.walkshoothandler, this)
    }

	update() //Update loop, mostly to keep track of the time
	{
		if (!this.p)
		{
			this.c += 17
			if (this.c < 10000)
			{
			this.timetxt.setText('Time: ' + this.c.toString().substring(0,1))
			}
			else if (this.c < 100000)
			{
				this.timetxt.setText('Time: ' + this.c.toString().substring(0,2))
			}
			else
			{
				this.timetxt.setText('Time: ' + this.c.toString().substring(0,3))
			}

		}

	}
	drawfire(a) //Draws fire counter
	{
		this.firetxt.setText(a.a + '/' + a.b)
		this.dfire.setScale(a.a/a.b + 0.5)
	}
	pause() //pauses the game
	{
		if (this.endlvl)
		{
		}
		else
		{
			this.decor.setVisible(true)
			this.decortxt.setVisible(true)
			this.p = true
			this.pausemenu.setVisible(true)
			this.menbut.setVisible(true)
			this.resbut.setVisible(true)
			this.pausebut.removeInteractive()
			this.wsbut.removeInteractive()
			this.txt1.setVisible(true)
			this.txt2.setVisible(true)
			events.emit('pause')
		}

	}
	unpause() //unpauses the game
	{
		if (this.endlvl)
		{
			this.p = true
			this.nextlvl()
		}
		else
		{
			this.p = false
			this.decor.setVisible(false)
			this.decortxt.setVisible(false)
			this.pausemenu.setVisible(false)
			this.menbut.setVisible(false)
			this.resbut.setVisible(false)
			this.txt1.setVisible(false)
			this.txt2.setVisible(false)
			this.pausebut.setInteractive()
			this.wsbut.setInteractive()

			events.emit('unpause')
		}

	}
	walkshoothandler(a) //The mode change button
	{
		//console.log('mode changed')
		if (a != true)
		{
			events.emit('bstatechange', false)
		}
		if (this.an == false)
		{
			console.log('a')
			this.wsbut.anims.play('walk')
			this.an = true
		}
		else
		{
			console.log('b')
			this.wsbut.anims.play('shootb')
			this.an = false
		}
	}
	menu() //Opens the menu
	{
		events.emit('stop')
		this.scene.start('menu')
	}
	hudpdate(health) //Updates the water
	{
		this.watertxt.setText('    : ' + health)
	}

	lvlend() //Shows the level end options
	{
		this.pausemenu.setVisible(true)
		this.menbut.setVisible(true)
		this.resbut.setVisible(true)
		this.txt1.setVisible(true)
		this.txt2.setVisible(true)
		this.txt2.setText(getPhrase('Continue'))
		this.decor.setVisible(true)
		this.decortxt.setVisible(true)
		this.decortxt.setText(getPhrase('Win'))
		this.sound.stopAll()
		this.sound.play('vic')
		this.endlvl = true
		this.p = true
	}
	shutdown() //shutsdown everything
	{
		events.emit('stop')

	}
	nextlvl() //The win menu
	{
		events.emit('stop')
		this.scn+=1
		this.an = false
		if(this.scn > 5)
		{
			this.scene.start('menu')
		}
		else
		{
			this.scene.start('hello-world', {s:this.scn})
		}

	}
}