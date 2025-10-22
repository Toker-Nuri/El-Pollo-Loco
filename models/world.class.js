class World {
    character = new Charakter();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();

    }

    setWorld() {
        this.character.world = this;
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.BackgroundObject);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);
        // draw() wird immer wieder aufgerufen, bis das Spiel beendet wird
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    addObjectsToMap(MoObjects) {
        MoObjects.forEach((MoObjects) => {
            this.addToMap(MoObjects);
        });
    }

    addToMap(MoObjects) {
        if (MoObjects.otherDirection) {
           this.flipImages(MoObjects);
        }
        MoObjects.draw(this.ctx);
        MoObjects.drawFrame(this.ctx);

        if (MoObjects.otherDirection) {
            this.flipImagesBack(MoObjects);
        }
    }

    flipImages(MoObjects){
        this.ctx.save();
        this.ctx.translate(MoObjects.width, 0);
        this.ctx.scale(-1, 1);
        MoObjects.x = MoObjects.x * -1;
    }

    flipImagesBack(MoObjects){
        MoObjects.x = MoObjects.x * -1;
            this.ctx.restore();
    }

}