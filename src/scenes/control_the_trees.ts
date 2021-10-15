import Phaser from 'phaser'
import StateMachine from '../statemachine/StateMachine'
import FireController from './control_the_fire'
import { sharedInstance as events } from './EventCenter'

export default class TreeController
{
    private scene: Phaser.Scene
    private tree: Phaser.Physics.Arcade.Sprite
    private stateMachine: StateMachine

    constructor(scene: Phaser.Scene, sprite: Phaser.Physics.Arcade.Sprite)
    {
        this.scene = scene
        this.tree = sprite
        this.stateMachine = new StateMachine(this, 'tree')
        this.tree.anims.play('tree' + (Math.floor(Math.random() * 3) + 1))
        this.stateMachine.addState('ignites', {
            onEnter: this.startFire,
		})
        .addState('treeidle', {
            onEnter: this.idlEnter,
            onUpdate: this.idleUpdate
		}).addState('burn', {
            onUpdate: this.burnupdate,
            onExit: this.burnexit
		})
        this.stateMachine.setState('ignites')
    }

    update(dt: number)
    {
        this.stateMachine.update(dt)
    }
    private startFire()
    {
        if (this.tree.data.values.ignites == true)
        {
            const f = this.scene.fire.create(this.tree.x, this.tree.y, 'fireidle')
            f.setInteractive()
            f.setScale(0.5)
            this.scene.fires.push(new FireController(this.scene, f))
            this.stateMachine.setState('burn')
        }
        else
        {
            this.stateMachine.setState('treeidle')
        }
    }

    private idlEnter()
    {

    }

    private idleUpdate()
    {
        this.tree
    }
    private burnupdate()
    {
        this.tree
    }
    private burnexit()
    {

    }

}