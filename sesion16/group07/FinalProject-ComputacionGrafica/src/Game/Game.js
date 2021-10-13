/*
 * File: Game.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, Scene, GameObjectset, TextureObject, Camera, vec2,
  Renderable, TextureRenderable, FontRenderable, SpriteRenderable, LightRenderable, IllumRenderable,
  GameObject, TiledGameObject, ParallaxGameObject, Hero, Minion, Dye, Light */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Game() {
    //File
    this.kFileLevel = "assets/Level1.xml";

    this.kTextures = {
        //background and shadowBackground
        background: "assets/images/backgrounds/background.png",
        shadowBackground: "assets/images/backgrounds/shadow_background.png",

        //Tileset
        bottom_left_edge: "assets/images/walls/bottom_left_edge.png",
        bottom_right_edge: "assets/images/walls/bottom_right_edge.png",
        bottom_tile: "assets/images/walls/bottom_tile.png",
        color: "assets/images/walls/color.png",
        color_medium: "assets/images/walls/color_medium.png",
        inner_corner_bottom_left: "assets/images/walls/inner_corner_bottom_left.png",
        inner_corner_bottom_right: "assets/images/walls/inner_corner_bottom_right.png",
        inner_corner_top_left: "assets/images/walls/inner_corner_top_left.png",
        inner_corner_top_right: "assets/images/walls/inner_corner_top_right.png",
        left_edge_repeating: "assets/images/walls/left_edge_repeating.png",
        platform_inner_repeating: "assets/images/walls/platform_inner_repeating.png",
        platform_left_edge: "assets/images/walls/platform_left_edge.png",
        platform_right_edge: "assets/images/walls/platform_right_edge.png",
        platform_single: "assets/images/walls/platform_single.png",
        left_tile: "assets/images/walls/left_tile.png",
        right_edge_repeating: "assets/images/walls/right_edge_repeating.png",
        right_tile: "assets/images/walls/right_tile.png",
        top_left_edge: "assets/images/walls/top_left_edge.png",
        top_right_edge: "assets/images/walls/top_right_edge.png",
        top_tile: "assets/images/walls/top_tile.png",
        toxic_tile: "assets/images/walls/toxic_tile.png",

        //Platform
        platform: "assets/images/platform/platform.png",

        //Waves
        wave_fire: "assets/images/wave/wave_fire.png",
        wave_water: "assets/images/wave/wave_water.png",

        //Door
        door_water: "assets/images/door/door_water.png",
        door_fire: "assets/images/door/door_fire.png",

        //PushButton
        push_button: "assets/images/push_button/push_button.png",

        //Diamons
        diamond_for_water: "assets/images/diamonds/diamond_for_water.png",
        diamond_for_fire: "assets/images/diamonds/diamond_for_fire.png",

        //Particles
        particle: "assets/images/particle/particle.png",

        //Characters
        water_character: "assets/images/characters/water_character.png",
        fire_character: "assets/images/characters/fire_character.png"

    };

    this.kNormals = {
        //background and shadowBackground
        background: "",
        shadowBackground: "",

        //Tileset
        bottom_left_edge: "assets/images/walls/bottom_left_edge_normal.png",
        bottom_right_edge: "assets/images/walls/bottom_right_edge_normal.png",
        bottom_tile: "assets/images/walls/bottom_tile_normal.png",
        color: "assets/images/walls/color_normal.png",
        color_medium: "assets/images/walls/color_medium_normal.png",
        inner_corner_bottom_left: "assets/images/walls/inner_corner_bottom_left_normal.png",
        inner_corner_bottom_right: "assets/images/walls/inner_corner_bottom_right_normal.png",
        inner_corner_top_left: "assets/images/walls/inner_corner_top_left_normal.png",
        inner_corner_top_right: "assets/images/walls/inner_corner_top_right_normal.png",
        left_edge_repeating: "assets/images/walls/left_edge_repeating_normal.png",
        platform_inner_repeating: "assets/images/walls/platform_inner_repeating_normal.png",
        platform_left_edge: "assets/images/walls/platform_left_edge_normal.png",
        platform_right_edge: "assets/images/walls/platform_right_edge_normal.png",
        platform_single: "assets/images/walls/platform_single_normal.png",
        left_tile: "assets/images/walls/left_tile_normal.png",
        right_edge_repeating: "assets/images/walls/right_edge_repeating_normal.png",
        right_tile: "assets/images/walls/right_tile_normal.png",
        top_left_edge: "assets/images/walls/top_left_edge_normal.png",
        top_right_edge: "assets/images/walls/top_right_edge_normal.png",
        top_tile: "assets/images/walls/top_tile_normal.png",
        toxic_tile: "assets/images/walls/toxic_tile_normal.png",

        //Platform
        platform: "assets/images/platform/platform_normal.png",

        //Waves
        wave_fire: "",
        wave_water: "",

        //Door
        door_water: "",
        door_fire: "",

        //PushButton
        push_button: "",

        //Diamons
        diamond_for_water: "",
        diamond_for_fire: "",

        //Particle
        particle: "",

        //Characters
        water_character: "assets/images/characters/water_character_normal.png",
        fire_character: "assets/images/characters/fire_character_normal.png"
    };

    this.kSounds = {
        background: "assets/sounds/background.mp3",
        death: "assets/sounds/death.mp3",
        diamond: "assets/sounds/diamond.mp3",
        ending: "assets/sounds/ending.mp3",
        finish: "assets/sounds/finish.mp3",
        fire_character_jump: "assets/sounds/fire_character_jump.mp3",
        water_character_jump: "assets/sounds/water_character_jump.mp3"
    };

    this.kMenuPause = {
        menu_pause_activate_sound: "assets/images/menu_pause/menu_pause_activate_sound/menu_pause_activate_sound.png",
        menu_pause_activate_sound_finish_game: "assets/images/menu_pause/menu_pause_activate_sound/menu_pause_activate_sound_finish_game.png",
        menu_pause_activate_sound_resume: "assets/images/menu_pause/menu_pause_activate_sound/menu_pause_activate_sound_resume.png",
        menu_pause_desactivate_sound: "assets/images/menu_pause/menu_pause_desactivate_sound/menu_pause_desactivate_sound.png",
        menu_pause_desactivate_sound_finish_game: "assets/images/menu_pause/menu_pause_desactivate_sound/menu_pause_desactivate_sound_finish_game.png",
        menu_pause_desactivate_sound_resume: "assets/images/menu_pause/menu_pause_desactivate_sound/menu_pause_desactivate_sound_resume.png",
    };

    this.mAllCameras = null;
    this.mGlobalLightSet = null;
    this.mAllWalls = null;
    this.mAllPlatforms = null;
    this.mAllWaves = null;
    this.mAllDoors = null;
    this.mAllPushButtons = null;
    this.mAllCharacters = null;
    this.mMenuPause = null;
    this.mMsg = null;
    this.mIsVisibleMap = false;
    this.mIsVisibleMenuPause = false;
    this.mParser = null;
    this.mAllParticles = new ParticleGameObjectSet();

    this.mPause = false;
    this.mLoadSelection = null;
    this.mCont = 0;
    this.mPrefixMenuPase = "";

};

