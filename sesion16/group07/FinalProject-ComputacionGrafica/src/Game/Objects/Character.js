"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Character(x, y, texture, normal, lgtSet, player, kSounds) {
    this.mCharacterState = Character.eCharacterState.eFace;
    this.mPreviousCharacterState = Character.eCharacterState.eFace;
    this.mIsMoving = false;
    this.mIsJumping = false;
    this.mCanJump = true;
    this.mCanMove = true;
    this.mDelta = 0.4;
    this.mMinPosX = 0;
    this.mMaxPosX = 0;
    this.mJumpLimit = 0;
    this.mXAxisCorrection = -0.7;
    this.mYAxisCorrection = 1.5;
    this.score = 0;
    this.numPlatform = -1;
    this.numPushButtonCollide = -1;
    this.inDoor = false;  
    this.kSounds = kSounds;
    this.soundJump = player + "_jump";
    this.soundWalking = player + "_wave_walking";

    if(normal !== null){
        this.mCharacter = new IllumRenderable(texture, normal);
    }else{
        this.mCharacter = new LightRenderable(texture);
    }
    
    this.mCharacter.getXform().setPosition(x, y);
    this.mCharacter.getXform().setZPos(1);
    this.mCharacter.getXform().setSize(7, 7);
    this.mCharacter.setSpriteSequence(2048, 0, 256, 256, 1, 0);
    this.mCharacter.setAnimationSpeed(0);
    this.mCharacter.addLight(lgtSet.getLightAt(0));
    this.mCharacter.addLight(lgtSet.getLightAt(3));

    GameObject.call(this, this.mCharacter);

    let transform = new Transform();
    transform.setPosition(x, y);

    let rigidShape = new RigidRectangle(transform, 1, 4);
    rigidShape.setMass(2.5);
    rigidShape.setRestitution(0);
    rigidShape.setFriction(0);
    rigidShape.setColor([0, 1, 0, 1]);
    rigidShape.setDrawBounds(false);
    this.setPhysicsComponent(rigidShape);

    let motionControls = {
        eLeft: (player !== "water_character") ? gEngine.Input.keys.A : gEngine.Input.keys.Left,
        eRight: (player !== "water_character") ? gEngine.Input.keys.D : gEngine.Input.keys.Right,
        eUp: (player !== "water_character") ? gEngine.Input.keys.W : gEngine.Input.keys.Up
    };
    this.eMotionControls = Object.freeze(motionControls);
}
gEngine.Core.inheritPrototype(Character, GameObject);

Character.eCharacterState = Object.freeze({
    eFace: 0,
    eRunLeft: 1,
    eRunRight: 2,
    eJumpUp: 3,
    eJumpLeft: 4,
    eJumpRight: 5,
    eFallDown: 6
});

