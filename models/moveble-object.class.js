class MovebleObject extends DrawableObject {
        speed = 0.15;
        speedY = 0;
        acceleration = 2.5;
        otherDirection = false;
        lastBounce = 0;
        offset = {
            left: 0,
            right: 0,
            bottom: 0,
            top: 0
        };
        energy = 100;
        lastHit = 0;

    
        applyGravity(){
            setInterval(() =>{
                if (this.isAboveGround() || this.speedY > 0) {
                    this.y -= this.speedY;
                    this.speedY -= this.acceleration;

                    if (!this.isAboveGround() && this.speedY < 0) {
                        this.y = 150;
                        this.speedY = 0;
                    }
                }
            }, 1000 / 30);
        }

        isAboveGround(){
            if (this instanceof ThrowableObject) {
           return true; 
        }else{
             return this.y < 150; 
        }
    }

    isColliding(obj) {
        return  (this.x + this.offset.left) < (obj.x + obj.width - obj.offset.right) && 
                (this.x + this.width - this.offset.right) > (obj.x + obj.offset.left) && 
                (this.y + this.offset.top) < (obj.y + obj.height - obj.offset.bottom) && 
                (this.y + this.height - this.offset.bottom) > (obj.y + obj.offset.top);
    }

    isJumpingOn(obj) {
        const margin = 40; 
        const thisLeft = this.x + this.offset.left;
        const thisRight = this.x + this.width - this.offset.right;
        const thisBottom = this.y + this.height - this.offset.bottom;
        const objLeft = obj.x + obj.offset.left;
        const objRight = obj.x + obj.width - obj.offset.right;
        const objTop = obj.y + obj.offset.top;

        const horizontalOverlap = thisRight > objLeft && thisLeft < objRight;
        const fromAbove = thisBottom <= objTop + margin;
        return horizontalOverlap && fromAbove && this.speedY < 0;
    }

    hit(amount = 10){
        this.energy -= amount;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1; 

    }

    isDead(){
        return this.energy == 0;
    }
    playAnimation(images) {
        let index = this.currentImage % images.length;
            let path = images[index];
            this.img = this.imageCache[path];
            this.currentImage++;
    }

        moveRight() {
            this.x += this.speed;
            
        }
         moveLeft() {
            this.x -= this.speed;
            
      
    }

    Jump(){
        this.speedY = 32;
    }

}