
function HealLintern(sprite, atX, atY, target, normalMap, light) {
    if (normalMap === null) {
        this.mLintern = new LightRenderable(sprite);
    } else {
        this.mLintern = new IllumRenderable(sprite, normalMap);
    }
    
    this.mLintern.setAnimationSpeed(10);
    this.mLintern.setSpriteSequence(180, 0, 189, 188, 2, 1);//top, left, width, height, count, padding
    
    this.mLintern.setColor([0, 1, 0, 0]);
    this.mLintern.getXform().setSize(4, 4);
    this.mLintern.getXform().setPosition(atX, atY);
    
    GameObject.call(this, this.mLintern); 
    
    this.mSpeed = 0;
    this.mTurnSpeed = 0.3;
    this.mLifeTime = 5*60;     //stick around for 10 seconds (60 fps)
    this.mFollow = false;
    this.mTarget = target;
    this.kHealing = 1;      //heals for 1 point
    this.mLinternLight = light;
}
gEngine.Core.inheritPrototype(HealLintern, GameObject);

//Retrieves Green Lintern Light
HealLintern.prototype.getLight = function() { return this.mLinternLight;};

HealLintern.prototype.removeAllLights = function () {
    GameObject.prototype.removeAllLights.call(this);
    };
/*
 * The Lintern sits at its position until the target touches it.
 * Then it follows the target, but stops moving if it touches the target bounds.
 */
HealLintern.prototype.update = function() {
    this.mLintern.updateAnimation();
    
    //If the hero touched the drone, the drone heals the hero and begins following
    if(this.mFollow === false && this.mTarget !== null){ //limit number of times this needs to be called
        if(this.getBBox().boundCollideStatus(this.mTarget.getBBox()) > 0){
            this.mFollow = true;
            this.mTarget.heal(1);
            //LIGHT CODE
            if (this.mLinternLight !== null) {
                this.mLinternLight.setLightTo(true);
            }
            //
            this.mLintern.setSpriteSequence(180, 0, 189, 188, 2, 1);
        }
    }
    
    //If it's supposed to follow, then do so.
    if(this.mFollow === true){
        this.mLifeTime--;   //begin to decay
        if(this.mTarget !== null){
            //Don't go inside the hero.
            if(this.getBBox().boundCollideStatus(this.mTarget.getBBox()) === 0){
                this.rotateObjPointTo(this.mTarget.getXform().getPosition(), 
                    this.mTurnSpeed);   
                    this.mSpeed = 1.0;
            } else 
                this.mSpeed = 0;
        }

        //Actually moving towards the target
        var pos = this.getXform().getPosition();
        
        //simple chase
        vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.mSpeed);
        
        if (this.mLinternLight !== null) {
            this.mLinternLight.setXPos(this.getXform().getXPos());
            this.mLinternLight.setYPos(this.getXform().getYPos());
        }
        //
    }
    if(this.mLifeTime <= 0){
        //this.setVisibility(false);
        this.mFollow = false;
        if (this.mLinternLight !== null) {
                this.mLinternLight.setLightTo(false);
            }
        //this.mSpeed = 0;
    }
};