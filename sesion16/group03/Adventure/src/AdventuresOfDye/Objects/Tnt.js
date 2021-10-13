
function Tnt(cx, cy, texture, lightSet) {
    this.kWidth = 2.25;
    this.kHeight = 2;
    this.mIsUnlocked = false;
    this.mTnt = new LightRenderable(texture);

    var i;
    for (i = 2; i < lightSet.numLights(); i++) {
        this.mTnt.addLight(lightSet.getLightAt(i));
    }

    this.buildSprite(cx, cy);
    GameObject.call(this, this.mTnt);

    var rigidShape = new RigidRectangle(this.getXform(), this.kWidth, this.kHeight);
    rigidShape.setMass(0);  // ensures no movements!
    this.setPhysicsComponent(rigidShape);
}
gEngine.Core.inheritPrototype(Tnt, GameObject);


Tnt.prototype.buildSprite = function (atX, atY) {
    this.mTnt.getXform().setPosition(atX, atY);
    this.mTnt.getXform().setSize(this.kWidth, this.kHeight);
    this.mTnt.getXform().setZPos(2);
};

Tnt.prototype.deactivateTnt = function () {
    this.mIsUnlocked = true;
};

Tnt.prototype.getTntState = function () {
    return this.mIsUnlocked;
};