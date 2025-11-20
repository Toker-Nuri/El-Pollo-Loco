/**
 * Represents a throwable object that can be thrown and animated
 * @class
 * @extends MoveableObject
 */

class ThrowableObject extends MovebleObject {
    /**
     * Whether the object is splashing
     * @type {boolean}
     */
    isSplashing = false;
    /**
     * Whether the object should be removed
     * @type {boolean}
     */
    toBeRemoved = false;
    /**
     * Interval for rotation animation
     * @type {number}
     */
    rotationInterval = null;
    /**
     * Interval for movement
     * @type {number}
     */
    moveInterval = null;

    /**
     * Array of images for rotation animation
     * @type {string[]}
     */
    IMAGES_BOTTLE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    /**
     * Array of images for splash animation
     * @type {string[]}
     */
    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    /**
     * Creates a new ThrowableObject instance
     * @param {number} x - X-coordinate position
     * @param {number} y - Y-coordinate position
     */
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.initImages();
        this.initProp(x, y);
        this.bottleAnimate();
    }

    /**
     * Starts the bottle animation and throw action
     */
    bottleAnimate() {
        this.animate();
        this.throw();
    }

    /**
     * Initializes the images for rotation and splash animations
     */
    initImages() {
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
    }

    /**
     * Initializes the properties of the object
     * @param {number} x - X-coordinate position
     * @param {number} y - Y-coordinate position
     */
    initProp(x, y) {
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 60;
    }

    /**
     * Throws the object with gravity and movement
     */
    throw() {
        this.speedY = 16;
        this.applyGravity();
        this.moveInterval = setInterval(() => {
            if (this.isSplashing) return;
            this.x += 6;
        }, 25);
        playSound('bottle_throw');
    }

    /**
     * Animates the bottle rotation
     */
    animate() {
        this.rotationInterval = setInterval(() => {
            if (this.isSplashing) return;
            this.playAnimation(this.IMAGES_BOTTLE_ROTATION);

        }, 60);

    }
/**
 * Handles the splash animation of the bottle
 */
    splash() {
        if (this.isSplashing) return;
        this.isSplashing = true;
        this.speedY = 0;
        this.acceleration = 0;
        this.clearRotationInterval();
        playSound('bottle_shatter');
        this.splashFrame = 0;
        this.splashInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
            this.splashFrame++;
            if (this.splashFrame >= this.IMAGES_BOTTLE_SPLASH.length) {
                this.clearSplashInterval();
            }
        }, 40);
        this.clearMoveInterval();
    }

    /**
     * Clears the move interval of the object
     */
    clearMoveInterval() {
        if (this.moveInterval) {
            clearInterval(this.moveInterval);
            this.moveInterval = null;
        }
    }

    /**
     * Clears the splash interval of the object
     */
    clearSplashInterval() {
        if (this.splashInterval) {
            clearInterval(this.splashInterval);
            this.splashInterval = null;
        }
        this.toBeRemoved = true;
    }
/**
 * Clears the rotation interval of the object
 */
    clearRotationInterval() {
        if (this.rotationInterval) {
            clearInterval(this.rotationInterval);
            this.rotationInterval = null;
        }
    }
}











