/* File: Platform.js 
 *
 * Creates and initializes a Platform
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, IllumRenderable, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function DeadlyFloor(cx, cy, texture, normal, lightSet) {
    this.kDeadlyFWidth = 10;
    this.kDeadlyFHeight = 1.5;
    
    // control of movement
    this.mInitialPosition = vec2.fromValues(cx, cy);

    var renderableObj = new IllumRenderable(texture, normal);
    var i;
    for (i=0; i<lightSet.numLights(); i++) {
        renderableObj.addLight(lightSet.getLightAt(i));
    }
    GameObject.call(this, renderableObj);
    this.getXform().setSize(this.kDeadlyFWidth, this.kDeadlyFHeight);
    this.getXform().setPosition(cx, cy);
    
    var rigidShape = new RigidRectangle(this.getXform(), this.kDeadlyFWidth, this.kDeadlyFHeight);
    rigidShape.setMass(0);  // ensures no movements!
    rigidShape.setDrawBounds(false);
    rigidShape.setColor([0, 0, 1, 1]);
    this.setPhysicsComponent(rigidShape);
}
gEngine.Core.inheritPrototype(DeadlyFloor, GameObject);

DeadlyFloor.prototype.update = function() {
    
};

