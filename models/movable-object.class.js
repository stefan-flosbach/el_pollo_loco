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
        if (this instanceof Endboss) {
            return this.y < this.groundY;
        } else if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 143;
        }
    }

    // character.isColliding(chicken);
    /*isColliding(mo) {
        // Falls offset nicht gesetzt ist, nutze 0
        const offset1 = this.offset || { top: 0, right: 0, bottom: 0, left: 0 };
        const offset2 = mo.offset || { top: 0, right: 0, bottom: 0, left: 0 };

        return this.x + this.offset.left + this.width - this.offset.right - this.offset.left > mo.x + mo.offset.left &&
            this.y + this.offset.top + this.height - this.offset.top - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.offset.left + mo.width - mo.offset.left - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.offset.top + mo.height - mo.offset.top - mo.offset.bottom;
    }*/

    isColliding(mo) {
        const o1 = this.offset || { top: 0, right: 0, bottom: 0, left: 0 };
        const o2 = mo.offset || { top: 0, right: 0, bottom: 0, left: 0 };

        const thisLeft = this.x + o1.left;
        const thisRight = this.x + this.width - o1.right;
        const thisTop = this.y + o1.top;
        const thisBottom = this.y + this.height - o1.bottom;

        const moLeft = mo.x + o2.left;
        const moRight = mo.x + mo.width - o2.right;
        const moTop = mo.y + o2.top;
        const moBottom = mo.y + mo.height - o2.bottom;

        return thisRight > moLeft &&
            thisLeft < moRight &&
            thisBottom > moTop &&
            thisTop < moBottom;
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