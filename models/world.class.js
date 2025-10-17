class World {
    character = new Charakter();
    clouds = [
        new Clouds(),
    ];
    BackgroundObject = [
        new BackgroundObject('img/5_background/layers/air.png',0, 480),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
    ];
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(),
    ];
    canvas;
    ctx;

    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.draw();

    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.addObjectsToMap(this.BackgroundObject);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clouds);
        
        // draw() wird immer wieder aufgerufen, bis das Spiel beendet wird
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach((object) => {
            this.addToMap(object);
        });
    }

    addToMap(object) {
        this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
    }
}