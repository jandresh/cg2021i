"use strict";  // Operate in Strict mode such that variables must be declared before used!

function GameLevel_03(level, time) {
    this.kHeroSprite = "assets/hero_sprite.png";
    this.kMinionSprite = "assets/minion_sprite.png";
    this.kPlatform = "assets/platform.png";
    this.kPlatformNormal = "assets/platform_normal.png";
    this.kWall = "assets/wall.png";
    this.kWallNormal = "assets/wall_normal.png";
    this.kParticle = "assets/EMPPulse.png";
    // Doors
    this.kDoorTop = "assets/DoorInterior_Top.png";
    this.kDoorBot = "assets/DoorInterior_Bottom.png";
    this.kDoorSleeve = "assets/DoorFrame_AnimSheet.png";

    this.kTnt = "assets/Level3/bomba.png"
    this.kButton = "assets/DoorFrame_Button_180x100.png";

    this.kLock = "assets/sounds/lock.mp3"
    this.kOpen = "assets/sounds/open.mp3"
    // specifics to the level
    this.kLevelFile = "assets/" + level + "/" + level + ".xml";  // e.g., assets/Level1/Level1.xml
    this.kBg = "assets/" + level + "/bg.png";
    this.kBgNormal = "assets/" + level + "/bg_normal.png";
    this.kBgLayer = "assets/" + level + "/bgLayer.png";
    this.kBgLayerNormal = "assets/" + level + "/bgLayer_normal.png";

   // The camera to view the scene
    this.mCamera = null;
    this.mPeekCam = null;
    this.mShowPeek = false;
    this.t = time;
    this.mMsg = time ;
    this.mRestart = false;
    // the hero and the support objects
    this.mplatform = null;
    this.mTnt = null;
    this.mIllumHero = null;
    this.mGlobalLightSet = null;

    this.mThisLevel = level;
    this.mNextLevel = null;

    this.mLgtIndex = 2;
    this.mLgtRotateTheta = 0;

    this.mAllPlatforms = new GameObjectSet();
    this.mAllWalls = new GameObjectSet();
    this.mAllMinions = new GameObjectSet();
    this.mAllDoors = new GameObjectSet();
    this.mAllButtons = new GameObjectSet();
}
gEngine.Core.inheritPrototype(GameLevel_03, Scene);

GameLevel_03.prototype.loadScene = function () {
    gEngine.TextFileLoader.loadTextFile(this.kLevelFile, gEngine.TextFileLoader.eTextFileType.eXMLFile);
    gEngine.Textures.loadTexture(this.kHeroSprite);
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kPlatform);
    gEngine.Textures.loadTexture(this.kPlatformNormal);
    gEngine.Textures.loadTexture(this.kParticle);
    gEngine.Textures.loadTexture(this.kWall);
    gEngine.Textures.loadTexture(this.kWallNormal);
    gEngine.Textures.loadTexture(this.kDoorTop);
    gEngine.Textures.loadTexture(this.kDoorBot);
    gEngine.Textures.loadTexture(this.kDoorSleeve);
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kBgNormal);
    gEngine.Textures.loadTexture(this.kBgLayer);
    gEngine.Textures.loadTexture(this.kBgLayerNormal);
    gEngine.Textures.loadTexture(this.kTnt);
    gEngine.Textures.loadTexture(this.kButton);
    gEngine.AudioClips.loadAudio(this.kLock);
    gEngine.AudioClips.loadAudio(this.kOpen);
};

GameLevel_03.prototype.unloadScene = function () {
    gEngine.LayerManager.cleanUp();

    gEngine.TextFileLoader.unloadTextFile(this.kLevelFile);
    gEngine.Textures.unloadTexture(this.kHeroSprite);
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kPlatform);
    gEngine.Textures.unloadTexture(this.kParticle);
    gEngine.Textures.unloadTexture(this.kPlatformNormal);
    gEngine.Textures.unloadTexture(this.kWall);
    gEngine.Textures.unloadTexture(this.kWallNormal);
    gEngine.Textures.unloadTexture(this.kDoorTop);
    gEngine.Textures.unloadTexture(this.kDoorBot);
    gEngine.Textures.unloadTexture(this.kDoorSleeve);
    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.kBgNormal);
    gEngine.Textures.unloadTexture(this.kBgLayer);
    gEngine.Textures.unloadTexture(this.kBgLayerNormal);
    gEngine.Textures.unloadTexture(this.kTnt);
    gEngine.Textures.unloadTexture(this.kButton);
    gEngine.AudioClips.unloadAudio(this.kLock);
    gEngine.AudioClips.unloadAudio(this.kOpen);    
    // next level to be loaded
    if (this.mRestart === true) { 
        var nextLevel = new GameLevel_03("Level3", this.t); // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    } else {
        gEngine.AudioClips.stopBackgroundAudio();
        var nextLevel = new EndView(); // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    }
};

