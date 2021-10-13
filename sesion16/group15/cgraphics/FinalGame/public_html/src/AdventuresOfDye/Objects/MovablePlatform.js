/* File: Platform.js 
 *
 * Creates and initializes a Platform
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, IllumRenderable, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MovablePlatform(cx, cy, velocity, movementRange, texture, normal, lightSet) {
    this.kMPlatformWidth = 10;
    this.kMPlatformHeight = this.kMPlatformWidth / 12;
    this.kSpeed = 0.05;
    
    // control of movement
    this.mInitialPosition = vec2.fromValues(cx, cy);
    this.mMovementRange = movementRange;

    var renderableObj = new IllumRenderable(texture, normal);
    var i;
    for (i=0; i<lightSet.numLights(); i++) {
        renderableObj.addLight(lightSet.getLightAt(i));
    }
    GameObject.call(this, renderableObj);
    this.getXform().setSize(this.kMPlatformWidth, this.kMPlatformHeight);
    this.getXform().setPosition(cx, cy);
    
    // velocity and movementRange will come later
    var size = vec2.length(velocity);
    if (size > 0.001) {
        this.setCurrentFrontDir(velocity);
        this.setSpeed(this.kSpeed);
    }
    
    var rigidShape = new RigidRectangle(this.getXform(), this.kMPlatformWidth, this.kMPlatformHeight);
    rigidShape.setMass(0);  // ensures no movements!
    rigidShape.setDrawBounds(false);
    rigidShape.setColor([0, 0, 1, 1]);
    this.setPhysicsComponent(rigidShape);
}
gEngine.Core.inheritPrototype(MovablePlatform, GameObject);

MovablePlatform.prototype.update = function() {
    GameObject.prototype.update.call(this);
    var s = vec2.fromValues(0,0);
    vec2.subtract(s, this.getXform().getPosition(), this.mInitialPosition);
    var len = vec2.length(s);
    if (len > this.mMovementRange) {
        var f = this.getCurrentFrontDir();
        f[0] = -f[0];
        f[1] = -f[1];
    }   
};

