/* File: Platform.js 
 *
 * Creates and initializes a Platform
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, IllumRenderable, vec2 */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

    function Object(cx, cy, texture, normal, lightSet) {
    this.kObjectWidth = 10;
    this.kObjectHeight = this.kObjectWidth;
    
    // control of movement
    this.mInitialPosition = vec2.fromValues(cx, cy);

    var renderableObj = new IllumRenderable(texture, normal);
    var i;
    for (i=0; i<lightSet.numLights(); i++) {
        renderableObj.addLight(lightSet.getLightAt(i));
    }
    GameObject.call(this, renderableObj);
    this.getXform().setSize(this.kObjectWidth, this.kObjectHeight);
    this.getXform().setPosition(cx, cy);
    
    // velocity and movementRange will come later
    
    var rigidShape = new RigidRectangle(this.getXform(), this.kObjectWidth, this.kObjectHeight);
    rigidShape.setMass(0);  // ensures no movements!
    rigidShape.setDrawBounds(true);
    rigidShape.setColor([0, 0, 1, 1]);
    this.setPhysicsComponent(rigidShape);
}
gEngine.Core.inheritPrototype(Object, GameObject);

Object.prototype.update = function() {
    GameObject.prototype.update.call(this);
};

