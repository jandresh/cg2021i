/*
 * File: MyGame.js 
 * This is the logic of our game. 
 */

/*jslint node: true, vars: true */
/*global gEngine: false, Scene: false, GameObjectSet: false, Camera: false, vec2: false,
  FontRenderable: false, DyePack: false, Hero: false, Minion: false */
/* find out more about jslint: http://www.jslint.com/help.html */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {
    this.kMinionSprite = "assets/minion_sprite.png";
    this.kBg = "assets/space.png";
    this.bossSprite = "assets/minion_portal.png";
    
    
    //Sonidos
    this.kBgClip = "assets/sounds/background.wav";
    this.damage = "assets/sounds/damage.wav";
    this.explosion = "assets/sounds/explosion.wav";
    this.shot = "assets/sounds/Shot_Lasser.wav";
    this.danger = "assets/sounds/danger.wav";
    this.boss = "assets/sounds/Boss_Incoming.wav";
    this.bossbg = "assets/sounds/bossExplosion.wav";
    this.gameov = "assets/sounds/gameOverSound.wav";
    
    // The camera to view the scene
    this.mCamera = null;
    this.mBg = null;
    // For echo message
    this.mMsg = null;

    // the hero and the support objects
    this.mHero = null;
    
    this.mBossset = null;
    
    this.mBossBulletset = null;
    
    this.mMinionset = null;
    
    this.mBulletset = null;
    
    this.mVidaset = null;
 
    this.lifes = null;
    this.timer = null;
    this.seconds = null;
    this.aux = null;
    
    this.gameOver = null;
    this.goMsg = null;
    this.puntajeMsg = null;
    this.continarMsg = null;
}
gEngine.Core.inheritPrototype(MyGame, Scene);

MyGame.prototype.loadScene = function () {
    gEngine.Textures.loadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.bossSprite);
    gEngine.AudioClips.loadAudio(this.kBgClip);
    gEngine.AudioClips.loadAudio(this.damage);
    gEngine.AudioClips.loadAudio(this.explosion);
    gEngine.AudioClips.loadAudio(this.shot);
    gEngine.AudioClips.loadAudio(this.danger);
    gEngine.AudioClips.loadAudio(this.boss);
    gEngine.AudioClips.loadAudio(this.bossbg);
    gEngine.AudioClips.loadAudio(this.gameov);
};

MyGame.prototype.unloadScene = function () {
    gEngine.Textures.unloadTexture(this.kMinionSprite);
    gEngine.Textures.loadTexture(this.kBg);
    gEngine.Textures.loadTexture(this.bossSprite);
    gEngine.AudioClips.loadAudio(this.kBgClip);
    gEngine.AudioClips.unloadAudio(this.damage);
    gEngine.AudioClips.unloadAudio(this.explosion);
    gEngine.AudioClips.unloadAudio(this.shot);
    gEngine.AudioClips.unloadAudio(this.danger);
    gEngine.AudioClips.unloadAudio(this.boss);
    gEngine.AudioClips.unloadAudio(this.bossbg);
    gEngine.AudioClips.unloadAudio(this.gameov);
};

