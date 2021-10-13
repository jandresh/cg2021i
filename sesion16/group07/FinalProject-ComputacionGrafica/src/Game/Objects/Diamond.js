"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Diamond(x, y, w, h, pc, texture, normal, lgtSet, type) {
    this.type = type;
    if(normal !== null){
        this.mDiamond = new IllumRenderable(texture, normal);
    }else{
        this.mDiamond = new LightRenderable(texture);
    }

    this.mDiamond.getXform().setPosition(x, y);
    this.mDiamond.getXform().setSize(w, h);
    this.mDiamond.setElementPixelPositions(0, 256, 0, 256);
    this.mDiamond.addLight(lgtSet.getLightAt(0)); 
    this.mDiamond.addLight(lgtSet.getLightAt(1));
    this.mDiamond.addLight(lgtSet.getLightAt(2));
    this.mPlayerCollision = pc;

    GameObject.call(this, this.mDiamond); 

    var rigidShape = new RigidRectangle(this.getXform(), w-1, h);
    rigidShape.setMass(0);  // ensures no movements!
    rigidShape.setDrawBounds(false);
    rigidShape.setColor([0, 0, 1, 1]);
    this.setPhysicsComponent(rigidShape);
}

gEngine.Core.inheritPrototype(Diamond, GameObject);

Diamond.prototype.getPlayerCollision = function (){
    return this.mPlayerCollision;
};

