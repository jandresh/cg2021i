"use strict";  // Operate in Strict mode such that variables must be declared before used!

function GameLevel_01(level) {
    this.kHeroSprite = "assets/hero_sprite.png";
    this.kHeroSprite1 = "assets/hero_sprite1.png";
    this.kMinionSprite = "assets/minion_sprite.png";
    this.kPlatform = "assets/platform.png";
    this.kPlatformNormal = "assets/platform_normal.png";
    this.kWall = "assets/wall.png";
    this.kWallNormal = "assets/wall_normal.png";
    this.kChest = "assets/chest.png";
    this.kChestNormal = "assets/chest.png";
    this.kFloor = "assets/floor.png";
    this.kFloorNormal = "assets/floor.png";
    this.kMovablePlatform = "assets/movable_platform.png";
    this.kMovablePlatformNormal = "assets/movable_platform.png";
    this.kDeadlyFloor = "assets/deadly_floor.png";
    this.kDeadlyFloorNormal = "assets/deadly_floor.png";
    

    // specifics to the level
    this.kLevelFile = "assets/" + level + "/" + level + ".xml";  // e.g., assets/Level1/Level1.xml
    this.kBg = "assets/" + level + "/bg.png";
    this.kBgNormal = "assets/" + level + "/bg_normal.png";
    this.kBgLayer = "assets/" + level + "/bgLayer.png";
    this.kBgLayerNormal = "assets/" + level + "/bgLayer_normal.png";
    this.kBgExtraLayer = "assets/Level1/bgextralayer.png"
    this.kgBgExtraLayerNormal = "assets/Level1/bgextralayer.png";

    this.kDyeBoss_Bottom = "assets/" + level + "/DyeBoss_Bottom.png";
    this.kDyeBoss_Top = "assets/" + level + "/DyeBoss_Top.png";
    this.kDyeBoss_CenterSpawn = "assets/" + level + "/DyeBoss_CenterSpawn.png";
    this.kDyeBoss_Eyeballs = "assets/" + level + "/DyeBoss_Eyeballs.png";
    this.kDyeBoss_WeakPoint_Blue = "assets/" + level + "/DyeBoss_WeakPoint_Blue.png";
    this.kDyeBoss_WeakPoint_Green = "assets/" + level + "/DyeBoss_WeakPoint_Green.png";
    this.kDyeBoss_WeakPoint_Red = "assets/" + level + "/DyeBoss_WeakPoint_Red.png";


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
    this.mAllWalls = new GameObjectSet();
    this.mAllObjects = new GameObjectSet();
    this.mAllParticles = new ParticleGameObjectSet();
    this.mAllFloors = new GameObjectSet();
    this.mAllMovablePlatforms = new GameObjectSet();
    this.mAllDeadlyFloors = new GameObjectSet();
    
}
gEngine.Core.inheritPrototype(GameLevel_01, Scene);

GameLevel_01.prototype.loadScene = function () {
    gEngine.TextFileLoader.loadTextFile(this.kLevelFile, gEngine.TextFileLoader.eTextFileType.eXMLFile);
    gEngine.Textures.loadTexture(this.kHeroSprite);
    gEngine.Textures.loadTexture(this.kHeroSprite1);
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kPlatform);
    gEngine.Textures.loadTexture(this.kPlatformNormal);
    gEngine.Textures.loadTexture(this.kWall);
    gEngine.Textures.loadTexture(this.kWallNormal);
    gEngine.Textures.loadTexture(this.kChest);
    gEngine.Textures.loadTexture(this.kChestNormal);
    gEngine.Textures.loadTexture(this.kFloor);
    gEngine.Textures.loadTexture(this.kFloorNormal);
    gEngine.Textures.loadTexture(this.kMovablePlatform);
    gEngine.Textures.loadTexture(this.kMovablePlatformNormal);
    gEngine.Textures.loadTexture(this.kDeadlyFloor);
    gEngine.Textures.loadTexture(this.kDeadlyFloorNormal);
    

    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kBgNormal);
    gEngine.Textures.loadTexture(this.kBgLayer);
    gEngine.Textures.loadTexture(this.kBgLayerNormal);
    gEngine.Textures.loadTexture(this.kBgExtraLayer);
    gEngine.Textures.loadTexture(this.kgBgExtraLayerNormal);

    gEngine.Textures.loadTexture(this.kDyeBoss_Bottom);
    gEngine.Textures.loadTexture(this.kDyeBoss_Top);
    gEngine.Textures.loadTexture(this.kDyeBoss_CenterSpawn);
    gEngine.Textures.loadTexture(this.kDyeBoss_Eyeballs);
    gEngine.Textures.loadTexture(this.kDyeBoss_WeakPoint_Blue);
    gEngine.Textures.loadTexture(this.kDyeBoss_WeakPoint_Green);
    gEngine.Textures.loadTexture(this.kDyeBoss_WeakPoint_Red);
};

