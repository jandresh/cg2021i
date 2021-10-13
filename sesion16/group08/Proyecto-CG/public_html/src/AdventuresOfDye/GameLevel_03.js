/* global gEngine, Scene, vec2 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function GameLevel_03(level, vidas) {
    // audio clips: supports both mp3 and wav formats
    this.kBgClip = "assets/sounds/BGClip.mp3";
    this.kCue = "assets/sounds/BlueLevel_cue.wav";
    this.kCue2 = "assets/sounds/MyGame_cue.wav";
    
    //this.vida1 = "assets/" + vidas + ".png";
    
    // sprites
    this.kHeroSprite = "assets/hero_sprite.png";
    this.kMinionSprite = "assets/minion_sprite.png";
    this.kPlatform = "assets/platform.png";
    this.kPlatformNormal = "assets/platform_normal.png";
    this.kPlatform2 = "assets/platform2.png";
    this.kPlatformNormal2 = "assets/platform_normal2.png";
    this.kWall = "assets/wall.png";
    this.kWallNormal = "assets/wall_normal.png";
    this.kParticle = "assets/EMPPulse.png";
    this.kDoorTop = "assets/DoorInterior_Top.png";
    this.kDoorBot = "assets/DoorInterior_Bottom.png";
    this.kDoorSleeve = "assets/DoorFrame_AnimSheet.png";
    this.kButton = "assets/DoorFrame_Button_180x100.png";
    this.kProjectileTexture = "assets/EMPPulse.png";

    // specifics to the level
    this.kLevelFile = "assets/" + level + "/" + level + ".xml";  // e.g., assets/Level1/Level1.xml
    this.kBg = "assets/" + level + "/bg.png";
    this.kBgNormal = "assets/" + level + "/bg_normal.png";
    this.kBgLayer = "assets/" + level + "/bgLayer.png";
    this.kBgLayerNormal = "assets/" + level + "/bgLayer_normal.png";

    this.kLevelFinishedPosition = 105;


    // The camera to view the scene
    this.mCamera = null;
    this.mPeekCam = null;
    this.mShowPeek = false;

    this.mMsg = null;
    this.mMatMsg = null;

    // the hero and the support objects
    this.mHero = null;
    this.mIllumHero = null;

    this.mGlobalLightSet = null;

    this.mThisLevel = level;
    this.mNextLevel = null;
    this.mRestart = false;

    this.mLgtIndex = 2;
    this.mLgtRotateTheta = 0;

    this.mAllWalls = new GameObjectSet();
    this.mAllPlatforms = new GameObjectSet();
    this.mAllPlatforms2 = new GameObjectSet();
    this.mAllButtons = new GameObjectSet();
    this.mAllDoors = new GameObjectSet();
    this.mAllMinions = new GameObjectSet();
    this.mAllParticles = new ParticleGameObjectSet(); 
    this.vidas = vidas;
    this.unlocked = 1;
}
gEngine.Core.inheritPrototype(GameLevel_03, Scene);

GameLevel_03.prototype.loadScene = function () {
    gEngine.TextFileLoader.loadTextFile(this.kLevelFile, gEngine.TextFileLoader.eTextFileType.eXMLFile);

    // loads the audios
    gEngine.AudioClips.loadAudio(this.kBgClip);
    gEngine.AudioClips.loadAudio(this.kCue);
    gEngine.AudioClips.loadAudio(this.kCue2);
    
    // carga las texturas
    //gEngine.Textures.loadTexture(this.vida1);
    gEngine.Textures.loadTexture(this.kHeroSprite);
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kPlatform);
    gEngine.Textures.loadTexture(this.kPlatformNormal);
    gEngine.Textures.loadTexture(this.kPlatform2);
    gEngine.Textures.loadTexture(this.kPlatformNormal2);
    gEngine.Textures.loadTexture(this.kWall);
    gEngine.Textures.loadTexture(this.kWallNormal);
    gEngine.Textures.loadTexture(this.kParticle);
    gEngine.Textures.loadTexture(this.kDoorTop);
    gEngine.Textures.loadTexture(this.kDoorBot);
    gEngine.Textures.loadTexture(this.kDoorSleeve);
    gEngine.Textures.loadTexture(this.kButton);
    gEngine.Textures.loadTexture(this.kProjectileTexture);

    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kBgNormal);
    gEngine.Textures.loadTexture(this.kBgLayer);
    gEngine.Textures.loadTexture(this.kBgLayerNormal);
};

GameLevel_03.prototype.unloadScene = function () {
    // stop the background audio
    gEngine.AudioClips.stopBackgroundAudio();
    gEngine.AudioClips.unloadAudio(this.kBgClip);
    gEngine.AudioClips.unloadAudio(this.kCue);
    gEngine.AudioClips.unloadAudio(this.kCue2);
    
    gEngine.LayerManager.cleanUp();

    gEngine.TextFileLoader.unloadTextFile(this.kLevelFile);    
    //gEngine.Textures.unloadTexture(this.vida1);
    gEngine.Textures.unloadTexture(this.kHeroSprite);
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kPlatform);
    gEngine.Textures.unloadTexture(this.kPlatformNormal);
    gEngine.Textures.unloadTexture(this.kPlatform2);
    gEngine.Textures.unloadTexture(this.kPlatformNormal2);
    gEngine.Textures.unloadTexture(this.kWall);
    gEngine.Textures.unloadTexture(this.kWallNormal);
    gEngine.Textures.unloadTexture(this.kParticle);
    gEngine.Textures.unloadTexture(this.kDoorTop);
    gEngine.Textures.unloadTexture(this.kDoorBot);
    gEngine.Textures.unloadTexture(this.kDoorSleeve);
    gEngine.Textures.unloadTexture(this.kButton);
    gEngine.Textures.unloadTexture(this.kProjectileTexture);

    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.kBgNormal);
    gEngine.Textures.unloadTexture(this.kBgLayer);
    gEngine.Textures.unloadTexture(this.kBgLayerNormal);
    
    if (this.mRestart === true) {
        this.vidas--;
        var nextLevel = new GameLevel_03("Level3", this.vidas);  // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    } else {
        var nextLevel = new Final(this.mNextLevel);  // next level to be loaded
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
    
    var i;

    var m = parser.parseMinions(this.kMinionSprite, null, this.mGlobalLightSet);
    for (i = 0; i < m.length; i++) {
        this.mAllMinions.addToSet(m[i]);
    }

    // parse background, needs the camera as a reference for parallax
    parser.parseBackground(this.mThisLevel, this.mCamera, this.mGlobalLightSet);

    var w = parser.parseWall(this.kWall, this.kWallNormal, this.mGlobalLightSet);
    for (i = 0; i < w.length; i++) {
        this.mAllWalls.addToSet(w[i]);
    }
    
    var p = parser.parsePlatform(this.kPlatform, this.kPlatformNormal, this.mGlobalLightSet);
    for (i = 0; i < p.length; i++) {
        this.mAllPlatforms.addToSet(p[i]);
    }
    
    var p2 = parser.parsePlatform2(this.kPlatform2, this.kPlatformNormal2, this.mGlobalLightSet);
    for (i = 0; i < p2.length; i++) {
        this.mAllPlatforms2.addToSet(p2[i]);
    }

    var d = parser.parseDoors(this.kDoorTop, this.kDoorBot, this.kDoorSleeve, this.mGlobalLightSet);
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
    
    this.mNextLevel = parser.parseNextLevel();

    this.mMsg = new FontRenderable("Status Message");
    this.mMsg.setColor([1, 1, 1, 1]);
    this.mMsg.getXform().setPosition(-9.5, 4);
    this.mMsg.setTextHeight(0.7);

    this.mMatMsg = new FontRenderable("Status Message");
    this.mMatMsg.setColor([1, 1, 1, 1]);
    this.mMatMsg.getXform().setPosition(-9.5, 20);
    this.mMatMsg.setTextHeight(0.7);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eFront, this.mMsg);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eFront, this.mMatMsg);

    // Add hero into the layer manager and as shadow caster
    // Hero should be added into Actor layer last
    // Hero can only be added as shadow caster after background is created
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mIllumHero);
    gEngine.LayerManager.addAsShadowCaster(this.mIllumHero);

    // now start the bg music ...
    gEngine.AudioClips.playBackgroundAudio(this.kBgClip);

    this.mSlectedCh = this.mIllumHero;
    // this.mMaterialCh = this.mSlectedCh.getRenderable().getMaterial().getDiffuse();
    this.mSelectedChMsg = "";

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

    this.mAllParticles.draw(this.mCamera);

    if (this.mShowPeek) {
        this.mPeekCam.setupViewProjection();
        gEngine.LayerManager.drawAllLayers(this.mPeekCam);
    }
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
GameLevel_03.prototype.update = function () {
    this.mCamera.update();  // to ensure proper interpolated movement effects
    this.mAllParticles.update(this.mAllParticles);
    gEngine.LayerManager.updateAllLayers();
    
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Right)) {
        gEngine.AudioClips.playACue(this.kCue);
    }
    
    
    var xf = this.mIllumHero.getXform();
    this.mCamera.setWCCenter(xf.getXPos(), xf.getYPos());
    var p = vec2.clone(xf.getPosition());
    this.mGlobalLightSet.getLightAt(this.mLgtIndex).set2DPosition(p);

    // control the selected light
//    var msg = "L=" + this.mLgtIndex + " ";
//    msg += this._lightControl();
//    this.mMsg.setText(msg);

    // msg = this._selectCharacter();
    // msg += this.materialControl();
    this.mMatMsg.setText("P: to peek the entire level; L: to change level to: " + this.mNextLevel);

    if (this.mShowPeek) {
        this.mPeekCam.setWCCenter(p[0], p[1]);
        this.mPeekCam.update();
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.P)) {
        this.mShowPeek = !this.mShowPeek;
    }

    // physics simulation
    this._physicsSimulation();

    var platBox;
    var i;
    var collided = false;
    var collisionInfo = new CollisionInfo();
    for (i = 0; i < this.mAllPlatforms.size(); i++) {
        var platBox = this.mAllPlatforms.getObjectAt(i).getPhysicsComponent();
        collided = this.mIllumHero.getJumpBox().collided(platBox, collisionInfo);
        if (collided) {
            this.mIllumHero.canJump(true);
            break;
        }
    }

    for (i = 0; i < this.mAllMinions.size(); i++) {
        var minionBox = this.mAllMinions.getObjectAt(i).getPhysicsComponent();
        collided = this.mIllumHero.getPhysicsComponent().collided(minionBox, collisionInfo);
        if (collided) {
            this.mRestart = true;
            gEngine.GameLoop.stop();
        }
    }

    var j;
    for (i = 0; i < this.mAllMinions.size(); i++) {
        var p = this.mAllMinions.getObjectAt(i).getProjectiles();

        for (j = 0; j < p.size(); j++) {
            var pBox = p.getObjectAt(j).getPhysicsComponent();
            collided = this.mIllumHero.getPhysicsComponent().collided(pBox, collisionInfo);
            if (collided) {
                this.mRestart = true;
                gEngine.GameLoop.stop();
            }
        }
    }

    for (i = 0; i < this.mAllButtons.size(); i++) {
        var buttonBox = this.mAllButtons.getObjectAt(i).getPhysicsComponent();
        collided = this.mIllumHero.getPhysicsComponent().collided(buttonBox, collisionInfo);
        if (collided) {
            if (this.mAllButtons.getObjectAt(i).getButtonState() === false) {
                gEngine.AudioClips.playACue(this.kCue);
            }            
            this.mAllButtons.getObjectAt(i).pressButton();
        }
    }

    var allUnlocked = false;
    for (i = 0; i < this.mAllButtons.size(); i++) {
        if (this.mAllButtons.getObjectAt(i).getButtonState() === true) {
            allUnlocked = true;            
        } else {
            allUnlocked = false;
            break;
        }
    }

    if (allUnlocked) {
        this.mAllDoors.getObjectAt(0).unlockDoor();
        if (this.unlocked === 1) {                
            gEngine.AudioClips.playACue(this.kCue2);
        }
        this.unlocked = 0;
    }
    
    for (i = 0; i < this.mAllPlatforms2.size(); i++) {
        var platBox = this.mAllPlatforms2.getObjectAt(i).getPhysicsComponent();
        collided = this.mIllumHero.getJumpBox().collided(platBox, collisionInfo);
        if (collided) {
            this.mIllumHero.canJump(true);
            //var xf = this.mIllumHero.getXform();
            //var xf2 = this.mAllPlatforms2.getObjectAt(i).getXform();
            //var xf2 = platBox.getXform();
            /*
            if (xf2.getXPos() > xf.getXPos() ) {
                var xpos = xf2.getXPos() - xf.getXPos();
                this.mIllumHero.getXform().setPosition(xf2.getXPos() - xpos, xf.getYPos());
            } else {
                var xpos = xf.getXPos() - xf2.getXPos();
                this.mIllumHero.getXform().setPosition(xf2.getXPos() + xpos, xf.getYPos());
            }
            if (gEngine.Input.isKeyClicked(gEngine.Input.keys.D)) {
             */            
            break;
        }
    }    
    
    if(this.mIllumHero.getXform().getYPos() < -5){
        this.mRestart = true;
        gEngine.GameLoop.stop();
    }     
    
    if(this.mIllumHero.getXform().getXPos() > this.kLevelFinishedPosition){
        this.mRestart = false;
        gEngine.GameLoop.stop();
    } 
    
    if(this.vidas < 1){
        this.mRestart = false;
        gEngine.GameLoop.stop();
    } 
};

GameLevel_03.prototype._physicsSimulation = function () {

    // Hero platform
    gEngine.Physics.processObjSet(this.mIllumHero, this.mAllPlatforms);
    gEngine.Physics.processObjSet(this.mIllumHero, this.mAllWalls);
    gEngine.Physics.processObjSet(this.mIllumHero, this.mAllDoors);
    gEngine.Physics.processObjSet(this.mIllumHero, this.mAllPlatforms2);

    // Hero Minion
    //gEngine.Physics.processObjSet(this.mHero, this.mAllMinions);

    // Minion platform
    gEngine.Physics.processSetSet(this.mAllMinions, this.mAllPlatforms);
    gEngine.Physics.processSetSet(this.mAllMinions, this.mAllPlatforms2);

    // DyePack platform
    //gEngine.Physics.processSetSet(this.mAllDyePacks, this.mAllPlatforms);

    // DyePack Minions
    //gEngine.Physics.processSetSet(this.mAllDyePacks, this.mAllMinions);

    // Hero DyePack
    //gEngine.Physics.processObjSet(this.mHero, this.mAllDyePacks);
    
    
};

