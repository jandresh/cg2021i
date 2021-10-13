/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame(htmlCanvasID) {
// Step A: Initialize the webGL Context
gEngine.Core.initializeWebGL(htmlCanvasID);
// Step B: Create the shader
this.mConstColorShader = new SimpleShader(
"src/GLSLShaders/SimpleVS.glsl", // Path to the VertexShader
"src/GLSLShaders/SimpleFS.glsl"); // Path to the FragmentShader
// Step C: Create the Renderable objects:
this.mWhiteSq = new Renderable(this.mConstColorShader);
this.mWhiteSq.setColor([1, 1, 1, 1]);
this.mRedSq = new Renderable(this.mConstColorShader);
this.mRedSq.setColor([1, 0, 0, 1]);
// Step D: Draw!
gEngine.Core.clearCanvas([0, 0.8, 0, 1]); // Clear the canvas
// Step D1: Draw Renderable objects with the white shader
this.mWhiteSq.draw();
// Step D2: Draw Renderable objects with the red shader
this.mRedSq.draw();
};