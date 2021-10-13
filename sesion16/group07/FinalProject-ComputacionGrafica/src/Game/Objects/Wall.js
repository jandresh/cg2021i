"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Wall(x, y, w, h, elmPixelPos, texture, normal, lgtSet) {
    if(normal !== null){
        this.mWall = new IllumRenderable(texture, normal);
    }else{
        this.mWall = new LightRenderable(texture);
    }

    this.mWall.getXform().setSize(w, h);
    this.mWall.getXform().setPosition(x, y);
    this.mWall.getXform().setZPos(1);
    this.mWall.setElementPixelPositions(elmPixelPos[0], elmPixelPos[1], elmPixelPos[2], elmPixelPos[3]);
    this.mWall.addLight(lgtSet.getLightAt(0));
    this.mWall.addLight(lgtSet.getLightAt(1));
    this.mWall.addLight(lgtSet.getLightAt(2));

    GameObject.call(this, this.mWall);

    let rigidShape = new RigidRectangle(this.getXform(), w, h);
    rigidShape.setMass(0);  // ensures no movements!
    rigidShape.setRestitution(0);
    rigidShape.setFriction(0);
    rigidShape.setDrawBounds(false);
    rigidShape.setColor([0, 0, 1, 1]);
    this.setPhysicsComponent(rigidShape);
}
gEngine.Core.inheritPrototype(Wall, GameObject);