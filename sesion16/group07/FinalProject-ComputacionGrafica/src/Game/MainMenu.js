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

function MainMenu() {
    this.kTextures = {
        background: "assets/images/backgrounds/background.png",
        menu: "assets/images/menu/main/welcome.png",
        menu_play: "assets/images/menu/main/welcome_play_selected.png",
        menu_exit: "assets/images/menu/main/welcome_exit_selected.png"
    };

    this.mCamera = null;
    this.mBackground = null;
    this.mMenu = null;
    this.mMenuState = MainMenu.eMenuState.eMenu;
    this.mPreviousMenuState = MainMenu.eMenuState.eMenu;
}
gEngine.Core.inheritPrototype(MainMenu, Scene);

MainMenu.eMenuState = Object.freeze({
    eMenu: 0,
    eMenuPlay: 1,
    eMenuExit: 2
});

MainMenu.prototype.loadScene = function () {
    for (const key in this.kTextures) {
       gEngine.Textures.loadTexture(this.kTextures[key]);
    }
};

MainMenu.prototype.unloadScene = function () {
    for (const key in this.kTextures) {
        gEngine.Textures.unloadTexture(this.kTextures[key]);
    }

    //Carga el nivel
    let game = new Game();
    gEngine.Core.startScene(game);
};

MainMenu.prototype.initialize = function () {
    //set ambient lighting
    gEngine.DefaultResources.setGlobalAmbientColor([1, 1, 1, 1]);
    gEngine.DefaultResources.setGlobalAmbientIntensity(1);

    //Camera
    this.mCamera = new Camera(
        vec2.fromValues(0, 0), // position of the camera
        100,                  //  width of camera
        [0, 0, 900, 900],    //   viewport (orgX, orgY, width, height)
        0
    );
    this.mCamera.setBackgroundColor([0.9, 0.9, 0.9, 1]);

    this.mBackground = new SpriteRenderable(this.kTextures["background"]);
    this.mBackground.setElementPixelPositions(0, 900, 124, 900);
    this.mBackground.getXform().setSize(100, 100);
    this.mBackground.getXform().setPosition(0, 0);

    this.mMenu = new TextureRenderable(this.kTextures["menu"]);
    this.mMenu.getXform().setSize(45, 50);
    this.mMenu.getXform().setPosition(0, 2.5);
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MainMenu.prototype.draw = function () {
    gEngine.Core.clearCanvas([1, 1, 1, 1]); 
    this.mCamera.setupViewProjection();
    this.mBackground.draw(this.mCamera);
    this.mMenu.draw(this.mCamera);
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MainMenu.prototype.update = function () {
    this.mCamera.update();
    this.mMenu.update();

    let x = gEngine.Input.getMousePosX();
    let y = gEngine.Input.getMousePosY();

    if(x >= 277 && x <= 443 && y >= 282 && y <= 438){
        if(this.mMenuState === MainMenu.eMenuState.eMenu
            || this.mMenuState === MainMenu.eMenuState.eMenuExit){
                this.mMenuState = MainMenu.eMenuState.eMenuPlay;
        }

        if(gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)){
            this.mLoadSelection = new Game();
            gEngine.GameLoop.stop();
        }
    }else if(x >= 477 && x <= 642 && y >= 282 && y <= 438){
        if(this.mMenuState === MainMenu.eMenuState.eMenu
            || this.mMenuState === MainMenu.eMenuState.eMenuPlay){
                this.mMenuState = MainMenu.eMenuState.eMenuExit;
        }

        if(gEngine.Input.isButtonClicked(gEngine.Input.mouseButton.Left)){
            //
        }
    }else if(this.mMenuState === MainMenu.eMenuState.eMenuPlay
        || this.mMenuState === MainMenu.eMenuState.eMenuExit){
            this.mMenuState = MainMenu.eMenuState.eMenu;
    }

    if(this.mMenuState !== this.mPreviousMenuState){
        this.mPreviousMenuState = this.mMenuState;

        switch(this.mMenuState){
            case MainMenu.eMenuState.eMenu:
                this.mMenu.setTexture(this.kTextures["menu"]);
            break;
            case MainMenu.eMenuState.eMenuPlay:
                this.mMenu.setTexture(this.kTextures["menu_play"]);
            break;
            case MainMenu.eMenuState.eMenuExit:
                this.mMenu.setTexture(this.kTextures["menu_exit"]);
            break;
        }
    }
};