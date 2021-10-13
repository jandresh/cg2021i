"use strict";

MyGame.prototype._physicsSimulation = function() {
    
    // Hero platform
    gEngine.Physics.processObjSet(this.mHero, this.mAllPlatforms);
    
    // Hero Minion
    gEngine.Physics.processObjSet(this.mHero, this.mAllMinions);
    
    // Minion platform
    gEngine.Physics.processSetSet(this.mAllMinions, this.mAllPlatforms);
    
    // DyePack platform
    gEngine.Physics.processSetSet(this.mAllDyePacks, this.mAllPlatforms);
    
    // DyePack Minions
    gEngine.Physics.processSetSet(this.mAllDyePacks, this.mAllMinions);
    
    // Hero DyePack
    gEngine.Physics.processObjSet(this.mHero, this.mAllDyePacks);
    
    // Particle system collisions
    gEngine.Particle.processObjSet(this.mHero, this.mAllParticles);
    gEngine.Particle.processSetSet(this.mAllMinions, this.mAllParticles);
    gEngine.Particle.processSetSet(this.mAllPlatforms, this.mAllParticles);
};

