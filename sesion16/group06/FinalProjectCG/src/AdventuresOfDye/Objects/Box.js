/* File: Box.js 
 *
 * Creates and initializes a Platform
 */

/*jslint node: true, vars: true, white: true */
/*global gEngine, GameObject, IllumRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Box(cx, cy, texture, lightSet) {
    this.kBoxWidth = 3.5;
    this.kBoxHeight = 3.5;

    var renderableObj = new LightRenderable(texture);
    var i;
    for (i=1; i<lightSet.numLights(); i++) {
        renderableObj.addLight(lightSet.getLightAt(i));
    }
    GameObject.call(this, renderableObj);
    this.getXform().setSize(this.kBoxWidth, this.kBoxHeight);
    this.getXform().setPosition(cx, cy);
    
    var rigidShape = new RigidRectangle(this.getXform(), this.kBoxWidth, this.kBoxHeight);
    rigidShape.setMass(1);
    rigidShape.setRestitution(0.3);
    rigidShape.setColor([0, 1, 0, 1]);
    rigidShape.setDrawBounds(false);
    this.setPhysicsComponent(rigidShape);
}
gEngine.Core.inheritPrototype(Box, GameObject);