/*
 * File: SceneFile_Parse.js 
 */
/*jslint node: true, vars: true, white: true*/
/*global gEngine, Light, Camera, vec2, Platform, wave,
 LightSet, IllumRenderable, ParallaxGameObject, ShadowReceiver */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function SceneFileParser(sceneFilePath) {
    this.mSceneXml = gEngine.ResourceMap.retrieveAsset(sceneFilePath);

}

SceneFileParser.prototype._getElm = function (tagElm) {
    let theElm = this.mSceneXml.getElementsByTagName(tagElm);
    if (theElm.length === 0) {
        console.error("Warning: Level element:[" + tagElm + "]: is not found!");
    }
    return theElm;
};

SceneFileParser.prototype._convertToNum = function (a) {
    let i;
    for (i = 0; i < a.length; i++) {
        a[i] = Number(a[i]);
    }
};

SceneFileParser.prototype.parseCameras = function () {
    let elm = this._getElm("Camera");
    let i, x, y, width, viewport, bound, color;
    let cams = [];

    for (i = 0; i < elm.length; i++) {
        x = Number(elm[i].getAttribute("x"));
        y = Number(elm[i].getAttribute("y"));
        width = Number(elm[i].getAttribute("width"));
        viewport = elm[i].getAttribute("viewport").split(" ");
        bound = Number(elm[i].getAttribute("bound"));
        color = elm[i].getAttribute("color").split(" ");

        // make sure viewport and color are number
        this._convertToNum(viewport);
        this._convertToNum(color);

        let cam = new Camera(
            vec2.fromValues(x, y), // position of the camera
            width,                //  width of camera
            viewport,            //   viewport (orgX, orgY, width, height)
            bound
        );
        cam.setBackgroundColor(color);

        cams.push(cam);
    }

    return cams;
};

SceneFileParser.prototype.parseLights = function () {
    let elm = this._getElm("Light");
    let i, type, color, pos, dir, near, far, inner, outer, intensity, dropOff, shadow, lgt;
    let lightSet = new LightSet();
    let typesLight = [
        Light.eLightType.ePointLight,
        Light.eLightType.eDirectionalLight,
        Light.eLightType.eSpotLight
    ];

    for (i = 0; i < elm.length; i++) {
        type = Number(elm[i].getAttribute("type"));
        color = elm[i].getAttribute("color").split(" ");
        pos = elm[i].getAttribute("position").split(" ");
        dir = elm[i].getAttribute("direction").split(" ");
        near = Number(elm[i].getAttribute("near"));
        far = Number(elm[i].getAttribute("far"));
        inner = Number(elm[i].getAttribute("inner"));
        outer = Number(elm[i].getAttribute("outer"));
        intensity = Number(elm[i].getAttribute("intensity"));
        dropOff = Number(elm[i].getAttribute("dropOff"));
        shadow = elm[i].getAttribute("castShadow");

        // make sure array contains numbers
        this._convertToNum(color);
        this._convertToNum(pos);
        this._convertToNum(dir);

        // convert type ...
        lgt = new Light();
        lgt.setLightType(typesLight[type]);
        lgt.setColor(color);
        lgt.setXPos(pos[0]);
        lgt.setYPos(pos[1]);
        lgt.setZPos(pos[2]);
        lgt.setDirection(dir);
        lgt.setNear(near);
        lgt.setFar(far);
        lgt.setInner(inner);
        lgt.setOuter(outer);
        lgt.setIntensity(intensity);
        lgt.setDropOff(dropOff);
        lgt.setLightCastShadowTo(shadow === "true");

        lightSet.addToSet(lgt);
    }

    return lightSet;
};

