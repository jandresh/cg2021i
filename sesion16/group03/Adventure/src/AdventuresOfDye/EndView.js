/*
 * File: EndView.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
  GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function EndView() {
    // The camera to view the scene
    this.mCamera = null;
    this.mMsg = null;
}
gEngine.Core.inheritPrototype(EndView, Scene);


EndView.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 50), // position of the camera
        120,                        // width of camera
        [0, 0, 1280, 720],         // viewport (orgX, orgY, width, height)
        2
    );
    this.mCamera.setBackgroundColor([0, 0, 0, 1]);

    this.mMsg = new FontRenderable("This is splash screen");
    this.mMsg.setColor([1, 0, 0, 1]);
    this.mMsg.getXform().setPosition(25, 30);
    this.mMsg.setTextHeight(5);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
EndView.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([1, 1, 1, 0]); // clear to light gray
    
    this.mCamera.setupViewProjection();
    this.mMsg.setText("End game");
    this.mMsg.getXform().setPosition(38, 60);
    this.mMsg.draw(this.mCamera);    
    this.mMsg.setText("thanks for playing!");
    this.mMsg.getXform().setPosition(23, 55);
    this.mMsg.draw(this.mCamera);
    this.mMsg.setText("Developers");
    this.mMsg.getXform().setPosition(36, 45);
    this.mMsg.draw(this.mCamera);
    this.mMsg.getXform().setPosition(26, 40);
    this.mMsg.setText("*Duvan Hernandez.");
    this.mMsg.draw(this.mCamera);
    this.mMsg.getXform().setPosition(26, 35);
    this.mMsg.setText("*Kevin Cifuentes.");
    this.mMsg.draw(this.mCamera);
};