import Phaser from 'phaser'
import tilesImg from '../assets/img/sheet.png'
import map1JSON from '../assets/map1.json'

import PlayerController from './PlayerController'

export default class Scene1 extends Phaser.Scene
{
    constructor()
    {
        super('hello-world')
    }

    init()
    {
        this.cursors = this.input.keyboard.createCursorKeys()
        this.coins = []

        this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
			this.destroy()
		})
    }

    preload()
    {
        // load the png file
        this.load.image('tiles', tilesImg)

        // load the json file
        this.load.tilemapTiledJSON('tilemap', map1JSON)

        this.load.spritesheet('guy', 'src/assets/characters/Pink Man/Run (32x32).png', 
            { frameWidth: 32, frameHeight: 32}
        )
        this.load.spritesheet('guy-idle', 'src/assets/characters/Pink Man/Idle (32x32).png',
            { frameWidth: 32, frameHeight: 32}
        )
        this.load.spritesheet('guy-jump', 'src/assets/characters/Pink Man/Jump (32x32).png',
            { frameWidth: 32, frameHeight: 32}
        )
        this.load.spritesheet('guy-fall', 'src/assets/characters/Pink Man/Fall (32x32).png',
            { frameWidth: 32, frameHeight: 32}
        )
        this.load.spritesheet('guy-hit', 'src/assets/characters/Pink Man/Hit (32x32).png',
            { frameWidth: 32, frameHeight: 32}
        )

        this.load.spritesheet('coin', 'src/assets/img/coin_anim_strip_6.png',
            { frameWidth: 8, frameHeight: 8}
        )

        this.load.spritesheet('coin-pick', 'src/assets/img/coin_pickup_anim_strip_6.png',
            { frameWidth: 8, frameHeight: 8 }
        )

        this.load.atlas('flares', 'src/assets/particles/flares.png',
            'src/assets/particles/flares.json'
        )

        this.load.audio('ambient', 'src/assets/sfx/sound.wav')
        this.load.audio('losing', 'src/assets/sfx/losing.wav')
        this.load.audio('levelup', 'src/assets/sfx/levelup.wav')
        this.load.audio('coin', 'src/assets/sfx/coin.wav')
    }

    create()
    {
        this.scene.launch('ui')
        
        this.scene.launch('parallax-scene')
        this.scene.sendToBack('parallax-scene')
        this.createMiscAnimations()
        // create tilemap
        const map = this.make.tilemap({ key: 'tilemap' })

        // add the tileset image we are using
        const tileset = map.addTilesetImage('fondo', 'tiles')

        // create the layers we want in the right order
        const ground = map.createLayer('ground', tileset)
        ground.setCollisionByProperty({ collides: true })

        map.createLayer('obstacles', tileset)

        this.matter.world.convertTilemapLayer(ground)

        const objectsLayer = map.getObjectLayer('objects')
        objectsLayer.objects.forEach((objData) => {
            const {x, y, z, width, height, name, rotation} = objData
            switch(name)
            {
                case 'player-spawn':
                {
                    this.player = this.matter.add.sprite(x, y, 'guy')
                        .setScale(.7)
                        .setFixedRotation()
                        
                        this.playerController = new PlayerController(
                            this,
                            this.player,
                            this.cursors
                        )
                        this.cameras.main.startFollow(this.player, true)
                    break
                }
                case 'coin-spawn':
                {
                    this.coins.push(
                        this.matter.add.sprite(x, y, 'coin', undefined, {
                            isSensor: true,
                            isStatic: true,
                            label: 'coin',
                        })
                            .play('coin-idle')
                    )
                    break
                }
                case 'spikes':
                {
                    this.matter.add.rectangle(x + (width * 0.5), y + (height*0.5), width, height, {
                        isStatic: true,
                        label: 'spike'
                    })
                    
                    break
                }
                case 'ramp':
                {
                    this.matter.add.rectangle(x , y + (height*0.7), width, height, {
                        isStatic: true,
                        angle: rotation*(Math.PI/180)
                    })
                    break
                }
                case 'goal':
                {
                    this.matter.add.rectangle(x + (width*0.5), y + (height*0.5), width, height, {
                        isStatic: true,
                        isSensor: true,
                        label: 'goal'
                    })
                }
            }
        })

        // Add sounds
        this.music = this.sound.add('ambient', {
            volume: 0.2,
            loop: true
        })

        this.gameOverSound = this.sound.add('losing', {
            volume: 0.5
        })

        this.lvlUpSound = this.sound.add('levelup', {
            volumne: 0.7
        })

        this.coinSound = this.sound.add('coin', { volume: 0.3 })

        // Play ambient music
        this.playAudio(this.music)
        
        // Add particle emitters
        this.addParticles()
    }

    update(t, dt) 
    {
        if (!this.player)
        {
            return
        }
        this.playerController.update(dt)


        if (this.playerController.stateMachine.isCurrentState('dead'))
        {
            this.playAudio(this.gameOverSound)
        }
    }

    destroy() { 
        this.sound.stopByKey('ambient')
        this.scene.stop('ui') 
    }

    createMiscAnimations()
    {
        this.anims.create({
            key: 'coin-idle',
            frameRate: 10,
            frames: this.anims.generateFrameNames('coin', { start: 0, end: 5 }),
            repeat: -1
        })

        this.anims.create({
            key: 'coin-pick',
            frameRate: 9,
            frames: this.anims.generateFrameNames('coin-pick'),
        })
        
    }

    addParticles()
    {
        this.flareParticles = this.add.particles('flares')
        this.flareEmitter = this.flareParticles.createEmitter({
            frame: [ 'red', 'blue', 'green', 'yellow' ],
            speed: 100,
            lifespan: 1000,
            blendMode: 'ADD',
            scaleX: 0.5,
            scaleY: 0.5,
            scale: {start: 0.4, end: 0},
            on: false,
        })

        this.coinEmitter = this.flareParticles.createEmitter({
            frame: [ 'blue' ],
            speed: 100,
            lifespan: 500,
            blendMode: 'SCREEN',
            scaleX: 0.7,
            scaleY: 0.7,
            scale: {start: 0.1, end: 0.1},
            on: false,
        })
    }

    playAudio(audio)
    {
        console.log('attempting to play', audio.key)
        if (!this.sound.locked)
        {
            audio.play()
        }
        else
        {
            this.sound.once(Phaser.Sound.Events.UNLOCKED, () => {
                audio.play()
            })
        }
    }
}
