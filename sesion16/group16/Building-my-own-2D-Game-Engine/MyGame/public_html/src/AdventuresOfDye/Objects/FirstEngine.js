"use strict";

function FirstEngine(atX, atY, velocity, movementRange, type, texture, normal, lightSet, w, h) {
    this.kOffset = 4.7;
    this.kShootTimer = 90;
    this.mNumCycles = 0;
    
    Engine.call(this, atX, atY, velocity, movementRange, type, texture, normal, lightSet, w, h);   

    this.setSpeed(this.kSpeed);
    this.setCurrentFrontDir([0, 1]);

}
gEngine.Core.inheritPrototype(FirstEngine, Engine);

FirstEngine.prototype.update = function (target) {
    Engine.prototype.update.call(this);
};

