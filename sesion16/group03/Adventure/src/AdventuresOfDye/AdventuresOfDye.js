/*
 * File: AdventuresOfDye.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
  GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function AdventuresOfDye() {
    // The camera to view the scene
    this.mCamera = null;
    this.mMsg = null;
}
gEngine.Core.inheritPrototype(AdventuresOfDye, Scene);


AdventuresOfDye.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 50), // position of the camera
        130,                        // width of camera
        [0, 0, 1280, 720],         // viewport (orgX, orgY, width, height)
        2
    );
    this.mCamera.setBackgroundColor([0, 0, 0, 1]);

    this.mMsg = new FontRenderable("This is splash screen");
    this.mMsg.setColor([1, 0, 0, 1]);
    this.mMsg.getXform().setPosition(10, 50);
    this.mMsg.setTextHeight(2);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
AdventuresOfDye.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    this.mMsg.setText("CONTROLS");
    this.mMsg.getXform().setPosition(10, 75);
    this.mMsg.draw(this.mCamera);

    this.mMsg.setText("A: Move left");
    this.mMsg.getXform().setPosition(10, 70);
    this.mMsg.draw(this.mCamera);

    this.mMsg.setText("D: Move right");
    this.mMsg.getXform().setPosition(10, 65);
    this.mMsg.draw(this.mCamera);

    this.mMsg.setText("Space: Jump");
    this.mMsg.getXform().setPosition(10, 60);
    this.mMsg.draw(this.mCamera);


    this.mMsg.setText("UPGRADES");
    this.mMsg.getXform().setPosition(10, 50);
    this.mMsg.draw(this.mCamera);

    this.mMsg.setText("Shield: Block de projectiles");
    this.mMsg.getXform().setPosition(10, 45);
    this.mMsg.draw(this.mCamera);

    this.mMsg.setText("Reloj: Reduce speed projectiles");
    this.mMsg.getXform().setPosition(10, 40);
    this.mMsg.draw(this.mCamera);

    this.mMsg.setText("Weapon: Shoot projectiles to destroy the boss");
    this.mMsg.getXform().setPosition(10, 35);
    this.mMsg.draw(this.mCamera);

    this.mMsg.setText("Complete the game before the time is 0 !");
    this.mMsg.getXform().setPosition(10, 25);
    this.mMsg.draw(this.mCamera);

    this.mMsg.setText("<Enter> to Start");
    this.mMsg.getXform().setPosition(10, 20);
    this.mMsg.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
AdventuresOfDye.prototype.update = function () {
    
    // select which character to work with
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter))
        gEngine.GameLoop.stop();
};


AdventuresOfDye.prototype.unloadScene = function() {
    // Step B: starts the next level
    // starts the next level
    var nextLevel = new GameLevel_01("Level1");  // next level to be loaded
    gEngine.Core.startScene(nextLevel);

    // var nextLevel = new GameLevel_02("Level2");  // next level to be loaded
    // gEngine.Core.startScene(nextLevel);
};