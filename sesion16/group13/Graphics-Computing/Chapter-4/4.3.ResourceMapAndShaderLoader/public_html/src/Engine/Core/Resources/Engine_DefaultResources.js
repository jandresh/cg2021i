/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var gEngine = gEngine || { };
gEngine.DefaultResources = (function() {
    // Simple Shader GLSL Shader file paths
    var kSimpleVS = "src/GLSLShaders/SimpleVS.glsl"; // Path to the VertexShader
    var kSimpleFS = "src/GLSLShaders/SimpleFS.glsl"; // Path to the simple
    // FragmentShader
    var mConstColorShader = null; // variable for the SimpleShader object
    var _getConstColorShader = function() { return mConstColorShader; }; // assessor
    // callback function after loadings are done
    var _createShaders = function(callBackFunction) {
        mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
        callBackFunction();
    };
    // initiate asynchronous loading of GLSL Shader files
    var _initialize = function(callBackFunction) {
        // constant color shader: SimpleVS, and SimpleFS
        gEngine.TextFileLoader.loadTextFile(kSimpleVS,
        gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.TextFileLoader.loadTextFile(kSimpleFS,
        gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.ResourceMap.setLoadCompleteCallback(
        function() {_createShaders(callBackFunction);});
    }; 
    var mPublic = {
        initialize: _initialize,
        getConstColorShader: _getConstColorShader
    };
    return mPublic;    
}());
