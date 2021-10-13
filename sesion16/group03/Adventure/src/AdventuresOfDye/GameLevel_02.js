"use strict";  // Operate in Strict mode such that variables must be declared before used!

function GameLevel_02(level, time) {
    this.kHeroSprite = "assets/hero_sprite.png";
    this.kMinionSprite = "assets/minion_sprite.png";
    this.kPlatform = "assets/platform.png";
    this.kPlatformNormal = "assets/platform_normal.png";
    this.kWall = "assets/wall.png";
    this.kWallNormal = "assets/wall_normal.png";
    this.kProjectileTexture2 = "assets/bullet.png";
    this.kWeapon = "assets/weapon.png";
    this.kParticle = "assets/EMPPulse.png";

    // Doors
    this.kDoorTop = "assets/DoorInterior_Top.png";
    this.kDoorBot = "assets/DoorInterior_Bottom.png";
    this.kDoorSleeve = "assets/DoorFrame_AnimSheet.png";

    this.kLock = "assets/sounds/lock.mp3"
    this.kOpen = "assets/sounds/open.mp3"

    this.mPowerUp = null;
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



    // The camera to view the scene
    this.mCamera = null;
    this.mPeekCam = null;
    this.mShowPeek = false;
    this.t = time 
    this.mMsg = time 
    this.pruebas = null;
    this.mRestart = false;
    // the hero and the support objects
    this.mHero = null;
    this.mIllumHero = null;
    this.mBoss = null;
    this.mGlobalLightSet = null;

    this.mThisLevel = level;
    this.mNextLevel = null;

    this.mLgtIndex = 2;
    this.mLgtRotateTheta = 0;

    this.mAllPlatforms = new GameObjectSet();
    this.mAllWalls = new GameObjectSet();
    this.mAllMinions = new GameObjectSet();
    this.mAllParticles = new ParticleGameObjectSet();
    this.mAllDoors = new GameObjectSet();
}
gEngine.Core.inheritPrototype(GameLevel_02, Scene);

GameLevel_02.prototype.loadScene = function () {
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
    gEngine.Textures.loadTexture(this.kProjectileTexture2);
    gEngine.Textures.loadTexture(this.kWeapon);
    gEngine.Textures.loadTexture(this.kDyeBoss_Bottom);
    gEngine.Textures.loadTexture(this.kDyeBoss_Top);
    gEngine.Textures.loadTexture(this.kDyeBoss_CenterSpawn);
    gEngine.Textures.loadTexture(this.kDyeBoss_Eyeballs);
    gEngine.Textures.loadTexture(this.kDyeBoss_WeakPoint_Blue);
    gEngine.Textures.loadTexture(this.kDyeBoss_WeakPoint_Green);
    gEngine.Textures.loadTexture(this.kDyeBoss_WeakPoint_Red);
    gEngine.AudioClips.loadAudio(this.kLock);
    gEngine.AudioClips.loadAudio(this.kOpen);
};

