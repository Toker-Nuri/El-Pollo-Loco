/**
     * Schedules the alert timeout and plays the intro sound.
     */
if (typeof Endboss !== 'undefined') {
    Endboss.prototype.scheduleAlert = function () {
        this.alertScheduled = true;
        setTimeout(() => {
            this.hasAlertPlayed = true;
            this.isAttacking = true;
            this.phase = 'attack';
            this.actionStartTime = new Date().getTime();
        }, this.ALERT_DURATION);
        playSound('boss_intro_sound');
    };

    /**
       * Returns whether the boss is currently in an attacking state.
       *
       * @returns {boolean}
       */
    Endboss.prototype.isAttack = function () {
        return this.isAttacking && !this.isDead && !this.isDying;
    };

    /**
     * Applies damage to the boss when hit by a bottle and updates UI and state.
     */
    Endboss.prototype.takeHitFromBottle = function () {
        if (this.isDying || this.isDead) {
            return;
        }
        const percentage = this.updateHitsAndEnergy();
        this.updateEndbossHealthBar(percentage);
        this.startDamageCooldown();
        this.checkDeathAfterHit(percentage);
        playSound('chicken_die');
    };

    /**
     * Updates remaining hits and converts them into an energy percentage.
     *
     * @returns {number} New health percentage of the boss.
     */
    Endboss.prototype.updateHitsAndEnergy = function () {
        this.hitsRemaining = Math.max(0, this.hitsRemaining - 1);
        const percentage = Math.round((this.hitsRemaining / 5) * 100);
        this.energy = percentage;
        this.lastHit = new Date().getTime();
        this.isTakingDamage = true;
        return percentage;
    };

    /**
     * Updates the endboss health bar in the world, if it exists.
     *
     * @param {number} percentage - New health percentage.
     */
    Endboss.prototype.updateEndbossHealthBar = function (percentage) {
        if (this.world && this.world.endbossBar) {
            this.world.endbossBar.setPercentage(percentage);
        }
    };

    /**
    * Starts a short cooldown after which the damage state is cleared.
    */
    Endboss.prototype.startDamageCooldown = function () {
        setTimeout(() => {
            this.isTakingDamage = false;
        }, 400);
    };

    /**
     * Checks whether the boss should die after the most recent hit.
     */
    Endboss.prototype.checkDeathAfterHit = function (percentage) {
        if (percentage <= 0 || this.hitsRemaining === 0) {
            this.die();
        }
    };

    /**
         * Starts the death sequence of the boss.
         */
    Endboss.prototype.die = function () {
        if (this.isDying || this.isDead) return;
        this.isDying = true;
        this.speed = 0;
        playSound('boss_dead');
    };

     /**
     * Kills the boss. Convenience alias for die().
     */
    Endboss.prototype.kill = function () {
        this.die();
    };
}