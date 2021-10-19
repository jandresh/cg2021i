"use strict";  // Operate in Strict mode such that variables must be declared before used!

function GameLevel_02(level) {
    this.kP38 = "assets/P38_top.png";
    this.kMinionSprite = "assets/minion_sprite.png";
    this.kEngines = "assets/engines.png";
    this.kPlatform = "assets/platform.png";
    this.kPlatformNormal = "assets/platform_normal.png";
    this.kWall = "assets/wall.png";
    this.kWallNormal = "assets/wall_normal.png";
    this.kParticle = "assets/EMPPulse.png";
    this.kProjectileTexture = "assets/EMPPulse.png";

    // specifics to the level
    this.kLevelFile = "assets/" + level + "/" + level + ".xml";  // e.g., assets/Level1/Level1.xml
    this.kBg = "assets/" + level + "/bg.png";
    this.kBgNormal = "assets/" + level + "/bg_normal.png";
    this.kBgLayer = "assets/" + level + "/bgLayer.png";
    this.kBgLayerNormal = "assets/" + level + "/bgLayer_normal.png";

    this.kDyeBoss_Bottom = "assets/" + level + "/DyeBoss_Bottom.png";
    this.kDyeBoss_Top = "assets/" + level + "/DyeBoss_Top.png";
    this.B17= "assets/" + level + "/B-17.png";
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
    this.kSpawnerTotal = 350;
    
    this.mSpawnerTicks = 0;
    this.mTicks = 0;
    
    this.mBossBulletset = null; //In the end I didn't implement the turrets
    
    this.mAllMinions = null;
    
    this.mBulletset = null;
    
    this.BossHealth = 100;
    this.B17down = false;
    this.mGlobalLightSet = null;

    this.mThisLevel = level;
    this.mNextLevel = null;

    this.mLgtIndex = 2;
    this.mLgtRotateTheta = 0;

    this.mAllPlatforms = new GameObjectSet();
    this.mAllMinions = new GameObjectSet();
    this.mAllBossEngines = new GameObjectSet();
    this.mExplosionset =  new GameObjectSet();
    this.mAllParticles = new ParticleGameObjectSet();

}
gEngine.Core.inheritPrototype(GameLevel_02, Scene);

GameLevel_02.prototype.loadScene = function () {
    gEngine.TextFileLoader.loadTextFile(this.kLevelFile, gEngine.TextFileLoader.eTextFileType.eXMLFile);
    gEngine.Textures.loadTexture(this.kP38);
    gEngine.Textures.loadTexture(this.kEngines)
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kPlatform);
    gEngine.Textures.loadTexture(this.kPlatformNormal);
    gEngine.Textures.loadTexture(this.kWall);
    gEngine.Textures.loadTexture(this.kWallNormal);
    gEngine.Textures.loadTexture(this.kProjectileTexture);
    gEngine.Textures.loadTexture(this.kParticle);
    gEngine.Textures.loadTexture(this.B17);

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
};

GameLevel_02.prototype.unloadScene = function () {
    gEngine.LayerManager.cleanUp();

    gEngine.TextFileLoader.unloadTextFile(this.kLevelFile);
    gEngine.Textures.unloadTexture(this.kP38);
    gEngine.Textures.unloadTexture(this.kEngines);
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kPlatform);
    gEngine.Textures.unloadTexture(this.kPlatformNormal);
    gEngine.Textures.unloadTexture(this.kWall);
    gEngine.Textures.unloadTexture(this.kWallNormal);
    gEngine.Textures.unloadTexture(this.kProjectileTexture);
    gEngine.Textures.unloadTexture(this.kParticle);
    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.kBgNormal);
    gEngine.Textures.unloadTexture(this.kBgLayer);
    gEngine.Textures.unloadTexture(this.kBgLayerNormal);
    gEngine.Textures.unloadTexture(this.B17);

    gEngine.Textures.unloadTexture(this.kDyeBoss_Bottom);
    gEngine.Textures.unloadTexture(this.kDyeBoss_Top);
    gEngine.Textures.unloadTexture(this.kDyeBoss_CenterSpawn);
    gEngine.Textures.unloadTexture(this.kDyeBoss_Eyeballs);
    gEngine.Textures.unloadTexture(this.kDyeBoss_WeakPoint_Blue);
    gEngine.Textures.unloadTexture(this.kDyeBoss_WeakPoint_Green);
    gEngine.Textures.unloadTexture(this.kDyeBoss_WeakPoint_Red);

    var nextLevel = new GameLevel_02(this.mNextLevel);  // next level to be loaded
    gEngine.Core.startScene(nextLevel);
};