SceneFileParser.prototype.parseBackgrounds = function (textures, normals, lightSet, camera) {
    let elm = this._getElm("Background");
    let i, j, x, y, elmPixelPos, width, height, parallaxScale, type, background, receiveShadow, lights;

    for (i = 0; i < elm.length; i++) {
        x = Number(elm[0].getAttribute("x"));
        y = Number(elm[0].getAttribute("y"));
        elmPixelPos = elm[i].getAttribute("elementPixelPosition").split(" ");
        width = Number(elm[i].getAttribute("width"));
        height = Number(elm[i].getAttribute("height"));
        parallaxScale = Number(elm[i].getAttribute("parallaxScale"));
        type = elm[i].getAttribute("type");
        receiveShadow = elm[i].getAttribute("receiveShadow");
        lights = elm[i].getAttribute("lights").split(" ");

        // make sure array contains numbers
        this._convertToNum(elmPixelPos);
        this._convertToNum(lights);

        if (normals[type] !== null) {
            background = new IllumRenderable(textures[type], normals[type]);
        } else {
            background = new LightRenderable(textures[type]);
        }

        background.setElementPixelPositions(elmPixelPos[0], elmPixelPos[1], elmPixelPos[2], elmPixelPos[3]);
        background.getXform().setSize(width, height);
        background.getXform().setPosition(x, y);

        if (lights[0] > -1) {
            for (j = 0; j < lights.length; j++) {
                background.addLight(lightSet.getLightAt(lights[j]));
            }
        }

        background = new ParallaxGameObject(background, parallaxScale, camera);

        if (receiveShadow === "true") {
            background = new ShadowReceiver(background);
            gEngine.LayerManager.addToLayer(gEngine.eLayer.eShadowReceiver, background);
        } else {
            gEngine.LayerManager.addToLayer(gEngine.eLayer.eBackground, background);
        }
    }
};

SceneFileParser.prototype.parseWalls = function (textures, normals, lightSet) {
    let elm = this._getElm("Wall");
    let i, x, y, w, h, type, elmPixelPos, wall;
    let allWalls = new GameObjectSet();

    for (i = 0; i < elm.length; i++) {
        x = Number(elm[i].getAttribute("x"));
        y = Number(elm[i].getAttribute("y"));
        w = Number(elm[i].getAttribute("weight"));
        h = Number(elm[i].getAttribute("height"));
        type = elm[i].getAttribute("type");
        elmPixelPos = elm[i].getAttribute("elementPixelPosition").split(" ");

        // make sure array contains numbers
        this._convertToNum(elmPixelPos);

        wall = new Wall(x, y, w, h, elmPixelPos, textures[type], normals[type], lightSet);
        gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, wall);

        allWalls.addToSet(wall);
    }

    return allWalls;
};

SceneFileParser.prototype.parsePlatforms = function (textures, normals, lightSet) {
    let elm = this._getElm("Platform");
    let i, x, y, v, r, p, type;
    let allPlatforms = new GameObjectSet();

    for (i = 0; i < elm.length; i++) {
        x = Number(elm[i].getAttribute("x"));
        y = Number(elm[i].getAttribute("y"));
        v = elm[i].getAttribute("velocity").split(" ");
        r = Number(elm[i].getAttribute("movementRange"));
        type = elm[i].getAttribute("type");

        // make sure color array contains numbers
        this._convertToNum(v);

        p = new Platform(x, y, v, r, textures[type], normals[type], lightSet);

        gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, p);
        gEngine.LayerManager.addAsShadowCaster(p);

        allPlatforms.addToSet(p);
    }

    return allPlatforms;
};

SceneFileParser.prototype.parseWaves = function (textures, normals, lightSet) {
    let elm = this._getElm("Wave");
    let x, y, w, h, pc, type, wave;
    let mAllWaves = new GameObjectSet();

    for (var index = 0; index < elm.length; index++) {
        x = Number(elm[index].getAttribute("x"));
        y = Number(elm[index].getAttribute("y"));
        w = Number(elm[index].getAttribute("weight"));
        h = Number(elm[index].getAttribute("height"));
        pc = Number(elm[index].getAttribute("playerCollision"));
        type = elm[index].getAttribute("type");

        wave = new Wave(x, y, w, h, pc, textures[type], normals[type], lightSet);
        gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, wave);

        mAllWaves.addToSet(wave);
    }

    return mAllWaves;
};

