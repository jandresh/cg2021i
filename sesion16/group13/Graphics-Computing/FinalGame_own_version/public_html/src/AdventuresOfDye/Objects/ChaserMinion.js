"use strict";

function ChaserMinion(atX, atY, velocity, movementRange, type, texture, normal, lightSet, w, h) {
    this.kOffset = 4.7;
    this.kShootTimer = 90;
    this.amount = 0; // Veces que el minion ha sido impactado
    this.isTouched = false;

    Minion.call(this, atX, atY, velocity, movementRange, type, texture, normal, lightSet, w, h);   

    this.setSpeed(0.1);
    this.setCurrentFrontDir([0, 1]);

}
gEngine.Core.inheritPrototype(ChaserMinion, Minion);

ChaserMinion.prototype.update = function (target, dyePacks, allParticles, func) {
    Minion.prototype.update.call(this);
    var i, obj, collisionPt = [0, 0];
    var p = target.getXform().getPosition();
    this.rotateObjPointTo(p, 0.08);
    //--------MIO
    //Si el minion ha tocado al heroe
    if (this.pixelTouches(target, collisionPt)) {
        allParticles.addEmitterAt(collisionPt, 200, func);
        this.isTouched = true; 
    }
        
    //----------MIO
    // Veces que el minion ha impactado con el dyepack
        // now interact with the dyePack ...
    var i, obj, collisionPt = [0, 0];
    
    var p = this.getXform().getPosition();
    for (i=0; i<dyePacks.size(); i++) {
        obj = dyePacks.getObjectAt(i);
        // chase after hero
        obj.rotateObjPointTo(p, 0.8);
        if (obj.pixelTouches(this, collisionPt)) {
            dyePacks.removeFromSet(obj);
            allParticles.addEmitterAt(collisionPt, 200, func);
            this.amount++;
        }
    }
};



