/* File: DyePack.js 
 *
 * Creates a DyePack object
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, TextureRenderable, RigidCircle*/
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function FiddyCal(spriteTexture, atX, atY) {
    this.kMinionSprite = "assets/minion_sprite.png";
    this.kDeltaDegree = 1;
    this.kDeltaRad = Math.PI * this.kDeltaDegree / 180;
    this.kDeltaSpeed = 0.2;
    this.mFiddyCal = new SpriteRenderable(spriteTexture);
    this.mFiddyCal.getXform().incRotationByRad(4.7122)
    this.mFiddyCal.setColor([1, 1, 1, 0]);
    this.mFiddyCal.getXform().setPosition(atX, atY);
    this.mFiddyCal.getXform().setSize(0.15, 0.2);
    this.mFiddyCal.setElementPixelPositions(0, 8, 0, 28);
    GameObject.call(this, this.mFiddyCal);

    this.setSpeed(0.1);
}
gEngine.Core.inheritPrototype(FiddyCal, GameObject);

FiddyCal.prototype.update = function () {
    var xform = this.getXform();
    xform.incXPosBy(this.kDeltaSpeed);
};