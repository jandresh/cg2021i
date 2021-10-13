/* File: TextureObject.js 
 *
 * Defines the behavior of an GameObject that references to a TextureRenderable
 */

/*jslint node: true, vars: true */
/*global gEngine, GameObject, TextureRenderable*/
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function TextureObject(texture, x, y, w, h) {
    this.kDelta = 0.2;
    this.kRDelta = 0.1; // radian
    this.aux = 0;
    this.life = 25;
    
    this.mRenderable = new TextureRenderable(texture);
    this.mRenderable.setColor([1, 1, 1, 0.1]);
    this.mRenderable.getXform().setPosition(x, y);
    this.mRenderable.getXform().setSize(w, h);
    GameObject.call(this, this.mRenderable);
}
gEngine.Core.inheritPrototype(TextureObject, GameObject);

TextureObject.prototype.update = function (up, down, left, right, rot) {
    var xform = this.getXform();
    
    if (xform.getXPos() > 90) {
        xform.incXPosBy(-this.kDelta);
    } else {
        if (xform.getYPos() > 10 && (this.aux % 250) === 0) {
            xform.incYPosBy(-this.kDelta);
        } else if (xform.getYPos() < 65){
            this.aux += 1; 
            xform.incYPosBy(this.kDelta);
        }
    }
};

TextureObject.prototype.setLife = function () {
    this.life -= 1;
};

TextureObject.prototype.getLife = function () {
    return this.life;
};