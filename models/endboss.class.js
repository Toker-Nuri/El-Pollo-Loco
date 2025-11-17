class Endboss extends MovebleObject {
    height = 400;
    width = 250; 
    y = 65;
    speed = 1;
    isActivated = false;
    hasAlertPlayed = false;
    isAttacking = false;
    isTakingDamage = false;
    isDying = false;
    hitsRemaining = 8;
    isDead = false;
    ALERT_DURATION = 100;      
    MOVE_DURATION = 500;      
    ATTACK_DURATION = 500;     
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

    constructor(){
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 5250;
        this.y = 65;
        this.width = 250;
        this.height = 400;
        this.offset = {
            top: 60,
            right: 20,
            bottom: 30,
            left: 20
        };
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (this.isDying && !this.deathAnimationPlayed) {
                this.playAnimation(this.IMAGES_DEAD);
                if (!this.deathAnimationStarted) {
                    this.deathAnimationStarted = true;
                    const frameTime = 100;
                    setTimeout(() => {
                        this.deathAnimationPlayed = true;
                        this.isDead = true;
                        setTimeout(() => { this.height = 0; }, 200);
                    }, this.IMAGES_DEAD.length * frameTime);
                }
                return;
            }
            if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                if (!this.hurtPlaying) {
                    this.hurtPlaying = true;
                    const frameTime = 100;
                    setTimeout(() => {
                        this.hurtPlaying = false;
                    }, this.IMAGES_HURT.length * frameTime);
                }
                return;
            }
            if (this.phase === 'alert') {
                this.playAnimation(this.IMAGES_ALERT);
            } else if (this.phase === 'attack') {
                this.playAnimation(this.IMAGES_ATTACK);
            } else if (this.phase === 'move') {
                this.playAnimation(this.IMAGES_ATTACK);
            }
        }, 100);

        setInterval(() => {
            if (!this.world || this.isDying || this.isDead) return;
            const now = new Date().getTime();
            if (this.isActivated && this.phase === 'idle') {
                this.phase = 'alert';
                this.alertScheduled = false;
                this.isAlert(); 
            }
            if (this.phase === 'alert') return;
            if (this.phase === 'attack') {
                if (now - this.actionStartTime > this.ATTACK_DURATION) {
                    this.phase = 'move';
                    this.actionStartTime = now;
                }
            } else if (this.phase === 'move') {
                this.moveLeft();
                if (now - this.actionStartTime > this.MOVE_DURATION) {
                    this.phase = 'attack';
                    this.actionStartTime = now;
                }
            }
        }, 1000 / 60);
    }

    isAlert() {
        if (this.isActivated && !this.hasAlertPlayed) {
            if (!this.alertScheduled) {
                this.alertScheduled = true;
                setTimeout(() => {
                    this.hasAlertPlayed = true;
                    this.isAttacking = true;
                    this.phase = 'attack';
                    this.actionStartTime = new Date().getTime(); 
                }, this.ALERT_DURATION);
            }
            return true;
        }
        return false;
    }

    isAttack() {
        return this.isAttacking && !this.isDead && !this.isDying;
    }

    takeHitFromBottle() {
        if (this.isDying || this.isDead) return;
        this.hitsRemaining = Math.max(0, this.hitsRemaining - 1);
        const percentage = Math.round((this.hitsRemaining / 8) * 100);
        this.energy = percentage;
        this.lastHit = new Date().getTime();
        this.isTakingDamage = true;
        if (this.world && this.world.endbossBar) {
            this.world.endbossBar.setPercentage(percentage);
        }
        setTimeout(() => {
            this.isTakingDamage = false;
        }, 400);
        if (this.hitsRemaining === 0) {
            this.die(); 
        }
    }

    die() {
        if (this.isDying || this.isDead) return;
        this.isDying = true;
        this.speed = 0;
    }

    kill() {
        this.die();
    }
}