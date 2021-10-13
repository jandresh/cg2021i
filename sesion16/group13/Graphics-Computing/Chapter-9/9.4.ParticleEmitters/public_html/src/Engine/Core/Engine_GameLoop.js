"use strict";

var gEngine = gEngine || { };

gEngine.GameLoop = (function () {
    var kFPS = 60;
    var kMPF = 1000 / kFPS;
    var mPreviousTime = Date.now();
    var mLagTime;
    var mIsLoopRunning = false;
    var mMyGame = null;
    var kFrameTime = 1 / kFPS;
    var kMPF = 1000 * kFrameTime; // Milliseconds per frame.
    
    var getUpdateIntervalInSeconds = function () {
        return kFrameTime;
    };

    var _runLoop = function () {
        if (mIsLoopRunning) {
            // Step A: set up for next call to _runLoop and update input!
            requestAnimationFrame(function () { _runLoop.call(mMyGame); });

            // Step B: compute how much time has elapsed since we last RunLoop was executed
            var currentTime = Date.now();
            var elapsedTime = currentTime - mPreviousTime;
            mPreviousTime = currentTime;
            mLagTime += elapsedTime;

            // Step C: Make sure we update the game the appropriate number of times.
            //      Update only every Milliseconds per frame.
            //      If lag larger then update frames, update until caught up.
            while ((mLagTime >= kMPF) && mIsLoopRunning) {
                gEngine.Input.update();
                this.update(); 
                mLagTime -= kMPF;
            }
            // Step D: now let's draw
            this.draw();  
        } else {
            mMyGame.unloadScene();
        }
    };

    var _startLoop = function () {
        // Step A: reset frame time 
        mPreviousTime = Date.now();
        mLagTime = 0.0;

        // Step B: remember that loop is now running
        mIsLoopRunning = true;

        // Step C: request _runLoop to start when loading is done
        requestAnimationFrame(function () { _runLoop.call(mMyGame); });
    };

    var start = function (myGame) {
        mMyGame = myGame;
        gEngine.ResourceMap.setLoadCompleteCallback(
            function () {
                mMyGame.initialize();
                _startLoop();
            }
        );
    };

    var stop = function () {
        mIsLoopRunning = false;
    };

    var mPublic = {
        start: start,
        stop: stop,
        getUpdateIntervalInSeconds: getUpdateIntervalInSeconds
    };
    return mPublic;
}());