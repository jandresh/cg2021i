import Phaser from 'phaser';

import Scene1 from './scenes/scene1';
import UI from './scenes/UI';
import ParallaxScene from './scenes/ParallaxScene';
import GameOver from './scenes/GameOver';
import Level2 from './scenes/level02';
import WinScene from './scenes/WinScene';

const config = {
    type: Phaser.WEBGL,
    width: 600,
    height: 320,
    physics: {
        default: 'matter',
        matter: {
            debug: false,
        }
    },
    scene: [Scene1, Level2, ParallaxScene, UI, GameOver, WinScene],
    scale: {
        zoom: 2
    }
};

export default new Phaser.Game(config)
