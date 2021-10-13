
MainGameScene.prototype.generateObstacles = function() {
    var randNum = Math.floor((Math.random() * 100) + 1); //1 - 100
    
    //put on different update call from spawning to try load on single update from
    //getting too high
    if(this.mCountdown === this.mInterval){ //It's time to pick something!        
        if(randNum < 40){           //30% chance to spawn a Minion
            this.mSensorCamera.setWCCenter(-120, 300);  //show Minion
            this.mNext = "Minion";
        } else if(randNum < 70){    //30% chance to spawn a Rock
            this.mSensorCamera.setWCCenter(-140, 300);
            this.mNext = "Rock";
        } else if(randNum < 90){    //30% chance to spawn Wall
            this.mSensorCamera.setWCCenter(-160, 300);
            this.mNext = "Wall";            
        } else {    //remaining 10% chance to spawn Healing Lintern
            this.mSensorCamera.setWCCenter(-180, 300);
            this.mNext = "Lintern";
        }
    }
    
    //Give an alert
    //Minion, Rock, Wall, Lintern - Locations (-1 <20,40,60,80>, 300)
    if(this.mCountdown === 0){
        var center = this.mMainCamera.getWCCenter();
        var width = this.mMainCamera.getWCWidth();
        var height = this.mMainCamera.getWCHeight();
        var sightBuffer = 20;   //ensures objects spawn offscreen
        
        var object, x, y, rand;
        
        //Spawn selected spawnable object
        switch(this.mNext){
            case "Minion":
                rand = Math.random() * height/1.5;
                x = center[0] + width/2 + sightBuffer;
                y = center[1] + height/3 - rand;
                object = new Minion(this.kMinionSprite, x, y, this.mHero, null);
                break;
            case "Rock":
                rand = Math.random() * width;
                x = center[0] + width/2 - rand/3;
                y = center[1] + height/2 + sightBuffer;
                object = new Rock(this.kRock, x, y, this.mHero, this.kRockNormalMap);
                break;
            case "Wall":
                rand = Math.random() * width;
                x = center[0] + width*1.25 - rand/2;
                y = center[1] - height/2 - sightBuffer/2;
                object = new Wall(this.kColumn, x, y, this.mHero, null, this.mGlobalLightSet.getLightAt(this.mWallLights));
                this.mWallLights++;
                if (this.mWallLights > 15) {
                    this.mWallLights = 9;
                }
                break;
            case "Lintern":
                rand = Math.random() * height/1.5;  //restrict spawning area
                x = center[0] + width/2 + sightBuffer;
                y = center[1] + height/3 - rand;
                object = new HealLintern(this.kLinternSprite, x, y, this.mHero, null, this.mGlobalLightSet.getLightAt(this.mLinternLights));                
                this.mLinternLights++; //increment to next drone light.
                if (this.mLinternLights > 8) { //past edge of drone light segment
                    this.mLinternLights = 4;
                }
                break;
        }
        
        //add lights to object, skip over sensor light (LIGHT 0)
        for(var i = 1; i < this.mGlobalLightSet.numLights(); i++){
            object.addLight(this.mGlobalLightSet.getLightAt(i));
        }
        
        this.mEnemySet.addToSet(object);
        //Reset generation
        this.mCountdown = this.mInterval + 1;   //have to mitigate the --
        
        this.mNext = null;
    }
    
    this.mCountdown--;    //tick timer down for next spawn
    this.mTimer++;  //tick timer forward for scaling difficulty
    //Interval has minimum value
    if (this.mInterval > this.kFinalInterval){
            if (this.mTimer % this.kDifficultyIncreaseTime === 0){
                this.mInterval -= 1;
        }
    }
          
};