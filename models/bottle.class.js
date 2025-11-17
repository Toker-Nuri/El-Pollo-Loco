class Bottles extends MovebleObject {
   
    width = 60;
    height = 80;
    
 
    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    constructor(x, y) {
        super();
        this.initializeImage();
        this.initializeProperties(x, y);
    }

    initializeImage() {
        this.loadImage(this.IMAGES_BOTTLE[Math.round(Math.random())]);
    }

    initializeProperties(x, y) {
        this.x = x;
        this.y = y;
        this.offset = {
            top: 5,
            right: 5,
            bottom: 5,
            left: 5
        };
        this.collected = false;
    }
 
    draw(ctx) {
        if (this.collected) return;
        super.draw(ctx);
    }
}