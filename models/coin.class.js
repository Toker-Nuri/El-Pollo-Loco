class Coins extends MovebleObject {
    width = 100;
    height = 100;
    
    IMAGES_COINS = [
      'img/8_coin/coin_1.png',
      'img/8_coin/coin_2.png'
    ];

    constructor(x, y) {
        super();
        this.loadImage(this.IMAGES_COINS[0]);    
        this.loadImages(this.IMAGES_COINS);     
        this.initializeProperties(x, y);
        this.animate();
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
    animate() {
        setInterval(() => {
            if (!this.collected) {
                this.playAnimation(this.IMAGES_COINS);
            }
        }, 300);
}
}