GameLevel_02.prototype.unloadScene = function () {
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
    gEngine.Textures.unloadTexture(this.kProjectileTexture2);
    gEngine.Textures.unloadTexture(this.kWeapon);
    gEngine.Textures.unloadTexture(this.kDyeBoss_Bottom);
    gEngine.Textures.unloadTexture(this.kDyeBoss_Top);
    gEngine.Textures.unloadTexture(this.kDyeBoss_CenterSpawn);
    gEngine.Textures.unloadTexture(this.kDyeBoss_Eyeballs);
    gEngine.Textures.unloadTexture(this.kDyeBoss_WeakPoint_Blue);
    gEngine.Textures.unloadTexture(this.kDyeBoss_WeakPoint_Green);
    gEngine.Textures.unloadTexture(this.kDyeBoss_WeakPoint_Red);
    gEngine.AudioClips.unloadAudio(this.kOpen);
    gEngine.AudioClips.unloadAudio(this.kLock);
    // next level to be loaded
    if (this.mRestart === true) {
        var nextLevel = new GameLevel_02("Level2", this.t); // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    } else {
        var nextLevel = new GameLevel_03("Level3", this.mMsg); // next level to be loaded
        gEngine.Core.startScene(nextLevel);
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
    this.mPowerUp = new Button(20, 12, this.kWeapon, 0, this.mGlobalLightSet);

    // parsing of actors can only begin after background has been parsed
    // to ensure proper support shadow
    // for now here is the hero
    this.mIllumHero = new Hero(this.kHeroSprite, null, 2, 6, this.mGlobalLightSet);

    this.mBoss = parser.parseBoss(this.kDyeBoss_Bottom, this.kDyeBoss_Top, this.kDyeBoss_CenterSpawn,
        this.kDyeBoss_Eyeballs, this.kDyeBoss_WeakPoint_Blue, this.kDyeBoss_WeakPoint_Green,
        this.kDyeBoss_WeakPoint_Red, null, this.mGlobalLightSet, this.mIllumHero);
    this.mIllumHero.setMBoss(this.mBoss);

    this.mNextLevel = parser.parseNextLevel();

    var t = this.mMsg.getText();
    this.mMsg = new FontRenderable(t);
    this.mMsg.setColor([1, 0, 0, 1]);
    this.mMsg.getXform().setPosition(10, 16);
    this.mMsg.setTextHeight(2);
 
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mMsg);

    // Add hero into the layer manager and as shadow caster
    // Hero should be added into Actor layer last
    // Hero can only be added as shadow caster after background is created
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mIllumHero);
    gEngine.LayerManager.addAsShadowCaster(this.mIllumHero);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mPowerUp);
    gEngine.LayerManager.addAsShadowCaster(this.mPowerUp);


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
    this.mMsg.draw(this.mCamera);

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

    gEngine.LayerManager.updateAllLayers();

    
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
        }, 1000);
    }

    var xf = this.mIllumHero.getXform();
    var xpos = this.mIllumHero.getXform().getXPos();
    var ypos = this.mIllumHero.getXform().getYPos();

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

    var m = this.mBoss.getMinions();
    this.mAllMinions.setMSet(m);

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

    this.mAllParticles.update();

    // Logic for getWeapon
    var getWeapon;
    var weaponBox = this.mPowerUp.getPhysicsComponent();
    collided = this.mIllumHero
        .getPhysicsComponent()
        .collided(weaponBox, collisionInfo);
    if (collided) {
        getWeapon = true;
        this.mIllumHero.setWeapon(getWeapon);
        this.mPowerUp
            .getXform()
            .setPosition(xpos + 0.4, ypos + 0.1);
    } else {
        getWeapon = false;
    }

    //Collisions between hero and ChaseMinion
    var arrM = this.mBoss.getMinions();

    for (var i = 0; i < arrM.length; i++) {
        var boxCM = arrM[i].getPhysicsComponent()

        collided = this.mIllumHero.getPhysicsComponent().collided(boxCM, collisionInfo);
        if (collided) {
            this.mRestart = true;
            gEngine.GameLoop.stop();
        }
    }

    var openDoor = this.mIllumHero.canOpenDoor();
    if (openDoor && xpos > 62) {
        var puerta = this.mAllDoors.getObjectAt(0)
        puerta.unlockDoor();
        if(openDoor && !puerta.getOpened()){
            puerta.setOpened(true);
            gEngine.AudioClips.playACue(this.kOpen);
        } 
    }
    if (xpos > 65) {
        this.mRestart = false;
        gEngine.GameLoop.stop();
    }
    //Logic for collisions and boss durability 

    if (getWeapon) {
        var projectiles = this.mIllumHero.getProjectiles();
        var pf = null;
        var i;
        console.log(this.mBoss.getLife());
        for (i = 0; i < projectiles.size(); i++) {
            pf = projectiles.getObjectAt(i).getPhysicsComponent();
            collided = this.mBoss.getPhysicsComponent().collided(pf, collisionInfo);
            if (collided) {
                this.mBoss.setLife(100);
                let x = this.mBoss.getXform().getXPos();
                let y = this.mBoss.getXform().getYPos();
                this.mAllParticles.addEmitterAt([x, y], 2, this.createParticle);
                if(this.mBoss.getLife() <= 0){
                    this.mCamera.shake(-2, -2, 20, 70);
                }
            }
        }

    }

    //Efects after destroy the boss
    if (this.mBoss.getLife() <= 0) {
        this.mIllumHero.setCanOpenDoor(true);
        let x = this.mBoss.getXform().getXPos();
        let y = this.mBoss.getXform().getYPos();
        this.mAllParticles.addEmitterAt([x, y], 2, this.createParticle);
        this.mIllumHero.setWeapon(false);
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
    gEngine.Physics.processObjSet(this.mIllumHero, this.mAllPlatforms);
    gEngine.Physics.processObjSet(this.mIllumHero, this.mAllWalls);
    gEngine.Physics.processObjSet(this.mIllumHero, this.mAllDoors);
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


GameLevel_02.prototype.createParticle = function (atX, atY) {
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

