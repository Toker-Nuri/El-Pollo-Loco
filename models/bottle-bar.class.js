/**
 * Represents a graphical bar that displays collected bottles
 * @extends DrawableObject
 */
class BottleBar extends DrawableObject {
    /**
     * Percentage of collected bottles
     * @type {number}
     */
    percentage = 0;

    /**
     * Number of collected bottles
     * @type {number}
     */
    collectedBottles = 0;

    /**
     * Total number of bottles to collect
     * @type {number}
     */
    TOTAL_BOTTLES = 10; 
    
    /**
     * Array of images for the bottle bar
     * @type {string[]}
     */
    IMAGES_BOTTLES = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png' 
    ];

    /**
     * Creates a new BottleBar status bar instance and initializes its position and images.
     *
     * @constructor
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_BOTTLES);
        this.x = 20;
        this.y = 95;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    /**
     * Updates the collected bottle count and corresponding status bar image.
     *
     * @param {number} collectedBottles - Number of collected bottles.
     * @returns {void}
     */
    setPercentage(collectedBottles) {
        this.collectedBottles = collectedBottles;
        this.percentage = (this.collectedBottles / this.TOTAL_BOTTLES) * 100;
        let path = this.IMAGES_BOTTLES[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
   
    /**
     * Resolves the index of the status bar image based on the current percentage.
     *
     * @returns {number} Index in the IMAGES_BOTTLES array.
     */
    resolveImageIndex() {
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage >= 80) {
            return 4;
        } else if (this.percentage >= 60) {
            return 3;
        } else if (this.percentage >= 40) {
            return 2;
        } else if (this.percentage >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}




























