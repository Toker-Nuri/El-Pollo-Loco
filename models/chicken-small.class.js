/**
 * Class that represents a small chicken character in the game
 * @extends MoveableObject
 */
class ChickenSmall extends MovebleObject {
    /**
     * Y-coordinate position of the chicken
     * @type {number}
     */
    y = 370;
    /**
     * Width of the chicken in pixels
     * @type {number}
     */
    width = 70;
    /**
     * Height of the chicken in pixels
     * @type {number}
     */
    height = 60;
    /**
     * Whether the chicken is dead
     * @type {boolean}
     */
    isDead = false;
    /**
     * Timeout for hiding the chicken after death
     * @type {NodeJS.Timeout}
     */
    deathTimeout = null;

    /**
     * Array of images for the chicken's walking animation
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    /**
     * Array of images for the chicken's death animation
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    /**
     * Creates a new small chicken enemy with random starting position and speed.
     *
     * @constructor
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 700 + Math.random() * 600;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
        this.offset = {
            top: 10,
            right: 10,
            bottom: 5,
            left: 10
        };
    }

    /**
     * Starts movement and walking animation intervals for the small chicken.
     *
     * @returns {void}
     */
    animate() {
        setInterval(() => {
            if (!this.isDead) {
                this.moveLeft();
            }
        }, 1000 / 60);

        setInterval(() => {
            if (!this.isDead) {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }

    /**
     * Kills the small chicken, plays death sound and hides it after a delay.
     *
     * @returns {void}
     */
    kill() {
        if (!this.isDead) {
            this.isDead = true;
            this.speed = 0;
            playSound('chicken_die');
            this.loadImage(this.IMAGES_DEAD[0]);
            this.deathTimeout = setTimeout(() => {
                this.height = 0;
            }, 1000);
        }

    }
}