
function Wall(spriteTexture, atX, atY, target, normalMap, light) {
    
    //Not sure why Wall would be affected by light... these programmers...
    if (normalMap === null) {
        this.mWall = new LightRenderable(spriteTexture);
    } else {
        this.mWall = new IllumRenderable(spriteTexture, normalMap);
    }
    
    this.mWall.setColor([1, 0, 0, 0.5]);
    this.mWall.getXform().setSize(5, 1);
    this.mWall.getXform().setPosition(atX, atY);

    GameObject.call(this, this.mWall); 
    
    this.mSpeed = 0.4;  //Actual change is 1.5x this number
    this.mRising = true;
    
    this.mMaxHeight = 80;
    this.mMinHeight = 50;
    this.mTarget = target;
    this.kDamage = 1;
    this.mWallLight = light;
}
gEngine.Core.inheritPrototype(Wall, GameObject);

/*
 * The Wall rises from the ground and flares up.  Once at max height, it
 *  shrinks slightly, and bounces between these two heights.
 */
Wall.prototype.update = function() {
    this.mWall.updateAnimation();
    
    var height;
    var xForm = this.mWall.getXform();
    //if hitting hero, hurt hero
    if (this.mTarget !== null){
        if(this.getBBox().boundCollideStatus(this.mTarget.getBBox()) > 0) {
            var touchPos = [];
            if (this.mTarget.pixelTouches(this, touchPos)){
                this.mTarget.damage(this.kDamage);
            }
        }
    }
    //The Wall undulates between two heights
    if(this.mRising){
        xForm.incHeightBy(this.mSpeed);
        xForm.incYPosBy(this.mSpeed/2);
    } else {
        xForm.incHeightBy(-this.mSpeed);
        xForm.incYPosBy(-this.mSpeed/2);
    }
    
    //Don't let the Wall get too large or too small
    height = xForm.getHeight() + xForm.getYPos();
    if(this.mRising)
        if(this.mMaxHeight < height)
            this.mRising = false;
    if(!this.mRising)
        if(this.mMinHeight > height)
            this.mRising = true;
    if(this.mWallLight !== null){
        this.mWallLight.setLightTo(true);
        this.mWallLight.setXPos(this.getXform().getXPos());
        this.mWallLight.setYPos(this.getXform().getYPos());
    }
};

Wall.prototype.setMaxHeight = function(height) {this.mMaxHeight = height; };
Wall.prototype.setMinHeight = function(height) {this.mMinHeight = height; };