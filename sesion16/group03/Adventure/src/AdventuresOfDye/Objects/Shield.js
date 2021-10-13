

function Shield(cx, cy, texture, lightSet) {

    this.kWidth = 1.2;
    this.kHeight = 1.2;
    this.mIsUnlocked = false;

    this.mShield = new LightRenderable(texture);

    var i;
    for (i = 2; i < lightSet.numLights(); i++) {
        this.mShield.addLight(lightSet.getLightAt(i));
    }

    this.buildSprite(cx, cy);
    GameObject.call(this, this.mShield);

    var rigidShape = new RigidRectangle(this.getXform(), this.kWidth, this.kHeight);
    rigidShape.setMass(0);  // ensures no movements!
    this.setPhysicsComponent(rigidShape);
}
gEngine.Core.inheritPrototype(Shield, GameObject);

Shield.prototype.buildSprite = function (atX, atY) {
    this.mShield.getXform().setPosition(atX, atY);
    this.mShield.getXform().setSize(this.kWidth, this.kHeight);
    this.mShield.getXform().setZPos(2);
    // this.mShield.setElementPixelPositions(40,40 , 40, 40);
};
