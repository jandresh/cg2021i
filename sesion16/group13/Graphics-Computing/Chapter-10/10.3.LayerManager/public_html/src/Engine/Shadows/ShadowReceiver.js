"use strict";

function ShadowReceiver (theReceiverObject) {
    this.kShadowStencilBit = 0x01;              // The stencil bit to switch on/off for shadow
    this.kShadowStencilMask = 0xFF;             // The stencil mask 
    this.mReceiverShader = gEngine.DefaultResources.getShadowReceiverShader();
    
    this.mReceiver = theReceiverObject;
    
    // To support shadow drawing
    this.mShadowCaster = [];                    // array of ShadowCasters
}
    
// <editor-fold desc="support for setting and removing casters ">
ShadowReceiver.prototype.addShadowCaster = function (lgtRenderable) {
    var c = new ShadowCaster(lgtRenderable, this.mReceiver);
    this.mShadowCaster.push(c);
};
// for now, cannot remove shadow casters
// </editor-fold>

// <editor-fold  desc="shadow drawing support">
ShadowReceiver.prototype.draw = function (aCamera) {
    var c;
    
    // draw receiver as a regular renderable
    this.mReceiver.draw(aCamera);
    
    this._shadowRecieverStencilOn();
    var s = this.mReceiver.getRenderable().swapShader(this.mReceiverShader);
    this.mReceiver.draw(aCamera);
    this.mReceiver.getRenderable().swapShader(s);
    this._shadowRecieverStencilOff();
    
    // now draw shadow color to the pixels in the stencil that are switched on
    for (c = 0; c < this.mShadowCaster.length; c++) {
        this.mShadowCaster[c].draw(aCamera);
    }
    
    // switch off stencil checking
    this._shadowRecieverStencilDisable();
};

// 
ShadowReceiver.prototype.update = function () {
    this.mReceiver.update();
};