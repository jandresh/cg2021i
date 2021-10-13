"use strict";  // Operate in Strict mode such that variables must be declared before used!

function GameLevel_02(level,lifepoints) {
    /*this.kHeroSprite = "assets/persona.png";
    this.kMinionSprite = "assets/minion_sprite.png";
    this.kPlatform = "assets/platform.png";
    this.kPlatformNormal = "assets/platform_normal.png";
    this.kWall = "assets/wall.png";
    this.kWallNormal = "assets/wall_normal.png";
    this.KBalitaTexture="assets/balita.png";
    this.kProjectileTexture = "assets/EMPPulse.png";
    this.kParticle = "assets/EMPPulse.png";*/


    this.kHeroSprite="assets/persona.png";
    //this.kHeroSpriteNormal="assets/ejemplo_normal.png";
    this.kMinionSprite = "assets/minion_sprite.png";
    this.kPlatform = "assets/platform.png";
    this.kPlatformNormal = "assets/platform_normal.png";
    this.kWall = "assets/wall.png";
    this.kWallNormal = "assets/wall_normal.png";
    this.kParticle = "assets/EMPPulse.png";
    
    
    
    this.kProjectileTexture = "assets/EMPPulse.png";
    this.KBalitaTexture="assets/balita.png";

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
    this.kDoorTop = "assets/DoorInterior_Top.png";
    this.kDoorBot = "assets/DoorInterior_Bottom.png";
    this.kDoorSleeve = "assets/DoorFrame_AnimSheet.png";
    this.kButton = "assets/DoorFrame_Button_180x100.png";

    this.kLevelFinishedPosition=60;


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
    this.life=lifepoints;

    this.mLgtIndex = 2;
    this.mLgtRotateTheta = 0;

    this.mAllWalls = new GameObjectSet();
    this.mAllPlatforms = new GameObjectSet();
    this.mAllButtons = new GameObjectSet();
    this.mAllDoors = new GameObjectSet();
    this.mAllMinions = new GameObjectSet();
    this.mAllParticles = new ParticleGameObjectSet();
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
    gEngine.Textures.loadTexture(this.kDoorTop);
    gEngine.Textures.loadTexture(this.kDoorBot);
    gEngine.Textures.loadTexture(this.kDoorSleeve);
    gEngine.Textures.loadTexture(this.kButton);
    gEngine.Textures.loadTexture(this.kParticle);
    gEngine.Textures.loadTexture(this.kProjectileTexture);
    gEngine.Textures.loadTexture(this.KBalitaTexture);

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
    gEngine.Textures.loadTexture(this.KBalitaTexture);
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
    gEngine.Textures.unloadTexture(this.kDoorTop);
    gEngine.Textures.unloadTexture(this.kDoorBot);
    gEngine.Textures.unloadTexture(this.kDoorSleeve);
    gEngine.Textures.unloadTexture(this.kButton);
    gEngine.Textures.unloadTexture(this.kParticle);
    gEngine.Textures.unloadTexture(this.kProjectileTexture);
    gEngine.Textures.unloadTexture(this.KBalitaTexture);

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
    gEngine.Textures.unloadTexture(this.KBalitaTexture);

    if (this.mRestart === true)
    {
        var nextLevel = new GameLevel_02("Level2",this.life);  // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    }else {
        /*var nextLevel = new GameLevel_03("Level3");  // next level to be loaded
        gEngine.Core.startScene(nextLevel);*/

        
        this.mCamera.setBackgroundColor([0, 0, 0, 1]);
        gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
        this.mCamera.setupViewProjection();
        this.mMsg.setText("SIUUUUUUUUUUUUUUUUUUU");
        this.mMsg.getXform().setPosition(4, 12);
        this.mMsg.draw(this.mCamera);
        this.mMsg.setText("Game Over");
        this.mMsg.getXform().setPosition(10, 7);
        this.mMsg.draw(this.mCamera);
        //gEngine.LayerManager.addToLayer(gEngine.eLayer.eFront, this.mMsg);
        if (gEngine.Input.isKeyClicked(gEngine.Input.keys.R)){
            console.log("siuuu");
            gEngine.GameLoop.stop();
        }
        
        
       
        //var nextLevel = new GameLevel_01(this.mNextLevel,this.life);  // next level to be loaded
        //gEngine.Core.startScene(nextLevel);
    }
    
    
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

    var m = parser.parseMinions(this.kMinionSprite, null, this.mGlobalLightSet);
    var i;
    for (i = 0; i < m.length; i++) {
        this.mAllMinions.addToSet(m[i]);
    }

    parser.parseWall(this.kWall, this.kWallNormal, this.mGlobalLightSet);
    var p = parser.parsePlatform(this.kPlatform, this.kPlatformNormal, this.mGlobalLightSet);
    var i;
    for (i = 0; i < p.length; i++) {
        this.mAllPlatforms.addToSet(p[i]);
    }

    var d = parser.parseDoors(this.kDoorTop, this.kDoorBot, this.kDoorSleeve, this.mGlobalLightSet ,2);
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
    this.mIllumHero = new Hero(this.kHeroSprite, null, 2, 2, this.mGlobalLightSet);
    
    /*var b = parser.parseBoss(this.kDyeBoss_Bottom, this.kDyeBoss_Top, this.kDyeBoss_CenterSpawn,
            this.kDyeBoss_Eyeballs, this.kDyeBoss_WeakPoint_Blue, this.kDyeBoss_WeakPoint_Green,
            this.kDyeBoss_WeakPoint_Red, null, this.mGlobalLightSet, this.mIllumHero);*/
    
    this.mNextLevel = parser.parseNextLevel();

    this.mMsg = new FontRenderable("");
    this.mMsg.setColor([1, 1, 1, 1]);
    this.mMsg.getXform().setPosition(10, 59);
    this.mMsg.setTextHeight(2);

    this.mMatMsg = new FontRenderable("");
    this.mMatMsg.setColor([1, 1, 1, 1]);
    this.mMatMsg.getXform().setPosition(10, 55);
    this.mMatMsg.setTextHeight(0.7);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eFront, this.mMsg);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eFront, this.mMatMsg);

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

    this.mCamera.setWCCenter(5, -30);
    
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
GameLevel_02.prototype.draw = function () {
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
GameLevel_02.prototype.update = function () {
    this.mCamera.update();  // to ensure proper interpolated movement effects
    this.mAllParticles.update(this.mAllParticles);
    gEngine.LayerManager.updateAllLayers();

    var xf = this.mIllumHero.getXform();
    if(this.mCamera.getWCCenter()[1]<=55){
        this.mCamera.setWCCenter(15, this.mCamera.getWCCenter()[1] + 0.10);
    }
    
    //console.log('HHHHHHHHHHHHHHHHHHHHHHHEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEYYYYYYYYYYYYYYYYYYYYYYYYYYY');
    var p = vec2.clone(xf.getPosition());
    this.mGlobalLightSet.getLightAt(this.mLgtIndex).set2DPosition(p);

    // control the selected light
//    var msg = "L=" + this.mLgtIndex + " ";
//    msg += this._lightControl();
//    this.mMsg.setText(msg);

    // msg = this._selectCharacter();
    // msg += this.materialControl();
    //this.mMatMsg.setText("P: to peek the entire level; L: to change level to: " + this.mNextLevel);

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
    console.log(gEngine.Input.isKeyClicked(gEngine.Input.keys.R))


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

    for (i = 0; i < this.mAllButtons.size(); i++) {
        var buttonBox = this.mAllButtons.getObjectAt(i).getPhysicsComponent();
        collided = this.mIllumHero.getPhysicsComponent().collided(buttonBox, collisionInfo);
        if (collided) {
            this.mAllButtons.getObjectAt(i).pressButton();
        }
    }

    for (i = 0; i < this.mAllMinions.size(); i++) {
        var minionBox = this.mAllMinions.getObjectAt(i).getPhysicsComponent();
        collided = this.mIllumHero.getPhysicsComponent().collided(minionBox, collisionInfo);
        if (collided) {
            this.life=this.life-1;
            console.log(this.life);
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
                this.life=this.life-1;
                console.log(this.life);
                this.mRestart = true;
                gEngine.GameLoop.stop();
            }
        }
    }

    var objeto;
    for (i = 0; i < this.mAllMinions.size(); i++) {
        var p=this.mAllMinions.getObjectAt(i);
        var prr = p.getPhysicsComponent();
        for (j=0; j<this.mIllumHero.getProjectiles().size(); j++) {
             objeto = this.mIllumHero.getProjectiles().getObjectAt(j);
              var obphy=objeto.getPhysicsComponent();
              collided = prr.collided(obphy, collisionInfo);           
            if (collided) {
                this.mIllumHero.getProjectiles().removeFromSet(objeto);
                
                
                this.mAllMinions.removeFromSet(p);
                //this.mGlobalLightSet.removeFromSet()
                
                gEngine.LayerManager.removeFromLayer(gEngine.eLayer.eActors,p);
                console.log(gEngine.eLayer.eActors)
                console.log(p.light)
                if(p.hasOwnProperty('mSpotlight')){
                    p.mSpotlight.setLightTo(false);
                }
                p.light.setLightTo(false);
                gEngine.LayerManager.removeFromLayer(gEngine.eLayer.eActors,p.light);
               
                console.log("choca con minion");
                
                
            }
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
    }

    if(this.mIllumHero.getXform().getYPos() > this.kLevelFinishedPosition){
        this.mRestart = false;
        gEngine.GameLoop.stop();
    }

    
    



};

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

    gEngine.Physics.processObjSet(this.mIllumHero, this.mAllPlatforms);
    gEngine.Physics.processObjSet(this.mIllumHero, this.mAllWalls);
    gEngine.Physics.processObjSet(this.mIllumHero, this.mAllDoors);


    // Minion platform
    gEngine.Physics.processSetSet(this.mAllMinions, this.mAllPlatforms);

    //Balas Minions
    gEngine.Physics.processSetSet(this.mIllumHero.mProyectil,this.mAllMinions)
};

