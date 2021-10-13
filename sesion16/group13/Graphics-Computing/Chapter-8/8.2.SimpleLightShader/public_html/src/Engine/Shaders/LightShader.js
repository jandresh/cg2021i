"use strict";


function LightShader(vertexShaderPath, fragmentShaderPath) {
    SpriteShader.call(this, vertexShaderPath, fragmentShaderPath);

    this.mColorRef = null;
    this.mPosRef = null;
    this.mRadiusRef = null;
    this.mIsOnRef = null;
    this.mLight = null;
    var shader = this.mCompiledShader;
    var gl = gEngine.Core.getGL();
    this.mColorRef = gl.getUniformLocation(shader, "uLightColor");
    this.mPosRef = gl.getUniformLocation(shader, "uLightPosition");
    this.mRadiusRef = gl.getUniformLocation(shader, "uLightRadius");
    this.mIsOnRef = gl.getUniformLocation(shader, "uLightOn");
}
gEngine.Core.inheritPrototype(LightShader, SpriteShader);
LightShader.prototype.activateShader = function (pixelColor, aCamera) {
    SpriteShader.prototype.activateShader.call(this, pixelColor, aCamera);
    if (this.mLight !== null) {
        this._loadToShader(aCamera);
    } else {
        gEngine.Core.getGL().uniform1i(this.mIsOnRef, false);
    }
};

LightShader.prototype.setLight = function (l) {
    this.mLight = l;
};

LightShader.prototype._loadToShader = function (aCamera) {
    var gl = gEngine.Core.getGL();
    gl.uniform1i(this.mIsOnRef, this.mLight.isLightOn());
    if (this.mLight.isLightOn()) {
        var p = aCamera.wcPosToPixel(this.mLight.getPosition());
        var r = aCamera.wcSizeToPixel(this.mLight.getRadius());
        var c = this.mLight.getColor();

        gl.uniform4fv(this.mColorRef, c);
        gl.uniform3fv(this.mPosRef, vec3.fromValues(p[0], p[1], p[2]));
        gl.uniform1f(this.mRadiusRef, r);
    }
};