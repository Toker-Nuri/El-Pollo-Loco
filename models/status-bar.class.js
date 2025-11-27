/**
 * Represents a status bar that displays different statuses with images based on percentages
 * @class
 * @extends DrawableObject
 */
class StatusBar extends DrawableObject {
    /**
     * Percentage of the status bar
     * @type {number}
     */
    percentage = 100;

    /**
     * Array of images for the status bar
     * @type {string[]}
     */
    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    /**
     * Creates a new StatusBar instance
     * @constructor
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.x = 20;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * Sets the percentage of the status bar
     * @param {number} percentage - The percentage to set
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the image index based on the percentage
     * @returns {number} The index of the image to display
     */
    resolveImageIndex() {
        return resolveBarIndex(this.percentage);
    }














}








