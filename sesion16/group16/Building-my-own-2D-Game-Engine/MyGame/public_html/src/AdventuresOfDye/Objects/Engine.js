/* File: Engine.js 
 *
 * Creates and initializes a Engine object
 * overrides the update funciton of GameObject to define
 * simple sprite animation behavior behavior
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, LightRenderable, IllumRenderable, SpriteAnimateRenderable */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

Engine.eEngineType = Object.freeze({ //Engines are numbered from left to right (pilot's POV while looking forward)
    eFirst: 0, 
    eSecond: 1,
    eThird: 2,
    eFourth: 3
});

Engine.eEngineState = Object.freeze({
    eAlive: 0,
    eDead: 1,
});


function Engine(atX, atY, velocity, movementRange, type, texture, normal, lightSet, w, h) {
    this.kDelta = 0;
    this.kWidth = w;
    this.kHeight = h;
    this.kSpeed = 0.03;

    this.mProjectiles = new ParticleGameObjectSet();
    this.mType = type;

    // control of movement
    this.mInitialPosition = vec2.fromValues(atX, atY);
    this.mMovementRange = movementRange;
    this.eEngineState = Engine.eEngineState.eAlive;  //They are alive until they are not

    if (normal === null) {
        this.mEngine = new SpriteAnimateRenderable(texture);
    } else {
        this.mEngine = new IllumRenderable(texture, normal);
    }


    this.changeSprite(atX, atY);
    GameObject.call(this, this.mEngine);

    // velocity and movementRange will come later
    var size = vec2.length(velocity);
    if (size > 0.001) {
        this.setCurrentFrontDir(velocity);
        this.setSpeed(this.kSpeed);
    }

    var rigidShape = new RigidRectangle(this.getXform(), this.kWidth, this.kHeight);
    rigidShape.setMass(1);  // ensures no movements!
    rigidShape.setDrawBounds(false);
    rigidShape.setColor([0, 0, 1, 1]);
    rigidShape.setAcceleration([0, 0]);
    this.setPhysicsComponent(rigidShape);
}
gEngine.Core.inheritPrototype(Engine, GameObject);

Engine.prototype.update = function () {
    // remember to update this.mEngine's animation
    this.mEngine.updateAnimation();
    this.mProjectiles.update();
    GameObject.prototype.update.call(this);

    if (this.mType === Engine.eEngineType.eDefault || this.mType === Engine.eEngineType.eSentry) {
        var s = vec2.fromValues(0, 0);
        vec2.subtract(s, this.getXform().getPosition(), this.mInitialPosition);
        var len = vec2.length(s);
        if (len > this.mMovementRange) {
            var f = this.getCurrentFrontDir();
            f[0] = -f[0];
            f[1] = -f[1];
        }
        this.light.set2DPosition(this.getXform().getPosition());
    }
};

Engine.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    this.mProjectiles.draw(aCamera);
};

Engine.prototype.changeSprite = function (atX, atY) {
    this.mEngine.setColor([1, 1, 1, 0]);
    this.mEngine.getXform().setPosition(atX, atY);
    this.mEngine.getXform().setSize(this.kWidth, this.kHeight);
    this.mEngine.getXform().setZPos(2);

    switch (this.mType) {
        case Engine.eEngineType.eFirst:
            this.mEngine.setElementPixelPositions(0, 71, 395, 511);
            break;
        case Engine.eEngineType.eSecond:
            this.mEngine.setElementPixelPositions(76, 155, 399, 508);
            break;
        case Engine.eEngineType.eThird:
            this.mEngine.setElementPixelPositions(158, 237, 394, 506);;
            break;
        case Engine.eEngineType.eFourth:
            this.mEngine.setElementPixelPositions(240, 317, 391, 506);
            break;    
    }
};

Engine.prototype.playExplosion = function (atX, atY) {
    this.mEngine.setColor([1, 1, 1, 0]);
    this.mEngine.getXform().setPosition(atX, atY);
    this.mEngine.getXform().setSize(this.kWidth, this.kHeight);
    this.mEngine.getXform().setZPos(2);
    this.mEngine.setSpriteSequence(356, 624, 146, 146, 3, 79);
    this.mEngine.setAnimationSpeed(1);
}

Engine.prototype._createPointLight = function (atX, atY) {
    var lgt = new Light();
    lgt.setLightType(0);
    lgt.setColor([1, 1, 1, 1]);
    lgt.setYPos(atY);
    lgt.setXPos(atX);
    lgt.setZPos(1);
    lgt.setNear(1);
    lgt.setFar(2);
    lgt.setIntensity(1);
    lgt.setDropOff(20);
    lgt.setLightCastShadowTo(true);
    return lgt;
};

Engine.prototype.getProjectiles = function () {
    return this.mProjectiles
};

Engine.prototype.setDeath = function () {
    
}