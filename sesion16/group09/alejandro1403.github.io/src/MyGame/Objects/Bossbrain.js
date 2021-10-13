/* File: Brain.js 
 *
 * Creates and initializes a simple Brain object
 */

/*jslint node: true, vars: true */
/*global gEngine: false, GameObject: false, SpriteRenderable: false, vec2: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Bossbrain(spriteTexture, atX, atY) {
    this.kDeltaDegree = 1;
    this.kDeltaRad = Math.PI * this.kDeltaDegree / 180;
    this.kDeltaSpeed = 1;
    this.mBrain = new SpriteRenderable(spriteTexture);
    this.mBrain.getXform().incRotationByRad(1.5708)
    this.mBrain.setColor([1, 1, 1, 0]);
    this.mBrain.getXform().setPosition(atX, atY);
    this.mBrain.getXform().setSize(1.3, 2.4);
    this.mBrain.setElementPixelPositions(600, 700, 0, 180);
    GameObject.call(this, this.mBrain);

    this.setSpeed(0.05);
}
gEngine.Core.inheritPrototype(Bossbrain, GameObject);

Bossbrain.prototype.update = function () {
    var xform = this.getXform();
    xform.incXPosBy(-this.kDeltaSpeed);
};