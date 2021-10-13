/* File: DyePack.js 
 *
 * Creates a DyePack object
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, TextureRenderable, RigidCircle*/
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function DyePack(texture, normalMap, atX, atY, lgtSet, side) {
    this.kDelta = 0.1;
    this.kWidth = 1 ;
    this.kHeight = 0.7 ;
    this.mCycleLeft = 300;
    this.isLeft = false;
    //this.mDyePack = new TextureRenderable(texture);
    
    if (normalMap !== null) {
        this.mDyePack = new IllumRenderable(texture, normalMap);
    } else {
        this.mDyePack = new LightRenderable(texture);
    }

    this.mDyePack.setColor([1, 1, 1, 0]);
    this.mDyePack.getXform().setPosition(atX, atY);
    this.mDyePack.getXform().setSize(this.kWidth, this.kHeight);
    this.mDyePack.addLight(lgtSet.getLightAt(2));
                                // show each element for mAnimSpeed updates
    GameObject.call(this, this.mDyePack);
    this.setSpeed(0.5);
    if (side) {
        this.setCurrentFrontDir([-1, 0]);
    }else{
        this.setCurrentFrontDir([1, 0]);
    }
   

    var rigidShape = new RigidCircle(this.getXform(), 1.5);
    rigidShape.setMass(0.1);
    rigidShape.setAcceleration([0, 0]);
    // rigidShape.setDrawBounds(true);
    this.setPhysicsComponent(rigidShape);
}
gEngine.Core.inheritPrototype(DyePack, GameObject);


DyePack.prototype.update = function () {
    GameObject.prototype.update.call(this);
    // remember to update this.mMinion's animation
    this.mCycleLeft--;
};

DyePack.prototype.hasExpired = function() { return this.mCycleLeft <= 0; };