/* File: Weapon.js 
 *
 * Creates and initializes a Platform
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, IllumRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict"; // Operate in Strict mode such that variables must be declared before used!

function Weapon(cx, cy, texture, lightSet) {
    this.kWeaponWidth = 2.5;
    this.kWeaponHeight = 1.5;
    this.mIsUnlocked = false;
    this.tickInterval = 0;
    this.mWeapon = new LightRenderable(texture);

    var i;
    for (i = 1; i < lightSet.numLights(); i++) {
        this.mWeapon.addLight(lightSet.getLightAt(i));
    }

    this.buildSprite(cx, cy);
    GameObject.call(this, this.mWeapon);

    var rigidShape = new RigidRectangle(this.getXform(), this.kWeaponWidth, this.kWeaponHeight);
    rigidShape.setMass(0);
    rigidShape.setColor([0, 1, 0, 1]);
    rigidShape.setDrawBounds(false);
    this.setPhysicsComponent(rigidShape);
}
gEngine.Core.inheritPrototype(Weapon, GameObject);

Weapon.prototype.buildSprite = function (atX, atY) {
    this.mWeapon.getXform().setPosition(atX, atY);
    this.mWeapon.getXform().setSize(this.kWeaponWidth, this.kWeaponHeight);
    this.mWeapon.getXform().setZPos(2);
    this.mWeapon.setElementPixelPositions(0, 538, 191, 512);
};

Weapon.prototype.pressWeapon = function () {
    this.mIsUnlocked = true;
};

Weapon.prototype.getWeaponState = function () {
    return this.mIsUnlocked;
};

Weapon.prototype.getTickInterval = function (int) {
    if (this.tickInterval < int) {
        this.tickInterval++;
        return false;
    } else {
        return true;
    }
};