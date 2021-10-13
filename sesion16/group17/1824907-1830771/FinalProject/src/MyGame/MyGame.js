"use strict";

function MainGameScene(){

    //List of Cameras
    this.mMainCamera = null;    //Camera for gameplay
    this.mSensorCamera = null;  //Camera for Sensor
    
    //Light Control variables
    this.mGlobalLightSet = null;
    this.mLinternLights = null;   //pointer to next drone light to apply
    this.mWallLights = null;    //pointer to next Wall light to apply
    
    //List of Objects
    this.mHero = null;
    this.mHealthBar = null;
    this.mObjectSet = [];
    this.mMinion = null;
    this.mWall = null;
    this.mRock = null;
    this.mLintern = null;
    this.mEnemySet = null; //Holds enemy objects spawned by the generator
    
    this.mScoreMsg = null;
    this.mScoreCountMsg = null;       //displays Score
    
    //Generator Variables
    this.mTimer;
    this.mInterval;
    this.mCountdown;   //The variable storing the interval
    this.mNext = null;  //the next object to spawn
    //Generator local variables
    this.kInitInterval = 1.5 * 60;   //wait X seconds before spawning (60 fps)    
    this.kFinalInterval = 0.5 * 60;  //X seconds in between spawning (60 fps)
    this.kDifficultyIncreaseTime = 120; //ticks of the timer between difficulty increases

    this.kLightMax = 20; //If this is changed, Shaders must be changed to accomodate new light maximum
    this.mLightCount;   //Is 3 during basic operations (Sensor, HeroPoint, HeroDir). Will increase in the prescence of Wall and Heal Linterns.
    
    //Camera Pan Control variables
    this.mCamPanSpeed = null;       
    this.kCamMaxSpeed = 1;
    this.kCamPanDelta = 0.03;  //rate at which camera speed changes
    //this.kCamPanInit = 0.5;
    //Minimum Pan Speed = 0. Variable can be added if desired
    
    //Game Assets we're using
    this.kBg = "assets/bg.png";
    this.kBgNormalMap = "assets/bg_normal.png";
    this.kColumn = "assets/objects/wall.png";   //Wall column
    this.kRock = "assets/objects/rock.png";             //rock
    this.kRockNormalMap = "assets/objects/rock_normal.png";
    this.kMinionSprite = "assets/objects/minion.png";   //bat
    this.kHeroSprite = "assets/objects/hero.png";    //hero
    this.kLinternSprite = "assets/objects/lintern.png";     //healing drone
    this.kBgMusic = "assets/sound/BGClip.mp3";
    this.kGrunt = "assets/sound/MyGame_cue.wav";
    
    //Game Score, measured in distance traveled before death
    this.mGameScore = null;
}
gEngine.Core.inheritPrototype(MainGameScene, Scene);

//Load required game assets
MainGameScene.prototype.loadScene = function () {
    //Textures
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kBgNormalMap);
    gEngine.Textures.loadTexture(this.kColumn);
    gEngine.Textures.loadTexture(this.kRock);    
    gEngine.Textures.loadTexture(this.kRockNormalMap);
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kHeroSprite);
    gEngine.Textures.loadTexture(this.kLinternSprite);
    
    //Audio
    //BGM turned off during tuning to enhance load times
    gEngine.AudioClips.loadAudio(this.kBgMusic);
    gEngine.AudioClips.loadAudio(this.kGrunt);
};

//Unload game assets, transition to next scene
MainGameScene.prototype.unloadScene = function () {
    gEngine.LayerManager.cleanUp();
    
    gEngine.Textures.unloadTexture(this.kBg);    
    gEngine.Textures.unloadTexture(this.kBgNormalMap);
    gEngine.Textures.unloadTexture(this.kColumn);
    gEngine.Textures.unloadTexture(this.kRock);
    gEngine.Textures.unloadTexture(this.kRockNormalMap);
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.unloadTexture(this.kHeroSprite);    
    gEngine.Textures.unloadTexture(this.kLinternSprite);
    
    gEngine.AudioClips.stopBackgroundAudio();
   // gEngine.AudioClips.unloadAudio(this.kBgMusic);    //bgMusic is huge, so make sure that gets preloaded
    gEngine.AudioClips.unloadAudio(this.kGrunt);
    
    //Scene transitions here: No triggers yet
        // Step B: starts the next level
    // starts the next level
    var nextLevel = new GameOverScene(Math.floor(this.mGameScore));  // next level to be loaded
    gEngine.Core.startScene(nextLevel);
};

//Draw everything to Canvas
MainGameScene.prototype.draw = function () {
    //Clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
    //Draw everything for the main cameras
    this.drawAll(this.mMainCamera);
    this.drawAll(this.mSensorCamera);
};

MainGameScene.prototype.drawAll = function (camera) {
    camera.setupViewProjection();
    gEngine.LayerManager.drawAllLayers(camera);
};