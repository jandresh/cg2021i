/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function Explosion(atX, atY) {
    this.kMinionSprite = "assets/minion_sprite.png";
    this.kDeltaDegree = 0;
    this.kDeltaRad = Math.PI * this.kDeltaDegree / 180;
    this.kDeltaSpeed = 0;
    this.mExplosion = new SpriteAnimateRenderable(this.kMinionSprite);
    this.mExplosion.getXform().incRotationByRad(4.7122)
    this.mExplosion.setColor([1, 1, 1, 0]);
    this.mExplosion.getXform().setPosition(atX, atY);
    this.mExplosion.getXform().setSize(0.15, 0.2);
    this.mExplosion.setSpriteSequence(356, 624, 146, 146, 3, 79);
    GameObject.call(this, this.mExplosion);

    this.setSpeed(0.1);
}
gEngine.Core.inheritPrototype(Explosion, GameObject);

Explosion.prototype.update = function () {
    var xform = this.getXform();
    xform.incXPosBy(this.kDeltaSpeed);
};