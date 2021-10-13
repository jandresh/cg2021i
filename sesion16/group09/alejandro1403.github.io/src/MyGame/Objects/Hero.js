/* File: Hero.js 
 *
 * Creates and initializes the Hero (Dye)
 * overrides the update function of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Hero(spriteTexture) {
    this.kDelta = 0.7;

    this.mDye = new SpriteRenderable(spriteTexture);
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(35, 50);
    this.mDye.getXform().setSize(9, 12);
    this.mDye.setElementPixelPositions(0, 120, 0, 180);
    GameObject.call(this, this.mDye);
}
gEngine.Core.inheritPrototype(Hero, GameObject);

Hero.prototype.update = function () {
    // control by WASD
    var xform = this.getXform();
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
        if(xform.getYPos() <= 69){
            xform.incYPosBy(this.kDelta);
        } else {          
        }
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
        if(xform.getYPos() >= 6){
            xform.incYPosBy(-this.kDelta);
        } else {            
        }        
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        if(xform.getXPos() >= 5){
            xform.incXPosBy(-this.kDelta);
        } else {           
        }        
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        if(xform.getXPos() <= 95){
            xform.incXPosBy(this.kDelta);
        } else {            
        }        
    }
};



