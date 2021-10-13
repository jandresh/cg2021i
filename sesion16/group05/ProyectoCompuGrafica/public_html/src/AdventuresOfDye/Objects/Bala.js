"use strict";

function Bala(atX, atY, velocity, radius) {
    this.kTexture = "assets/balita.png";
    this.kSpeed = 0.2;
    this.existence=150;

    ParticleGameObject.call(this, this.kTexture, atX, atY, 500);
    this.setSpeed(this.kSpeed);
    this.setCurrentFrontDir(velocity);
    var obj = this.getRenderable();
    obj.setColor([1, 1, 1, 1]);
    obj.getXform().setSize(radius, radius);
    
    var rigidShape = new RigidCircle(this.getXform(), radius);
    rigidShape.setMass(0.1);
    rigidShape.setAcceleration([0, 0]);
    this.setPhysicsComponent(rigidShape);
    
    this.setSizeDelta(1);
}
gEngine.Core.inheritPrototype(Bala, ParticleGameObject);

Bala.prototype.hasExpired=function(){return this.existence <= 0; }
Bala.prototype.Expired=function(){return this.existence--; }