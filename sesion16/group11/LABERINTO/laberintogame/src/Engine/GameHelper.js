var laberinto = window.laberinto || {};
laberinto.GameHelper = laberinto.GameHelper || {};

laberinto.GameHelper.LevelHelper = function(start, end) {
    this.current = start || 1;
    this.next = this.current + 1;
    this.count = end || 5;
    this.isFinished = false;
    this.cir = 0;

    this.getNext = function() {
        if (this.next > this.count) {
            this.current = 1;
            this.next = 2;
            this.isFinished = true;
            document.getElementById('circle5').innerHTML = '<img src="assets/images/circle-win.png" />';
            
        } else {
            this.current = this.next;
            this.next++;
            this.cir++;
            document.getElementById('circle'+ this.cir).innerHTML = '<img src="assets/images/circle-win.png" />';
            
    document.getElementById("pist").play();
        }

        return this.current;
    }
};

laberinto.GameHelper.CameraHelper = function(camera) {
    this.translation = 5;
    this.rotation = 0.035;
    this.origin = {
        position: {
            x: 0,
            y: 0,
            z: 0,
            mapX: 0,
            mapY: 0,
            mapZ: 0
        },
        x: 0,
        y: 0,
        z: 0
    };
    
    this.camera = camera;
};