Character.prototype.update = function () {
    GameObject.prototype.update.call(this);

    if(this.isVisible()){
        let xform = this.getPhysicsComponent().getXform();
        let velocity = this.getPhysicsComponent().getVelocity();

        this.mCharacter.getXform().setPosition(xform.getXPos() + this.mXAxisCorrection, xform.getYPos() + this.mYAxisCorrection);            
        this.mIsMoving = false;

        if(this.mCanMove){
            if(gEngine.Input.isKeyPressed(this.eMotionControls.eLeft)){
                if(this.mCharacterState === Character.eCharacterState.eFace
                    || this.mCharacterState === Character.eCharacterState.eRunRight
                    || this.mCharacterState === Character.eCharacterState.eJumpLeft
                    || this.mCharacterState === Character.eCharacterState.eJumpRight
                    || this.mCharacterState === Character.eCharacterState.eFallDown){
                        this.mCharacterState = Character.eCharacterState.eRunLeft;
                }else if(this.mCharacterState === Character.eCharacterState.eJumpUp){
                    this.mCharacterState = Character.eCharacterState.eRunLeft;
                    this.mCanJump = false;
                }
                
                if(this.mIsJumping && xform.getXPos() < this.mMinPosX){
                    this.mCanMove = false;
                    velocity[1] = 0;
                }else{
                    this.mIsMoving = true;
                    xform.incXPosBy(-this.mDelta);
                }
            }
        
            if(gEngine.Input.isKeyPressed(this.eMotionControls.eRight)){        
                if(this.mCharacterState === Character.eCharacterState.eFace
                    || this.mCharacterState === Character.eCharacterState.eRunLeft
                    || this.mCharacterState === Character.eCharacterState.eJumpLeft
                    || this.mCharacterState === Character.eCharacterState.eJumpRight
                    || this.mCharacterState === Character.eCharacterState.eFallDown){
                        this.mCharacterState = Character.eCharacterState.eRunRight;
                }else if(this.mCharacterState === Character.eCharacterState.eJumpUp){
                    this.mCharacterState = Character.eCharacterState.eRunRight;
                    this.mCanJump = false;
                }

                if(this.mIsJumping && xform.getXPos() > this.mMaxPosX){
                    this.mCanMove = false;
                    velocity[1] = 0;
                }else{
                    this.mIsMoving = true;
                    xform.incXPosBy(this.mDelta);
                }
            }
        }

        if(gEngine.Input.isKeyPressed(this.eMotionControls.eUp) && this.mCanJump){    
            if (this.mCharacterState === Character.eCharacterState.eFace
                || this.mCharacterState === Character.eCharacterState.eFallDown){
                    this.mCharacterState = Character.eCharacterState.eJumpUp;
                    this.mMinPosX = xform.getXPos() - 7;
                    this.mMaxPosX = this.mMinPosX + 14;
                    this.mIsJumping = true;
                    this.mJumpLimit = 18;
                    velocity[1] = 0;
                    gEngine.AudioClips.playACue(this.kSounds[this.soundJump]); 
                      
            }else if(this.mCharacterState === Character.eCharacterState.eRunRight){
                this.mCharacterState = Character.eCharacterState.eJumpRight;
                this.mCanMove = false;
                this.mJumpLimit = 16;
                velocity[0] = 8;
                velocity[1] = 0; //Jump velocity
                gEngine.AudioClips.playACue(this.kSounds[this.soundJump]);  
            }else if(this.mCharacterState === Character.eCharacterState.eRunLeft){
                this.mCharacterState = Character.eCharacterState.eJumpLeft;
                this.mCanMove = false;
                this.mJumpLimit = 16;
                velocity[0] = -8;
                velocity[1] = 0; //Jump velocity
                gEngine.AudioClips.playACue(this.kSounds[this.soundJump]); 
            }

            if(velocity[1] > this.mJumpLimit || velocity[1] <= -0.3333333432674408){
                this.mCanJump = false;
            }else{
                velocity[1] += 1; //Jump velocity
            }  
                 
        }

        if(velocity[1] < -0.3333333432674408){
            if(this.mCharacterState === Character.eCharacterState.eFace
                || this.mCharacterState === Character.eCharacterState.eRunRight
                || this.mCharacterState === Character.eCharacterState.eRunLeft
                || this.mCharacterState === Character.eCharacterState.eJumpUp){
                    this.mCharacterState = Character.eCharacterState.eFallDown;
                    this.mCanMove = false;
                    this.mIsJumping = false;
            }
        }else if(velocity[1] === -0.3333333432674408 && !this.mIsMoving && !this.mIsJumping){
            if (this.mCharacterState === Character.eCharacterState.eRunLeft
                || this.mCharacterState === Character.eCharacterState.eRunRight
                || this.mCharacterState === Character.eCharacterState.eJumpUp
                || this.mCharacterState === Character.eCharacterState.eJumpRight
                || this.mCharacterState === Character.eCharacterState.eJumpLeft
                || this.mCharacterState === Character.eCharacterState.eFallDown){
                    this.mCharacterState = Character.eCharacterState.eFace;
            }

            this.mCanMove = true;
            this.mCanJump = true;
            velocity[0] = 0;
        }
        
        this.changeAnimation();
        this.mCharacter.updateAnimation();
    }
};

