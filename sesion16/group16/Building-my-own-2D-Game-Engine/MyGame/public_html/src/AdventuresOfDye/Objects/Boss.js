function Boss(atX, atY, velocity, movementRange, type, texture0, texture1, texture2,
        texture3, texture4, texture5, texture6, normal, lightSet, hero) {
    this.kMinionTex = "assets/minion_sprite.png";
    this.kEngineTex="assets/engines.png"
    this.kDelta = 0.1;
    this.kWidth = 5;
    this.kHeight = 5;
    this.kSpeed = 0.02;
    this.kSpawnerTotal = 800;
    this.kAlive= true;
    
    this.mSpawnerTicks = 0;
    this.mTicks = 0;
    this.mClockwise = 1;
    this.mLightSet = lightSet;
    this.mHeroRef = hero;
    this.mAllMinions = [];
    this.mAllEngines = new GameObjectSet();
    // control of movement
    this.mInitialPosition = vec2.fromValues(atX, atY);
    this.mMovementRange = movementRange;

    if (normal === null) {
        this.mDyeBoss_FirstEngine = new Engine(atX, atY, velocity, 0, 0, texture2, null, this.mLightSet, this.kWidth/10.5, this.kHeight/10.5);
        this.mDyeBoss_SecondEngine = new Engine(atX, atY, velocity, 0, 1, texture2, null, this.mLightSet, this.kWidth/10.5, this.kHeight/10.5);
        this.mDyeBoss_ThirdEngine = new Engine(atX, atY, velocity, 0, 2, texture2, null, this.mLightSet, this.kWidth/10.5, this.kHeight/10.5);
        this.mDyeBoss_FourthEngine = new Engine(atX, atY, velocity, 0, 3, texture2, null, this.mLightSet, this.kWidth/10.5, this.kHeight/10.5);

        this.mDyeBoss_Bottom = new LightRenderable(texture0);
        this.mDyeBoss_Top = new LightRenderable(texture1);

    } else {
        this.mDyeBoss_Bottom = new IllumRenderable(texture0, normal);
        this.mDyeBoss_Top = new IllumRenderable(texture1, normal);
        this.mDyeBoss_1stEngine = new IllumRenderable(texture2, normal);
        this.mDyeBoss_2ndEngine = new IllumRenderable(texture3, normal);
        this.mDyeBoss_3rdEngine = new IllumRenderable(texture3, normal);
        this.mDyeBoss_4thEngine = new IllumRenderable(texture4, normal);

    }

    this.light = this._createPointLight(atX, atY);
    lightSet.addToSet(this.light);

    var i;
    for (i = 2; i < lightSet.numLights(); i++) {
        this.mDyeBoss_Bottom.addLight(lightSet.getLightAt(i));
        this.mDyeBoss_Top.addLight(lightSet.getLightAt(i));

    }
    
    this.buildSprite(atX, atY);
    GameObject.call(this, this.mDyeBoss_Top);

    // velocity and movementRange will come later
    var size = vec2.length(velocity);
    if (size > 0.001) {
        this.setCurrentFrontDir(velocity);
        this.setSpeed(this.kSpeed);
    }

    var rigidShape = new RigidRectangle(this.getXform(), this.kWidth-2, this.kHeight-1);
    rigidShape.setMass(0);
    rigidShape.setDrawBounds(true);
    rigidShape.setColor([0, 0, 1, 1]);
    //rigidShape.setAcceleration([0, 0]);
    this.setPhysicsComponent(rigidShape);
    this.mAllEngines.addToSet(this.mDyeBoss_FirstEngine);
    this.mAllEngines.addToSet(this.mDyeBoss_SecondEngine);
    this.mAllEngines.addToSet(this.mDyeBoss_ThirdEngine);
    this.mAllEngines.addToSet(this.mDyeBoss_FourthEngine);
}
gEngine.Core.inheritPrototype(Boss, GameObject);

