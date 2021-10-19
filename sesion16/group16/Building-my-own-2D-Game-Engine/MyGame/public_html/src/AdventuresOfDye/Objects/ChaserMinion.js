"use strict";

function ChaserMinion(atX, atY, velocity, movementRange, type, texture, normal, lightSet, w, h) {
    this.kOffset = 4.7;
    this.kShootTimer = 90;
    this.mNumCycles = 0;
    
    Minion.call(this, atX, atY, velocity, movementRange, type, texture, normal, lightSet, w, h);   

    this.setSpeed(this.kSpeed);
    this.setCurrentFrontDir([0, 1]);

}
gEngine.Core.inheritPrototype(ChaserMinion, Minion);

ChaserMinion.prototype.update = function (target) {
    Minion.prototype.update.call(this);
    var b;
    this.mNumCycles++;
    if(this.mNumCycles > this.kShootTimer){
        this.mNumCycles = 0;
        b = new Projectile(this.getXform().getXPos() - 0.5, this.getXform().getYPos(), this.getCurrentFrontDir(), 0.3);
        this.mProjectiles.addToSet(b);
    }
    var p = target.getXform().getPosition();
    this.rotateObjPointTo(p, 0.08);
};



