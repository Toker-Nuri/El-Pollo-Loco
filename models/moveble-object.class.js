/**
 * Class for movable objects in the game
 * @extends DrawableObject
 */
class MovebleObject extends DrawableObject {
    /**
     * Speed of the object
     * @type {number}
     */
    speed = 0.15;
    /**
     * Vertical speed of the object
     * @type {number}
     */
    speedY = 0;
    /**
     * Acceleration of the object
     * @type {number}
     */
    acceleration = 2.5;
    /**
     * Direction of the object
     * @type {boolean}
     */
    otherDirection = false;
    /**
     * Last bounce time of the object
     * @type {number}
     */
    lastBounce = 0;
    /**
     * Offset of the object
     * @type {Object}
     */
    offset = {
        left: 0,
        right: 0,
        bottom: 0,
        top: 0
    };
    /**
     * Energy of the object
     * @type {number}
     */
    energy = 100;
    /**
     * Last hit time of the object
     * @type {number}
     */
    lastHit = 0;

    /**
     * Applies gravity to the object
     * @returns {void}
     */
    applyGravity() {
        setInterval(() => {
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

    /**
     * Checks if the object is above the ground
     * @returns {boolean}
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 150;
        }
    }

    /**
     * Checks if the object is colliding with another object
     * @param {Object} obj - The object to check collision with
     * @returns {boolean}
     */
   isColliding(obj) {
    return (this.x + this.offset.left) < (obj.x + obj.width - obj.offset.right) &&
           (this.x + this.width - this.offset.right) > (obj.x + obj.offset.left) &&
           (this.y + this.offset.top) < (obj.y + obj.height - obj.offset.bottom) &&
           (this.y + this.height - this.offset.bottom) > (obj.y + obj.offset.top);
}

    /**
     * Checks if the object is jumping on another object
     * @param {Object} obj - The object to check if the object is jumping on
     * @returns {boolean}
     */
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

    /**
     * Deals damage to the object
     * @param {number} amount - The amount of damage to deal
     */
    hit(amount = 10) {
        this.energy -= amount;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the object is hurt
     * @returns {boolean}
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 1;

    }

    /**
     * Checks if the object is dead
     * @returns {boolean}
     */
    isDead() {
        return this.energy == 0;
    }
    /**
     * Plays an animation for the object
     * @param {Array} images - The array of images to use for the animation
     */
    playAnimation(images) {
        let index = this.currentImage % images.length;
        let path = images[index];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the right
     */
    moveRight() {
        this.x += this.speed;

    }
    /**
     * Moves the object to the left
     */
    moveLeft() {
        this.x -= this.speed;


    }

    /**
     * Makes the object jump
     */
    Jump() {
        this.speedY = 32;
    }

}