Character.prototype.changeAnimation = function () {
    if (this.mCharacterState !== this.mPreviousCharacterState) {
        this.mPreviousCharacterState = this.mCharacterState;

        switch (this.mCharacterState) {
            case Character.eCharacterState.eFace:
                this.mCharacter.getXform().setSize(7, 7);
                this.mCharacter.setSpriteSequence(2048, 0, 256, 256, 1, 0);
                this.mCharacter.setAnimationSpeed(0);
                this.mXAxisCorrection = -0.7;
                this.mYAxisCorrection = 1.5;
                break;
            case Character.eCharacterState.eRunLeft:
                this.mCharacter.getXform().setSize(7, 7);
                this.mCharacter.setSpriteSequence(1536, 0, 256, 256, 4, 0);
                this.mCharacter.setAnimationSpeed(10);
                this.mXAxisCorrection = 1.8;
                this.mYAxisCorrection = 1.5;
                break;
            case Character.eCharacterState.eRunRight:
                this.mCharacter.getXform().setSize(7, 7);
                this.mCharacter.setSpriteSequence(1792, 0, 256, 256, 4, 0);
                this.mCharacter.setAnimationSpeed(10);
                this.mXAxisCorrection = -0.7;
                this.mYAxisCorrection = 1.5;
                break;
            case Character.eCharacterState.eJumpUp:
                this.mCharacter.getXform().setSize(7, 7);
                this.mCharacter.setSpriteSequence(2048, 256, 256, 256, 1, 0);
                this.mCharacter.setAnimationSpeed(0);
                this.mXAxisCorrection = -0.5;
                this.mYAxisCorrection = 1.5;
                break;
            case Character.eCharacterState.eJumpLeft:
                this.mCharacter.getXform().setSize(7, 7);
                this.mCharacter.setSpriteSequence(1024, 0, 256, 256, 4, 0);
                this.mCharacter.setAnimationSpeed(40);
                this.mXAxisCorrection = 1.2;
                this.mYAxisCorrection = 1.5;
                break;
            case Character.eCharacterState.eJumpRight:
                this.mCharacter.getXform().setSize(7, 7);
                this.mCharacter.setSpriteSequence(1280, 0, 256, 256, 4, 0);
                this.mCharacter.setAnimationSpeed(40);
                this.mXAxisCorrection = -1.2;
                this.mYAxisCorrection = 1.5;
                break;
            case Character.eCharacterState.eFallDown:
                this.mCharacter.getXform().setSize(7, 7);
                this.mCharacter.setSpriteSequence(2048, 512, 256, 256, 1, 0);
                this.mCharacter.setAnimationSpeed(0);
                this.mXAxisCorrection = -0.5;
                this.mYAxisCorrection = 1.5;
                break;
        }
    }
};

Character.prototype.getScore = function(){
    return this.score;
};

Character.prototype.incrementScore = function(){
    this.score++;
};


Character.prototype.getStatus  = function (){
    return this.status;
};

Character.prototype.setStatus  = function (status){
     this.status = status;
};

Character.prototype.getNumPushButtonCollide  = function (){
    return this.numPushButtonCollide;
};

Character.prototype.setNumPushButtonCollide  = function (numPushButtonCollide){
     this.numPushButtonCollide = numPushButtonCollide;
};

Character.prototype.getInDoor  = function (){
    return this.inDoor;
};

Character.prototype.setInDoor  = function (inDoor){
     this.inDoor = inDoor;
};

Character.prototype.playSoundWalking = function(){
    return gEngine.AudioClips.playACue(this.kSounds[this.soundWalking]);
}