Boss.prototype.update = function () {
    GameObject.prototype.update.call(this);
    var i;
    for (i = 0; i < this.mAllMinions.length; i++) {
        this.mAllMinions[i].update(this.mHeroRef);
    }
    
    this.mTicks++
    if(this.mTicks > 20){
        this.mClockwise *= -1;
        this.mTicks = 0;
    }
    
    this.mSpawnerTicks++;
    //if(this.mSpawnerTicks > this.kSpawnerTotal && this.mAllMinions.length < 6){
      //  this._spawnChaser();
        //this.mSpawnerTicks = 0;
    //}
    
    var s = vec2.fromValues(0, 0);
    vec2.subtract(s, this.getXform().getPosition(), this.mInitialPosition);
    var len = vec2.length(s);
    
    if (len > this.mMovementRange) {
        var f = this.getCurrentFrontDir();
        f[0] = -f[0];
        f[1] = -f[1];
        
    }
    this.light.set2DPosition(this.getXform().getPosition());
    this.buildSprite(this.getXform().getPosition()[0], this.getXform().getPosition()[1] - this.mClockwise * 0.01);

    
    
//    this.mDyeBoss_Eyeballs.getXform().incRotationByDegree(10 * Math.random()* this.mClockwise);
//    this.mDyeBoss_Eyeballs02.getXform().incRotationByDegree(10 * Math.random() * this.mClockwise);
};

Boss.prototype.buildSprite = function (atX, atY) {
    
    this.mDyeBoss_Top.getXform().setPosition(atX, atY);
    this.mDyeBoss_Top.getXform().setSize(this.kWidth, this.kHeight);
    this.mDyeBoss_Top.getXform().setZPos(2);
    this.mDyeBoss_FirstEngine.getXform().setPosition(atX+1.7, atY+1.06);
    this.mDyeBoss_FirstEngine.getXform().setSize(this.kWidth/10.5, this.kHeight/10.5);
    this.mDyeBoss_FirstEngine.getXform().setZPos(2);
    this.mDyeBoss_SecondEngine.getXform().setPosition(atX+1.7, atY+0.45);
    this.mDyeBoss_SecondEngine.getXform().setSize(this.kWidth/10.5, this.kHeight/10.5);
    this.mDyeBoss_SecondEngine.getXform().setZPos(2);
    this.mDyeBoss_ThirdEngine.getXform().setPosition(atX+1.7, atY-0.45);
    this.mDyeBoss_ThirdEngine.getXform().setSize(this.kWidth/10.5, this.kHeight/10.5);
    this.mDyeBoss_ThirdEngine.getXform().setZPos(2);
    this.mDyeBoss_FourthEngine.getXform().setPosition(atX+1.7, atY-0.95);
    this.mDyeBoss_FourthEngine.getXform().setSize(this.kWidth/10.5, this.kHeight/10.5);
    this.mDyeBoss_FourthEngine.getXform().setZPos(2);

    

};

Boss.prototype._createPointLight = function (atX, atY) {
    var lgt = new Light();
    lgt.setLightType(0);
    lgt.setColor([1, 1, 1, 1]);
    lgt.setXPos(atX);
    lgt.setYPos(atY);
    lgt.setZPos(1);
    lgt.setNear(4);
    lgt.setFar(6);
    lgt.setIntensity(0.5);
    lgt.setDropOff(20);
    lgt.setLightCastShadowTo(true);
    return lgt;
};

Boss.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    //this.mDyeBoss_Bottom.draw(aCamera);     
    this.mDyeBoss_Top.draw(aCamera);    
    this.mDyeBoss_FirstEngine.draw(aCamera);
    this.mDyeBoss_SecondEngine.draw(aCamera);
    this.mDyeBoss_ThirdEngine.draw(aCamera);
    this.mDyeBoss_FourthEngine.draw(aCamera);
    var i;
    for (i = 0; i < this.mAllMinions.length; i++) {
        this.mAllMinions[i].draw(aCamera);
    }
};

Boss.prototype._spawnEngines = function () { //I swear if this doesn't work
    var x = this.getXform().getXPos();
    var y = this.getXform().getYPos();
    var alpha = new FirstEngine(x, y, [0, 0], 0, 2, this.kMinionTex, null, this.mLightSet, 1, 1.6);
    var beta
    
};



