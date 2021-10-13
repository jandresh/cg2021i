"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Door(x, y, w, h, pc, texture, normal, lgtSet) {
    this.cont = 0;
    this.status = false;

    if(normal !== null){
        this.kDoor = new IllumRenderable(texture, normal);
    }else{
        this.kDoor = new LightRenderable(texture);
    }

    this.kDoor.getXform().setPosition(x, y);
    this.kDoor.getXform().setSize(w, h);
    this.kDoor.setSpriteSequence(256, 0, 256, 256, 1, 0); 
    this.kDoor.setAnimationSpeed(0);
    this.kDoor.addLight(lgtSet.getLightAt(0));
    this.mPlayerCollision = pc;

    GameObject.call(this, this.kDoor);

    let rigidShape = new RigidRectangle(this.getXform(), w, h);
    rigidShape.setMass(0);  // ensures no movements!
    rigidShape.setDrawBounds(false);
    rigidShape.setColor([0, 0, 1, 1]);
    this.setPhysicsComponent(rigidShape);
}

gEngine.Core.inheritPrototype(Door, GameObject);

Door.prototype.update = function () {
    GameObject.prototype.update.call(this);
    this.kDoor.updateAnimation();
}

Door.prototype.activateAnimation =function () {
    this.kDoor.setSpriteSequence(256, 0, 256, 256, 4, 0);
    this.kDoor.setAnimationSpeed(15);
}

Door.prototype.desactivateAnimation =function () {
    this.kDoor.setSpriteSequence(256, 1024, 256, 256, 1, 0);
    this.kDoor.setAnimationSpeed(0);
}

Door.prototype.getStatus = function(){
    return this.status;
}

Door.prototype.setStatus = function(status){
    this.status = status;
}

Door.prototype.getCont = function(){
    return this.cont;
}

Door.prototype.increment = function(){
   this.cont ++; 
}

Door.prototype.getPlayerCollision = function (){
    return this.mPlayerCollision;
};