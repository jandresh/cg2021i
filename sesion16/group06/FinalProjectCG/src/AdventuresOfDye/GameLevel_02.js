"use strict"; // Operate in Strict mode such that variables must be declared before used!

function GameLevel_02(level) {
    this.kHeroSprite = "assets/hero_sprite2.png";
    this.kMinionSprite = "assets/minion_sprite2.png";
    this.kPlatform = "assets/platform2.png";
    this.kPlatformNormal = "assets/platform_normal2.png";
    this.kWeapon = "assets/weapon.png";
    this.kHealthHero = "assets/health.png";
    this.kHealthBoss = "assets/health.png";
    this.kBox = "assets/box.png";
    this.kWall = "assets/wall2.png";
    this.kWallNormal = "assets/wall_normal2.png";
    this.kParticle = "assets/particle.png";
    this.kProjectileTexture = "assets/EMPPulse2.png";

    // specifics to the level
    this.kLevelFile = "assets/" + level + "/" + level + ".xml"; // e.g., assets/Level1/Level1.xml
    this.kBg = "assets/" + level + "/bg2.png";
    this.kBgNormal = "assets/" + level + "/bg_normal2.png";
    this.kBgLayer = "assets/" + level + "/bgLayer2.png";
    this.kBgLayerNormal = "assets/" + level + "/bgLayer_normal2.png";

    this.kDyeBoss_Bottom = "assets/" + level + "/DyeBoss_Bottom.png";
    this.kDyeBoss_Top = "assets/" + level + "/DyeBoss_Top.png";
    this.kDyeBoss_CenterSpawn = "assets/" + level + "/DyeBoss_CenterSpawn.png";
    this.kDyeBoss_Eyeballs = "assets/" + level + "/DyeBoss_Eyeballs.png";
    this.kDyeBoss_WeakPoint_Blue = "assets/" + level + "/DyeBoss_WeakPoint_Blue.png";
    this.kDyeBoss_WeakPoint_Green = "assets/" + level + "/DyeBoss_WeakPoint_Green.png";
    this.kDyeBoss_WeakPoint_Red = "assets/" + level + "/DyeBoss_WeakPoint_Red.png";
    this.kBoss = "assets/" + level + "/Boss2.png";


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

    this.mAllBosses = new GameObjectSet();
    this.mAllPlatforms = new GameObjectSet();
    this.mAllWeapons = new GameObjectSet();
    this.mAllHealthsHero = new GameObjectSet();
    this.mAllHealthsBoss = new GameObjectSet();
    this.mAllBoxes = new GameObjectSet();
    this.mAllWalls = new GameObjectSet();
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
    gEngine.Textures.loadTexture(this.kWeapon);
    gEngine.Textures.loadTexture(this.kHealthHero);
    gEngine.Textures.loadTexture(this.kHealthBoss);
    gEngine.Textures.loadTexture(this.kBox);
    gEngine.Textures.loadTexture(this.kWall);
    gEngine.Textures.loadTexture(this.kWallNormal);
    gEngine.Textures.loadTexture(this.kParticle);
    gEngine.Textures.loadTexture(this.kProjectileTexture);

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
    gEngine.Textures.loadTexture(this.kBoss);
};

