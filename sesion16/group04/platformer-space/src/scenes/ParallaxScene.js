import Phaser from "phaser"

/**
 * @param {Phaser.Scene} scene
 */
const createAlligned = (scene, count, texture, scrollFactor, scaleFactor, init) => {
	const {width, height} = scene.scale
	
	let x = init
	for (let i = 0; i < count; i++)
	{
		const foo = scene.add.image(x, height*0.5, texture)
			.setScrollFactor(scrollFactor)
			.setScale(scaleFactor)
		

		x += width
	}
}

export default class ParallaxScene extends Phaser.Scene
{
	constructor()
	{
		super('parallax-scene')
	}

	preload()
	{
		this.load.image('background', 'src/assets/img/layers/parallax-space-background.png')
		this.load.image('stars', 'src/assets/img/layers/parallax-space-stars.png')
		this.load.image('far-planets', 'src/assets/img/layers/parallax-space-far-planets.png')
		this.load.image('ring-planet', 'src/assets/img/layers/parallax-space-ring-planet.png')
		this.load.image('planet', 'src/assets/img/layers/parallax-space-big-planet.png')
		
		this.cursors = this.input.keyboard.createCursorKeys()
		
	}

	create()
	{
		const {width, height} = this.scale
		this.add.image(width*0.5, height*0.5, 'background').setScale(2.2)
			.setScrollFactor(0)

		createAlligned(this, 10, 'stars', 0.25, 2, width*0.5 )
		createAlligned(this, 10, 'far-planets', 0.3, 1, width*0.5 )
		createAlligned(this, 10, 'ring-planet', 0.4, 1.2, width*0.2 )
		createAlligned(this, 10, 'planet', 0.45, 2, width*0.8 )
	}

	update()
	{
		const cam = this.cameras.main
		const speed = 1
		if (this.cursors.left.isDown)
		{
			cam.scrollX -= speed
		}
		else if (this.cursors.right.isDown)
		{
			cam.scrollX += speed
		}
	}
}