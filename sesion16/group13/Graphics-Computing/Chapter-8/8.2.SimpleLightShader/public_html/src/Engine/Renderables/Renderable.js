"use strict";

function Renderable() {
    this.mShader = gEngine.DefaultResources.getConstColorShader();
    this.mXform = new Transform();
    this.mColor = [1, 1, 1, 1];
}
Renderable.prototype.draw = function (aCamera) {
    var gl = gEngine.Core.getGL();
    this.mShader.activateShader(this.mColor, aCamera);
    this.mShader.loadObjectTransform(this.mXform.getXform());
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

Renderable.prototype.getXform = function () { return this.mXform; };
Renderable.prototype.setColor = function (color) { this.mColor = color; };
Renderable.prototype.getColor = function () { return this.mColor; };
Renderable.prototype._setShader = function (s) { this.mShader = s; };