/*
 * File: GameLevel_01.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
  GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function GameLevel_01(level, isWinner) {
    // The camera to view the scene
    this.won = isWinner;
    this.mCamera = null;
    this.mMsg = null;
}
gEngine.Core.inheritPrototype(GameLevel_01, Scene);


GameLevel_01.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 50), // position of the camera
        100,                        // width of camera
        [0, 0, 1280, 720],         // viewport (orgX, orgY, width, height)
        2
    );
    // set ambient lighting
    gEngine.DefaultResources.setGlobalAmbientIntensity(1);    
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    this.mMsg = new FontRenderable("This is splash screen");
    this.mMsg.setColor([1, 0, 0, 1]);
    this.mMsg.getXform().setPosition(10, 50);
    this.mMsg.setTextHeight(5);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
GameLevel_01.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    if(this.won){
        this.mMsg.setText("You win! :)");
    }else {
        this.mMsg.setText("You lose! :(")
    } 
   this.mMsg.getXform().setPosition(15, 70);
    this.mMsg.draw(this.mCamera);
    this.mMsg.setText("<Space Bar> to Start again");
    this.mMsg.getXform().setPosition(20, 45);
    this.mMsg.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
GameLevel_01.prototype.update = function () {
    
    // select which character to work with
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)){
        gEngine.GameLoop.stop();
    }
};


GameLevel_01.prototype.unloadScene = function() {
    // Step B: starts the next level
    // starts the next level
    var nextLevel = new GameLevel_02("Level2");  // next level to be loaded
    gEngine.Core.startScene(nextLevel);
};