GameLevel_03.prototype.initialize = function () {
    // set ambient lighting
    gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(0.2);

    // parse the entire scene
    var parser = new SceneFileParser(this.kLevelFile);
    this.mCamera = parser.parseCamera();
    this.mGlobalLightSet = parser.parseLights();

    // parse background, needs the camera as a reference for parallax
    parser.parseBackground(this.mThisLevel, this.mCamera, this.mGlobalLightSet);

    var w = parser.parseWall(this.kWall, this.kWallNormal, this.mGlobalLightSet);
    for (i = 0; i < w.length; i++) {
        this.mAllWalls.addToSet(w[i]);
    }
    var p = parser.parsePlatform(this.kPlatform, this.kPlatformNormal, this.mGlobalLightSet);
    var i;
    for (i = 0; i < p.length; i++) {
        this.mAllPlatforms.addToSet(p[i]);
    }

    var d = parser.parseDoors(
        this.kDoorTop,
        this.kDoorBot,
        this.kDoorSleeve,
        this.mGlobalLightSet
    );
    for (i = 0; i < d.length; i++) {
        this.mAllDoors.addToSet(d[i]);
    }
    
    var b = parser.parseButtons(this.kButton, this.mGlobalLightSet);
    for (i = 0; i < b.length; i++) {
        this.mAllButtons.addToSet(b[i]);
    }

    // parsing of actors can only begin after background has been parsed
    // to ensure proper support shadow
    // for now here is the hero
    this.mIllumHero = new Hero(this.kHeroSprite, null, 2, 6, this.mGlobalLightSet);
    this.mplatform = new Platform(
        30,
        13,
        [-1, 0, 0],
        3,
        this.kPlatform,
        this.kPlatformNormal,
        this.mGlobalLightSet
    );
    this.mAllPlatforms.addToSet(this.mplatform);
    this.mTnt = new Tnt(        
        this.mplatform.getXform().getXPos()+0.5,
        14,
        this.kTnt,
        this.mGlobalLightSet
    );
    var t = this.mMsg.getText();
    this.mMsg = new FontRenderable(t);
    this.mMsg.setColor([1, 0, 0, 1]);
    this.mMsg.getXform().setPosition(10, 16);
    this.mMsg.setTextHeight(2);
 
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mMsg);
    
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mIllumHero);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mTnt);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mplatform);
    gEngine.LayerManager.addAsShadowCaster(this.mplatform);
    gEngine.LayerManager.addAsShadowCaster(this.mIllumHero);
    
    this.mPeekCam = new Camera(
        vec2.fromValues(0, 0),
        120,
        [0, 0, 320, 180],
        2
    );
    this.mShowPeek = false;
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
GameLevel_03.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    gEngine.LayerManager.drawAllLayers(this.mCamera);
    this.mMsg.draw(this.mCamera); 
    if (this.mShowPeek) {
        this.mPeekCam.setupViewProjection();
        gEngine.LayerManager.drawAllLayers(this.mPeekCam);
    }
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
GameLevel_03.prototype.update = function () {
    this.mCamera.update();  // to ensure proper interpolated movement effects

    gEngine.LayerManager.updateAllLayers();

    var allUnlocked = false;
    for (i = 0; i < this.mAllButtons.size(); i++) {
        if (this.mAllButtons.getObjectAt(i).getButtonState() === true) {
            allUnlocked = true;
        } else {
            allUnlocked = false;
            break;
        }
    }
    if(allUnlocked){
        this.mTnt.deactivateTnt();        
    }

    //Implment about the timer (left function implement)
    var ms = this.mMsg;
    var v = parseInt(ms.getText(), 10);
    if (v == 0) {
        this.mRestart = true;
        gEngine.GameLoop.stop();
    } else {
        setTimeout(function () {
            v = v - 1;
            ms.setText(String(v));
           
            // if(v <= 10){
            //     this.mCamera.shake(-2, -2, 20, 30);
            // }
        }, 1000);
    }

    var xf = this.mIllumHero.getXform();
    var xpos = this.mIllumHero.getXform().getXPos();
    var ypos = this.mIllumHero.getXform().getYPos();

    var xposplatform = this.mplatform.getXform().getXPos();
    this.mTnt.getXform().setPosition(xposplatform+0.5, 14);
    this.mMsg.getXform().setPosition(xpos, 16);
    this.mCamera.setWCCenter(xf.getXPos(), 8);
    var p = vec2.clone(xf.getPosition());
    this.mGlobalLightSet.getLightAt(this.mLgtIndex).set2DPosition(p);

    if (this.mShowPeek) {
        this.mPeekCam.setWCCenter(p[0], p[1]);
        this.mPeekCam.update();
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.P)) {
        this.mShowPeek = !this.mShowPeek;
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.L)) {
        gEngine.GameLoop.stop();
    }
    
    // physics simulation
    var collisionInfo = new CollisionInfo();

    this._physicsSimulation();
    var heroPhysics = this.mIllumHero.getPhysicsComponent();
    var tntPhysics = this.mTnt.getPhysicsComponent();  
    collided = heroPhysics.collided(tntPhysics, collisionInfo);
    if (collided) {
        if(!this.mTnt.getTntState()){
            this.mRestart = true;
            gEngine.GameLoop.stop();
        }
    }

    var platBox;
    var i;
    var collided = false;
    
    for (i = 0; i < this.mAllPlatforms.size(); i++) {
        var platBox = this.mAllPlatforms.getObjectAt(i).getPhysicsComponent();
        collided = this.mIllumHero.getJumpBox().collided(platBox, collisionInfo);
        if (collided) {
            this.mIllumHero.canJump(true);
            break;
        }
    }

    for (i = 0; i < this.mAllButtons.size(); i++) {
        var boton = this.mAllButtons.getObjectAt(i)
        var buttonBox = boton.getPhysicsComponent();
        collided = this.mIllumHero.getPhysicsComponent().collided(buttonBox, collisionInfo);
        if (!boton.getButtonState() && collided) {
            boton.pressButton();
            gEngine.AudioClips.playACue(this.kLock);            
        }
    }    
    
    var openDoor = this.mTnt.getTntState();
    if (openDoor && xpos > 62) {
        this.mAllDoors.getObjectAt(0).unlockDoor();
        if(openDoor && !this.mIllumHero.canOpenDoor()){
            this.mIllumHero.setCanOpenDoor(true);
            gEngine.AudioClips.playACue(this.kOpen);
        }    
    }    

    if (xpos > 65) {
        this.mRestart = false;
        gEngine.GameLoop.stop();
    }
};

GameLevel_03.prototype._physicsSimulation = function () {

    // Hero platform
    gEngine.Physics.processObjSet(this.mIllumHero, this.mAllPlatforms);
    gEngine.Physics.processObjSet(this.mIllumHero, this.mAllWalls);
    gEngine.Physics.processObjSet(this.mIllumHero, this.mAllDoors);
    
};


GameLevel_03.prototype.createParticle = function (atX, atY) {
    var life = 30 + Math.random() * 200;
    var p = new ParticleGameObject("assets/EMPPulse.png", atX, atY, life);
    p.getRenderable().setColor([1, 0, 0, 1]);

    // size of the particle
    var r = 0.5 + Math.random() * 0.5;
    p.getXform().setSize(r, r);

    // final color
    var fr = 3.5 + Math.random();
    var fg = 0.4 + 0.1 * Math.random();
    var fb = 0.3 + 0.1 * Math.random();
    p.setFinalColor([fr, fg, fb, 0.6]);

    // velocity on the particle
    var fx = 10 * Math.random() - 20 * Math.random();
    var fy = 10 * Math.random();
    p.getPhysicsComponent().setVelocity([fx, fy]);

    // size delta
    p.setSizeDelta(0.98);

    return p;
};

