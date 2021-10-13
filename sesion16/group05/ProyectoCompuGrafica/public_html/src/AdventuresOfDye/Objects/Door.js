"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Door(cx, cy, texture0, texture1, texture2, lightSet,level) {
    this.kWidth = 1.2;
    this.kHeight = 3;
    this.kSpeed = 0.05;
    this.level=level;
    // control of movement
    this.mTopInitialYPosition = 0;
    this.mBotInitialYPosition = 0;
    this.mTopInitialXPosition = 0;
    this.mBotInitialXPosition = 0;
    this.mIsOpen = false;

    this.mDoorTop = new LightRenderable(texture0);
    this.mDoorBot = new LightRenderable(texture1);
    this.mDoorTopSleeve = new LightRenderable(texture2);
    this.mDoorBotSleeve = new LightRenderable(texture2);

    var i;
    for (i = 2; i < lightSet.numLights(); i++) {
        this.mDoorTop.addLight(lightSet.getLightAt(i));
        this.mDoorBot.addLight(lightSet.getLightAt(i));
        this.mDoorTopSleeve.addLight(lightSet.getLightAt(i));
        this.mDoorBotSleeve.addLight(lightSet.getLightAt(i));
    }

    this.buildSprite(cx, cy,level);
    GameObject.call(this, this.mDoorTop);

    var rigidShape; 
    if(level===1){
        rigidShape=new RigidRectangle(this.getXform(), this.kWidth ,this.kHeight * 2 );

    }else{
        rigidShape=new RigidRectangle(this.getXform(),  this.kHeight * 5 , this.kWidth);
    }
    
    rigidShape.setMass(0);  // ensures no movements!
    rigidShape.setDrawBounds(true);
    rigidShape.setColor([0, 0, 1, 1]);
    this.setPhysicsComponent(rigidShape);
}
gEngine.Core.inheritPrototype(Door, GameObject);

Door.prototype.update = function () {
    GameObject.prototype.update.call(this);
    if (this.mIsOpen) {
        this._openDoor();
    }
};

Door.prototype.draw = function (aCamera) {
    GameObject.prototype.draw.call(this, aCamera);
    this.mDoorTop.draw(aCamera);
    this.mDoorBot.draw(aCamera);
    this.mDoorTopSleeve.draw(aCamera);
    this.mDoorBotSleeve.draw(aCamera);

};

Door.prototype.buildSpriteY = function (atX, atY) {
    this.mTopInitialYPosition = atY + 3.25;
    this.mTopInitialXPosition = atX + 3.25;
    this.mDoorTop.getXform().setPosition(this.mTopInitialXPosition, atY);
    this.mDoorTop.getXform().setRotationInRad(1.57);
    this.mDoorTop.getXform().setSize(this.kWidth, this.kHeight*2.5);
    this.mDoorTop.getXform().setZPos(2);
    this.mDoorTop.setElementPixelPositions(0, 64, 0, 128);

    this.mBotInitialYPosition = atY - 3.25;
    this.mBotInitialXPosition = atX - 3.25;
    this.mDoorBot.getXform().setPosition(this.mBotInitialXPosition,atY);
    this.mDoorBot.getXform().setRotationInRad(1.57);
    this.mDoorBot.getXform().setSize(this.kWidth, this.kHeight*2.5);
    this.mDoorBot.getXform().setZPos(2);
    this.mDoorBot.setElementPixelPositions(0, 64, 0, 128);

    this.mDoorTopSleeve.getXform().setPosition(atX- 6.25,atY);
    this.mDoorTopSleeve.getXform().setRotationInRad(1.57);
    this.mDoorTopSleeve.getXform().setSize(this.kWidth + 1, this.kHeight + 2);
    this.mDoorTopSleeve.getXform().setZPos(2);
    this.mDoorTopSleeve.setElementPixelPositions(0, 128, 212, 512);

    this.mDoorBotSleeve.getXform().setPosition(atX+6.25,atY);
    this.mDoorBotSleeve.getXform().setRotationInRad(1.57);
    this.mDoorBotSleeve.getXform().setSize(this.kWidth + 1, this.kHeight + 2);
    this.mDoorBotSleeve.getXform().setZPos(2);
    this.mDoorBotSleeve.setElementPixelPositions(0, 128, 0, 300);
};