gEngine.Core.inheritPrototype(Game, Scene);

Game.prototype.loadScene = function () {
    gEngine.TextFileLoader.loadTextFile(this.kFileLevel, gEngine.TextFileLoader.eTextFileType.eXMLFile);

    for (const key in this.kTextures) {
        if (this.kTextures[key] !== "") {
            gEngine.Textures.loadTexture(this.kTextures[key]);
        } else {
            this.kTextures[key] = null;
        }
    }

    for (const key in this.kNormals) {
        if (this.kNormals[key] !== "") {
            gEngine.Textures.loadTexture(this.kNormals[key]);
        } else {
            this.kNormals[key] = null;
        }
    }

    for (const key in this.kSounds) {
        if (this.kSounds[key] !== "") {
            gEngine.AudioClips.loadAudio(this.kSounds[key]);
        } else {
            this.kSounds[key] = null;
        }
    }

    for (const key in this.kMenuPause) {
        if (this.kMenuPause[key] !== "") {
            gEngine.Textures.loadTexture(this.kMenuPause[key]);
        } else {
            this.kMenuPause[key] = null;
        }
    }

};

Game.prototype.unloadScene = function () {
    gEngine.LayerManager.cleanUp();
    gEngine.TextFileLoader.unloadTextFile(this.kFileLevel);

    gEngine.AudioClips.stopBackgroundAudio();

    for (const key in this.kTextures) {
        if (this.kTextures[key] !== null) {
            gEngine.Textures.unloadTexture(this.kTextures[key]);
        }
    }

    for (const key in this.kNormals) {
        if (this.kNormals[key] !== null) {
            gEngine.Textures.unloadTexture(this.kNormals[key]);
        }
    }

    for (const key in this.kSounds) {
        if (this.kSounds[key] !== "") {
            gEngine.AudioClips.unloadAudio(this.kSounds[key]);
        } else {
            this.kSounds[key] = null;
        }
    }

    for (const key in this.kMenuPause) {
        if (this.kMenuPause[key] !== "") {
            gEngine.Textures.unloadTexture(this.kMenuPause[key]);
        } else {
            this.kMenuPause[key] = null;
        }
    }
    
    if (this.mLoadSelection !== null) gEngine.Core.startScene(this.mLoadSelection);
};

