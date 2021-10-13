import Phaser from "phaser";
import { sharedInstance as events} from "./EventCenter";
import StateMachine from "../stateMachine/StateMachine";

export default class PlayerController
{
	constructor(scene, sprite, cursors)
	{
		this.scene = scene
		this.sprite = sprite
		this.cursors = cursors

		this.createAnimations()
		this.stateMachine = new StateMachine(this, 'player')
		this.health = 100


		this.stateMachine.addState('idle', {
			onEnter: this.idleOnEnter,
			onUpdate: this.idleOnUpdate
		})
		.addState('run', {
			onEnter: this.runOnEnter,
			onUpdate: this.runOnUpdate,
			onExit: this.runOnExit
		})
		.addState('jump', {
			onEnter: this.jumpOnEnter,
			onUpdate: this.jumpOnUpdate,
		})
		.addState('spike-hit', {
			onEnter: this.spikeHitOnEnter,

		})
		.addState('dead', {
			onEnter: this.deadOnEnter
		})
		.addState('level-up', {
			onEnter: this.levelUpOnEnter,
		})
		.addState('win', {
			onEnter: this.winOnEnter
		})

		.setState('idle')

		this.sprite.setOnCollide((data) => {

			if (data.bodyB.label === 'coin')
            {
                const coin = data.bodyB
				//coin.gameObject.play('coin-pick', )
                events.emit('coin-collected')
				coin.gameObject.destroy()
				
				this.scene.playAudio(this.scene.coinSound)
				
				this.scene.coinEmitter.emitParticleAt(
					this.sprite.x,
					this.sprite.y,
					100
				)
            }
			if (data.bodyB.label === 'spike' || data.bodyA.label === 'spike')
			{
				this.setHealth(-10)
			}
			else if (data.bodyB.label === 'chainsaw' || data.bodyA.label === 'chainsaw')
			{
				this.setHealth(-20)
			}
			else if (data.bodyB.label === 'goal' || data.bodyA.label === 'goal')
			{
				this.stateMachine.setState('level-up')
			}
			else if (data.bodyB.label === 'exit' || data.bodyA.label === 'exit')
			{
				this.stateMachine.setState('win')
			}
			else 
			{
				if (this.stateMachine.isCurrentState('jump'))
				{
					this.stateMachine.setState('idle')
				}
			}
		})
	}

	update(dt) 
	{
		this.stateMachine.update(dt)
	}

	setHealth(value)
	{
		this.health = Phaser.Math.Clamp(this.health + value, 0, 100)
		this.sprite.play('player-hit')
		events.emit('health-changed', this.health)

		if (this.health <= 0)
		{
			this.stateMachine.setState('dead')
		}
		else
		{
			this.stateMachine.setState('spike-hit')
		}
	}

	idleOnEnter() { this.sprite.play('player-idle')}
	idleOnUpdate() {
		if (this.cursors.left.isDown || this.cursors.right.isDown)
		{
			this.stateMachine.setState('run')
		}
		else if (this.cursors.up.isDown)
		{
			this.scene.cameras.main.pan(this.sprite.x, this.sprite.y - 20, 2000, 'Back')
		}
		else if (this.cursors.down.isDown)
		{
			this.scene.cameras.main.pan(this.sprite.x, this.sprite.y + 20, 2000, 'Back')
		}

		const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space)
		if (spaceJustPressed)
		{
			this.stateMachine.setState('jump')
		}
	}

	runOnEnter() { this.sprite.play('player-run') }
	runOnUpdate()
	{
		const speed = 2

		const spaceJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space)
		if (spaceJustPressed)
		{
			this.stateMachine.setState('jump')
		}

        if (this.cursors.left.isDown)
        {
            this.sprite.flipX = true
            this.sprite.setVelocityX(-speed)
        } 
        else if (this.cursors.right.isDown)
        {
            this.sprite.flipX = false
            this.sprite.setVelocityX(speed)
        }
        else
        {
            this.sprite.setVelocityX(0)
			this.stateMachine.setState('idle')
        }
	}
	runOnExit() { this.sprite.stop() }

	jumpOnEnter() { this.sprite.setVelocityY(-5) }
	jumpOnUpdate() {
		const speed = 4

		if (this.cursors.left.isDown)
		{
			this.sprite.flipX = true
			this.sprite.setVelocityX(-speed/2)
		}
		else if (this.cursors.right.isDown)
		{
			this.sprite.flipX = false
			this.sprite.setVelocityX(speed/2)
		}
	}

	spikeHitOnEnter()
	{
		this.sprite.setVelocityY(-4)

		const startColor = Phaser.Display.Color.ValueToColor(0xffffff)
		const endColor = Phaser.Display.Color.ValueToColor(0xff0000)

		this.scene.tweens.addCounter({
			from: 0,
			to: 100,
			duration: 100,
			repeat: 2,
			yoyo: true,
			onUpdate: tween => {
				const value = tween.getValue()
				const colorObj = Phaser.Display.Color.Interpolate.ColorWithColor(
					startColor,
					endColor,
					100,
					value
				)

				const color = Phaser.Display.Color.GetColor(
					colorObj.r,
					colorObj.g,
					colorObj.b
				)

				this.sprite.setTint(color)
			}
		})
		this.stateMachine.setState('idle')
	}

	levelUpOnEnter()
	{

		this.scene.playAudio(this.scene.lvlUpSound)

		this.scene.flareParticles.emitParticleAt(
			this.sprite.x,
			this.sprite.y,
			1500
		)

		this.scene.time.delayedCall(1500, () => {
			this.scene.scene.start('level2')
		})
	}

	winOnEnter()
	{
		const { width, height } = this.scene.scale
		this.scene.playAudio(this.scene.winSound)

		this.sprite.play('player-dissapear')

		this.scene.flareEmitter.setScale(
			{ start: 0.6, end: 0, ease: 'Power3'}
		)

		this.scene.flareEmitter.setPosition(
			{start: this.sprite.x, end: width*2, steps: 256},
			{start: this.sprite.y, end: -100, steps:256}
		)

		this.scene.time.delayedCall(2000, () => {
			this.scene.scene.start('win-screen')
		})
	}

	deadOnEnter()
	{
		this.scene.time.delayedCall(1000, () => {
			this.scene.scene.start('game-over')
		})
	}

	createAnimations()
	{
		this.sprite.anims.create({
            key: 'player-run',
            frameRate: 12,
            frames: this.sprite.anims.generateFrameNames('guy', { start: 0, end: 10 }),
            repeat: -1,
        })

        this.sprite.anims.create({
            key: 'player-idle',
            frameRate: 12,
            frames: this.sprite.anims.generateFrameNames('guy-idle', { start: 0, end: 10 }),
            repeat: -1,
        })

        this.sprite.anims.create({
            key: 'player-jump',
            frameRate: 1,
            frames: this.sprite.anims.generateFrameNames('guy-jump', { start: 0, end: 0}),
            repeat: 1
        })

        this.sprite.anims.create({
            key: 'player-fall',
            frameRate: 1,
            frames: this.sprite.anims.generateFrameNames('guy-fall', { start: 0, end: 0}),
            repeat: 1
        })

		this.sprite.anims.create({
            key: 'player-hit',
            frameRate: 12,
            frames: this.sprite.anims.generateFrameNames('guy-hit', { start: 0, end: 4}),
            repeat: -1
        })
		
		this.sprite.anims.create({
			key: 'player-dissapear',
			frameRate: 7,
			frames: this.sprite.anims.generateFrameNames('dissapear')
		})
	}
}