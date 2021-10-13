/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// Assumption: first sprite in an animation is always the left-most element.
SpriteAnimateRenderable.eAnimationType = Object.freeze({
    eAnimateRight: 0, // Animate from left to right, then restart to left
    eAnimateLeft: 1, // Animate from right to left, then restart to right
    eAnimateSwing: 2 // Animate first left to right, then animates backwards
});

function SpriteAnimateRenderable(myTexture) {
    SpriteRenderable.call(this, myTexture);
    Renderable.prototype._setShader.call(this, gEngine.DefaultResources.
    getSpriteShader());
    // All coordinates are in texture coordinate (UV between 0 to 1)
    // Information on the sprite element
    this.mFirstElmLeft = 0.0; // 0.0 is left corner of image
    this.mElmTop = 1.0; // 1.0 is top corner of image
    this.mElmWidth = 1.0; // default sprite element size is the entire image
    this.mElmHeight = 1.0;
    this.mWidthPadding = 0.0;
    this.mNumElems = 1; // number of elements in an animation
    // per animation settings
    this.mAnimationType = SpriteAnimateRenderable.eAnimationType.eAnimateRight;
    this.mUpdateInterval = 1; // how often to advance
    // current animation state
    this.mCurrentAnimAdvance = -1;
    this.mCurrentElm = 0;
    this._initAnimation();
}
gEngine.Core.inheritPrototype(SpriteAnimateRenderable, SpriteRenderable);

SpriteAnimateRenderable.prototype.setAnimationType = function(animationType) {
    this.mAnimationType = animationType;
    this.mCurrentAnimAdvance = -1;
    this.mCurrentElm = 0;
    this._initAnimation();
};

SpriteAnimateRenderable.prototype._initAnimation = function() {
    // Currently running animation
    this.mCurrentTick = 0;
    switch (this.mAnimationType) {
    case SpriteAnimateRenderable.eAnimationType.eAnimateRight:
    this.mCurrentElm = 0;
    this.mCurrentAnimAdvance = 1; // either 1 or -1
    break;
    case SpriteAnimateRenderable.eAnimationType.eAnimateSwing:
    this.mCurrentAnimAdvance = -1 * this.mCurrentAnimAdvance;
    this.mCurrentElm += 2*this.mCurrentAnimAdvance;
    break;
    case SpriteAnimateRenderable.eAnimationType.eAnimateLeft:
    this.mCurrentElm = this.mNumElems - 1;
    this.mCurrentAnimAdvance = -1; // either 1 or -1
    break;
    }
    this._setSpriteElement();
};

SpriteAnimateRenderable.prototype._setSpriteElement = function() {
    var left = this.mFirstElmLeft + (this.mCurrentElm * (this.mElmWidth +
    this.mWidthPadding));
    SpriteRenderable.prototype.setElementUVCoordinate.call(this, left,
    left+this.mElmWidth,
    this.mElmTop-this.mElmHeight,
    this.mElmTop);
};

// Always set the right-most element to be the first
SpriteAnimateRenderable.prototype.setSpriteSequence = function(
    topPixel, // offset from top-left
    rightPixel, // offset from top-left
    elmWidthInPixel,
    elmHeightInPixel,
    numElements, // number of elements in sequence
    wPaddingInPixel // left/right padding
)
{
    var texInfo = gEngine.ResourceMap.retrieveAsset(this.mTexture);
    // entire image width, height
    var imageW = texInfo.mWidth;
    var imageH = texInfo.mHeight;
    this.mNumElems = numElements; // number of elements in animation
    this.mFirstElmLeft = rightPixel / imageW;
    this.mElmTop = topPixel / imageH;
    this.mElmWidth = elmWidthInPixel / imageW;
    this.mElmHeight = elmHeightInPixel / imageH;
    this.mWidthPadding = wPaddingInPixel / imageW;
    this._initAnimation();
};

SpriteAnimateRenderable.prototype.setAnimationSpeed = function(tickInterval) {
    // number of update calls before advancing animation
    this.mUpdateInterval = tickInterval; // how often to advance
    };
    SpriteAnimateRenderable.prototype.incAnimationSpeed = function(deltaInterval) {
    // number of update calls before advancing animation
    this.mUpdateInterval += deltaInterval; // how often to advance
};

SpriteAnimateRenderable.prototype.updateAnimation = function() {
    this.mCurrentTick++;
    if (this.mCurrentTick >= this.mUpdateInterval) {
        this.mCurrentTick = 0;
        this.mCurrentElm += this.mCurrentAnimAdvance;
        if ((this.mCurrentElm >= 0) && (this.mCurrentElm < this.mNumElems))
            this._setSpriteElement();
        else
            this._initAnimation();
    }
};