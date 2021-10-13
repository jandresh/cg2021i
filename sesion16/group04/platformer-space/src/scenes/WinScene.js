import Phaser from "phaser";

export default class WinScene extends Phaser.Scene
{
	constructor()
	{
		super('win-screen')
	}

	create()
	{
		const { width, height } = this.scale

		this.add.text(width*0.5, height*0.3, '¡Has ganado!',
		{
			fontSize: '32px',
			color: '#ffffff'
		})
		.setOrigin(0.5)

		const button = this.add.rectangle(width * 0.5, height * 0.7, 150, 75, 0xffffff)
			.setInteractive()
			.on(Phaser.Input.Events.GAMEOBJECT_POINTER_UP, () => {
				this.scene.sendToBack('parallax-scene')
				this.scene.start('hello-world')
			})
		
			this.add.text(button.x, button.y, 'Jugar de nuevo', {
				color: '#000000',
			})
			.setOrigin(0.5)
			.setResolution(720)
	}
}