SceneFileParser.prototype.parseDoors = function (textures, normals, lightSet) {
    let elm = this._getElm("Door");
    let i, x, y, w, h, pc, type, mDoor;
    let allDoors = new GameObjectSet();

    for (i = 0; i < elm.length; i++) {
        x = Number(elm[i].getAttribute("x"));
        y = Number(elm[i].getAttribute("y"));
        w = Number(elm[i].getAttribute("weight"));
        h = Number(elm[i].getAttribute("height"));
        pc = Number(elm[i].getAttribute("playerCollision"));
        type = elm[i].getAttribute("type");

        mDoor = new Door(x, y, w, h, pc, textures[type], normals[type], lightSet);

        gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, mDoor);

        allDoors.addToSet(mDoor);
    }

    return allDoors;
};

SceneFileParser.prototype.parsePushButton = function (textures, normals, lightSet) {
    let elm = this._getElm("PushButton");
    let i, x, y, w, h, p, type, mPushButton;
    let allPushButtons = new GameObjectSet();

    for (i = 0; i < elm.length; i++) {
        x = Number(elm[i].getAttribute("x"));
        y = Number(elm[i].getAttribute("y"));
        w = Number(elm[i].getAttribute("weight"));
        h = Number(elm[i].getAttribute("height"));
        p = Number(elm[i].getAttribute("platform"));
        type = elm[i].getAttribute("type");

        mPushButton = new PushButton(x, y, w, h, p, textures[type], normals[type], lightSet);
        gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, mPushButton);

        allPushButtons.addToSet(mPushButton);
    }
    return allPushButtons;
};

SceneFileParser.prototype.parseCharacters = function (textures, normals, lightSet, kSounds) {
    let elm = this._getElm("Character");
    let i, x, y, type, mCharacter;
    let allCharacters = new GameObjectSet();

    for (i = 0; i < elm.length; i++) {
        x = Number(elm[i].getAttribute("x"));
        y = Number(elm[i].getAttribute("y"));
        type = elm[i].getAttribute("type");

        mCharacter = new Character(x, y, textures[type], normals[type], lightSet, type, kSounds);

        gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, mCharacter);
        gEngine.LayerManager.addAsShadowCaster(mCharacter);

        allCharacters.addToSet(mCharacter);
    }

    return allCharacters;
};

SceneFileParser.prototype.parseDiamond = function (textures, normals, lightSet) {
    let elm = this._getElm("Diamond");
    let i, x, y, w, h, pc, type, mDiamond;
    let allDiamonds = new GameObjectSet();

    for (i = 0; i < elm.length; i++) {
        x = Number(elm[i].getAttribute("x"));
        y = Number(elm[i].getAttribute("y"));
        w = Number(elm[i].getAttribute("weight"));
        h = Number(elm[i].getAttribute("height"));
        pc = Number(elm[i].getAttribute("playerCollision"));
        type = elm[i].getAttribute("type");

        mDiamond = new Diamond(x, y, w, h, pc, textures[type], normals[type], lightSet, type);
        gEngine.LayerManager.addToLayer(gEngine.eLayer.eActors, mDiamond);

        allDiamonds.addToSet(mDiamond);
    }
    return allDiamonds;
};

SceneFileParser.prototype.parseParticle = function (textures) {
    let elm = this._getElm("Particle");
    let i, x, y, p, type;

    for (i = 0; i < elm.length; i++) {
        x = Number(elm[i].getAttribute("x"));
        y = Number(elm[i].getAttribute("y"));
        type = elm[i].getAttribute("type");

        var life = 30 + Math.random() * 200;
        p = new ParticleGameObject(textures[type], x, y, life);
        p.getRenderable().setColor([0.15, 0.83, 0.15, 1]);
    
        // size of the particle
        var r = 1.5 + Math.random() * 0.5;
        p.getXform().setSize(r, r);
        
        // final color
        var fr = 0.15 + Math.random();
        var fg = 0.83 + 0.01 * Math.random();
        var fb = 0.15 + 0.01 * Math.random();
        p.setFinalColor([fr, fg, fb, 0.6]);
        
        // velocity on the particle
        var fx = 10 - 20 * Math.random();
        var fy = 10 * Math.random();
        p.getPhysicsComponent().setVelocity([fx, fy]);
        
        // size delta
        p.setSizeDelta(0.98);
    }
    return p;
};
