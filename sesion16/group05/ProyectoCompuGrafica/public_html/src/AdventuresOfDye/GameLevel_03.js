"use strict";  // Operate in Strict mode such that variables must be declared before used!

function GameLevel_03(level) {
    this.kHeroSprite = "assets/persona.png";
    this.kMinionSprite = "assets/minion_sprite.png";
    this.kPlatform = "assets/platform.png";
    this.kPlatformNormal = "assets/platform_normal.png";
    this.kWall = "assets/wall.png";
    this.kWallNormal = "assets/wall_normal.png";
    this.KBalitaTexture="assets/balita.png";

    // specifics to the level
    this.kLevelFile = "assets/" + level + "/" + level + ".xml";  // e.g., assets/Level1/Level1.xml
    this.kBg = "assets/" + level + "/bg.png";
    this.kBgNormal = "assets/" + level + "/bg.png";
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
    

    this.mThisLevel = level;
    this.mNextLevel = null;
    this.mRestart = false;
   

    this.mLgtIndex = 2;
    this.mLgtRotateTheta = 0;

    
}
gEngine.Core.inheritPrototype(GameLevel_03, Scene);

GameLevel_03.prototype.loadScene = function () {
    gEngine.TextFileLoader.loadTextFile(this.kLevelFile, gEngine.TextFileLoader.eTextFileType.eXMLFile);
    

    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.kBgNormal);
    gEngine.Textures.loadTexture(this.kBgLayer);
    gEngine.Textures.loadTexture(this.kBgLayerNormal);

};

GameLevel_03.prototype.unloadScene = function () {
    gEngine.LayerManager.cleanUp();

    gEngine.TextFileLoader.unloadTextFile(this.kLevelFile);
   

    gEngine.Textures.unloadTexture(this.kBg);
    gEngine.Textures.unloadTexture(this.kBgNormal);
    gEngine.Textures.unloadTexture(this.kBgLayer);
    gEngine.Textures.unloadTexture(this.kBgLayerNormal);

  

    if (this.mRestart===true)
    {
        var nextLevel = new GameLevel_01("Level1",this.life);  // next level to be loaded
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
    



    // parse background, needs the camera as a reference for parallax
    parser.parseImage( this.mCamera);

   
    this.mCamera.setWCCenter(5, -30);
    
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
GameLevel_03.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setupViewProjection();
    gEngine.LayerManager.drawAllLayers(this.mCamera);

    

    
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
GameLevel_03.prototype.update = function () {
    this.mCamera.update();  // to ensure proper interpolated movement effects
    
    gEngine.LayerManager.updateAllLayers();

    
    if(this.mCamera.getWCCenter()[1]<=55){
        this.mCamera.setWCCenter(15, this.mCamera.getWCCenter()[1] + 0.12);
    }
    
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.L)) {
        gEngine.GameLoop.stop();
    }

    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.O)){
        this.mRestart = true;
        gEngine.GameLoop.stop();
    }
    



};


