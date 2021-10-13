/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

var gGL = null;
    // The GL context upon which we will access web-GL functionality
    // Convention: global variable names: gName

// Initialize the webGL by binding the functionality to the gGL variable
function initializeGL() {
 var canvas = document.getElementById("GLCanvas");
 gGL = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
 if (gGL !== null) {
     gGL.clearColor(0.0, 0.8, 0.0, 1.0); // set the color to be cleared
 } else {
     document.write("<br><b>WebGL is not supported!</b>");
 }
}

// Clears the gGL area to the defined color
function clearCanvas() {
    gGL.clear(gGL.COLOR_BUFFER_BIT);      // clear to the color previously set
}

// this is the function that will cause the WebGL drawing
function doGLDraw() {
    initializeGL();   // Binds gGL context to WebGL functionality
    clearCanvas();    // Clears the GL area
}