Game.prototype.initialize = function () {
    // set ambient lighting
    gEngine.DefaultResources.setGlobalAmbientColor([0.5, 0.5, 0.5, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(1);

    // initialize parser
    this.mParser = new SceneFileParser(this.kFileLevel);

    // Camera
    this.mAllCameras = this.mParser.parseCameras();

    // Lights
    this.mGlobalLightSet = this.mParser.parseLights();

    // Background and shadowBackground
    this.mParser.parseBackgrounds(this.kTextures, this.kNormals, this.mGlobalLightSet, this.mAllCameras[0]);

    // Walls
    this.mAllWalls = this.mParser.parseWalls(this.kTextures, this.kNormals, this.mGlobalLightSet);

    // Platforms
    this.mAllPlatforms = this.mParser.parsePlatforms(this.kTextures, this.kNormals, this.mGlobalLightSet);

    // Doors 
    this.mAllDoors = this.mParser.parseDoors(this.kTextures, this.kNormals, this.mGlobalLightSet);

    // PushButtons
    this.mAllPushButtons = this.mParser.parsePushButton(this.kTextures, this.kNormals, this.mGlobalLightSet);

    // PushButtons
    this.mAllDiamons = this.mParser.parseDiamond(this.kTextures, this.kNormals, this.mGlobalLightSet);

    // Characters
    this.mAllCharacters = this.mParser.parseCharacters(this.kTextures, this.kNormals, this.mGlobalLightSet, this.kSounds);

    // Waves
    this.mAllWaves = this.mParser.parseWaves(this.kTextures, this.kNormals, this.mGlobalLightSet);

    // Score
    this.mMsg = new FontRenderable("");
    this.mMsg.setColor([1, 1, 1, 1]);
    this.mMsg.getXform().setPosition(0, 45);
    this.mMsg.setTextHeight(2);

    // Menu Pause
    this.mMenuPause = new LightRenderable(this.kMenuPause["menu_pause_activate_sound"]);
    this.mMenuPause.addLight(this.mGlobalLightSet.getLightAt(0));
    this.mMenuPause.getXform().setSize(90, 90);
    
    // Reproduce background sound
    gEngine.AudioClips.playBackgroundAudio(this.kSounds["background"]);

    // Add the SCORE message to the EHUD layer
    gEngine.LayerManager.addToLayer(gEngine.eLayer.eHUD, this.mMsg);

};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
Game.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mAllCameras[0].setupViewProjection();
    gEngine.LayerManager.drawAllLayers(this.mAllCameras[0]);
    this.mAllParticles.draw(this.mAllCameras[0]);

    // Minimap
    if (this.mIsVisibleMap) {
        this.mAllCameras[1].setupViewProjection();

        for (let i = 0; i < 4; i++) {
            gEngine.LayerManager.drawLayer(i, this.mAllCameras[1]);

        }
        this.mAllParticles.draw(this.mAllCameras[1]);
    }

    // Menu pause
    if (this.mIsVisibleMenuPause) {
        this.mAllCameras[2].setupViewProjection();
        this.mMenuPause.draw(this.mAllCameras[2]);
        this.menuPause();
    }

};

// The update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
Game.prototype.update = function () {
    this.eventMenuPause();
    this.updateLevel1();
};

// Function that is responsible for updating level 1.
Game.prototype.updateLevel1 = function () {
    if (!this.mPause) {
        this.mAllCameras[0].update();
        gEngine.LayerManager.updateAllLayers();

        this.mAllParticles.update();

        // Object variables 
        let mWaterCharacter = this.mAllCharacters.getObjectAt(0);
        let mFireCharacter = this.mAllCharacters.getObjectAt(1);

        this.auroraCharacter(mWaterCharacter, 1);
        this.timeParticles();
        this.auroraCharacter(mFireCharacter, 2);
        this.colCharacterWave(mWaterCharacter, mFireCharacter);
        this.colCharacterDiamond(mWaterCharacter, mFireCharacter);
        this.colCharacterPushButton(mWaterCharacter, mFireCharacter);
        this.colCharacterDoor(mWaterCharacter, mFireCharacter);
        this.colCharacterParticle(mWaterCharacter.getXform(), mFireCharacter.getXform());
        this.physicsSimulation();
        this.miniMapa();
        this.msjScore(mWaterCharacter, mFireCharacter);
    }
};

// Function that is responsible for listening to the pause menu 
Game.prototype.eventMenuPause = function () {
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.P)) {
        this.mIsVisibleMenuPause = true;
        this.mPause = true;
    }
    this.mAllCameras[2].update();
};