GameLevel_01.prototype.unloadScene = function () {
    gEngine.LayerManager.cleanUp();

    gEngine.TextFileLoader.unloadTextFile(this.kLevelFile);
    gEngine.Textures.unloadTexture(this.kHeroSprite);
    gEngine.Textures.unloadTexture(this.kHeroSprite1);
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kPlatform);
    gEngine.Textures.unloadTexture(this.kPlatformNormal);
    gEngine.Textures.unloadTexture(this.kWall);
    gEngine.Textures.unloadTexture(this.kWallNormal);
    gEngine.Textures.unloadTexture(this.kChest);
    gEngine.Textures.unloadTexture(this.kChestNormal);
    gEngine.Textures.unloadTexture(this.kFloor);
    gEngine.Textures.unloadTexture(this.kFloorNormal);
    gEngine.Textures.unloadTexture(this.kMovablePlatform);
    gEngine.Textures.unloadTexture(this.kMovablePlatformNormal);
    gEngine.Textures.unloadTexture(this.kDeadlyFloor);
    gEngine.Textures.unloadTexture(this.kDeadlyFloorNormal);

    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.kBgNormal);
    gEngine.Textures.unloadTexture(this.kBgLayer);
    gEngine.Textures.unloadTexture(this.kBgLayerNormal);
    gEngine.Textures.unloadTexture(this.kBgExtraLayer);
    gEngine.Textures.unloadTexture(this.kgBgExtraLayerNormal);

    gEngine.Textures.unloadTexture(this.kDyeBoss_Bottom);
    gEngine.Textures.unloadTexture(this.kDyeBoss_Top);
    gEngine.Textures.unloadTexture(this.kDyeBoss_CenterSpawn);
    gEngine.Textures.unloadTexture(this.kDyeBoss_Eyeballs);
    gEngine.Textures.unloadTexture(this.kDyeBoss_WeakPoint_Blue);
    gEngine.Textures.unloadTexture(this.kDyeBoss_WeakPoint_Green);
    gEngine.Textures.unloadTexture(this.kDyeBoss_WeakPoint_Red);

    var nextLevel = new GameLevel_01(this.mNextLevel);  // next level to be loaded
    gEngine.Core.startScene(nextLevel);
};

