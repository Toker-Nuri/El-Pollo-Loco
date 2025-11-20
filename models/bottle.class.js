/**
 * Represents a bottle object in the game
 * @extends MoveableObject
 */
class Bottles extends MovebleObject {
   
    /**
     * Width of the bottle in pixels
     * @type {number}
     */
    width = 60;
    /**
     * Height of the bottle in pixels
     * @type {number}
     */
    height = 80;
    
    /**
     * Array of images for the bottle's ground state
     * @type {string[]}
     */
    IMAGES_BOTTLE = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    /**
     * Creates a bottle object at the given position.
     *
     * @param {number} x - X position of the bottle.
     * @param {number} y - Y position of the bottle.
     */
    constructor(x, y) {
        super();
        this.initializeImage();
        this.initializeProperties(x, y);
    }

    /**
     * Randomly selects and loads one of the bottle ground images.
     *
     * @returns {void}
     */
    initializeImage() {
        this.loadImage(this.IMAGES_BOTTLE[Math.round(Math.random())]);
    }

    /**
     * Sets up position, collision offset and collected flag for the bottle.
     *
     * @param {number} x - X position of the bottle.
     * @param {number} y - Y position of the bottle.
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
     * Draws the bottle if it has not been collected yet.
     *
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
     * @returns {void}
     */
    draw(ctx) {
        if (this.collected) return;
        super.draw(ctx);
    }
}