// Function that is responsible for carrying out the different functionalities of the pause menu
Game.prototype.menuPause = function () {
    let x = gEngine.Input.getMousePosX();
    let y = gEngine.Input.getMousePosY();

    // Mute sound 
    if (y >= 507 && y <= 524) {
        if (x >= 464 && x <= 485) {
            if (gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)) {
                this.mPrefixMenuPase = "des";
                this.mMenuPause.setTexture(this.kMenuPause["menu_pause_" + this.mPrefixMenuPase + "activate_sound"]);
                gEngine.AudioClips.stopBackgroundAudio(this.kSounds["background"]);
            }
        }
    }

    // Unmute sound 
    if (y >= 507 && y <= 524) {
        if (x >= 487 && x <= 504) {
            if (gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)) {
                this.mPrefixMenuPase = "";
                this.mMenuPause.setTexture(this.kMenuPause["menu_pause_" + this.mPrefixMenuPase + "activate_sound"]);
                gEngine.AudioClips.playBackgroundAudio(this.kSounds["background"]);
            }
        }
    }

    // Resume
    if (y >= 417 && y <= 464) {
        if (x >= 358 && x <= 528) {
            this.mMenuPause.setTexture(this.kMenuPause["menu_pause_" + this.mPrefixMenuPase + "activate_sound_resume"]);
            if (gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)) {
                this.mIsVisibleMenuPause = false;
                this.mPause = false;
                this.mMenuPause.setTexture(this.kMenuPause["menu_pause_" + this.mPrefixMenuPase + "activate_sound"]);
            }
        }
    } else {
        this.mMenuPause.setTexture(this.kMenuPause["menu_pause_" + this.mPrefixMenuPase + "activate_sound"]);
    }

    // Resume exit button
    if (y >= 581 && y <= 646) {
        if (x >= 580 && x <= 642) {
            if (gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)) {
                this.mIsVisibleMenuPause = false;
                this.mPause = false;
                this.mMenuPause.setTexture(this.kMenuPause["menu_pause_" + this.mPrefixMenuPase + "activate_sound"]);
            }
        }
    }

    // Finish game
    if (y >= 339 && y <= 388) {
        if (x >= 368 && x <= 519) {
            this.mMenuPause.setTexture(this.kMenuPause["menu_pause_" + this.mPrefixMenuPase + "activate_sound_finish_game"]);
            if (gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)) {
                this.mLoadSelection = new MainMenu();
                gEngine.GameLoop.stop();
            }
        }
    }
};

