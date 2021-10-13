
// Constructor and object definition
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Renderable(shader) {
    this.mShader = shader;       // the shader for shading this object
    this.mXform = new Transform(); // transform that moves this object around    
    this.mColor = [1, 1, 1, 1];  // Color for fragment shader
}

Renderable.prototype.draw = function() {
    var gl = gEngine.Core.getGL();
    this.mShader.activateShader(this.mColor);
    // always activate the shader first!
    this.mShader.loadObjectTransform(this.mXform.getXform());
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
};

Renderable.prototype.setColor = function (color) { this.mColor = color; };
Renderable.prototype.getColor = function () { return this.mColor; };
Renderable.prototype.getXform = function() { return this.mXform; }

