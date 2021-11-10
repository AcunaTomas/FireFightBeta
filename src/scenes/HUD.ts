import Phaser from 'phaser'
import { sharedInstance as events } from './EventCenter'
import { getPhrase } from '../services/translations'

export default class HUD extends Phaser.Scene
{
	private scn
	private starsLabel!: Phaser.GameObjects.Text
	private starsCollected = 0
	private graphics!: Phaser.GameObjects.Graphics
    private pausemenu: Phaser.Physics.Arcade.Image
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
    }

	update()
	{
		if (!this.p)
		{
			this.c += 17
			this.timetxt.setText('Time: ' + this.c.toString().substring(0,2))
		}

	}
	drawfire(a)
	{
		this.firetxt.setText(a.a + '/' + a.b)
		this.dfire.setScale(a.a/a.b)
	}
	pause()
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
			this.txt1.setVisible(true)
			this.txt2.setVisible(true)
			events.emit('pause')
		}

	}
	unpause()
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
			events.emit('unpause')
		}

	}
	walkshoothandler()
	{
		console.log('mode changed')
		events.emit('bstatechange')
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
	menu()
	{
		events.emit('stop')
		this.scene.start('menu')
	}
	hudpdate(health)
	{
		this.watertxt.setText('    : ' + health)
	}

	lvlend()
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
		this.endlvl = true
		this.p = true
	}
	shutdown()
	{
		events.emit('stop')

	}
	nextlvl()
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