"use strict";

function Minion(spriteTexture, normalMap, atX, atY) {
    this.kDelta = 0.2;

    if (normalMap === null) {
        this.mMinion = new LightRenderable(spriteTexture);
    } else {
        this.mMinion = new IllumRenderable(spriteTexture, normalMap);
    }

    this.mMinion.setColor([1, 1, 1, 0]);
    this.mMinion.getXform().setPosition(atX, atY);
    this.mMinion.getXform().setSize(9, 7.2);
    this.mMinion.getXform().setZPos(2);
    this.mMinion.setSpriteSequence(512, 0,      // first element pixel position: top-left 512 is top of image, 0 is left of image
                                   204, 164,    // widthxheight in pixels
                                   5,           // number of elements in this sequence
                                   0);          // horizontal padding in between
    this.mMinion.setAnimationType(SpriteAnimateRenderable.eAnimationType.eAnimateSwing);
    this.mMinion.setAnimationSpeed(30);
                                // show each element for mAnimSpeed updates
    GameObject.call(this, this.mMinion);
}
gEngine.Core.inheritPrototype(Minion, GameObject);

Minion.prototype.update = function () {
    // remember to update this.mMinion's animation
    this.mMinion.updateAnimation();
};