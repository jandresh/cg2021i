"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Wave(x, y, w, h, pc, texture, normal, lgtSet) {
    if(normal !== null){
        this.mWave = new IllumRenderable(texture, normal);
    }else{
        this.mWave = new LightRenderable(texture);
    }

    this.mWave.getXform().setPosition(x, y);
    this.mWave.getXform().setSize(w, h);
    this.mWave.setSpriteSequence(64, 0, 256, 64, 4, 0);
    this.mWave.setAnimationSpeed(35);
    this.mWave.addLight(lgtSet.getLightAt(0));
    this.mPlayerCollision = pc;

    GameObject.call(this, this.mWave); 

    var rigidShape = new RigidRectangle(this.getXform(), w, h);
    rigidShape.setMass(0);  // ensures no movements!
    rigidShape.setDrawBounds(false);
    rigidShape.setColor([0, 0, 1, 1]);
    this.setPhysicsComponent(rigidShape);
}

gEngine.Core.inheritPrototype(Wave, GameObject);

Wave.prototype.update = function () {
    GameObject.prototype.update.call(this);
    this.mWave.updateAnimation();
}

Wave.prototype.getPlayerCollision = function (){
    return this.mPlayerCollision;
};