// Function that is responsible for activating the physics of the game
Game.prototype.physicsSimulation = function () {
    gEngine.Physics.processSetSet(this.mAllCharacters, this.mAllWalls);
    gEngine.Physics.processSetSet(this.mAllCharacters, this.mAllPlatforms);
};

// Function that is responsible for activating and deactivating the minimap
Game.prototype.miniMapa = function () {
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        if (!this.mIsVisibleMap) {
            this.mIsVisibleMap = true;
        } else {
            this.mIsVisibleMap = false;
        }
    }
};

// Function that is responsible for showing the score of each of the characters
Game.prototype.msjScore = function (mWaterCharacter, mFireCharacter) {
    let msg = "Watergirl: " + mWaterCharacter.getScore() + " Fireboy: " + mFireCharacter.getScore();
    this.mMsg.setText(msg);
};

// Function that is responsible for creating the auroras of the characters
Game.prototype.auroraCharacter = function (character, pos) {
    let auroraCharacter = vec2.clone(character.getPhysicsComponent().getXform().getPosition());
    this.mGlobalLightSet.getLightAt(pos).set2DPosition(auroraCharacter);
};

// Function that is responsible for detecting collision between the character and his respective river
Game.prototype.colCharacterWave = function (mWaterCharacter, mFireCharacter) {
    for (let i = 0; i < this.mAllWaves.size(); i++) {
        let wave = this.mAllWaves.getObjectAt(i);
        let character = (wave.getPlayerCollision() === 0) ? mWaterCharacter : mFireCharacter;

        let col = (character !== null) ? character.getPhysicsComponent().collided(wave.getPhysicsComponent(), new CollisionInfo()) : false;

        if (col) {
            gEngine.AudioClips.playACue(this.kSounds["death"]);
            gEngine.AudioClips.playACue(this.kSounds["finish"]);
            this.mGlobalLightSet.getLightAt(wave.getPlayerCollision() + 1).setLightTo(false);
            character.setVisibility(false);
            this.mLoadSelection = new GameOverMenu();
            gEngine.GameLoop.stop();
        }
    }
};

// Function that is responsible for detecting collision between the character and his respective diamond
Game.prototype.colCharacterDiamond = function (mWaterCharacter, mFireCharacter) {
    for (let i = 0; i < this.mAllDiamons.size(); i++) {
        let diamond = this.mAllDiamons.getObjectAt(i);
        let character = (diamond.getPlayerCollision() === 0) ? mWaterCharacter : mFireCharacter;
        let col = (character !== null) ? character.getPhysicsComponent().collided(diamond.getPhysicsComponent(), new CollisionInfo()) : false;

        if (col) {
            gEngine.AudioClips.playACue(this.kSounds["diamond"]);
            diamond.setVisibility(false);
            character.incrementScore();
            this.mAllDiamons.removeFromSet(diamond);
        }
    }
};

// Function that is responsible for detecting collision between the character and his respective door
Game.prototype.colCharacterDoor = function (mWaterCharacter, mFireCharacter) {
    for (let i = 0; i < this.mAllDoors.size(); i++) {
        let door = this.mAllDoors.getObjectAt(i);
        let character = (door.getPlayerCollision() === 0) ? mWaterCharacter : mFireCharacter;
        let col = (character !== null) ? character.getPhysicsComponent().collided(door.getPhysicsComponent(), new CollisionInfo()) : false;

        if (col) {
            if (!(door.getStatus())) {
                door.activateAnimation();
                door.setStatus(true);
            }

            if (door.getStatus() && (door.getCont() < 50)) {
                door.increment();
            }

            if (door.getCont() == 50) {
                door.desactivateAnimation();
                character.setVisibility(false);
                character.setInDoor(true);
            }
        }
    }

    if (mWaterCharacter.getInDoor() && mFireCharacter.getInDoor()) {
        this.mLoadSelection = new WinMenu();
        gEngine.GameLoop.stop();
        gEngine.AudioClips.playACue(this.kSounds["ending"]);
    }
};

