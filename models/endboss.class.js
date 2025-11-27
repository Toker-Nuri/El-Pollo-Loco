/**
 * Represents the boss chicken enemy with multiple phases and behaviors.
 *
 * @extends MovebleObject
 */
class Endboss extends MovebleObject {
    /**
     * Height of the endboss in pixels
     * @type {number}
     */
    height = 400;
    /**
     * Width of the endboss in pixels
     * @type {number}
     */
    width = 250;
    /**
     * Y-coordinate position of the endboss
     * @type {number}
     */
    y = 65;
    /**
     * Speed of the endboss in pixels per second
     * @type {number}
     */
    speed = 4;
    /**
     * Whether the endboss is activated
     * @type {boolean}
     */
    isActivated = false;
    /**
     * Whether the alert sound has been played
     * @type {boolean}
     */
    hasAlertPlayed = false;
    /**
     * Whether the endboss is attacking
     * @type {boolean}
     */
    isAttacking = false;
    /**
     * Whether the endboss is taking damage
     * @type {boolean}
     */
    isTakingDamage = false;
    /**
     * Whether the endboss is dying
     * @type {boolean}
     */
    isDying = false;
    /**
     * Number of hits remaining before the endboss dies
     * @type {number}
     */
    hitsRemaining = 5;
    /**
     * Whether the endboss is dead
     * @type {boolean}
     */
    isDead = false;
    /**
     * Duration of the alert phase in milliseconds
     * @type {number}
     */
    ALERT_DURATION = 100;
    /**
     * Duration of the move phase in milliseconds
     * @type {number}
     */
    MOVE_DURATION = 1000;
    /**
     * Duration of the attack phase in milliseconds
     * @type {number}
     */
    ATTACK_DURATION = 1000;
    /**
     * Whether the alert phase is scheduled
     * @type {boolean}
     */
    alertScheduled = false;
    /**
     * Whether the endboss is moving
     * @type {boolean}
     */
    isMoving = false;
    /**
     * Timestamp of the last action
     * @type {number}
     */
    lastActionTime = 0;
    /**
     * Whether the death animation has been played
     * @type {boolean}
     */
    deathAnimationPlayed = false;
    /**
     * Whether the death animation has started
     * @type {boolean}
     */
    deathAnimationStarted = false;
    /**
     * Whether the hurt animation is playing
     * @type {boolean}
     */
    hurtPlaying = false;
    /**
     * Current phase of the endboss
     * @type {string}
     */
    phase = 'idle';
    /**
     * Timestamp of the start of the current action
     * @type {number}
     */
    actionStartTime = 0;
    /**
     * Array of images for the alert phase
     * @type {string[]}
     */
    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    /**
     * Array of images for the attack phase
     * @type {string[]}
     */
    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    /**
     * Array of images for the hurt phase
     * @type {string[]}
     */
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    /**
     * Array of images for the dead phase
     * @type {string[]}
     */
    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    /**
     * Creates a new Endboss instance and initializes sprites, position and behavior.
     */
    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.initImages();
        this.initPositionAndSize();
        this.initOffset();
        this.animate();
    }

    /**
     * Loads all sprite sheets for the endboss.
     */
    initImages() {
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
    }

    /**
     * Initializes position and size of the endboss.
     */
    initPositionAndSize() {
        this.x = 5250;
        this.y = 65;
        this.width = 250;
        this.height = 400;
    }

    /**
     * Initializes the collision offset for the endboss hitbox.
     */
    initOffset() {
        this.offset = {
            top: 60,
            right: 30,
            bottom: 30,
            left: 30
        };
    }

    /**
     * Starts animation and phase update loops for the boss.
     */
    animate() {
        this.startAnimationFrameLoop();
        this.startPhaseLogicLoop();
    }

    /**
     * Starts the loop that updates the boss animation frames.
     */
    startAnimationFrameLoop() {
        setInterval(() => {
            if (this.handleDeathAnimation()) return;
            if (this.handleHurtAnimation()) return;
            this.handlePhaseAnimation();
        }, 100);
    }

    /**
     * Handles death animation if the boss is dying.
     *
     * @returns {boolean} True if death animation was handled.
     */
    handleDeathAnimation() {
        if (this.isDying && !this.deathAnimationPlayed) {
            this.playAnimation(this.IMAGES_DEAD);
            if (!this.deathAnimationStarted) {
                this.startDeathAnimationSequence();
            }
            return true;
        }
        return false;
    }

    /**
     * Starts the timed sequence that marks the boss as dead and shrinks it.
     */
    startDeathAnimationSequence() {
        this.deathAnimationStarted = true;
        const frameTime = 100;
        setTimeout(() => {
            this.deathAnimationPlayed = true;
            this.isDead = true;
            setTimeout(() => {
                this.height = 0;
            }, 200);
        }, this.IMAGES_DEAD.length * frameTime);
    }

    /**
     * Handles the hurt animation if the boss is currently hurt.
     *
     * @returns {boolean} True if hurt animation was handled.
     */
    handleHurtAnimation() {
        if (!this.isHurt()) {
            return false;
        }
        this.playAnimation(this.IMAGES_HURT);
        if (!this.hurtPlaying) {
            this.startHurtAnimationSequence();
        }
        return true;
    }

    /**
     * Starts the timed sequence that limits how long the hurt state is shown.
     */
    startHurtAnimationSequence() {
        this.hurtPlaying = true;
        const frameTime = 100;
        setTimeout(() => {
            this.hurtPlaying = false;
        }, this.IMAGES_HURT.length * frameTime);
    }

    /**
     * Plays the correct animation depending on the current phase.
     */
    handlePhaseAnimation() {
        if (this.phase === 'alert') {
            this.playAnimation(this.IMAGES_ALERT);
        } else if (this.phase === 'attack') {
            this.playAnimation(this.IMAGES_ATTACK);
        } else if (this.phase === 'move') {
            this.playAnimation(this.IMAGES_ATTACK);
        }
    }

    /**
     * Starts the loop that updates the boss AI phase (idle/alert/attack/move).
     */
    startPhaseLogicLoop() {
        setInterval(() => {
            if (this.shouldSkipPhaseUpdate()) {
                return;
            }
            const now = new Date().getTime();
            this.handleIdlePhase(now);
            if (this.phase === 'alert') {
                return;
            }
            this.handleAttackAndMovePhases(now);
        }, 1000 / 60);
    }

    /**
     * Returns whether the phase update should be skipped this frame.
     *
     * @returns {boolean}
     */
    shouldSkipPhaseUpdate() {
        return !this.world || this.isDying || this.isDead;
    }

    /**
     * Handles transition from idle to alert phase.
     *
     * @param {number} now - Current timestamp in milliseconds.
     */
    handleIdlePhase(now) {
        if (this.isActivated && this.phase === 'idle') {
            this.phase = 'alert';
            this.alertScheduled = false;
            this.isAlert();
        }
    }

    /**
     * Handles transitions and movement while in attack or move phases.
     *
     * @param {number} now - Current timestamp in milliseconds.
     */
    handleAttackAndMovePhases(now) {
        if (this.phase === 'attack') {
            this.handleAttackPhase(now);
        } else if (this.phase === 'move') {
            this.handleMovePhase(now);
        }
    }

    /**
     * Updates the attack phase and switches to move phase after ATTACK_DURATION.
     *
     * @param {number} now - Current timestamp in milliseconds.
     */
    handleAttackPhase(now) {
        if (now - this.actionStartTime > this.ATTACK_DURATION) {
            this.phase = 'move';
            this.actionStartTime = now;
        }
    }

    /**
     * Moves the boss left during move phase and switches back to attack after MOVE_DURATION.
     *
     * @param {number} now - Current timestamp in milliseconds.
     */
    handleMovePhase(now) {
        this.moveLeft();
        if (now - this.actionStartTime > this.MOVE_DURATION) {
            this.phase = 'attack';
            this.actionStartTime = now;
        }
    }

    /**
     * Triggers the alert phase and schedules the transition to attack.
     *
     * @returns {boolean} True if alert handling is in progress.
     */
    isAlert() {
        if (!this.canStartAlert()) {
            return false;
        }
        if (!this.alertScheduled) {
            this.scheduleAlert();
        }
        return true;
    }

    /**
     * Returns whether the boss can start the alert phase.
     *
     * @returns {boolean}
     */
    canStartAlert() {
        return this.isActivated && !this.hasAlertPlayed;
    }
}