GameLevel_02.prototype.initialize = function () {
    // set ambient lighting
    gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(1);

    // parse the entire scene
    var parser = new SceneFileParser(this.kLevelFile);
    this.mCamera = parser.parseCamera();
    this.mGlobalLightSet = parser.parseLights();
    
    

        //Boss
    this.mBossset = new GameObjectSet();
    
    this.mBossBulletset = new GameObjectSet();
    //Bullets   
    this.mBulletset = new GameObjectSet();
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
    this.mIllumHero = new P38(this.kMinionSprite, null, 2, 6, this.mGlobalLightSet);
    
    var b = parser.parseBoss(this.B17, this.B17, this.kEngines,
            this.kEngines, this.kDyeBoss_WeakPoint_Blue, this.kDyeBoss_WeakPoint_Green,
            this.kDyeBoss_WeakPoint_Red, null, this.mGlobalLightSet, this.mIllumHero);
    console.log(b.mAllEngines)
    this.mAllBossEngines = b.mAllEngines;
    
    this.mNextLevel = parser.parseNextLevel();

    this.mMsg = new FontRenderable("Get Yamamoto");
    this.mMsg.setColor([1, 1, 1, 1]);
    this.mMsg.getXform().setPosition(-9.5, 4);
    this.mMsg.setTextHeight(0.7);

    this.mMatMsg = new FontRenderable("Get Yamamoto");
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
    
    //Stuff for messages, game over, bla bla
    var x = this.mIllumHero.getXform().getXPos();
    var y = this.mIllumHero.getXform().getYPos();
    this.timer = 0;
    this.points = 0;

    
    
    this.ggMsg = new FontRenderable(" ");
    this.ggMsg.setColor([1, 0, 0, 1]);
    this.ggMsg.getXform().setPosition(x, y+7);
    this.ggMsg.setTextHeight(0.4);
    
    this.pointsMsg = new FontRenderable(" ");
    this.pointsMsg.setColor([0, 1, 1, 1]);
    this.pointsMsg.getXform().setPosition(x, y+6.8);
    this.pointsMsg.setTextHeight(0.3);
    
    this.continueMsg = new FontRenderable(" ");
    this.continueMsg.setColor([0, 1, 1, 1]);
    this.continueMsg.getXform().setPosition(x, y+6.5);
    this.continueMsg.setTextHeight(0.3);    
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eFront, this.ggMsg);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eFront, this.pointsMsg);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eFront, this.continueMsg);
    
    
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
GameLevel_02.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    gEngine.LayerManager.drawAllLayers(this.mCamera);

    this.mAllParticles.draw(this.mCamera);
    this.mBulletset.draw(this.mCamera);
    this.mExplosionset.draw(this.mCamera);
    var i;
    for (i = 0; i < this.mAllMinions.size(); i++) {
        this.mAllMinions.getObjectAt(i).draw(this.mCamera);
    }

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
    var i;
    for (i = 0; i < this.mAllMinions.size(); i++) {
        this.mAllMinions.getObjectAt(i).update(this.mIllumHero);
    }
    this.timer++;
    this.points = (this.timer*(-1))/1000

    var xf = this.mIllumHero.getXform();
    this.mCamera.setWCCenter(xf.getXPos(), 8);
    var p = vec2.clone(xf.getPosition());
    this.mGlobalLightSet.getLightAt(this.mLgtIndex).set2DPosition(p);
    
    //Setting up key to restart
     if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Enter)){
          this.mRestart = true;  
        }  

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
    
     //Bullets
        if(gEngine.Input.isKeyClicked(gEngine.Input.keys.J)){
            var xHero = (this.mIllumHero.getXform().getXPos());
            var yHero = (this.mIllumHero.getXform().getYPos());
            var aBullet = new FiddyCal (this.kMinionSprite, xHero , yHero + (0.15));
            var bBullet = new FiddyCal (this.kMinionSprite, xHero , yHero + (-0.15));
            this.mBulletset.addToSet(aBullet);
            this.mBulletset.addToSet(bBullet);
        }
        this.mBulletset.update();
    
    //Minions
    this.mSpawnerTicks++;
    if(this.mSpawnerTicks > this.kSpawnerTotal && this.mAllMinions.size() < 6 && !this.B17down){
        this._spawnChaseur();
        this.mSpawnerTicks = 0;
    }


    // physics simulation
    this._physicsSimulation();
    
    //Zeroes ramming the player
    var i;
    var collided = false;
    var collisionInfo = new CollisionInfo();
    for (i = 0; i < this.mAllMinions.size(); i++) {
        var minionBox = this.mAllMinions.getObjectAt(i).getPhysicsComponent();
        collided = this.mIllumHero.getPhysicsComponent().collided(minionBox, collisionInfo);
        if (collided) {
            console.log("gg you go rammed")
            gEngine.GameLoop.stop();
            this.gameover();
        }
    }
    
    //Zeroes landing a shot on the player
    var j;
    for (i = 0; i < this.mAllMinions.size(); i++) {
        var p = this.mAllMinions.getObjectAt(i).getProjectiles();

        for (j = 0; j < p.size(); j++) {
            var pBox = p.getObjectAt(j).getPhysicsComponent();
            collided = this.mIllumHero.getPhysicsComponent().collided(pBox, collisionInfo);
            if (collided) {
                this.gameover();
                console.log("gg you got shot")
                gEngine.GameLoop.stop();
            }
        }
    }
    //player landing a shot on the zeros
    for(let i =0;i<this.mAllMinions.size();i++){
            var mBbox = this.mAllMinions.getObjectAt(i).getBBox();
            // Bullets -> Minions
            for(let j =0;j<this.mBulletset.size();j++){
                var buBbox = this.mBulletset.getObjectAt(j).getBBox();
                if(buBbox.intersectsBound(mBbox)){
                    this.mAllMinions.deleteFromSet(i);
                    this.points += 500; // plus 100 points per zero shot down
                    console.log(this.mAllBossEngines.getObjectAt(i).getBBox())
                }
            } 
    }
    for (let i=0; i<this.mAllBossEngines.size();i++) {
        var eBbox = this.mAllBossEngines.getObjectAt(i).getBBox();
        for(let j=0;j<this.mBulletset.size();j++){
            var buBbox = this.mBulletset.getObjectAt(j).getBBox();
            if(buBbox.intersectsBound(eBbox)){
                if(this.BossHealth == 0){
                    this.points +=2000;
                    console.log("Yamamoto down");
                    this.gamewon();
                } else{
                    this.BossHealth--;
                    console.log("landed a shot on an engine")
                }
            }
        }
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

    // Hero platform

    // Hero Minion
    gEngine.Physics.processObjSet(this.mIllumHero, this.mAllMinions);

    // Minion platform
    gEngine.Physics.processSetSet(this.mAllMinions, this.mAllPlatforms);

    // DyePack platform
    //gEngine.Physics.processSetSet(this.mAllDyePacks, this.mAllPlatforms);

    // DyePack Minions
    //gEngine.Physics.processSetSet(this.mAllDyePacks, this.mAllMinions);

    // Hero DyePack
    //gEngine.Physics.processObjSet(this.mHero, this.mAllDyePacks);
};

GameLevel_02.prototype._spawnChaseur = function () {
    var x = this.mIllumHero.getXform().getXPos();
    var y = this.mIllumHero.getXform().getYPos();
    var m = new ChaserMinion(x, y+8, [0, 0], 0, 2, this.kMinionSprite, null, this.mLightSet, 0.5, 0.5);
    var n = new ChaserMinion(x-5, y, [0, 0], 0, 2, this.kMinionSprite, null, this.mLightSet, 0.5, 0.5);
    this.mAllMinions.addToSet(m);
    this.mAllMinions.addToSet(n);
};

GameLevel_02.prototype.gameover = function () {
    this.ggMsg.setText("Your aircraft has been disabled. Game Over");
    this.continueMsg.setText("Press Enter to try again");
};
GameLevel_02.prototype.gamewon = function () {
    this.B17down = true; 
    this.ggMsg.setText("He should crash into the sea now. Good Job");
    this.pointsMsg.setText("Total points:" + String(this.points));
    this.mAllMinions.deleteFromSet();
};