MyGame.prototype.initialize = function () {
    // Step A: set up the cameras
    this.mCamera = new Camera(
        vec2.fromValues(50, 37.5),   // position of the camera
        100,                       // width of camera
        [0, 0, 640, 480]           // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
            // sets the background to gray
            // 
    // Estado del juego
    this.gameOver = false;
    
    //Musica backgroung
    gEngine.AudioClips.playBackgroundAudio(this.kBgClip);
    
    // Large background image
    var bgR = new SpriteRenderable(this.kBg);
    bgR.setElementPixelPositions(0, 1024, 0, 1024);
    bgR.getXform().setSize(150, 150);
    bgR.getXform().setPosition(50, 35);
    this.mBg = new GameObject(bgR);
    
    // Step B: The dye pack: simply another GameObject represents the life
    this.mVidaset = new GameObjectSet();
    var vida1 = new DyePack(this.kMinionSprite, 2);
    this.mVidaset.addToSet(vida1);
    var vida2 = new DyePack(this.kMinionSprite, 4);
    this.mVidaset.addToSet(vida2);
    var vida3 = new DyePack(this.kMinionSprite, 6);
    this.mVidaset.addToSet(vida3);
    this.lifes = 2;
    
    //Boss
    this.mBossset = new GameObjectSet();
    
    this.mBossBulletset = new GameObjectSet();
    //Bullets   
    this.mBulletset = new GameObjectSet();
    
    // Step C: A set of Minions
    this.mMinionset = new GameObjectSet();
    var i = 0, randomY, aMinion;
    // create 5 minions at random Y values
    for (i = 0; i <  5; i++) {
        randomY = Math.random() * 65;
        aMinion = new Minion(this.kMinionSprite, randomY, 10);
        this.mMinionset.addToSet(aMinion);
    }

    // Step D: Create the hero object
    this.mHero = new Hero(this.kMinionSprite);
    
    //Timer
    this.seconds = 0;
    this.timer = 0;
    this.aux = 2;
    
    // Step E: Create and initialize message output   
    this.mMsg = new FontRenderable("0");
    this.mMsg.setColor([1, 1, 0, 1]);
    this.mMsg.getXform().setPosition(45, 73);
    this.mMsg.setTextHeight(3);
    
    
    // Step E: Game over menssage
    this.goMsg = new FontRenderable(" ");
    this.goMsg.setColor([1, 0, 0, 1]);
    this.goMsg.getXform().setPosition(35, 45);
    this.goMsg.setTextHeight(6);
    
    this.puntajeMsg = new FontRenderable(" ");
    this.puntajeMsg.setColor([0, 1, 1, 1]);
    this.puntajeMsg.getXform().setPosition(32.5, 35);
    this.puntajeMsg.setTextHeight(3);
    
    this.continarMsg = new FontRenderable(" ");
    this.continarMsg.setColor([0, 1, 1, 1]);
    this.continarMsg.getXform().setPosition(15, 28);
    this.continarMsg.setTextHeight(3);
    
};

// This is the draw function, make sure to setup proper drawing environment, and more
// importantly, make sure to _NOT_ change any state.
MyGame.prototype.draw = function () {
    // Step A: clear the canvas
    gEngine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    // Step  B: Activate the drawing Camera
    this.mCamera.setupViewProjection();

    // Step  C: draw everything
    this.mBg.draw(this.mCamera);
    this.mHero.draw(this.mCamera);
    this.mMinionset.draw(this.mCamera);
    this.mBulletset.draw(this.mCamera);
    this.mBossBulletset.draw(this.mCamera);
    this.mBossset.draw(this.mCamera);
    
    this.mVidaset.draw(this.mCamera);
    
    this.mMsg.draw(this.mCamera);
    
    this.goMsg.draw(this.mCamera);
    this.puntajeMsg.draw(this.mCamera);    
    this.continarMsg.draw(this.mCamera);
    
};

// The Update function, updates the application state. Make sure to _NOT_ draw
// anything from this function!
MyGame.prototype.update = function () {
    if(!this.gameOver){
        //Timer
        this.seconds += 1;
        this.timer = (this.seconds * 16) / 1000;
        this.mMsg.setText(String(this.timer));

        //Hero
        this.mHero.update();

        //Enemys
        this.mMinionset.update();
        if(this.timer > 10){
            this.aux = 1
        }

        if((this.timer % this.aux) === 0){
            for(let i = 0;i<3;i++){
                var randomY = Math.random() * 70;
                var aMinion = new Minion(this.kMinionSprite, randomY, this.timer + 10);
                this.mMinionset.addToSet(aMinion);
            }
        }
        //Lifes
        this.mVidaset.update();

        //Bullets
        if(gEngine.Input.isKeyClicked(gEngine.Input.keys.J)){
            var xHero = parseInt(this.mHero.getXform().getPosition().slice(0,1));
            var yHero = parseInt(this.mHero.getXform().getPosition().slice(1,2));
            var aBullet = new Brain (this.kMinionSprite, xHero + 6, yHero + 4);
            this.mBulletset.addToSet(aBullet);
            gEngine.AudioClips.playACue(this.shot);
        }
        this.mBulletset.update();
        
        //BOSS
        if((this.timer % 40) === 0){
            var aBoss = new TextureObject (this.bossSprite, 100, 30, 20, 20);
            this.mBossset.addToSet(aBoss);
            gEngine.AudioClips.playACue(this.boss);
        }
        this.mBossset.update();
        //BOSS Bullets
        if(this.mBossset.size() > 0 && (this.timer % 2) == 0){
            for(let i = 0;i<this.mBossset.size();i++){
            var xBoss = parseInt(this.mBossset.getObjectAt(i).getXform().getPosition().slice(0,1));
            var yBoss = parseInt(this.mBossset.getObjectAt(i).getXform().getPosition().slice(1,2));
            var aBossBullet = new Bossbrain (this.kMinionSprite, xBoss - 10, yBoss - 5);
            var aBossBullet2 = new Bossbrain (this.kMinionSprite, xBoss - 10, yBoss + 5);
            this.mBossBulletset.addToSet(aBossBullet);
            this.mBossBulletset.addToSet(aBossBullet2);
            gEngine.AudioClips.playACue(this.shot);
            }
        }
        this.mBossBulletset.update();        
        //Colisiones
        var hBbox = this.mHero.getBBox();
        //Minions -> Hero
        for(let i =0;i<this.mMinionset.size();i++){
            var mBbox = this.mMinionset.getObjectAt(i).getBBox();
            if(hBbox.intersectsBound(mBbox)){
                this.mMinionset.deleteFromSet(i);
                this.mVidaset.deleteFromSet(this.lifes);
                gEngine.AudioClips.playACue(this.damage);
                this.lifes -= 1;
                if(this.lifes == -1){
                    gEngine.AudioClips.playACue(this.danger);
                }
                if(this.lifes < -1){
                    gEngine.AudioClips.playACue(this.gameov);
                }                
            }
            // Bullets -> Minions
            for(let j =0;j<this.mBulletset.size();j++){
                var buBbox = this.mBulletset.getObjectAt(j).getBBox();
                if(buBbox.intersectsBound(mBbox)){
                    gEngine.AudioClips.playACue(this.explosion);
                    this.mMinionset.deleteFromSet(i);
                    this.mBulletset.deleteFromSet(j);
                }
            } 
        }
        // Bullets -> Boss
        for(let j =0;j<this.mBulletset.size();j++){
            var buBbox = this.mBulletset.getObjectAt(j).getBBox();
            for(let i = 0;i<this.mBossset.size();i++){
                var bBbox = this.mBossset.getObjectAt(i);
                if(buBbox.intersectsBound(bBbox.getBBox())){
                    if(bBbox.getLife() == 0){
                        gEngine.AudioClips.playACue(this.bossbg);
                        this.mBossset.deleteFromSet(i);
                    } else {
                        bBbox.setLife();
                    }                    
                    this.mBulletset.deleteFromSet(j);
                }
            }
            // BulletsBoss -> Hero
            for(let i =0;i<this.mBossBulletset.size();i++){
                var mBbox = this.mBossBulletset.getObjectAt(i).getBBox();
                if(mBbox.intersectsBound(hBbox)){
                    this.mBossBulletset.deleteFromSet(i);
                    this.mVidaset.deleteFromSet(this.lifes);
                    gEngine.AudioClips.playACue(this.damage);
                    this.lifes -= 1;
                    if(this.lifes == -1){
                        gEngine.AudioClips.playACue(this.danger);
                    }
                }
                //Bullets -> BulletBoss
                if(buBbox.intersectsBound(mBbox)){
                    this.mBossBulletset.deleteFromSet(i);
                    this.mBulletset.deleteFromSet(j);
                }                
            } 
        }   
        if(this.lifes < -1){
            this.gameOver = true;
        }
    } else {
        gEngine.AudioClips.stopBackgroundAudio(this.kBgClip);
        this.goMsg.setText("Game over");
        this.puntajeMsg.setText("Tu puntaje es " + String(this.timer));
        this.continarMsg.setText("Presiona espacio para continuar jugando");
        this.mMsg.setText("");
        if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)){
            this.initialize();
        }        
    }
};