GameLevel_02.prototype.unloadScene = function () {
    gEngine.LayerManager.cleanUp();

    gEngine.TextFileLoader.unloadTextFile(this.kLevelFile);
    gEngine.Textures.unloadTexture(this.kHeroSprite);
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kPlatform);
    gEngine.Textures.unloadTexture(this.kPlatformNormal);
    gEngine.Textures.unloadTexture(this.kWeapon);
    gEngine.Textures.unloadTexture(this.kHealthHero);
    gEngine.Textures.unloadTexture(this.kHealthBoss);
    gEngine.Textures.unloadTexture(this.kBox);
    gEngine.Textures.unloadTexture(this.kWall);
    gEngine.Textures.unloadTexture(this.kWallNormal);
    gEngine.Textures.unloadTexture(this.kParticle);
    gEngine.Textures.unloadTexture(this.kProjectileTexture);

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
    gEngine.Textures.unloadTexture(this.kBoss);

    if (this.mRestart === true) {
        var nextLevel = new GameLevel_01("Level1"); // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    } else {
        var nextLevel = new GameLevel_02(this.mNextLevel); // next level to be loaded
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

    var we = parser.parseWeapons(this.kWeapon, this.mGlobalLightSet);
    var i;
    for (i = 0; i < we.length; i++) {
        this.mAllWeapons.addToSet(we[i]);
    }

    var hh = parser.parseHealthsHero(this.kHealthHero, this.mGlobalLightSet);
    for (i = 0; i < hh.length; i++) {
        this.mAllHealthsHero.addToSet(hh[i]);
    }

    var hb = parser.parseHealthsBoss(this.kHealthBoss, this.mGlobalLightSet);
    for (i = 0; i < hb.length; i++) {
        this.mAllHealthsBoss.addToSet(hb[i]);
    }

    var bo = parser.parseBoxes(this.kBox, this.mGlobalLightSet);
    for (i = 0; i < bo.length; i++) {
        this.mAllBoxes.addToSet(bo[i]);
    }

    var p = parser.parsePlatform(this.kPlatform, this.kPlatformNormal, this.mGlobalLightSet);
    for (i = 0; i < p.length; i++) {
        this.mAllPlatforms.addToSet(p[i]);
    }

    var w = parser.parseWall(this.kWall, this.kWallNormal, this.mGlobalLightSet);
    for (i = 0; i < w.length; i++) {
        this.mAllWalls.addToSet(w[i]);
    }

    // parsing of actors can only begin after background has been parsed
    // to ensure proper support shadow
    // for now here is the hero
    this.mIllumHero = new Hero(this.kHeroSprite, null, 1, 1, this.mGlobalLightSet);

    // var b = parser.parseBoss(this.kDyeBoss_Bottom, this.kDyeBoss_Top, this.kDyeBoss_CenterSpawn,
    //     this.kDyeBoss_Eyeballs, this.kDyeBoss_WeakPoint_Blue, this.kDyeBoss_WeakPoint_Green,
    //     this.kDyeBoss_WeakPoint_Red, null, this.mGlobalLightSet, this.mIllumHero);
    var b = parser.parseBoss(this.kBoss, null, this.mGlobalLightSet, this.mIllumHero);
    this.mAllBosses.addToSet(b);

    this.mNextLevel = parser.parseNextLevel();

    this.mMsg = new FontRenderable("Controls");
    this.mMsg.setColor([1, 1, 1, 1]);
    this.mMsg.getXform().setPosition(-13.5, 5);
    this.mMsg.setTextHeight(0.7);

    this.mMsg2 = new FontRenderable("P: Open mini-map");
    this.mMsg2.setColor([1, 1, 1, 1]);
    this.mMsg2.getXform().setPosition(-13.5, 4);
    this.mMsg2.setTextHeight(0.7);

    this.mMsg3 = new FontRenderable("M: Shoot");
    this.mMsg3.setColor([1, 1, 1, 1]);
    this.mMsg3.getXform().setPosition(-13.5, 3);
    this.mMsg3.setTextHeight(0.7);

    this.mMsg4 = new FontRenderable("Good Job!");
    this.mMsg4.setColor([1, 1, 1, 1]);
    this.mMsg4.getXform().setPosition(30, 11);
    this.mMsg4.setTextHeight(0);

    this.mMsg5 = new FontRenderable("Created by:");
    this.mMsg5.setColor([1, 1, 1, 1]);
    this.mMsg5.getXform().setPosition(30, 9);
    this.mMsg5.setTextHeight(0);

    this.mMsg6 = new FontRenderable("Andres Felipe Garcia Gaviria");
    this.mMsg6.setColor([1, 1, 1, 1]);
    this.mMsg6.getXform().setPosition(30, 8);
    this.mMsg6.setTextHeight(0);

    this.mMsg7 = new FontRenderable("Juan Sebastian Grajales Cruz");
    this.mMsg7.setColor([1, 1, 1, 1]);
    this.mMsg7.getXform().setPosition(30, 7);
    this.mMsg7.setTextHeight(0);

    this.mMsg8 = new FontRenderable("Universidad del Valle");
    this.mMsg8.setColor([1, 1, 1, 1]);
    this.mMsg8.getXform().setPosition(30, 5);
    this.mMsg8.setTextHeight(0);

    gEngine.LayerManager.addToLayer(gEngine.eLayer.eFront, this.mMsg);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eFront, this.mMsg2);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eFront, this.mMsg3);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eFront, this.mMsg4);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eFront, this.mMsg5);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eFront, this.mMsg6);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eFront, this.mMsg7);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eFront, this.mMsg8);

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
        32,
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

    this.mAllParticles.draw(this.mCamera);

    if (this.mShowPeek) {
        this.mPeekCam.setupViewProjection();
        gEngine.LayerManager.drawAllLayers(this.mPeekCam);
    }
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
GameLevel_02.prototype.update = function () {
    this.mCamera.update(); // to ensure proper interpolated movement effects
    this.mAllParticles.update(this.mAllParticles);
    gEngine.LayerManager.updateAllLayers();

    var xf = this.mIllumHero.getXform();
    this.mCamera.setWCCenter(xf.getXPos(), 8);
    var p = vec2.clone(xf.getPosition());
    if (this.mAllBosses.mSet.length > 0) {
        var cboss = vec2.clone(this.mAllBosses.getObjectAt(0).getXform().getPosition());
    }
    var i, j, k;
    this.mGlobalLightSet.getLightAt(this.mLgtIndex).set2DPosition(p);

    // control the selected light
    //    var msg = "L=" + this.mLgtIndex + " ";
    //    msg += this._lightControl();
    //    this.mMsg.setText(msg);

    // msg = this._selectCharacter();
    // msg += this.materialControl();

    if (this.mShowPeek) {
        this.mPeekCam.setWCCenter(p[0] + 8, 8);
        this.mPeekCam.update();
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.P)) {
        this.mShowPeek = !this.mShowPeek;
    }

    // Position Health Hero
    for (i = 0; i < this.mAllHealthsHero.size(); i++) {
        this.mAllHealthsHero.getObjectAt(i).getXform().setXPos(p[0] - 1 + i);
        this.mAllHealthsHero.getObjectAt(i).getXform().setYPos(p[1] + 2);
    }

    // Position Health Boss
    for (i = 0; i < this.mAllHealthsBoss.size(); i++) {
        this.mAllHealthsBoss.getObjectAt(i).getXform().setXPos(cboss[0] - 4.5 + i);
        this.mAllHealthsBoss.getObjectAt(i).getXform().setYPos(cboss[1] + 5.7);
    }

    // physics simulation
    this._physicsSimulation();

    var platBox;
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

    for (i = 0; i < this.mAllBoxes.size(); i++) {
        var box = this.mAllBoxes.getObjectAt(i).getPhysicsComponent();
        collided = this.mIllumHero.getJumpBox().collided(box, collisionInfo);
        if (collided) {
            this.mIllumHero.canJump(true);
            break;
        }
    }

    for (i = 0; i < this.mAllBoxes.size(); i++) {
        var box1 = this.mAllBoxes.getObjectAt(i).getPhysicsComponent();
        for (j = 0; j < this.mAllBoxes.size(); j++) {
            var box2 = this.mAllBoxes.getObjectAt(j).getPhysicsComponent();
            if ((box1 !== box2) && (box1.collidedAxis(box2, collisionInfo) === 'y')) {

                box2.getXform().setXPos(box1.getXform().getXPos());
            }
        }
    }

    for (i = 0; i < this.mAllWeapons.size(); i++) {
        var weapon = this.mAllWeapons.getObjectAt(i).getPhysicsComponent();
        collided = this.mIllumHero.getPhysicsComponent().collided(weapon, collisionInfo);
        if (collided) {
            var p = this._createParticle(this.mAllWeapons.getObjectAt(i).mRenderComponent.mXform.mPosition[0], this.mAllWeapons.getObjectAt(i).mRenderComponent.mXform.mPosition[1]);
            this.mAllParticles.addToSet(p);
            this.mAllWeapons.mSet[i].mVisible = false;
            this.mAllWeapons.getObjectAt(i).pressWeapon();
            this.mIllumHero.weaponHero(true);
            if (this.mAllWeapons.getObjectAt(i).getTickInterval(20)) {
                this.mAllWeapons.mSet.splice(i, 1);
            }
            break;
        }
    }

    // Colition with projectils hero
    if (this.mAllBosses.mSet.length > 0) {
        for (i = 0; i < this.mIllumHero.getProjectiles().size(); i++) {
            var pBox = this.mIllumHero.getProjectiles().getObjectAt(i).getPhysicsComponent();
            collided = this.mAllBosses.getObjectAt(0).getPhysicsComponent().collided(pBox, collisionInfo);
            if (collided) {
                if (this.mAllHealthsBoss.mSet.length > 0) {
                    this.mAllHealthsBoss.getObjectAt(this.mAllHealthsBoss.mSet.length - 1).mVisible = false;
                    this.mAllHealthsBoss.mSet.splice(this.mAllHealthsBoss.mSet.length - 1, 1);
                    this.mIllumHero.getProjectiles().mSet.splice(i, 1);
                }
                // if (this.mAllHealthsBoss.mSet.length === 0) {
                //     var p = this._createParticle(cboss[0], cboss[1]);
                //     this.mAllParticles.addToSet(p);
                //     if (this.mAllBosses.getObjectAt(0).getTickIntervalRemove(50)) {
                //         this.mAllBosses.getObjectAt(0).remove();
                //         this.mAllBosses.mSet.splice(0, 1);
                //     }
                //     break;
                // }
            }
        }
        if (this.mAllHealthsBoss.mSet.length === 0) {
            var p = this._createParticle(cboss[0], cboss[1]);
            this.mAllParticles.addToSet(p);
            if (this.mAllBosses.getObjectAt(0).getTickIntervalRemove(200)) {
                this.mAllBosses.getObjectAt(0).remove();
                this.mAllBosses.mSet.splice(0, 1);
            }
        }
    }


    if (this.mAllBosses.mSet.length > 0) {
        for (i = 0; i < this.mAllBosses.getObjectAt(0).mAllMinions.length; i++) {
            var m = this.mAllBosses.getObjectAt(0).mAllMinions[i];
            var ph = this.mIllumHero.getProjectiles();
            for (j = 0; j < ph.size(); j++) {
                var pBox = ph.getObjectAt(j).getPhysicsComponent();
                collided = m.getPhysicsComponent().collided(pBox, collisionInfo);
                if (collided) {
                    this.mAllBosses.getObjectAt(0).mAllMinions[i].remove();
                    this.mAllBosses.getObjectAt(0).mAllMinions.splice(i, 1);
                    ph.mSet.splice(j, 1);
                }
            }
        }
    }

    for (i = 0; i < this.mAllMinions.size(); i++) {
        var m = this.mAllMinions.getObjectAt(i);
        var ph = this.mIllumHero.getProjectiles();
        for (j = 0; j < ph.size(); j++) {
            var pBox = ph.getObjectAt(j).getPhysicsComponent();
            collided = m.getPhysicsComponent().collided(pBox, collisionInfo);
            if (collided) {
                this.mAllMinions.getObjectAt(i).remove()
                this.mAllMinions.mSet.splice(i, 1);
                ph.mSet.splice(j, 1);
            }
        }
    }

    for (i = 0; i < this.mAllBoxes.size(); i++) {
        var bo = this.mAllBoxes.getObjectAt(i);
        var ph = this.mIllumHero.getProjectiles();
        for (j = 0; j < ph.size(); j++) {
            var pBox = ph.getObjectAt(j).getPhysicsComponent();
            collided = bo.getPhysicsComponent().collided(pBox, collisionInfo);
            if (collided) {
                ph.mSet.splice(j, 1);
            }
        }
    }

    for (i = 0; i < this.mAllWalls.size(); i++) {
        var w = this.mAllWalls.getObjectAt(i);
        var ph = this.mIllumHero.getProjectiles();
        for (j = 0; j < ph.size(); j++) {
            var pBox = ph.getObjectAt(j).getPhysicsComponent();
            collided = w.getPhysicsComponent().collided(pBox, collisionInfo);
            if (collided) {
                ph.mSet.splice(j, 1);
            }
        }
    }

    for (i = 0; i < this.mAllPlatforms.size(); i++) {
        var p = this.mAllPlatforms.getObjectAt(i);
        var ph = this.mIllumHero.getProjectiles();
        for (j = 0; j < ph.size(); j++) {
            var pBox = ph.getObjectAt(j).getPhysicsComponent();
            collided = p.getPhysicsComponent().collided(pBox, collisionInfo);
            if (collided) {
                ph.mSet.splice(j, 1);
            }
        }
    }
    ///////////////////////

    // Colition hero with minions
    if (this.mAllBosses.mSet.length > 0) {
        for (i = 0; i < this.mAllBosses.getObjectAt(0).mAllMinions.length; i++) {
            var minionBox = this.mAllBosses.getObjectAt(0).mAllMinions[i].getPhysicsComponent();
            collided = this.mIllumHero.getPhysicsComponent().collided(minionBox, collisionInfo);
            if (collided) {
                this.mAllBosses.getObjectAt(0).mAllMinions[i].remove();
                this.mAllBosses.getObjectAt(0).mAllMinions.splice(i, 1);
                this.mAllHealthsHero.getObjectAt(this.mAllHealthsHero.mSet.length - 1).mVisible = false;
                this.mAllHealthsHero.mSet.splice(this.mAllHealthsHero.mSet.length - 1, 1);
                if (this.mAllHealthsHero.mSet.length === 0) { // Life is over
                    this.mRestart = true;
                    gEngine.GameLoop.stop();
                }
            }
        }
    }

    for (i = 0; i < this.mAllMinions.size(); i++) {
        var minionBox = this.mAllMinions.getObjectAt(i).getPhysicsComponent();
        collided = this.mIllumHero.getPhysicsComponent().collided(minionBox, collisionInfo);
        if (collided) {
            this.mAllMinions.getObjectAt(i).remove()
            this.mAllMinions.mSet.splice(i, 1);
            this.mAllHealthsHero.getObjectAt(this.mAllHealthsHero.mSet.length - 1).mVisible = false;
            this.mAllHealthsHero.mSet.splice(this.mAllHealthsHero.mSet.length - 1, 1);
            if (this.mAllHealthsHero.mSet.length === 0) { // Life is over
                this.mRestart = true;
                gEngine.GameLoop.stop();
            }
        }
    }

    // Colition with projectils minions
    for (i = 0; i < this.mAllMinions.size(); i++) {
        var p = this.mAllMinions.getObjectAt(i).getProjectiles();

        for (j = 0; j < p.size(); j++) {
            var pBox = p.getObjectAt(j).getPhysicsComponent();
            collided = this.mIllumHero.getPhysicsComponent().collided(pBox, collisionInfo);
            if (collided) {
                p.mSet.splice(j, 1);
                this.mAllHealthsHero.getObjectAt(this.mAllHealthsHero.mSet.length - 1).mVisible = false;
                this.mAllHealthsHero.mSet.splice(this.mAllHealthsHero.mSet.length - 1, 1);
                if (this.mAllHealthsHero.mSet.length === 0) { // Life is over
                    this.mRestart = true;
                    gEngine.GameLoop.stop();
                }
            }
        }
    }

    for (i = 0; i < this.mAllBoxes.size(); i++) {
        var bo = this.mAllBoxes.getObjectAt(i);
        for (j = 0; j < this.mAllMinions.size(); j++) {
            var p = this.mAllMinions.getObjectAt(j).getProjectiles();
            for (k = 0; k < p.size(); k++) {
                var pBox = p.getObjectAt(k).getPhysicsComponent();
                collided = bo.getPhysicsComponent().collided(pBox, collisionInfo);
                if (collided) {
                    p.mSet.splice(k, 1);
                }
            }
        }
    }

    for (i = 0; i < this.mAllWalls.size(); i++) {
        var w = this.mAllWalls.getObjectAt(i);
        for (j = 0; j < this.mAllMinions.size(); j++) {
            var p = this.mAllMinions.getObjectAt(j).getProjectiles();
            for (k = 0; k < p.size(); k++) {
                var pBox = p.getObjectAt(k).getPhysicsComponent();
                collided = w.getPhysicsComponent().collided(pBox, collisionInfo);
                if (collided) {
                    p.mSet.splice(k, 1);
                }
            }
        }
    }

    for (i = 0; i < this.mAllPlatforms.size(); i++) {
        var pl = this.mAllPlatforms.getObjectAt(i);
        for (j = 0; j < this.mAllMinions.size(); j++) {
            var p = this.mAllMinions.getObjectAt(j).getProjectiles();
            for (k = 0; k < p.size(); k++) {
                var pBox = p.getObjectAt(k).getPhysicsComponent();
                collided = pl.getPhysicsComponent().collided(pBox, collisionInfo);
                if (collided) {
                    p.mSet.splice(k, 1);
                }
            }
        }
    }
    ///////////////////////

    if (this.mAllBosses.mSet.length === 0) {
        this.mMsg4.setTextHeight(1);
        this.mMsg5.setTextHeight(0.7);
        this.mMsg6.setTextHeight(0.7);
        this.mMsg7.setTextHeight(0.7);
        this.mMsg8.setTextHeight(0.7);
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
    gEngine.Physics.processObjSet(this.mIllumHero, this.mAllBoxes);

    // Hero Minion
    //gEngine.Physics.processObjSet(this.mHero, this.mAllMinions);

    // Minion platform
    gEngine.Physics.processSetSet(this.mAllMinions, this.mAllPlatforms);

    // Box platform
    gEngine.Physics.processSetSet(this.mAllBoxes, this.mAllPlatforms);

    // Box box
    gEngine.Physics.processSetSet(this.mAllBoxes, this.mAllBoxes);

    // Box Wall
    gEngine.Physics.processSetSet(this.mAllBoxes, this.mAllWalls);

    // DyePack platform
    //gEngine.Physics.processSetSet(this.mAllDyePacks, this.mAllPlatforms);

    // DyePack Minions
    //gEngine.Physics.processSetSet(this.mAllDyePacks, this.mAllMinions);

    // Hero DyePack
    //gEngine.Physics.processObjSet(this.mHero, this.mAllDyePacks);
};

GameLevel_02.prototype._createParticle = function (atX, atY) {
    var life = 30 + Math.random() * 200;
    var p = new ParticleGameObject("assets/particle.png", atX, atY, life);
    p.getRenderable().setColor([1, 0, 0, 1]);

    // size of the particle
    var r = 0.5 + Math.random() * 2.5;
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