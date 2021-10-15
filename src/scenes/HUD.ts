import Phaser from 'phaser'
import { sharedInstance as events } from './EventCenter'

export default class HUD extends Phaser.Scene
{
	private starsLabel!: Phaser.GameObjects.Text
	private starsCollected = 0
	private graphics!: Phaser.GameObjects.Graphics
    private pausemenu!: Phaser.Physics.Arcade.Image
    private pausebut!: Phaser.Physics.Arcade.Image
	private menbut!: Phaser.Physics.Arcade.Image
	private watertxt!: Phaser.GameObjects.Text
    private resbut!: Phaser.Physics.Arcade.Image
	private wsbut!: Phaser.Physics.Arcade.Sprite
	constructor()
	{
		super('HUD')
	}

    init()
    {
        this.pausemenu = this.physics.add.image(700,389, 'pausewindow').setVisible(false)
		this.pausebut = this.physics.add.image(1230,30, 'pausebutton')
		this.menbut = this.physics.add.image(760,450, 'menubutton').setVisible(false)
		this.resbut = this.physics.add.image(640,450, 'resumebutton').setVisible(false)
		this.wsbut = this.physics.add.sprite(1220,680, 'wsbutton')
		this.watertxt = this.add.text(25,25, 'Water: 100', { fontSize: '28px', fill: '#FFF' })
		this.wsbut.anims.play('shootb')
		this.pausemenu.setInteractive()
		this.pausebut.setInteractive()
		this.resbut.setInteractive()
		this.menbut.setInteractive()
		this.wsbut.setInteractive()
		this.resbut.on('pointerdown', this.unpause,this)
		this.pausebut.on('pointerdown', this.pause,this)
		this.wsbut.on('pointerdown', this.walkshoothandler, this)

		events.on('waterchange', this.hudpdate, this)
    }

	pause()
	{
		this.pausemenu.setVisible(true)
		this.menbut.setVisible(true)
		this.resbut.setVisible(true)
		this.pausebut.removeInteractive()
		events.emit('pause')
	}
	unpause()
	{
		this.pausemenu.setVisible(false)
		this.menbut.setVisible(false)
		this.resbut.setVisible(false)
		this.pausebut.setInteractive()
		events.emit('unpause')
	}
	walkshoothandler()
	{
		console.log('mode changed')
		events.emit('bstatechange')
		if (this.wsbut.anims.getName() == 'shootb')
		{
			this.wsbut.anims.play('walk')
		}
		else if (this.wsbut.anims.getName() == 'walk')
		{
			this.wsbut.anims.play('shoot')
		}
	}
	hudpdate(health)
	{
		this.watertxt.setText('Water: ' + health)
	}
}