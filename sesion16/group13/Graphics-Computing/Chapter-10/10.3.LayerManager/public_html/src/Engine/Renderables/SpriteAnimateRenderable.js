"use strict";

function SpriteAnimateRenderable(myTexture) {
    SpriteRenderable.call(this, myTexture);
    Renderable.prototype._setShader.call(this, gEngine.DefaultResources.getSpriteShader());

    this.mFirstElmLeft = 0.0;
    this.mElmTop = 1.0;
    this.mElmWidth = 1.0;
    this.mElmHeight = 1.0;
    this.mWidthPadding = 0.0;
    this.mNumElems = 1;
    this.mUpdateInterval = 1;
    this.mAnimationType = SpriteAnimateRenderable.eAnimationType.eAnimateRight;
    this.mCurrentAnimAdvance = -1;
    this.mCurrentElm = 0;
    this._initAnimation();
}
gEngine.Core.inheritPrototype(SpriteAnimateRenderable, SpriteRenderable);

SpriteAnimateRenderable.prototype._initAnimation = function () {
    this.mCurrentTick = 0;
    switch (this.mAnimationType) {
    case SpriteAnimateRenderable.eAnimationType.eAnimateRight:
        this.mCurrentElm = 0;
        this.mCurrentAnimAdvance = 1;
        break;
    case SpriteAnimateRenderable.eAnimationType.eAnimateSwing:
        this.mCurrentAnimAdvance = -1 * this.mCurrentAnimAdvance;
        this.mCurrentElm += 2 * this.mCurrentAnimAdvance;
        break;
    case SpriteAnimateRenderable.eAnimationType.eAnimateLeft:
        this.mCurrentElm = this.mNumElems - 1;
        this.mCurrentAnimAdvance = -1;
        break;
    }
    this._setSpriteElement();
};

SpriteAnimateRenderable.prototype._setSpriteElement = function () {
    var left = this.mFirstElmLeft + (this.mCurrentElm * (this.mElmWidth + this.mWidthPadding));
    SpriteRenderable.prototype.setElementUVCoordinate.call(this, left, left + this.mElmWidth,
                                        this.mElmTop - this.mElmHeight, this.mElmTop);
};

SpriteAnimateRenderable.eAnimationType = Object.freeze({
    eAnimateRight: 0,
    eAnimateLeft: 1,
    eAnimateSwing: 2
});

SpriteAnimateRenderable.prototype.setSpriteSequence = function (
    topPixel,
    leftPixel,
    elmWidthInPixel,
    elmHeightInPixel,
    numElements,
    wPaddingInPixel
) {
    var texInfo = gEngine.ResourceMap.retrieveAsset(this.mTexture);
    var imageW = texInfo.mWidth;
    var imageH = texInfo.mHeight;
    this.mNumElems = numElements;
    this.mFirstElmLeft = leftPixel / imageW;
    this.mElmTop = topPixel / imageH;
    this.mElmWidth = elmWidthInPixel / imageW;
    this.mElmHeight = elmHeightInPixel / imageH;
    this.mWidthPadding = wPaddingInPixel / imageW;
    this._initAnimation();
};

SpriteAnimateRenderable.prototype.setAnimationSpeed = function (tickInterval) {
    this.mUpdateInterval = tickInterval;
};

SpriteAnimateRenderable.prototype.incAnimationSpeed = function (deltaInterval) {
    this.mUpdateInterval += deltaInterval;
};

SpriteAnimateRenderable.prototype.setAnimationType = function (animationType) {
    this.mAnimationType = animationType;
    this.mCurrentAnimAdvance = -1;
    this.mCurrentElm = 0;
    this._initAnimation();
};

SpriteAnimateRenderable.prototype.updateAnimation = function () {
    this.mCurrentTick++;
    if (this.mCurrentTick >= this.mUpdateInterval) {
        this.mCurrentTick = 0;
        this.mCurrentElm += this.mCurrentAnimAdvance;
        if ((this.mCurrentElm >= 0) && (this.mCurrentElm < this.mNumElems)) {
            this._setSpriteElement();
        } else {
            this._initAnimation();
        }
    }
};