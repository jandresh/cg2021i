"use strict";  // Operate in Strict mode such that variables must be declared before used!

function GameLevel_02(level) {
    this.kHeroSprite = "assets/hero_sprite.png";
    this.kMinionSprite = "assets/minion_sprite.png";
    this.kPlatform = "assets/platform.png";
    this.kPlatformNormal = "assets/platform_normal.png";
    this.kWall = "assets/wall.png";
    this.kWallNormal = "assets/wall_normal.png";
    this.kPrompt = "My own Game!";

    // specifics to the level
    this.kLevelFile = "assets/" + level + "/" + level + ".xml";  // e.g., assets/Level1/Level1.xml
    this.kBg = "assets/" + level + "/bg.png";
    this.kBgNormal = "assets/" + level + "/bg_normal.png";
    this.kBgLayer = "assets/" + level + "/bgLayer.png";
    this.kBgLayerNormal = "assets/" + level + "/bgLayer_normal.png";

    this.kDyeBoss_Bottom = "assets/" + level + "/DyeBoss_Bottom.png";
    this.kDyeBoss_Top = "assets/" + level + "/DyeBoss_Top.png";
    this.kDyeBoss_CenterSpawn = "assets/" + level + "/DyeBoss_CenterSpawn.png";
    this.kDyeBoss_Eyeballs = "assets/" + level + "/DyeBoss_Eyeballs.png";
    this.kDyeBoss_WeakPoint_Blue = "assets/" + level + "/DyeBoss_WeakPoint_Blue.png";
    this.kDyeBoss_WeakPoint_Green = "assets/" + level + "/DyeBoss_WeakPoint_Green.png";
    this.kDyeBoss_WeakPoint_Red = "assets/" + level + "/DyeBoss_WeakPoint_Red.png";


    //MIO---------------
    this.kDyePackTexture = "assets/dye_pack.png";
    this.kParticleTexture = "assets/particle.png";
    //-------------------

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

    this.mLgtIndex = 2;
    this.mLgtRotateTheta = 0;

    this.mAllPlatforms = new GameObjectSet();
    this.mAllMinions = new GameObjectSet();
    this.mAllParticles = new ParticleGameObjectSet();
    //MIO--------------------
    this.mAllDyePacks = new GameObjectSet(); 
    this.isAWinner = false;
    //-------------------------
}
gEngine.Core.inheritPrototype(GameLevel_02, Scene);

GameLevel_02.prototype.loadScene = function () {
    gEngine.TextFileLoader.loadTextFile(this.kLevelFile, gEngine.TextFileLoader.eTextFileType.eXMLFile);
    gEngine.Textures.loadTexture(this.kHeroSprite);
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kPlatform);
    gEngine.Textures.loadTexture(this.kPlatformNormal);
    gEngine.Textures.loadTexture(this.kWall);
    gEngine.Textures.loadTexture(this.kWallNormal);

    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kBgNormal);
    gEngine.Textures.loadTexture(this.kBgLayer);
    gEngine.Textures.loadTexture(this.kBgLayerNormal);

    gEngine.Textures.loadTexture(this.kDyeBoss_Bottom);
    gEngine.Textures.loadTexture(this.kDyeBoss_Top);
    gEngine.Textures.loadTexture(this.kDyeBoss_CenterSpawn);
    gEngine.Textures.loadTexture(this.kDyeBoss_Eyeballs);
    gEngine.Textures.loadTexture(this.kDyeBoss_WeakPoint_Blue);
    gEngine.Textures.loadTexture(this.kDyeBoss_WeakPoint_Green);
    gEngine.Textures.loadTexture(this.kDyeBoss_WeakPoint_Red);
    
        //MIO---------
    gEngine.Textures.loadTexture(this.kDyePackTexture);
    gEngine.Textures.loadTexture(this.kParticleTexture);
    //---------
};

