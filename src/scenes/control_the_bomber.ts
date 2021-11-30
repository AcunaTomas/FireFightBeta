import Phaser from 'phaser'
import StateMachine from '../statemachine/StateMachine'
import { sharedInstance as events } from './EventCenter'

//type CursorKeys = Phaser.Types.Input.Keyboard.CursorKeys
export default class bomber
{
	private scene: Phaser.Scene
	private sprite: Phaser.Physics.Arcade.Sprite
	private cursors: Phaser.Input.Keyboard.Key
	private pointer: Phaser.Input.Pointer
	private stateMachine: StateMachine
	private watershoot: Phaser.Physics.Arcade.Sprite
	private watershooty: Phaser.Physics.Arcade.Sprite
	private health = 100
	private mx = 0
	private my = 0
	private shootime = 1500
	private mode = false
	private firex = 0
	private firey = 0
	private pollinput = false

	constructor(scene: Phaser.Scene,sprite: Phaser.Physics.Arcade.Sprite, cursors: CursorKeys, pointer: Phaser.Input.Pointer, watershoot:Phaser.Physics.Arcade.Sprite, watershooty:Phaser.Physics.Arcade.Sprite )
	{
		console.log('Bombero deployed')
		this.scene = scene
		this.sprite = sprite
		this.cursors = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
		this.pointer = pointer
		this.pollinput = false
		this.watershoot = watershoot
		this.watershooty = watershooty
		this.watershoot.setScale(1.1,1.4).refreshBody()
		this.watershoot.setVisible(false)
		this.watershooty.setScale(1.4,1.1).refreshBody()
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
			onEnter: this.del
		})
		.addState('shoot', {
			onEnter: this.shoot,
			onUpdate: this.shootin
		})
		.setState('idle')
		this.sprite.anims.play('pidle')
		events.on('shoot', this.shoot,this)
		events.on('bstatechange', this.vschange,this)
		events.on('healthchanged', this.changehealth, this)
		events.on('pause', ()=> this.pollinput = false, this)
		events.on('unpause', ()=> this.scene.time.delayedCall(600, ()=> this.pollinput = true), this)
		events.on('win', this.del, this)
		events.on('lose', this.del, this)
		this.scene.time.delayedCall(150, ()=> {this.pollinput = true})
	}

	update(dt: number)
	{
		this.stateMachine.update(dt)
	}


	private idleOnEnter()
	{
		//console.log(this.sprite)
		if (this.health <= 0)
		{
			events.emit('end')
		}
	}

	private idleOnUpdate() //checks for input
	{
		if (Phaser.Input.Keyboard.JustDown(this.cursors) && this.pollinput)
		{
			events.emit('bstatechange', true)
			console.log('bomberman deployed')

		}
		if (this.pointer.isDown && this.pollinput && this.scene.input.activePointer.getDuration() < 100)
		{
			if (this.mode == false)
			{
				this.stateMachine.setState('walk')
				//console.log('point')
			}
			else
			{
				events.emit('shoot')
				//console.log('shoot')
				
			}

		}

	}

	private walkOnEnter() //moves the player
	{
		this.scene.psnd.play()
		this.sprite.play('pwalk')
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

	private walkOnUpdate() //Stops the player if they reach their destination or gets stopped by an obstacle
	{
		//console.log(this.sprite.body.facing)

		if (Phaser.Math.Distance.Between(this.sprite.x, this.sprite.y, this.mx, this.my) < 3)
		{
			this.sprite.play('pidle')
			this.scene.psnd.stop()
			this.stateMachine.setState('idle')
		}
		if (!this.sprite.body.touching.none)
		{
			this.sprite.play('pidle')
			this.scene.psnd.stop()
			this.stateMachine.setState('idle')
		}

	}

	private walkOnExit()
	{
		this.sprite.setVelocity(0)
		//this.sprite.setVelocity(0,0)
	}

	private shoot()
	{
		if (this.mode)
		{
			if (this.health > 0)
			{
				this.stateMachine.setState('shoot')
				this.health += -5
				this.scene.sound.play('waters')
			}
			else
			{
				this.stateMachine.setState('idle')
			}

		}
		else
		{
			this.stateMachine.setState('idle')
		}

	}
	private shootin() //shoots in a direction based on the pointer's location, for about 1.5s
	{
		this.shootime += -17
		events.emit('waterchange', this.health)
		if (this.shootime > 0)
		{


			this.watershoot.setVisible(true)
			if (this.sprite.x > this.pointer.worldX)
			{	
				this.sprite.anims.play('pidle')
				this.watershooty.x = -100
				this.watershooty.y = -100
				this.watershooty.setVisible(false)
				this.watershoot.x = this.sprite.x + -102
				this.watershoot.y = this.sprite.y + 10
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
			{	
				this.sprite.anims.play('pidle')
				this.watershooty.x = -100
				this.watershooty.y = -100
				this.watershooty.setVisible(false)
				this.watershoot.x = this.sprite.x + 102
				this.watershoot.y = this.sprite.y + 10
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
				this.sprite.anims.play('psu')
				this.watershoot.x = -100
				this.watershoot.y = -100
				this.watershoot.setVisible(false)
				this.watershooty.setVisible(true)
				this.watershooty.x = this.sprite.x 
				this.watershooty.y = this.sprite.y - 104
				this.watershooty.flipY = false
			}
			else if (this.sprite.y - this.pointer.worldY < -44)
			{
				this.sprite.anims.play('psd')
				this.watershoot.x = -100
				this.watershoot.y = -100
				this.watershoot.setVisible(false)
				this.watershooty.setVisible(true)
				this.watershooty.x = this.sprite.x 
				this.watershooty.y = this.sprite.y + 104
				this.watershooty.flipY = true
			}
			
		}
		else
		{

			this.stateMachine.setState('idle')
			this.scene.water.clear(true,true)
			this.shootime = 1500

			this.watershoot.x = -100
			this.watershoot.y = -100
			this.watershoot.setVisible(false)
			this.watershooty.x = -100
			this.watershooty.y = -100
			this.watershooty.setVisible(false)

		}
	}
	private createAnimations() //idk if I'll use this, seems like a waste of processing time
	{

	}
	private vschange(a) //switch firing modes
	{
		
		if (!this.mode)
		{
			this.mode = true

		}
		else
		{
			this.mode = false
		}
		if (a == true)
		{
			events.emit('hudupdate', a)
		}
		this.pollinput = false
		this.scene.time.delayedCall(100,()=> this.pollinput = true)
	}
	private del()
	{
		console.log('del')
		delete this.scene.bomber
	}
	private changehealth(health)
	{
		this.health += health
		this.scene.sound.play('pwup')
		events.emit('waterchange', this.health)
	}
}
