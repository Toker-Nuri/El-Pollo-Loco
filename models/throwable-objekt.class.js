class ThrowableObject extends MovebleObject {
    isSplashing = false;
    toBeRemoved = false;
    rotationInterval = null;
    moveInterval = null;
  
    IMAGES_BOTTLE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.initImages();
        this.initProp(x, y);
        this.bottleAnimate();
    }

    bottleAnimate() {
        this.animate();
        this.throw();
    }


    initImages() {
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
    }

    initProp(x, y) {
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 60;
    }

    throw() {
        this.speedY = 16;
        this.applyGravity();
        this.moveInterval = setInterval(() => {
            if (this.isSplashing) return;
            this.x += 6;
        }, 25);
    }     
    
    animate() {
        this.rotationInterval = setInterval(() => {
            if (this.isSplashing) return;
            this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
        }, 60);
    
}

    splash() {
        if (this.isSplashing) return;
        this.isSplashing = true;
        this.speedY = 0;
        this.acceleration = 0;
        if (this.rotationInterval) {
            clearInterval(this.rotationInterval);
            this.rotationInterval = null;
        }
        let frame = 0;
        const splashAnimInterval = setInterval(() => {
            this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
            frame++;
            if (frame >= this.IMAGES_BOTTLE_SPLASH.length) {
                clearInterval(splashAnimInterval);
                this.toBeRemoved = true;
            }
        }, 40);
        if (this.moveInterval) {
            clearInterval(this.moveInterval);
            this.moveInterval = null;
        }
    }
}




 






