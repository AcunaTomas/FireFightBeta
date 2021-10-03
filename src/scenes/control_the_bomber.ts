import { Vector } from 'matter'
import Phaser from 'phaser'
import StateMachine from '../statemachine/StateMachine'
import { sharedInstance as events } from './EventCenter'

type CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys
export default class bomber
{
	private scene: Phaser.Scene
	private sprite: Phaser.Physics.Arcade.Sprite
	private cursors: CursorKeys
	private pointer: Phaser.Input.Pointer
	private stateMachine: StateMachine
	private watershoot: Phaser.Physics.Arcade.Sprite
	private watershooty: Phaser.Physics.Arcade.Sprite
	private health = 100
	private mx = 0
	private my = 0
	private shootime = 3000
	private firex = 0
	private firey = 0

	constructor(scene: Phaser.Scene,sprite: Phaser.Physics.Arcade.Sprite, cursors: CursorKeys, pointer: Phaser.Input.Pointer, watershoot:Phaser.Physics.Arcade.Sprite, watershooty:Phaser.Physics.Arcade.Sprite )
	{
		this.scene = scene
		this.sprite = sprite
		this.cursors = cursors
		this.pointer = pointer
		this.watershoot = watershoot
		this.watershooty = watershooty
		this.watershoot.setScale(3.0).refreshBody()
		this.watershoot.setVisible(false)
		this.watershooty.setScale(3.0).refreshBody()
		this.watershooty.setVisible(false)
		this.createAnimations()
		this.stateMachine = new StateMachine(this, 'player')

		console.log(this.sprite.body.physicsType)

		this.stateMachine.addState('idle', {
			onEnter: this.idleOnEnter,
			onUpdate: this.idleOnUpdate
		})
		.addState('walk', {
			onEnter: this.walkOnEnter,
			onUpdate: this.walkOnUpdate,
			onExit: this.walkOnExit
		})
		.addState('dead', {
			onEnter: this.deadOnEnter
		})
		.addState('shoot', {
			onEnter: this.shoot,
			onUpdate: this.shootin
		})
		.setState('idle')

		events.on('shoot', this.shoot,this)
	}

	update(dt: number)
	{
		this.stateMachine.update(dt)
	}

	private setHealth(value: number)
	{
		this.health = Phaser.Math.Clamp(value, 0, 100)

		events.emit('health-changed', this.health)
		// TODO: check for death
		if (this.health <= 0)
		{
			this.stateMachine.setState('dead')
		}
	}

	private idleOnEnter()
	{
		//this.sprite.play('player-idle')
	}

	private idleOnUpdate()
	{
		if (this.pointer.isDown && this.scene.input.activePointer.getDuration() < 100)
		{
			this.stateMachine.setState('walk')
			console.log('point')
		}

	}

	private walkOnEnter()
	{
		//this.sprite.play('player-walk')
		this.mx = this.pointer.worldX
		this.my = this.pointer.worldY
		this.scene.physics.moveTo(this.sprite, this.mx,this.my, 200)
		if (this.sprite.x > this.mx)
		{
			this.sprite.flipX = true
		}
		else
		{
			this.sprite.flipX = false
		}
	}

	private walkOnUpdate()
	{
		console.log(this.sprite.body.facing)
		if (Phaser.Math.Distance.Between(this.sprite.x, this.sprite.y, this.mx, this.my) < 3)
		{
			this.stateMachine.setState('idle')
		}
		if (!this.sprite.body.touching.none)
		{
			this.stateMachine.setState('idle')
		}
	}

	private walkOnExit()
	{
		this.sprite.body.stop()
		//this.sprite.setVelocity(0,0)
	}

	private deadOnEnter()
	{
		//this.sprite.play('player-death')

		this.scene.time.delayedCall(1500, () => {
			this.scene.scene.start('game-over')
		})
	}
	private shoot()
	{
		this.stateMachine.setState('shoot')
	}
	private shootin()
	{
		this.shootime += -17
		if (this.shootime > 0)
		{
			this.watershoot.setVisible(true)
			if (this.sprite.x > this.pointer.worldX)
			{	this.watershooty.x = -100
				this.watershooty.y = -100
				this.watershooty.setVisible(false)
				this.watershoot.x = this.sprite.x + -72
				this.watershoot.y = this.sprite.y + 24
				this.watershoot.flipX = true
				if (this.sprite.flipX)
				{

				}
				else
				{
					this.sprite.flipX = true
				}
			}
			else if (this.sprite.x < this.pointer.worldX)
			{	this.watershooty.x = -100
				this.watershooty.y = -100
				this.watershooty.setVisible(false)
				this.watershoot.x = this.sprite.x + 72
				this.watershoot.y = this.sprite.y + 24
				this.watershoot.flipX = false
				if (this.sprite.flipX)
				{
					this.sprite.flipX = false
				}
				else
				{

				}
			}
			if( this.sprite.y - this.pointer.worldY > 44)
			{
				this.watershoot.x = -100
				this.watershoot.y = -100
				this.watershoot.setVisible(false)
				this.watershooty.setVisible(true)
				this.watershooty.x = this.sprite.x 
				this.watershooty.y = this.sprite.y - 74
				this.watershooty.flipY = false
			}
			else if (this.sprite.y - this.pointer.worldY < -44)
			{
				this.watershoot.x = -100
				this.watershoot.y = -100
				this.watershoot.setVisible(false)
				this.watershooty.setVisible(true)
				this.watershooty.x = this.sprite.x 
				this.watershooty.y = this.sprite.y + 74
				this.watershooty.flipY = true
			}
			
		}
		else
		{
			this.stateMachine.setState('idle')
			this.scene.water.clear(true,true)
			this.shootime = 3000
			this.watershoot.x = -100
			this.watershoot.y = -100
			this.watershoot.setVisible(false)
			this.watershooty.x = -100
			this.watershooty.y = -100
			this.watershooty.setVisible(false)

		}
	}
	private createAnimations()
	{

	}
}
