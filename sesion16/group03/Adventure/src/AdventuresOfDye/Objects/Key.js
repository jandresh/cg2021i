
function Key(cx, cy, texture, lightSet) {
    this.kWidth = 1;
    this.kHeight = 1;
    this.mKey = new LightRenderable(texture);

    this.mKey.addLight(lightSet.getLightAt(2));
    

    this.buildSprite(cx, cy);
    GameObject.call(this, this.mKey);

    var rigidShape = new RigidRectangle(this.getXform(), this.kWidth, this.kHeight);
    rigidShape.setMass(0);  // ensures no movements!
    this.setPhysicsComponent(rigidShape);
}
gEngine.Core.inheritPrototype(Key, GameObject);


Key.prototype.buildSprite = function (atX, atY) {
    this.mKey.getXform().setPosition(atX, atY);
    this.mKey.getXform().setSize(this.kWidth, this.kHeight);
    this.mKey.getXform().setZPos(2);
};

Key.prototype.portarLlave = function (x, y){
    this.mKey.getXform().setPosition(x, y);
    this.mKey.getXform().setSize(0.5, 0.5);
    this.mKey.getXform().setZPos(0);
}