GameLevel_02.prototype.unloadScene = function () {
    gEngine.LayerManager.cleanUp();

    gEngine.TextFileLoader.unloadTextFile(this.kLevelFile);
    gEngine.Textures.unloadTexture(this.kHeroSprite);
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kPlatform);
    gEngine.Textures.unloadTexture(this.kPlatformNormal);
    gEngine.Textures.unloadTexture(this.kWall);
    gEngine.Textures.unloadTexture(this.kWallNormal);

    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.kBgNormal);
    gEngine.Textures.unloadTexture(this.kBgLayer);
    gEngine.Textures.unloadTexture(this.kBgLayerNormal);

    gEngine.Textures.unloadTexture(this.kDyeBoss_Bottom);
    gEngine.Textures.unloadTexture(this.kDyeBoss_Top);
    gEngine.Textures.unloadTexture(this.kDyeBoss_CenterSpawn);
    gEngine.Textures.unloadTexture(this.kDyeBoss_Eyeballs);
    gEngine.Textures.unloadTexture(this.kDyeBoss_WeakPoint_Blue);
    gEngine.Textures.unloadTexture(this.kDyeBoss_WeakPoint_Green);
    gEngine.Textures.unloadTexture(this.kDyeBoss_WeakPoint_Red);

    //MIO----------------------------------
    gEngine.Textures.unloadTexture(this.kDyePackTexture);
    gEngine.Textures.unloadTexture(this.kParticleTexture);
    //--------------------------------------

    var nextLevel = new GameLevel_01(this.mNextLevel, this.isAWinner);  // next level to be loaded
    gEngine.Core.startScene(nextLevel);
};

GameLevel_02.prototype.initialize = function () {
    // set ambient lighting
    gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(0.2);

    // parse the entire scene
    var parser = new SceneFileParser(this.kLevelFile);
    this.mCamera = parser.parseCamera();
    this.mGlobalLightSet = parser.parseLights();


    // parse background, needs the camera as a reference for parallax
    parser.parseBackground(this.mThisLevel, this.mCamera, this.mGlobalLightSet);

    parser.parseWall(this.kWall, this.kWallNormal, this.mGlobalLightSet);
    var p = parser.parsePlatform(this.kPlatform, this.kPlatformNormal, this.mGlobalLightSet);
    var i;
    for (i = 0; i < p.length; i++) {
        this.mAllPlatforms.addToSet(p[i]);
    }

    // parsing of actors can only begin after background has been parsed
    // to ensure proper support shadow
    // for now here is the hero
    this.mIllumHero = new Hero(this.kHeroSprite, null, 2, 6, this.mGlobalLightSet);
    
    var b = parser.parseBoss(this.kDyeBoss_Bottom, this.kDyeBoss_Top, this.kDyeBoss_CenterSpawn,
            this.kDyeBoss_Eyeballs, this.kDyeBoss_WeakPoint_Blue, this.kDyeBoss_WeakPoint_Green,
            this.kDyeBoss_WeakPoint_Red, null, this.mGlobalLightSet, this.mIllumHero);
    
    this.mNextLevel = parser.parseNextLevel();

    this.mMsg = new FontRenderable("Status Message");
    this.mMsg.setColor([1, 1, 1, 1]);
    this.mMsg.getXform().setPosition(-9.5, 4);
    this.mMsg.setTextHeight(0.7);

    this.mMatMsg = new FontRenderable("Status Message");
    this.mMatMsg.setColor([1, 1, 1, 1]);
    this.mMatMsg.getXform().setPosition(-9.5, 20);
    this.mMatMsg.setTextHeight(0.7);
    this.mMsg.setText(this.kPrompt + ": DyePack=" + this.mAllDyePacks.size() + " Particles=" + this.mAllParticles.size());
    this.mMsg.getXform().setPosition(0, 16);
    this.mMsg.setTextHeight(0.6);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eFront, this.mMsg);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eFront, this.mMatMsg);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mAllParticles);

    // Add hero into the layer manager and as shadow caster
    // Hero should be added into Actor layer last
    // Hero can only be added as shadow caster after background is created
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mIllumHero);
    gEngine.LayerManager.addAsShadowCaster(this.mIllumHero);


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
GameLevel_02.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    gEngine.LayerManager.drawAllLayers(this.mCamera);

    this.mAllDyePacks.draw(this.mCamera);
    this.mAllParticles.draw(this.mCamera);

    if (this.mShowPeek) {
        this.mPeekCam.setupViewProjection();
        gEngine.LayerManager.drawAllLayers(this.mPeekCam);
    }
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
GameLevel_02.prototype.update = function () {
    this.mCamera.update();  // to ensure proper interpolated movement effects
    //  MIO ----------------------------------
    var funac = function(x, y) { this.createParticle.call(this, x, y); };
    this.mAllDyePacks.update();
    //------------------------------------------------
    
    gEngine.LayerManager.updateAllLayers(this.mAllDyePacks, this.mAllParticles, this.createParticle, this.mCamera, this.isWinner, this);

    var xf = this.mIllumHero.getXform();
    this.mCamera.setWCCenter(xf.getXPos(), 8);
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
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.L)) {
        gEngine.GameLoop.stop();
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

   //---------MIO
    this.mAllDyePacks.update();
    var left;
    // create dye pack and remove the expired ones ...
    if (gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)) {
        if (this.mCamera.isMouseInViewport()) {
            //---------------------------MIO--------------------------
            if (this.mIllumHero.getXform().mScale[0] < 0){
                left = true;
            } else {
                left = false;
            }
            var d = new DyePack(this.kDyePackTexture, null, this.mIllumHero.getXform().getXPos(),this.mIllumHero.getXform().getYPos(), this.mGlobalLightSet, left);
            this.mAllDyePacks.addToSet(d);
        }
    }

    // Cleanup DyePacks
    var i, obj;
    for (i=0; i<this.mAllDyePacks.size(); i++) {
        obj = this.mAllDyePacks.getObjectAt(i);
        if (obj.hasExpired()) {
            this.mAllDyePacks.removeFromSet(obj);
        }
    } 
    
   this.mMsg.getXform().setPosition(p[0]-15, this.mMsg.getXform().getPosition()[1])
   this.mMsg.setText(this.kPrompt + ": DyePack=" + this.mAllDyePacks.size() + " Particles=" + this.mAllParticles.size());
    //-----------MIO

};

