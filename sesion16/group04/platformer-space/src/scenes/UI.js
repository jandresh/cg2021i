import Phaser from "phaser"
import { sharedInstance as events } from "./EventCenter"

export default class UI extends Phaser.Scene
{

	constructor()
	{
		super('ui')
	}

	init()
	{
		this.coinsCollected = 0
		this.lastHealth = 100
	}
	
	create()
	{

		this.graphics = this.add.graphics()
		this.setHealthBar(100)
		
		
		this.coinLabel = this.add.text(20, 35, 'Puntos: 0', {
			fontSize: '18px',
		})

		events.on('coin-collected', this.handleCoinCollected, this)
		events.on('health-changed', this.handleHealthChanged, this)

		this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
			events.off('coin-collected', this.handleCoinCollected, this)
		})
	}

	handleCoinCollected()
	{
		this.coinsCollected += 1
		this.coinLabel.text = `Puntos: ${this.coinsCollected}`
	}

	handleHealthChanged(v)
	{
		this.tweens.addCounter({
			from: this.lastHealth,
			to: v,
			duration: 200,
			onUpdate: tween => {
				const value = tween.getValue()
				this.setHealthBar(value)
			}
		})
		this.lastHealth = v
	}

	setHealthBar(v)
	{
		const width = 100
		const percent = Phaser.Math.Clamp(v, 0, 100) / 100
		
		this.graphics.clear()
		this.graphics.fillStyle(0x808080)
		this.graphics.fillRoundedRect(20,20, width, 5, 5)
		if (percent > 0)
		{
			this.graphics.fillStyle(0x00ff00)
			this.graphics.fillRoundedRect(20, 20, width * percent, 5, 5)
		}
	}
}