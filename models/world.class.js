class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarHealth = new StatusHealth();
    statusBarBottles = new StatusBottles();
    statusBarCoins = new StatusCoins();
    statusBarEndboss = new StatusEndboss();
    throwableObjects = [];

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {

            this.checkCollisions();
            /*this.checkThrowObjects();*/
        }, 200);
    }

    /*checkThrowObjects() {
        if (this.keyboard.D && this.statusBarBottles.percentage > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.statusBarBottles.setPercentage(this.statusBarBottles.percentage - 10);
        }
    }*/

    throwBottle() {
        if (this.statusBarBottles.percentage <= 0) return;
        let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
        this.throwableObjects.push(bottle);
        this.statusBarBottles.setPercentage(this.statusBarBottles.percentage - 10);
    }

    checkCollisionWithObjects(objects, statusBar, amount = 10) {
        objects.forEach((obj, index) => {
            if (this.character.isColliding(obj)) {
                objects.splice(index, 1);
                if (statusBar) {
                    statusBar.setPercentage(Math.min(statusBar.percentage + amount, 100));
                }
            }
        });
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) /*&& !this.character.isHurt()*/) {
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.energy);
            }
        });

        // Flaschen aufsammeln
        this.checkCollisionWithObjects(this.level.bottles, this.statusBarBottles, 10); // +10% pro Flasche

        // Coins aufsammeln
        this.checkCollisionWithObjects(this.level.coins, this.statusBarCoins, 10); // +10% pro Coin
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        // 🌥 Wolken bewegen:
        this.level.clouds.forEach(cloud => {
            cloud.moveLeft();
            if (cloud.x < -cloud.width) {
                cloud.x = 2000 + Math.random() * 500;
            }
        });

        this.addObjectsToMap(this.level.backgroundObjects);

        this.addObjectsToMap(this.level.clouds);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableObjects);

        this.ctx.translate(-this.camera_x, 0); // Back
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarEndboss);
        this.ctx.translate(this.camera_x, 0); // Forwards

        this.ctx.translate(-this.camera_x, 0);

        // Draw() wird immer wieder aufgerufen
        let self = this; // in diesem speziellen Fall funktioniert this. nicht. Daher eine Variable damit zuordnen.
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}
