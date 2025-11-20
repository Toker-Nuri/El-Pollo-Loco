class Chicken extends MovebleObject {
    y = 360;
    width = 60;
    height = 70;
    isDead = false;
    deathTimeout = null;

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    /**
     * Creates a new normal chicken enemy with random starting position and speed.
     *
     * @constructor
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);  
        this.x = 700 + Math.random() * 600;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }

    /**
     * Starts movement and walking animation intervals for the chicken.
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
     * Kills the chicken, plays death sound and hides it after a delay.
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