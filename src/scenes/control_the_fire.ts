import Phaser from 'phaser'
import StateMachine from '../statemachine/StateMachine'
import bomber from './control_the_bomber'
import { sharedInstance as events } from './EventCenter'




export default class FireController
{
    private scene: Phaser.Scene
    private sprite: Phaser.Physics.Arcade.Sprite
    public x = 0
    public y = 0
    public stateMachine: StateMachine
	private health = 100
    private timer = 0
    private spreadtime = 5000

	constructor(scene: Phaser.Scene, sprite: Phaser.Physics.Arcade.Sprite)
	{
		this.scene = scene
		this.sprite = sprite
        this.x = this.sprite.x
        this.y = this.sprite.y
		//this.createAnimations()

		this.stateMachine = new StateMachine(this, 'fire')
        this.sprite.setInteractive().on('pointerdown', () => this.firepressed(this) ) //pass this fire as argument for distance check

		this.stateMachine.addState('burn', {
			onUpdate: this.burnOnUpdate,
            onExit: this.burnOnExit
		})
		.addState('dead', {
			onEnter: this.deadOnEnter
		})
        .addState('ignites', {
            onEnter: this.igniteOnEnter,
            onExit: this.igniteOnExit
        })
		.setState('burn')
    }

	update(dt: number)
	{
		this.stateMachine.update(dt)
	}


    private burnOnUpdate()
    {
        if (this.timer < this.spreadtime)
        {
            this.timer = this.timer + 17
            console.log(this.timer)
        }
        else
        {
            this.timer = 0
            var fi = false
            this.scene.foreste.forEach(tree => {
                //console.log(tree.tree.x)
                //console.log(Phaser.Math.Distance.Between(this.sprite.x, this.sprite.y, tree.tree.x, tree.tree.y))
                //console.log(tree.stateMachine.currentState.name)
                if (Phaser.Math.Distance.Between(this.sprite.x, this.sprite.y, tree.tree.x, tree.tree.y) < 100 && fi == false)
                {

                    if (Phaser.Math.Distance.Between(this.sprite.x, this.sprite.y, tree.tree.x, tree.tree.y) > 0 && tree.stateMachine.currentState.name == 'treeidle')
                    {
                        tree.tree.data.values.ignites = true
                        tree.stateMachine.setState('ignites')
                        fi = true
                    }

                }
            });
        }


    }
    private burnOnExit()
    {

    }

    deadOnEnter()
    {
        this.sprite.destroy()
    }

    private igniteOnEnter()
    {

    }

    private igniteOnExit()
    {

    }

    private firepressed(firecontroller: this)
    {
        console.log(firecontroller.sprite)
        console.log(firecontroller.scene.player)
        if (Phaser.Math.Distance.Between(this.sprite.x, this.sprite.y, firecontroller.scene.player.x, firecontroller.scene.player.y) < 200)
        {
            firecontroller.scene.player.firex = this.sprite.x
            firecontroller.scene.player.firey = this.sprite.y
            events.emit('shoot')
        }
    }

}