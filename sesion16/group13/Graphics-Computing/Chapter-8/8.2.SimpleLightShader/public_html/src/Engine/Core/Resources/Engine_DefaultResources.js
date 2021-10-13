"use strict";

var gEngine = gEngine || { };

gEngine.DefaultResources = (function () {
    var mGlobalAmbientColor = [0.3, 0.3, 0.3, 1];
    var mGlobalAmbientIntensity = 1;
    var getGlobalAmbientIntensity = function () { return mGlobalAmbientIntensity; };
    var setGlobalAmbientIntensity = function (v) { mGlobalAmbientIntensity = v; };
    var getGlobalAmbientColor = function () { return mGlobalAmbientColor; };
    var setGlobalAmbientColor = function (v) { mGlobalAmbientColor = vec4.fromValues(v[0], v[1], v[2], v[3]); };
    var kSimpleVS = "src/GLSLShaders/SimpleVS.glsl";  
    var kSimpleFS = "src/GLSLShaders/SimpleFS.glsl";  
    var mConstColorShader = null;
    var kTextureVS = "src/GLSLShaders/TextureVS.glsl";  
    var kTextureFS = "src/GLSLShaders/TextureFS.glsl";  
    var mTextureShader = null;
    var mSpriteShader = null;
    var kLineFS = "src/GLSLShaders/LineFS.glsl";        
    var mLineShader = null;
    var kLightFS = "src/GLSLShaders/LightFS.glsl";
    var mLightShader = null;
    var kDefaultFont = "assets/fonts/system-default-font";
    var getDefaultFont = function () { return kDefaultFont; };

    var _createShaders = function (callBackFunction) {
        gEngine.ResourceMap.setLoadCompleteCallback(null);
        mConstColorShader = new SimpleShader(kSimpleVS, kSimpleFS);
        mTextureShader = new TextureShader(kTextureVS, kTextureFS);
        mSpriteShader =  new SpriteShader(kTextureVS, kTextureFS);
        mLineShader =  new LineShader(kSimpleVS, kLineFS);
        mLightShader = new LightShader(kTextureVS, kLightFS);
        callBackFunction();
    };

    var getConstColorShader = function () { return mConstColorShader; };
    var getTextureShader = function () { return mTextureShader; };
    var getSpriteShader = function () { return mSpriteShader; };
    var getLineShader = function () { return mLineShader; };
    var getLightShader = function () { return mLightShader; };

    var initialize = function (callBackFunction) {
        gEngine.TextFileLoader.loadTextFile(kSimpleVS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.TextFileLoader.loadTextFile(kSimpleFS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.TextFileLoader.loadTextFile(kTextureVS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.TextFileLoader.loadTextFile(kTextureFS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.TextFileLoader.loadTextFile(kLineFS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.TextFileLoader.loadTextFile(kLightFS, gEngine.TextFileLoader.eTextFileType.eTextFile);
        gEngine.Fonts.loadFont(kDefaultFont);
        gEngine.ResourceMap.setLoadCompleteCallback(function s() {_createShaders(callBackFunction); });
    };

    var cleanUp = function () {
        mConstColorShader.cleanUp();
        mTextureShader.cleanUp();
        mSpriteShader.cleanUp();
        mLineShader.cleanUp();
        mLightShader.cleanUp();

        gEngine.TextFileLoader.unloadTextFile(kSimpleVS);
        gEngine.TextFileLoader.unloadTextFile(kSimpleFS);
        gEngine.TextFileLoader.unloadTextFile(kTextureVS);
        gEngine.TextFileLoader.unloadTextFile(kTextureFS);
        gEngine.TextFileLoader.unloadTextFile(kLineFS);
        gEngine.TextFileLoader.unloadTextFile(kLightFS);
        gEngine.Fonts.unloadFont(kDefaultFont);
    };

    var mPublic = {
        initialize: initialize,
        getConstColorShader: getConstColorShader,
        getTextureShader: getTextureShader,
        getSpriteShader: getSpriteShader,
        getLineShader: getLineShader,
        getLightShader: getLightShader,
        getDefaultFont: getDefaultFont,
        getGlobalAmbientColor: getGlobalAmbientColor,
        setGlobalAmbientColor: setGlobalAmbientColor,
        getGlobalAmbientIntensity: getGlobalAmbientIntensity,
        setGlobalAmbientIntensity: setGlobalAmbientIntensity,
        cleanUp: cleanUp
    };
    return mPublic;
}());