/* File: P38.js 
 *
 * Creates and initializes the P38 (Dye)
 * overrides the update funciton of GameObject to define
 * simple Dye behavior
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function P38(spriteTexture, normalMap, atX, atY, lgtSet) {
    this.kMinionSprite = "assets/minion_sprite.png";

    this.kDelta = 0.1;
    this.kWidth = 0.6;
    this.kHeight = 8 / 3;

    if (normalMap !== null) {
        this.mDye = new IllumRenderable(spriteTexture, normalMap);
    } else {
        this.mDye = new LightRenderable(spriteTexture);
    }

    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(atX, atY);
    this.mDye.getXform().setZPos(1);
    this.mDye.getXform().setSize(0.8, 0.8);
    this.mDye.setElementPixelPositions(0, 177, 278, 512);


    this.mProjectiles = new GameObjectSet();;
    
    this.mP38State = P38.eP38State.eRunRight;
    this.mPreviousP38State = P38.eP38State.eRunLeft;
    this.mIsMoving = false;
    this.mCanJump = false;

             // show each element for mAnimSpeed updates                               


     //jeb fix
    //this.mDye.addLight(lgtSet.getLightAt(3));
//    this.mDye.addLight(lgtSet.getLightAt(2));
    var transform = new Transform();
    transform.setPosition(this.mDye.getXform().getXPos(), this.mDye.getXform().getYPos() - this.kHeight / 2);
    this.mJumpBox = new RigidRectangle(transform, this.kWidth, 0.25);
    this.mJumpBox.setColor([0, 0, 1, 1]);
    this.mJumpBox.setDrawBounds(true);
    //this.setPhysicsComponent(this.mJumpBox);

    GameObject.call(this, this.mDye);

    var r = new RigidRectangle(this.getXform(), this.kWidth+ 0.16, this.kHeight/3.2);
    r.setMass(0);
    r.setRestitution(0);
    r.setColor([0, 1, 0, 1]);
    r.setDrawBounds(true);
    //r.setAcceleration(-5);
    this.setPhysicsComponent(r);
 



}
gEngine.Core.inheritPrototype(P38, GameObject);

P38.eP38State = Object.freeze({
    eFaceRight: 0,
    eFaceLeft: 1,
    eRunRight: 2,
    eRunLeft: 3,
    eJumpRight: 4,
    eJumpLeft: 5
});


P38.prototype.update = function () {
    GameObject.prototype.update.call(this);

    
    // control by WASD
    var xform = this.getXform();
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.W)) {
        xform.incYPosBy(this.kDelta);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.S)) {
        xform.incYPosBy(-this.kDelta);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.A)) {
        xform.incXPosBy(-this.kDelta);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.D)) {
        xform.incXPosBy(this.kDelta);
    }
    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.N)) {
         var xP38 = (this.mDye.getXform().getXPos());
         var yP38 = (this.mDye.getXform().getYPos());   
         var aBullet = new FiddyCal (this.kMinionSprite, xP38 , yP38 + (0.15));
         console.log("shoot")
         var bBullet = new FiddyCal (this.kMinionSprite, xP38 , yP38 + (-0.15));
         this.mProjectiles.addToSet(aBullet);
         this.mProjectiles.addToSet(bBullet);
     };
    this.mIsMoving = false;
    this.mCanJump = false;
    
    //Pew pew
     
};



P38.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
};

P38.prototype.getProjectiles = function () {
    return this.mProjectiles;
};

P38.prototype.playExplosion = function (atX, atY) {
    this.mDye.setColor([1, 1, 1, 0]);
    this.mDye.getXform().setPosition(atX, atY);
    this.mDye.getXform().setSize(this.kWidth, this.kHeight);
    this.mDye.getXform().setZPos(2);
    this.mDye.setSpriteSequence(356, 624, 146, 146, 3, 79);
    this.mDye.setAnimationSpeed(1);
}




