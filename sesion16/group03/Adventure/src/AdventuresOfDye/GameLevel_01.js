/*
 * File: GameLevel_01.js
 * This is the logic of our game.
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, Hero, Camera, SceneFileParser, FontRenderable, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict"; // Operate in Strict mode such that variables must be declared before used!

function GameLevel_01(level) {
    this.kHeroSprite = "assets/hero_sprite.png";
    this.kMinionSprite = "assets/minion_sprite.png";
    this.kPlatform = "assets/platform.png";
    this.kPlatformNormal = "assets/platform_normal.png";
    this.kWall = "assets/wall.png";
    this.kWallNormal = "assets/wall_normal.png";
    this.kParticle = "assets/EMPPulse.png";
    this.kDoorTop = "assets/DoorInterior_Top.png";
    this.kDoorBot = "assets/DoorInterior_Bottom.png";
    this.kDoorSleeve = "assets/DoorFrame_AnimSheet.png";
    this.kButton = "assets/watch.png";
    this.kProjectileTexture = "assets/EMPPulse.png";
    this.kProjectileTexture2 = "assets/bullet.png";
    this.kimpact = "assets/particle.png";
    this.kShield = "assets/escudo.png";
    this.kKey = "assets/key.png";

    //Audio
    this.kTimer = "assets/sounds/bomb_timer.mp3"
    this.kOpen = "assets/sounds/open.mp3"


    //Text
    this.Mmsg = null;

    // specifics to the level
    this.kLevelFile = "assets/" + level + "/" + level + ".xml"; // e.g., assets/Level1/Level1.xml
    this.kBg = "assets/" + level + "/bg.png";
    this.kBgNormal = "assets/" + level + "/bg_normal.png";
    this.kBgLayer = "assets/" + level + "/bgLayer.png";
    this.kBgLayerNormal = "assets/" + level + "/bgLayer_normal.png";

    this.kLevelFinishedPosition = 65;

    // The camera to view the scene
    this.mCamera = null;
    this.mPeekCam = null;
    this.mShowPeek = false;

    this.mMatMsg = null;

    // the hero and the support objects
    this.mHero = null;
    this.mIllumHero = null;
    this.mPowerUp = null;
    this.mKey = null;

    this.mGlobalLightSet = null;

    this.mThisLevel = level;
    this.mNextLevel = null;
    this.mRestart = false;
    this.mImpact = false;

    this.mLgtIndex = 2;
    this.mLgtRotateTheta = 0;

    this.mAllWalls = new GameObjectSet();
    this.mAllPlatforms = new GameObjectSet();
    this.mAllDoors = new GameObjectSet();
    this.mAllMinions = new GameObjectSet();
    this.mAllShields = new GameObjectSet();
    this.mAllParticles = new ParticleGameObjectSet();
}
gEngine.Core.inheritPrototype(GameLevel_01, Scene);

GameLevel_01.prototype.loadScene = function () {
    gEngine.TextFileLoader.loadTextFile(
        this.kLevelFile,
        gEngine.TextFileLoader.eTextFileType.eXMLFile
    );
    gEngine.Textures.loadTexture(this.kHeroSprite);
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kPlatform);
    gEngine.Textures.loadTexture(this.kPlatformNormal);
    gEngine.Textures.loadTexture(this.kWall);
    gEngine.Textures.loadTexture(this.kWallNormal);
    gEngine.Textures.loadTexture(this.kParticle);
    gEngine.Textures.loadTexture(this.kDoorTop);
    gEngine.Textures.loadTexture(this.kDoorBot);
    gEngine.Textures.loadTexture(this.kDoorSleeve);
    gEngine.Textures.loadTexture(this.kButton);
    gEngine.Textures.loadTexture(this.kProjectileTexture);
    gEngine.Textures.loadTexture(this.kProjectileTexture2);
    gEngine.Textures.loadTexture(this.kShield);
    gEngine.Textures.loadTexture(this.kKey);

    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kBgNormal);
    gEngine.Textures.loadTexture(this.kBgLayer);
    gEngine.Textures.loadTexture(this.kBgLayerNormal);
    gEngine.Textures.loadTexture(this.kimpact);
    gEngine.AudioClips.loadAudio(this.kTimer);
    gEngine.AudioClips.loadAudio(this.kOpen);
};

GameLevel_01.prototype.unloadScene = function () {
    gEngine.LayerManager.cleanUp();

    gEngine.TextFileLoader.unloadTextFile(this.kLevelFile);
    gEngine.Textures.unloadTexture(this.kHeroSprite);
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kPlatform);
    gEngine.Textures.unloadTexture(this.kPlatformNormal);
    gEngine.Textures.unloadTexture(this.kWall);
    gEngine.Textures.unloadTexture(this.kWallNormal);
    gEngine.Textures.unloadTexture(this.kParticle);
    gEngine.Textures.unloadTexture(this.kDoorTop);
    gEngine.Textures.unloadTexture(this.kDoorBot);
    gEngine.Textures.unloadTexture(this.kDoorSleeve);
    gEngine.Textures.unloadTexture(this.kButton);
    gEngine.Textures.unloadTexture(this.kProjectileTexture);
    gEngine.Textures.unloadTexture(this.kProjectileTexture2);
    gEngine.Textures.unloadTexture(this.kShield);
    gEngine.Textures.unloadTexture(this.kKey);

    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.kBgNormal);
    gEngine.Textures.unloadTexture(this.kBgLayer);
    gEngine.Textures.unloadTexture(this.kBgLayerNormal);
    gEngine.Textures.unloadTexture(this.kimpact);
    gEngine.AudioClips.unloadAudio(this.kTimer);
    gEngine.AudioClips.unloadAudio(this.kOpen);

    if (this.mRestart === true) {
        var nextLevel = new GameLevel_01("Level1"); // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    } else {
        var nextLevel = new GameLevel_02("Level2", this.mMsg ); // next level to be loaded
        gEngine.Core.startScene(nextLevel);
    }
};

GameLevel_01.prototype.initialize = function () {

    var timer = this.kTimer;
    setTimeout(function () {    
        gEngine.AudioClips.playBackgroundAudio(timer); 
    }, 1000);

    // set ambient lighting
    gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(0.2);

    // parse the entire scene
    var parser = new SceneFileParser(this.kLevelFile);
    this.mCamera = parser.parseCamera();
    this.mGlobalLightSet = parser.parseLights();

    var m = parser.parseMinions(this.kMinionSprite, null, this.mGlobalLightSet);
    var i;
    for (i = 0; i < m.length; i++) {
        this.mAllMinions.addToSet(m[i]);
    }
    // parse background, needs the camera as a reference for parallax
    parser.parseBackground(this.mThisLevel, this.mCamera, this.mGlobalLightSet);

    var w = parser.parseWall(this.kWall, this.kWallNormal, this.mGlobalLightSet);
    for (i = 0; i < w.length; i++) {
        this.mAllWalls.addToSet(w[i]);
    }

    var p = parser.parsePlatform(
        this.kPlatform,
        this.kPlatformNormal,
        this.mGlobalLightSet
    );
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

    this.mPowerUp = new Button(0, 12, this.kButton, 0, this.mGlobalLightSet);
    this.mKey = new Key(60, 9, this.kKey, this.mGlobalLightSet);
    // parsing of actors can only begin after background has been parsed
    // to ensure proper support shadow
    // for now here is the hero
    this.mIllumHero = new Hero(
        this.kHeroSprite,
        null,
        2,
        6,
        this.mGlobalLightSet
    );

    this.mNextLevel = parser.parseNextLevel();

    //Initialize text properties

    this.mMsg = new FontRenderable("80");
    this.mMsg.setColor([1, 0, 0, 1]);
    this.mMsg.getXform().setPosition(10, 16);
    this.mMsg.setTextHeight(2);
    // Add hero into the layer manager and as shadow caster
    // Hero should be added into Actor layer last
    // Hero can only be added as shadow caster after background is created
    // gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mMsg)
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mMsg);

    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mIllumHero);
    gEngine.LayerManager.addAsShadowCaster(this.mIllumHero);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mKey);
    gEngine.LayerManager.addAsShadowCaster(this.mKey);
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, this.mPowerUp);
    gEngine.LayerManager.addAsShadowCaster(this.mPowerUp);

    var s = parser.parseShields(this.kShield, this.mGlobalLightSet);
    for (i = 0; i < s.length; i++) {
        this.mAllShields.addToSet(s[i]);
    }

    // gEngine.AudioClips.playBackgroundAudio(this.kCue);

    this.mPeekCam = new Camera(vec2.fromValues(0, 0), 64, [0, 0, 320, 180], 2);
    this.mShowPeek = false;
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
GameLevel_01.prototype.draw = function () {
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
GameLevel_01.prototype.update = function () {
    this.mCamera.update(); // to ensure proper interpolated movement effects

    gEngine.LayerManager.updateAllLayers();

    //Implment about the timer (left function implement)
    var ms = this.mMsg;
    // var timer = this.kTimer;
    var v = parseInt(ms.getText(), 10);
    if (v == 0) {
        v = 60;
        this.mRestart = true;
        gEngine.GameLoop.stop();
    } else {
        setTimeout(function () {
            v = v - 1;
            ms.setText(String(v));
             
        }, 1000);
    }
    if (v % 5 == 0) {
        this.mCamera.shake(-2, -2, 20, 30);
    }

    var xf = this.mIllumHero.getXform();
    var xpos = this.mIllumHero.getXform().getXPos();
    var ypos = this.mIllumHero.getXform().getYPos();
    if (ypos < 0){
        this.mRestart = true;
        gEngine.GameLoop.stop();
    }
    this.mMsg.getXform().setPosition(xpos, 16);

    this.mCamera.setWCCenter(xf.getXPos(), 8);
    var p = vec2.clone(xf.getPosition());
    //p[0] -= 8;
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
        collided = this.mIllumHero
            .getPhysicsComponent()
            .collided(minionBox, collisionInfo);
        if (collided) {
            this.mRestart = true;
            gEngine.GameLoop.stop();
        }
    }
    this.mAllParticles.update();

    // Get shield
    var getShield;
    var ShieldBox = this.mAllShields.getObjectAt(0).getPhysicsComponent();
    collided = this.mIllumHero
        .getPhysicsComponent()
        .collided(ShieldBox, collisionInfo);
    if (collided) {
        getShield = true;
        this.mAllShields
            .getObjectAt(0)
            .getXform()
            .setPosition(xpos - 0.3, ypos);
    } else {
        getShield = false;
    }

    var j;
    for (i = 0; i < this.mAllMinions.size(); i++) {
        var p = this.mAllMinions.getObjectAt(i).getProjectiles();

        for (j = 0; j < p.size(); j++) {
            var pBox = p.getObjectAt(j).getPhysicsComponent();
            collided = this.mIllumHero
                .getPhysicsComponent()
                .collided(pBox, collisionInfo);
            if (collided) {
                if (getShield) {
                    let x = this.mIllumHero.getXform().getXPos();
                    let y = this.mIllumHero.getXform().getYPos();
                    this.mAllParticles.addEmitterAt([x, y], 1, this.createParticle);
                    p.getObjectAt(j).setSizeDelta(0);
                    this.mImpact = false;
                } else {
                    let x = this.mIllumHero.getXform().getXPos();
                    let y = this.mIllumHero.getXform().getYPos();
                    this.mAllParticles.addEmitterAt([x, y], 2, this.createParticle);
                    this.mImpact = true;
                }
            }
        }
    }

    if (this.mImpact && this.mAllParticles.mEmitterSet.length == 0) {
        this.mRestart = true;
        gEngine.GameLoop.stop();
    }

    //Upgrade related to the slow of projectiles
    if (this.mPowerUp.getButtonState()) {
        // Become slow proyectil mode
        for (var i = 0; i < this.mAllMinions.size(); i++) {
            var p1 = this.mAllMinions.getObjectAt(i).getProjectiles();
            for (var j = 0; j < p1.size(); j++) {
                p1.getObjectAt(j).setSpeed(0.15);
            }
        }
    }

    var buttonBox = this.mPowerUp.getPhysicsComponent();
    collided = this.mIllumHero
        .getPhysicsComponent()
        .collided(buttonBox, collisionInfo);
    if (collided) {
        this.mPowerUp.pressButton();
    }

    var keyBox = this.mKey.getPhysicsComponent();
    collided = this.mIllumHero.getPhysicsComponent().collided(keyBox, collisionInfo);
    if (collided){
        this.mIllumHero.setCanOpenDoor(true);        
    }
    var openDoor = this.mIllumHero.canOpenDoor();
    if(openDoor){
        this.mKey.portarLlave(xpos, ypos);
    }
    if (openDoor && xpos > 62) {
        var puerta = this.mAllDoors.getObjectAt(0)
        puerta.unlockDoor();
        if(openDoor && !puerta.getOpened()){
            puerta.setOpened(true);
            gEngine.AudioClips.playACue(this.kOpen);
        }  
    }

    if (this.mIllumHero.getXform().getXPos() > this.kLevelFinishedPosition) {
        this.mRestart = false;
        gEngine.GameLoop.stop();
    }
};

GameLevel_01.prototype._physicsSimulation = function () {
    // Hero platform
    gEngine.Physics.processObjSet(this.mIllumHero, this.mAllPlatforms);
    gEngine.Physics.processObjSet(this.mIllumHero, this.mAllWalls);
    gEngine.Physics.processObjSet(this.mIllumHero, this.mAllDoors);

    // Minion platform
    gEngine.Physics.processSetSet(this.mAllMinions, this.mAllPlatforms);
};

GameLevel_01.prototype.createParticle = function (atX, atY) {
    var life = 30 + Math.random() * 200;
    var p = new ParticleGameObject("assets/particle.png", atX, atY, life);
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
