/**
 * Represents a collectible coin in the game.
 * @extends MovebleObject
 */
class Coins extends MovebleObject {
    width = 100;
    height = 100;
    
    IMAGES_COINS = [
      'img/8_coin/coin_1.png',
      'img/8_coin/coin_2.png'
    ];

    /**
     * Creates a new coin at the given position and starts its animation.
     *
     * @param {number} x - X position of the coin.
     * @param {number} y - Y position of the coin.
     */
    constructor(x, y) {
        super();
        this.loadImage(this.IMAGES_COINS[0]);    
        this.loadImages(this.IMAGES_COINS);     
        this.initializeProperties(x, y);
        this.animate();
    }

    /**
     * Initializes position, collision offset and collected state of the coin.
     *
     * @param {number} x - X position of the coin.
     * @param {number} y - Y position of the coin.
     * @returns {void}
     */
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
 
    /**
     * Draws the coin if it has not been collected.
     *
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
     * @returns {void}
     */
    draw(ctx) {
        if (this.collected) return;
        super.draw(ctx);
    }
    /**
     * Starts the animation loop that alternates between coin images.
     *
     * @returns {void}
     */
    animate() {
        setInterval(() => {
            if (!this.collected) {
                this.playAnimation(this.IMAGES_COINS);
            }
        }, 300);
    }
}