GameLevel_01.prototype.initialize = function () {
    // set ambient lighting
    gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(1);

    // parse the entire scene
    var parser = new SceneFileParser(this.kLevelFile);
    this.mCamera = parser.parseCamera();
    this.mGlobalLightSet = parser.parseLights();

    // parse background, needs the camera as a reference for parallax
    parser.parseBackground(this.mThisLevel, this.mCamera, this.mGlobalLightSet);
    
    var farr = parser.parseFloor(this.kFloor, this.kFloorNormal, this.mGlobalLightSet);
    var movPlatforms = parser.parseMovablePlatform(this.kMovablePlatform, this.kMovablePlatformNormal, this.mGlobalLightSet);
    console.log(farr);
    var wallP = parser.parseWall(this.kWall, this.kWallNormal, this.mGlobalLightSet);
    var p = parser.parsePlatform(this.kPlatform, this.kPlatformNormal, this.mGlobalLightSet);
    var deadlyF = parser.parseDeadlyFloor(this.kDeadlyFloor, this.kDeadlyFloorNormal, this.mGlobalLightSet);
    for(var y = 0; y < deadlyF.length; y++){
        this.mAllDeadlyFloors.addToSet(deadlyF[y]);
    }
    var i;
    for (i = 0; i < p.length; i++) {
        this.mAllPlatforms.addToSet(p[i]);
    }
    for(i = 0; i < wallP.length; i++){
        this.mAllWalls.addToSet(wallP[i]);
    }
    
    for(var x = 0; x < farr.length; x++){
        this.mAllFloors.addToSet(farr[x]);
    }
    
    for(var j = 0; j < movPlatforms.length; j++){
        this.mAllMovablePlatforms.addToSet(movPlatforms[j]);
    }
    
    //var objt = parser.parseObjeto(this.kChest, this.kChestNormal, this.mGlobalLightSet);
    var objt = parser.parseButtons(this.kChest, this.mGlobalLightSet);
    for(i = 0; i < objt.length; i++){ 
        this.mAllObjects.addToSet(objt[i]);
    }

    // parsing of actors can only begin after background has been parsed
    // to ensure proper support shadow
    // for now here is the hero
    this.mIllumHero = new Hero(this.kHeroSprite, null, 1, 5, this.mGlobalLightSet);

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
GameLevel_01.prototype.draw = function () {
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
GameLevel_01.prototype.update = function () {
    this.mCamera.update();  // to ensure proper interpolated movement effects
    this.mAllParticles.update(this.mAllParticles);
    gEngine.LayerManager.updateAllLayers();

    var xf = this.mIllumHero.getXform();
    this.mCamera.setWCCenter(xf.getXPos(), 8);
    var p = vec2.clone(xf.getPosition());

    // control the selected light
//    var msg = "L=" + this.mLgtIndex + " ";
//    msg += this._lightControl();
//    this.mMsg.setText(msg);

    // msg = this._selectCharacter();
    // msg += this.materialControl();

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
    var collided2 = false;
    var collidedPlatform = false;
    var collidedObject = false;
    var collisionInfo = new CollisionInfo();
    var collisionFloor = new CollisionInfo();
    var collisionPlatforms = new CollisionInfo();
    var collisionObjects = new CollisionInfo();
    for (i = 0; i < this.mAllPlatforms.size(); i++) {
        var platBox = this.mAllPlatforms.getObjectAt(i).getPhysicsComponent();
        collided = this.mIllumHero.getJumpBox().collided(platBox, collisionInfo);
        if (collided) {
            this.mIllumHero.canJump(true);
            break;
        }
    }
    
    for(var j = 0; j < this.mAllFloors.size(); j++){
        var platBox = this.mAllFloors.getObjectAt(j).getPhysicsComponent();
        collided2 = this.mIllumHero.getJumpBox().collided(platBox, collisionFloor);
        if (collided2) {
            this.mIllumHero.canJump(true);
            break;
        }
    }
    
    for(var j = 0; j < this.mAllMovablePlatforms.size(); j++){
        
        var platBox = this.mAllMovablePlatforms.getObjectAt(j).getPhysicsComponent();
        collidedPlatform = this.mIllumHero.getJumpBox().collided(platBox, collisionPlatforms);
        if (collidedPlatform) {
            this.mIllumHero.canJump(true);
            
            break;
        }
    }
    
    for(var x = 0; x < this.mAllObjects.size(); x++){
        var platBox = this.mAllObjects.getObjectAt(x).getPhysicsComponent();
        collidedObject = this.mIllumHero.getJumpBox().collided(platBox, collisionObjects);
        if (collidedObject) {
            console.log("Treasure, yuju");
            this.mAllObjects.getObjectAt(x).setVisibility(false);
            this.mAllObjects.removeFromSet(this.mAllObjects.getObjectAt(x));
             
            if(this.mAllObjects.size() == 0){
                alert("Ganaste");
            }
            break;
        }
    }
    
    for(var x = 0; x < this.mAllDeadlyFloors.size(); x++){
        var platBox = this.mAllDeadlyFloors.getObjectAt(x).getPhysicsComponent();
        collidedObject = this.mIllumHero.getJumpBox().collided(platBox, collisionObjects);
        if (collidedObject) {
            alert("Perdiste, reinicia la pagina para volver a intentarlo")
            gEngine.GameLoop.stop();
            break;
        }
    }

    
    /*for (i = 0; i < this.mAllMinions.length; i++) {
        var minionBox = this.mAllMinions.getObjectAt(i).getPhysicsComponent();
        death = this.mIllumHero.getJumpBox().collided(minionBox, minionsInfo);
        if (death) {
            break;
        }
        console.log("Hola");
    }*/
};

GameLevel_01.prototype._selectCharacter = function () {
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

GameLevel_01.prototype._physicsSimulation = function () {

    // Hero platform
    gEngine.Physics.processObjSet(this.mIllumHero, this.mAllPlatforms);
    gEngine.Physics.processObjSet(this.mIllumHero, this.mAllWalls);
    gEngine.Physics.processObjSet(this.mIllumHero, this.mAllMinions);
    gEngine.Physics.processObjSet(this.mIllumHero, this.mAllFloors);
    gEngine.Physics.processObjSet(this.mIllumHero, this.mAllMovablePlatforms);

    // Hero Minion
    //gEngine.Physics.processObjSet(this.mHero, this.mAllMinions);

    // Minion platform
    gEngine.Physics.processSetSet(this.mAllMinions, this.mAllPlatforms);
    gEngine.Physics.processSetSet(this.mAllMinions, this.mAllWalls);

    // DyePack platform
    //gEngine.Physics.processSetSet(this.mAllDyePacks, this.mAllPlatforms);

    // DyePack Minions
    //gEngine.Physics.processSetSet(this.mAllDyePacks, this.mAllMinions);

    // Hero DyePack
    //gEngine.Physics.processObjSet(this.mHero, this.mAllDyePacks);
};

