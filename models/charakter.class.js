/**
 * Represents the main player character Pepe.
 *
 * @extends MovebleObject
 */
class Charakter extends MovebleObject {
    /**
     * Width of the character
     * @type {number}
     */
    width = 100;
    /**
     * Height of the character
     * @type {number}
     */
    height = 280;
    /**
     * X-coordinate position of the character
     * @type {number}
     */
    x = 120;
    /**
     * Y-coordinate position of the character
     * @type {number}
     */
    y = 90;
    /**
     * Speed of the character
     * @type {number}
     */
    speed = 8;
    /**
     * Last move timestamp
     * @type {number}
     */
    lastMove = new Date().getTime();

    /**
     * Array of idle animation images
     * @type {string[]}
     */
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    /**
     * Array of long idle animation images
     * @type {string[]}
     */
    IMAGES_LONGIDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ]

    /**
     * Array of walking animation images
     * @type {string[]}
     */
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    /**
     * Array of jumping animation images
     * @type {string[]}
     */
    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];
    /**
     * Array of hurt animation images
     * @type {string[]}
     */
    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    /**
     * Array of death animation images
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    /**
     * Current image index
     * @type {number}
     */
    currentImage = 0;
    /**
     * World instance
     * @type {World}
     */
    world;
    /**
     * Creates a new character instance and initializes sprites, physics and animation.
     */
    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.initCharacterImages();
        this.world = world;
        this.applyGravity();
        this.animate();
        this.wasHurt = false;
        this.initOffset();
    }

    /**
     * Loads all character sprite image sequences.
     */
    initCharacterImages() {
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONGIDLE);
    }

    /**
     * Initializes the collision offset for the character hitbox.
     */
    initOffset() {
        this.offset = {
            top: 120,
            right: 25,
            bottom: 30,
            left: 25
        };
    }

    /**
     * Starts the movement and animation loops for the character.
     */
    animate() {
        this.startMovementLoop();
        this.startAnimationLoop();
    }

    /**
     * Starts the loop responsible for movement, jumping, running sound and camera.
     */
    startMovementLoop() {
        setInterval(() => {
            const isMovingHorizontal = this.handleHorizontalMovement();
            this.handleJumpInput();
            this.updateRunningSound(isMovingHorizontal);
            this.updateCameraPosition();
        }, 1000 / 60);
    }

    /**
     * Handles horizontal movement based on keyboard input.
     *
     * @returns {boolean} True if the character moved horizontally this frame.
     */
    handleHorizontalMovement() {
        let isMovingHorizontal = false;
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.otherDirection = false;
            this.moveRight();
            this.lastMove = new Date().getTime();
            isMovingHorizontal = true;
        }
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.otherDirection = true;
            this.moveLeft();
            this.lastMove = new Date().getTime();
            isMovingHorizontal = true;
        }
        return isMovingHorizontal;
    }

    /**
     * Handles jump input if the SPACE key is pressed and the character is on the ground.
     */
    handleJumpInput() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.Jump();
            this.lastMove = new Date().getTime();
        }
    }

    /**
     * Updates the running sound based on movement and ground state.
     *
     * @param {boolean} isMovingHorizontal - Whether the character moved horizontally.
     */
    updateRunningSound(isMovingHorizontal) {
        if (typeof playSound === 'function' && typeof stopSound === 'function') {
            if (isMovingHorizontal && !this.isAboveGround()) {
                playSound('running', { loop: true, reset: false });
            } else {
                stopSound('running', { reset: false });
            }
        }
    }

    /**
     * Updates the camera position to follow the character.
     */
    updateCameraPosition() {
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Starts the loop responsible for playing animations depending on state.
     */
    startAnimationLoop() {
        setInterval(() => {
            if (this.isDead()) {
                this.playDeadAnimation();
            } else if (this.isHurt()) {
                this.handleHurtState();
            } else {
                this.handleNormalAnimationState();
            }
        }, 60);
    }

    /**
     * Plays the death animation.
     */
    playDeadAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
    }

    /**
     * Handles the hurt state animation and sound.
     */
    handleHurtState() {
        this.playAnimation(this.IMAGES_HURT);
        if (!this.wasHurt && typeof playSound === 'function') {
            playSound('hurt');
            this.wasHurt = true;
        }
    }

    /**
     * Handles normal (non-hurt, non-dead) animations.
     */
    handleNormalAnimationState() {
        this.wasHurt = false;
        if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
        } else {
            this.handleGroundAnimation();
        }
    }

    /**
     * Handles walking and idle animations while the character is on the ground.
     */
    handleGroundAnimation() {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
        } else {
            this.playIdleOrLongIdle();
        }
    }

    /**
     * Plays either idle or long idle animation depending on time since last move.
     */
    playIdleOrLongIdle() {
        const timeSinceLastMove = new Date().getTime() - this.lastMove;
        if (timeSinceLastMove < 3000) {
            this.playAnimation(this.IMAGES_IDLE);
        } else {
            this.playAnimation(this.IMAGES_LONGIDLE);
        }
    }
}