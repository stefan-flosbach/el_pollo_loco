class MovableObject extends DrawableObject {
    speed = 0.1;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 143;
        }
    }

    // character.isColliding(chicken);
    isColliding(mo) {
        // Falls offset nicht gesetzt ist, nutze 0
        const offset1 = this.offset || { top: 0, right: 0, bottom: 0, left: 0 };
        const offset2 = mo.offset || { top: 0, right: 0, bottom: 0, left: 0 };

        return this.x + this.offset.left + this.width - this.offset.right - this.offset.left > mo.x + mo.offset.left &&
            this.y + this.offset.top + this.height - this.offset.top - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.offset.left + mo.width - mo.offset.left - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.offset.top + mo.height - mo.offset.top - mo.offset.bottom;
        /* return this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
    this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
    this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom &&
    this.y + this.height - this.offset.bottom > mo.y + mo.offset.top;*/
    }

    hit() {
        this.energy -= 2;
        if (this.energy <= 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000; // Difference in s
        return timepassed < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 30;
    }
}