"use strict";

var gEngine = gEngine || { };
gEngine.Core = (function () {
    var mGL = null;
    var _initializeWebGL = function (htmlCanvasID) {
        var canvas = document.getElementById(htmlCanvasID);
        mGL = canvas.getContext("webgl", {alpha: false}) || canvas.getContext("experimental-webgl", {alpha: false});
        mGL.blendFunc(mGL.SRC_ALPHA, mGL.ONE_MINUS_SRC_ALPHA);
        mGL.enable(mGL.BLEND);
        mGL.pixelStorei(mGL.UNPACK_FLIP_Y_WEBGL, true);

        if (mGL === null) {
            document.write("<br><b>WebGL is not supported!</b>");
            return;
        }
    };
    var getGL = function () { return mGL; };

    var startScene = function (scene) {
        scene.loadScene.call(scene); 
        gEngine.GameLoop.start(scene); 
    };
    var initializeEngineCore = function (htmlCanvasID, myGame) {
        _initializeWebGL(htmlCanvasID);
        gEngine.VertexBuffer.initialize();
        gEngine.Input.initialize(htmlCanvasID);
        gEngine.AudioClips.initAudioContext();
        gEngine.DefaultResources.initialize(function () { startScene(myGame); });
    };
    var clearCanvas = function (color) {
        mGL.clearColor(color[0], color[1], color[2], color[3]);
        mGL.clear(mGL.COLOR_BUFFER_BIT);
    };

    var inheritPrototype = function (subClass, superClass) {
        var prototype = Object.create(superClass.prototype);
        prototype.constructor = subClass;
        subClass.prototype = prototype;
    };

    var cleanUp = function () {
        gEngine.DefaultResources.cleanUp();
        gEngine.VertexBuffer.cleanUp();
    };

    var mPublic = {
        getGL: getGL,
        initializeEngineCore: initializeEngineCore,
        clearCanvas: clearCanvas,
        inheritPrototype: inheritPrototype,
        startScene: startScene,
        cleanUp: cleanUp
    };

    return mPublic;
}());
