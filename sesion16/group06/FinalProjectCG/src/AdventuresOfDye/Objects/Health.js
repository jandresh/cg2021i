/* File: Weapon.js 
 *
 * Creates and initializes a Platform
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, IllumRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict"; // Operate in Strict mode such that variables must be declared before used!

function Health(texture, lightSet) {
    this.kHealthWidth = 1;
    this.kHealthHeight = 1;
    this.mHealth = new LightRenderable(texture);

    var i;
    for (i = 1; i < lightSet.numLights(); i++) {
        this.mHealth.addLight(lightSet.getLightAt(i));
    }

    this.buildSprite();
    GameObject.call(this, this.mHealth);

    var rigidShape = new RigidRectangle(this.getXform(), this.kHealthWidth, this.kHealthHeight);
    rigidShape.setMass(0);
    rigidShape.setColor([0, 1, 0, 1]);
    rigidShape.setDrawBounds(false);
    this.setPhysicsComponent(rigidShape);
}
gEngine.Core.inheritPrototype(Health, GameObject);

Health.prototype.buildSprite = function () {
    this.mHealth.getXform().setSize(this.kHealthWidth, this.kHealthHeight);
    this.mHealth.getXform().setZPos(2);
    this.mHealth.setElementPixelPositions(0, 256, 0, 256);
};