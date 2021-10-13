/* File: Platform.js 
 *
 * Creates and initializes a Platform
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, IllumRenderable, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Platform(x, y, velocity, movementRange, texture, normal, lightSet) {
    this.kPlatformWidth = 10;
    this.kPlatformHeight = this.kPlatformWidth / 12;
    this.kSpeed = 0.2;
    
    // control of movement
    this.mInitialPosition = vec2.fromValues(x, y);
    this.mMovementRange = movementRange;
    this.mOldInitialPosition = this.mInitialPosition;
    this.mOldMovementRange = this.mMovementRange;
    this.mIsMoving = false;
    this.len = 0;

    if(normal !== null){
        this.mPlatform = new IllumRenderable(texture, normal);
    }else{
        this.mPlatform = new LightRenderable(texture);
    }

    this.mPlatform.addLight(lightSet.getLightAt(0));
    this.mPlatform.addLight(lightSet.getLightAt(1));
    this.mPlatform.addLight(lightSet.getLightAt(2));

    GameObject.call(this, this.mPlatform);
    this.getXform().setSize(this.kPlatformWidth, this.kPlatformHeight);
    this.getXform().setPosition(x, y);
    this.setCurrentFrontDir(velocity);
    
    let rigidShape = new RigidRectangle(this.getXform(), this.kPlatformWidth, this.kPlatformHeight);
    rigidShape.setMass(0);  // ensures no movements!
    rigidShape.setRestitution(0);
    rigidShape.setFriction(0);
    rigidShape.setColor([0, 0, 1, 1]);
    rigidShape.setDrawBounds(false);
    this.setPhysicsComponent(rigidShape);
}
gEngine.Core.inheritPrototype(Platform, GameObject);

Platform.prototype.update = function() {
    GameObject.prototype.update.call(this);
    let s = vec2.fromValues(0,0);
    vec2.subtract(s, this.getXform().getPosition(), this.mInitialPosition);
    this.len = vec2.length(s);

    if (this.len > this.mMovementRange) {
        this.setSpeed(0);
    }
};

Platform.prototype.getIsMoving = function(){
    return this.mIsMoving;
};

Platform.prototype.changeDirectionMovement = function(mIsMoving){
    let f = this.getCurrentFrontDir();
    f[0] = -f[0];
    f[1] = -f[1];

    this.mIsMoving = mIsMoving;
    this.setSpeed(this.kSpeed);

    if (this.len !== 0) {
        if(mIsMoving){
            this.mMovementRange = this.mOldMovementRange;
            this.mInitialPosition = this.mOldInitialPosition;
        }else{
            this.mMovementRange = this.len;
            this.mInitialPosition = this.getXform().getPosition();
        }
    }
};