//--------------MIO---------
GameLevel_02.prototype.isWinner = function(state){
    this.isAWinner = state;
    this.mCamera.shake(-2, -2, 20, 60);
    setTimeout(()=>{
        gEngine.GameLoop.stop();
    },1000)
    
    
}

GameLevel_02.prototype.createParticle = function(atX, atY, lgtSet) {
    var life = 30 + Math.random() * 200;
    var p = new ParticleGameObject("assets/particle.png", atX, atY, life);
    p.getRenderable().setColor([0.8, 0, 0.3, 1]);
    
    // size of the particle
    var r = 0.6 + Math.random();
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
    p.setSizeDelta(0.95);
    return p;
};
//---------------

GameLevel_02.prototype._selectCharacter = function () {
    // select which character to work with
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Five)) {
        this.mSlectedCh = this.mIllumMinion;
        this.mMaterialCh = this.mSlectedCh.getRenderable().getMaterial().getDiffuse();
        this.mSelectedChMsg = "L:";
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Six)) {
        this.mSlectedCh = this.mIllumHero;
        this.mMaterialCh = this.mSlectedCh.getRenderable().getMaterial().getDiffuse();
        this.mSelectedChMsg = "H:";
    }
    return this.mSelectedChMsg;
};

GameLevel_02.prototype._physicsSimulation = function () {

    // Hero platform
    gEngine.Physics.processObjSet(this.mIllumHero, this.mAllPlatforms);

    // Minion platform
    gEngine.Physics.processSetSet(this.mAllMinions, this.mAllPlatforms);
    
    // DyePack platform
    gEngine.Physics.processSetSet(this.mAllDyePacks, this.mAllPlatforms);
    
    // DyePack Minions
    gEngine.Physics.processSetSet(this.mAllDyePacks, this.mAllMinions);
    
    
    // Particle system collisions
    gEngine.Particle.processSetSet(this.mAllMinions, this.mAllParticles);
    gEngine.Particle.processSetSet(this.mAllPlatforms, this.mAllParticles);
};


