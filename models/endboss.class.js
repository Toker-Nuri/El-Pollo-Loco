/**
 * Represents the boss chicken enemy with multiple phases and behaviors.
 *
 * @extends MovebleObject
 */
class Endboss extends MovebleObject {
    height = 400;
    width = 250; 
    y = 65;
    speed = 2;
    isActivated = false;
    hasAlertPlayed = false;
    isAttacking = false;
    isTakingDamage = false;
    isDying = false;
    hitsRemaining = 8;
    isDead = false;
    ALERT_DURATION = 100;      
    MOVE_DURATION = 800;      
    ATTACK_DURATION = 800;     
    alertScheduled = false;
    isMoving = false;
    lastActionTime = 0;
    deathAnimationPlayed = false;
    deathAnimationStarted = false;
    hurtPlaying = false;
    phase = 'idle'; 
    actionStartTime = 0;

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
    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
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
            right: 20,
            bottom: 30,
            left: 20
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

    /**
     * Schedules the alert timeout and plays the intro sound.
     */
    scheduleAlert() {
        this.alertScheduled = true;
        setTimeout(() => {
            this.hasAlertPlayed = true;
            this.isAttacking = true;
            this.phase = 'attack';
            this.actionStartTime = new Date().getTime();
        }, this.ALERT_DURATION);
        playSound('boss_intro_sound');
    }

    /**
     * Returns whether the boss is currently in an attacking state.
     *
     * @returns {boolean}
     */
    isAttack() {
        return this.isAttacking && !this.isDead && !this.isDying;
    }

    /**
     * Applies damage to the boss when hit by a bottle and updates UI and state.
     */
    takeHitFromBottle() {
        if (this.isDying || this.isDead) {
            return;
        }
        const percentage = this.updateHitsAndEnergy();
        this.updateEndbossHealthBar(percentage);
        this.startDamageCooldown();
        this.checkDeathAfterHit();
        playSound('chicken_die');
    }

    /**
     * Updates remaining hits and converts them into an energy percentage.
     *
     * @returns {number} New health percentage of the boss.
     */
    updateHitsAndEnergy() {
        this.hitsRemaining = Math.max(0, this.hitsRemaining - 1);
        const percentage = Math.round((this.hitsRemaining / 8) * 100);
        this.energy = percentage;
        this.lastHit = new Date().getTime();
        this.isTakingDamage = true;
        return percentage;
    }

    /**
     * Updates the endboss health bar in the world, if it exists.
     *
     * @param {number} percentage - New health percentage.
     */
    updateEndbossHealthBar(percentage) {
        if (this.world && this.world.endbossBar) {
            this.world.endbossBar.setPercentage(percentage);
        }
    }

    /**
     * Starts a short cooldown after which the damage state is cleared.
     */
    startDamageCooldown() {
        setTimeout(() => {
            this.isTakingDamage = false;
        }, 400);
    }

    /**
     * Checks whether the boss should die after the most recent hit.
     */
    checkDeathAfterHit() {
        if (this.hitsRemaining === 0) {
            this.die();
        }
    }

    /**
     * Starts the death sequence of the boss.
     */
    die() {
        if (this.isDying || this.isDead) return;
        this.isDying = true;
        this.speed = 0;

        playSound('boss_dead');
    }

    /**
     * Kills the boss. Convenience alias for die().
     */
    kill() {
        this.die();
    }
}