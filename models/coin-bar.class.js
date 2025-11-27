/**
 * Represents a graphical bar that displays collected coins
 * @extends DrawableObject
 */
class CoinBar extends DrawableObject {
    /**
     * Percentage of collected coins
     * @type {number}
     */
    percentage = 0;
    /**
     * Number of collected coins
     * @type {number}
     */
    collectedCoins = 0;
    /**
     * Total number of coins to collect
     * @type {number}
     */
    TOTAL_COINS = 11;

    /**
     * Array of coin images for different percentages
     * @type {string[]}
     */
    IMAGES_COINS = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    /**
     * Creates a new CoinBar instance
     * @constructor
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_COINS);
        this.x = 20;
        this.y = 50;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    /**
     * Sets the percentage of collected coins and updates the displayed image
     * @param {number} collectedCoins - Number of collected coins
     */
    setPercentage(collectedCoins) {
        this.collectedCoins = collectedCoins;
        this.percentage = (this.collectedCoins / this.TOTAL_COINS) * 100;
        let path = this.IMAGES_COINS[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Resolves the index of the coin image based on the current percentage
     * @returns {number} Index of the coin image
     */
    resolveImageIndex() {
  return resolveBarIndex(this.percentage);
    }
}