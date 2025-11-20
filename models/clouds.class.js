/**
 * Represents a cloud object that moves across the screen
 * Extends the MoveableObject class
 * @extends MoveableObject
 */
class Clouds extends MovebleObject {
    /**
     * Y-coordinate position of the cloud
     * @type {number}
     */
    y = 20;
    /**
     * Height of the cloud in pixels
     * @type {number}
     */
    height = 250;
    /**
     * Width of the cloud in pixels
     * @type {number}
     */
    width = 500;

    /**
     * Creates a new Clouds instance
     * @param {number} x - X-coordinate position
     * @param {number} y - Y-coordinate position
     */
    constructor(x = null, y = null) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = (typeof x === 'number') ? x : Math.random() * 500;
        if (typeof y === 'number') this.y = y;
           
      
        this.animate();

    }
    
    /**
     * Moves the cloud to the left at a constant speed.
     *
     * @returns {void}
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        
        }, 1000 / 80);
    }
}