Door.prototype.buildSpriteX = function (atX, atY) {
    this.mTopInitialYPosition = atY + 1.3;
    this.mDoorTop.getXform().setPosition(atX, this.mTopInitialYPosition);
    this.mDoorTop.getXform().setSize(this.kWidth, this.kHeight);
    this.mDoorTop.getXform().setZPos(2);
    this.mDoorTop.setElementPixelPositions(0, 64, 0, 128);

    this.mBotInitialYPosition = atY - 1.3;
    this.mDoorBot.getXform().setPosition(atX, this.mBotInitialYPosition);
    this.mDoorBot.getXform().setSize(this.kWidth, this.kHeight);
    this.mDoorBot.getXform().setZPos(2);
    this.mDoorBot.setElementPixelPositions(0, 64, 0, 128);

    this.mDoorTopSleeve.getXform().setPosition(atX, atY + 2.5);
    this.mDoorTopSleeve.getXform().setSize(this.kWidth + 1, this.kHeight + 2);
    this.mDoorTopSleeve.getXform().setZPos(2);
    this.mDoorTopSleeve.setElementPixelPositions(0, 128, 212, 512);

    this.mDoorBotSleeve.getXform().setPosition(atX, atY - 2.5);
    this.mDoorBotSleeve.getXform().setSize(this.kWidth + 1, this.kHeight + 2);
    this.mDoorBotSleeve.getXform().setZPos(2);
    this.mDoorBotSleeve.setElementPixelPositions(0, 128, 0, 300);
};

Door.prototype.buildSprite = function (atX, atY,level){
    if(level===1){
        this.buildSpriteX(atX,atY);
    }else{
        this.buildSpriteY(atX,atY);
    }
}

Door.prototype._openDoorY = function () {
    var topY = this.mDoorTop.getXform().getYPos();
    var botY = this.mDoorBot.getXform().getYPos();
    var topX = this.mDoorTop.getXform().getXPos();
    var botX = this.mDoorBot.getXform().getXPos();
    console.log('Botx: '+ Math.abs(this.mBotInitialYPosition - botX) +'x1: '+Math.abs(this.mTopInitialYPosition - topX))
    console.log('absBoty: '+ Math.abs(this.mBotInitialYPosition - botY) +'+Topy: '+Math.abs(this.mTopInitialYPosition - topY))
    console.log('topY: '+ topY +' botY: '+botY);
    console.log('topX: '+ topX +' botX: '+botX);
    if (Math.abs(this.mTopInitialXPosition- topX)-10 <= this.kWidth 
            || Math.abs(this.mBotInitialXPosition - botX)-10 <= this.kWidth) {
        this.mDoorTop.getXform().setXPos(topX + 0.01);
        this.mDoorTop.setElementPixelPositions(64, 128, 0, 128);

        this.mDoorBot.getXform().setXPos(botX - 0.01);
        this.mDoorBot.setElementPixelPositions(64, 128, 0, 128);

        this.mDoorTopSleeve.setElementPixelPositions(128, 256, 212, 512);
        this.mDoorBotSleeve.setElementPixelPositions(128, 256, 0, 300);
    }
    


};

Door.prototype._openDoorX = function () {
    var topY = this.mDoorTop.getXform().getYPos();
    var botY = this.mDoorBot.getXform().getYPos();

    if (Math.abs(this.mTopInitialYPosition - topY) <= this.kHeight 
            || Math.abs(this.mBotInitialYPosition - botY) <= this.kHeight) {
        this.mDoorTop.getXform().setYPos(topY + 0.01);
        this.mDoorTop.setElementPixelPositions(64, 128, 0, 128);

        this.mDoorBot.getXform().setYPos(botY - 0.01);
        this.mDoorBot.setElementPixelPositions(64, 128, 0, 128);

        this.mDoorTopSleeve.setElementPixelPositions(128, 256, 212, 512);
        this.mDoorBotSleeve.setElementPixelPositions(128, 256, 0, 300);
    }
    


};

Door.prototype._openDoor = function (){
    if(this.level===1){
       this._openDoorX();
    }else{
        this._openDoorY();
    }
}

    Door.prototype.unlockDoor = function () {
        this.mIsOpen = true;
    };
