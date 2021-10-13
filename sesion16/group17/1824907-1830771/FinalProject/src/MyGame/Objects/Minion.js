function Minion(texture, atX, atY, target, normalMap) {
    
    //setup animation
    if (normalMap === null) {
        this.mMinion = new LightRenderable(texture);
    } else {
        this.mMinion = new IllumRenderable(texture, normalMap);
    }

    this.mMinion.setAnimationSpeed(6);
    this.mMinion.setSpriteSequence(145, 0, 204, 164, 5, 0);
    
    this.mMinion.setColor([1, 1, 1, 0]);
    this.mMinion.getXform().setSize(8, 8);
    this.mMinion.getXform().setPosition(atX, atY);
    
    GameObject.call(this, this.mMinion); 
    
    //this.setCurrentFrontDir([1, 0]); //??
    this.mSpeed = 0.4;
    this.mTurnSpeed = 0.35;
    this.mTarget = target;
    this.kDamage = 1;
}
gEngine.Core.inheritPrototype(Minion, GameObject);

/*
 * The Minion moves from the right, towards the left.
 *  Faces towards the target, and will slowly alter course to attempt to
 *  intersect with the target.
 */
Minion.prototype.update = function() {
    this.mMinion.updateAnimation();
    //Turn towards target, unless the target slips past it
    if(this.mTarget !== null) {
        //If hitting hero, hurt hero
        if(this.getBBox().boundCollideStatus(this.mTarget.getBBox()) > 0) {
            var touchPos = [];
            if (this.mTarget.pixelTouches(this, touchPos)){ 
                this.mTarget.spin();
                this.mTarget.damage(this.kDamage);
            }
        }
        //change direction
        if(this.mTarget.getXform().getXPos() < this.mMinion.getXform().getXPos()){
            this.changeTravelDirection(this.mTarget.getXform().getPosition(), 
                this.mTurnSpeed); 
        } else {
            //the target passed the Minion, so go towards center
            this.changeTravelDirection([-100, 40], this.mTurnSpeed);
        }
    }
    //Default moving behavior - just move left
    //this.mMinion.getXform().incXPosBy(-this.mSpeed);
    
    //Actually moving towards the target
    var pos = this.getXform().getPosition();
    vec2.scaleAndAdd(pos, pos, this.getCurrentFrontDir(), this.mSpeed);
};