// Function that is responsible for detecting collision between the character and switches
Game.prototype.colCharacterPushButton = function (mWaterCharacter, mFireCharacter) {
    for (let i = 0; i < this.mAllPushButtons.size(); i++) {
        let pushButton = this.mAllPushButtons.getObjectAt(i);
        let colWater = mWaterCharacter.getPhysicsComponent().collided(pushButton.getPhysicsComponent(), new CollisionInfo());
        let colFire = mFireCharacter.getPhysicsComponent().collided(pushButton.getPhysicsComponent(), new CollisionInfo());

        if (colWater && (mWaterCharacter.getStatus() != pushButton.getPlatform())) {
            this.activatePlatform(pushButton, mFireCharacter, i);
            mWaterCharacter.setNumPushButtonCollide(i);
        } else if (i === mWaterCharacter.getNumPushButtonCollide()) {
            this.desactivatePlatform(pushButton, mFireCharacter);
            mWaterCharacter.setNumPushButtonCollide(-1);
        }

        if (colFire && (mFireCharacter.getStatus() != pushButton.getPlatform())) {
            this.activatePlatform(pushButton, mWaterCharacter, i);
            mFireCharacter.setNumPushButtonCollide(i);
        } else if (i === mFireCharacter.getNumPushButtonCollide()) {
            this.desactivatePlatform(pushButton, mWaterCharacter);
            mFireCharacter.setNumPushButtonCollide(-1);
        }
    }
};

// Function that is responsible for activating the platform depending on the switch pressed by the character
Game.prototype.activatePlatform = function (pushButton, character, i) {
    character.setStatus(pushButton.getPlatform());

    let platform = this.mAllPlatforms.getObjectAt(pushButton.getPlatform());

    if (!platform.getIsMoving()) {
        pushButton.pushButtonPressed();
        platform.changeDirectionMovement(true);
    }
};

// Function that is responsible for deactivating the platform depending on the switch depressed by the character
Game.prototype.desactivatePlatform = function (pushButton, character) {
    pushButton.pushButtonNotPressed();

    this.mAllPlatforms.getObjectAt(pushButton.getPlatform()).changeDirectionMovement(false);
    character.setStatus(-1);
};

// Function that is responsible for expelling the particles
Game.prototype.loadParticles = function () {
    if (this.mCont < 100) {
        var p = this.mParser.parseParticle(this.kTextures);
        this.mAllParticles.addToSet(p);
        this.mCont++;
    }
};

// Function that calculates the life time of the particles to become expelled
Game.prototype.timeParticles = function () {
    if (this.mCont < 100) {
        this.loadParticles();
    }
    if (this.mAllParticles.size() === 0) {
        this.mCont = 0;
    }
};

// Function that is responsible for detecting collision between the toxic substance and the characters
Game.prototype.colCharacterParticle = function (mWaterCharacter, mFireCharacter) {
    var bboxWater = new BoundingBox(mWaterCharacter.getPosition(), mWaterCharacter.getWidth(), mWaterCharacter.getHeight());
    var bboxFire = new BoundingBox(mFireCharacter.getPosition(), mFireCharacter.getWidth(), mFireCharacter.getHeight());
    for (let i = 0; i < this.mAllParticles.size(); i++) {
        let particle = this.mAllParticles.getObjectAt(i).getXform();
        var particleBound = new BoundingBox(particle.getPosition(), particle.getWidth(), particle.getHeight());
        var colWater = particleBound.boundCollideStatus(bboxWater);
        var colFire = particleBound.boundCollideStatus(bboxFire);

        if ((colFire != 0) || (colWater != 0)) {
            gEngine.AudioClips.playACue(this.kSounds["death"]);
            gEngine.AudioClips.playACue(this.kSounds["finish"]);
            this.mLoadSelection = new GameOverMenu();
            gEngine.GameLoop.stop();
        }
    }
};






