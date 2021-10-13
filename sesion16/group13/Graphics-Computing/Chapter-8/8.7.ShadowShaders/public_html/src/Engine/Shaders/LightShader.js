"use strict"; 
function LightShader(vertexShaderPath, fragmentShaderPath) {
    SpriteShader.call(this, vertexShaderPath, fragmentShaderPath);

    this.mLights = null;  // lights from the Renderable

    //*******WARNING***************
    // this number MUST correspond to the GLSL uLight[] array size (for LightFS.glsl)
    //*******WARNING********************
    this.kGLSLuLightArraySize = 4;  // <-- make sure this is the same as LightFS.glsl
    this.mShaderLights = [];
    var i, ls;
    for (i = 0; i < this.kGLSLuLightArraySize; i++) {
        ls = new ShaderLightAtIndex(this.mCompiledShader, i);
        this.mShaderLights.push(ls);
    }
}
gEngine.Core.inheritPrototype(LightShader, SpriteShader);
LightShader.prototype.activateShader = function (pixelColor, aCamera) {
    SpriteShader.prototype.activateShader.call(this, pixelColor, aCamera);
    var numLight = 0;
    if (this.mLights !== null) {
        while (numLight < this.mLights.length) {
            this.mShaderLights[numLight].loadToShader(aCamera, this.mLights[numLight]);
            numLight++;
        }
    }
    while (numLight < this.kGLSLuLightArraySize) {
        this.mShaderLights[numLight].switchOffLight(); // switch off unused lights
        numLight++;
    }
};

LightShader.prototype.setLights = function (l) {
    this.mLights = l;
};