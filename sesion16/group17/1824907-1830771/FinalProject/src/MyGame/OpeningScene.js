function OpeningScene() {
    
    //List of Cameras
    this.mCamera = null;
    
    //List of Objects and variables used on this scene
    this.mDisplayText = null;
    this.kBgMusic = "assets/sound/BGClip.mp3";  
    //this.mBg  //Don't have one of these yet
}
gEngine.Core.inheritPrototype(OpeningScene, Scene);

//No assets to load yet. Override availble here if we decide to load an asset
OpeningScene.prototype.loadScene = function () {   
    
    //BGM turned off for tuning to advance load time
    gEngine.AudioClips.loadAudio(this.kBgMusic);
    };

OpeningScene.prototype.unloadScene = function() {
    // starts the next level
    var nextLevel = new MainGameScene();  // next level to be loaded
    gEngine.Core.startScene(nextLevel);
};

OpeningScene.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 50), // position of the camera
        100,                        // width of camera
        [0, 0, 900, 600],         // viewport (orgX, orgY, width, height)
        2
    );
    this.mCamera.setBackgroundColor([0.21, 0.31, 0, 0.5]);
    
    //Initializes FontRenderable: Notably the Color is Set here and only here (for now)
    this.mMsg = new FontRenderable();
    this.mMsg.setColor([0, 0, 0, 1]);
};

//Draws everything
OpeningScene.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    //And here is where we'd draw the background... if we had one!
    
    //Draws Text Objects. Ugh, Text. Maybe replace with TextureRenderable PNG Art?
    this.mCamera.setupViewProjection();
    this.mMsg.setText("Proyecto");
    this.mMsg.getXform().setPosition(35, 75);
    this.mMsg.setTextHeight(7);
    this.mMsg.draw(this.mCamera);    
    
    this.mMsg.setText("Final");
    this.mMsg.getXform().setPosition(42, 70);
    this.mMsg.setTextHeight(7);
    this.mMsg.draw(this.mCamera);

    this.mMsg.setText("¡Para jugar usa la");
    this.mMsg.getXform().setPosition(29, 50);
    this.mMsg.setTextHeight(4);
    this.mMsg.draw(this.mCamera);

    this.mMsg.setText("Barra espaciadora!");
    this.mMsg.getXform().setPosition(29, 45);
    this.mMsg.setTextHeight(4);
    this.mMsg.draw(this.mCamera);
    
    this.mMsg.setText("Kevin Trujillo");
    this.mMsg.getXform().setPosition(37, 28);
    this.mMsg.setTextHeight(3);
    this.mMsg.draw(this.mCamera);
    
    this.mMsg.setText("Matteo Zuluaga");
    this.mMsg.getXform().setPosition(37, 23);
    this.mMsg.setTextHeight(3);
    this.mMsg.draw(this.mCamera);
    
};


OpeningScene.prototype.update = function () {
    
    //If Spacebar hit, play again
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space))
        gEngine.GameLoop.stop();
};

