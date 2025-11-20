/**
 * Status bar that displays the endboss' health.
 * @extends DrawableObject
 */
class EndbossBar extends DrawableObject {
    /**
     * Current health percentage.
     * @type {number}
     */
    percentage = 100;
    /**
     * Visibility flag.
     * @type {boolean}
     */
    visible = false;

    /**
     * Array of image paths for different health percentages.
     * @type {string[]}
     */
    IMAGES_HEALTH = [
        'img/7_statusbars/2_statusbar_endboss/green/green0.png',
        'img/7_statusbars/2_statusbar_endboss/green/green20.png',
        'img/7_statusbars/2_statusbar_endboss/green/green40.png',
        'img/7_statusbars/2_statusbar_endboss/green/green60.png',
        'img/7_statusbars/2_statusbar_endboss/green/green80.png',
        'img/7_statusbars/2_statusbar_endboss/green/green100.png'
    ];

    /**
     * Creates a new endboss health bar and initializes its position and size.
     *
     * @constructor
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);

        this.x = 480;
        this.y = 10;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * Makes the endboss health bar visible.
     *
     * @returns {void}
     */
    show() {
        this.visible = true;
    }

    /**
     * Hides the endboss health bar.
     *
     * @returns {void}
     */
    hide() {
        this.visible = false;
    }

    /**
     * Sets the endboss health percentage and updates the displayed image.
     *
     * @param {number} percentage - Health percentage between 0 and 100.
     * @returns {void}
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES_HEALTH[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Draws the health bar if it is currently visible.
     *
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
     * @returns {void}
     */
    draw(ctx) {
        if (!this.visible) {
            return;
        }
        super.draw(ctx);
    }

    /**
     * Resolves the image index based on the current health percentage.
     *
     * @returns {number} Index in the IMAGES_HEALTH array.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
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