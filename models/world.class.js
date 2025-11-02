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
        // this.run();
    }

    setWorld() {
        this.character.world = this;

        this.level.enemies.forEach(e => e.world = this);
    }

    /*run() {
        setInterval(() => {
            this.checkCollisions();
        }, 1000 / 60); // 60 FPS Kollisionserkennung
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

    /*checkCollisionWithObjects(objects, statusBar, amount = 10) {
        let collected = 0;
        for (let i = objects.length - 1; i >= 0; i--) {
            const obj = objects[i];
            if (this.character.isColliding(obj)) {
                // Entfernen des Objekts
                objects.splice(i, 1);
                collected++;
            }
        }
        if (collected > 0 && statusBar) {
            statusBar.setPercentage(Math.min(statusBar.percentage + collected * amount, 100));
        }
    }*/




    checkCollisions() {

        // Chicken-Kollisionen (Stomp + Schaden)
        this.level.enemies.forEach(enemy => {

            if (!(enemy instanceof Chicken)) return;
            if (!this.character.isColliding(enemy)) return;
            if (enemy.isDead) return;

            const characterFeetPrev =
                this.character.prevY +
                this.character.height -
                this.character.offset.bottom;

            const characterFeetNow =
                this.character.y +
                this.character.height -
                this.character.offset.bottom;

            const enemyHead =
                enemy.y +
                enemy.offset.top;

            const stompTolerance = 15;

            // muss fallen UND vorher über dem Gegner gewesen sein
            const isFallingDown = characterFeetNow > characterFeetPrev;
            const wasAbove = characterFeetPrev <= enemyHead + stompTolerance;

            if (!this.character.hasStomped &&
                isFallingDown &&
                wasAbove &&
                !this.character.isHurt()) {

                enemy.die();
                this.character.speedY = 20; // bounce!
                this.character.hasStomped = true; // NUR 1x pro Sprung
                return;
            }


            // sonst Schaden mengenbegrenzt
            if (!this.character.isHurt()) {
                this.character.hit();
                this.statusBarHealth.setPercentage(this.character.energy);
            }

        });



        // tote Chickens nach Timer entfernen (Cleanup)
        this.level.enemies = this.level.enemies.filter(e => {
            return !(e instanceof Chicken && e.shouldBeRemoved());
        });



        // Endboss Kollisionen
        this.level.enemies.forEach(enemy => {
            if (!(enemy instanceof Endboss)) return;

            if (enemy.isDead) {
                if (!this.endbossDefeated && !this.character.dead) {
                    this.endbossDefeated = true;
                    setTimeout(() => this.startYouWonSequence(), 3000);
                }
                return;
            }

            if (this.character.isColliding(enemy)) {
                if (!this.character.dead && !this.character.isHurt()) {
                    this.statusBarHealth.setPercentage(0);
                    this.character.energy = 0;
                    this.character.die();
                }
            }
        });




        // Flaschen treffen Endboss
        this.throwableObjects.forEach((bottle, index) => {
            this.level.enemies.forEach(enemy => {
                if (
                    enemy instanceof Endboss &&
                    !enemy.isDead &&
                    bottle.isColliding(enemy)
                ) {
                    enemy.hitByBottle();
                    this.throwableObjects.splice(index, 1);
                    this.statusBarEndboss.setPercentage(100 - enemy.hitCount * 20);
                }
            });
        });




        // Flaschen aufsammeln
        this.checkCollisionWithObjects(
            this.level.bottles,
            this.statusBarBottles,
            10
        );

        // Coins aufsammeln
        this.checkCollisionWithObjects(
            this.level.coins,
            this.statusBarCoins,
            10
        );
    }




    draw() {
        if (this.gameStopped) return;

        this.checkCollisions(); // immer mit 60 FPS prüfen

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


    gameOver() {
        // Spiellogik stoppen
        this.character.speed = 0;
        this.level.enemies = [];
        this.level.coins = [];
        this.level.bottles = [];

        // Canvas löschen
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Zuerst "You lost" anzeigen
        let imgLost = new Image();
        imgLost.src = '../img/You won, you lost/You lost.png';
        imgLost.onload = () => {
            this.ctx.drawImage(imgLost, 0, 0, this.canvas.width, this.canvas.height);
        };

        // Nach 3 Sekunden "Game over" anzeigen
        setTimeout(() => {
            let imgGameOver = new Image();
            imgGameOver.src = '../img/You won, you lost/Game over.png';
            imgGameOver.onload = () => {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.drawImage(imgGameOver, 0, 0, this.canvas.width, this.canvas.height);
            };
        }, 3000);
    }


    startYouLostSequence() {
        if (this.gameStopped) return;
        this.gameStopped = true;

        // Kleiner Moment warten, bis Pepe unten sichtbar ist
        setTimeout(() => {
            this.fadeInScreen('../img/You won, you lost/You lost.png', () => {
                // Nach 3 Sekunden Game Over zeigen
                setTimeout(() => {
                    this.fadeInScreen('../img/You won, you lost/Game over.png', () => {
                        // Nach weiteren 3 Sekunden Restart-Button anzeigen
                        setTimeout(() => {
                            this.showRestartButton();
                        }, 3000);
                    });
                }, 3000);
            });
        }, 800);
    }

    startYouWonSequence() {
        if (this.gameStopped) return;
        this.gameStopped = true;

        // You won anzeigen
        this.fadeInScreen('../img/You won, you lost/You won A.png', () => {
            // Nach 3 Sekunden Game Over Screen anzeigen
            setTimeout(() => {
                this.fadeInScreen('../img/You won, you lost/Game over A.png', () => {
                    // Nach 2 Sekunden Restart Button zeigen
                    setTimeout(() => {
                        this.showRestartButton();
                    }, 2000);
                });
            }, 3000);
        });
    }


    /**
     * Blendet ein Bild sanft in den Canvas ein (Fade-in)
     * @param {string} imagePath - Pfad zum Bild
     * @param {function} [onComplete] - Optionaler Callback nach dem Fade-in
     */
    fadeInScreen(imagePath, onComplete) {
        cancelAnimationFrame(this.animationFrame);
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        const img = new Image();
        img.src = imagePath;

        img.onload = () => {
            let opacity = 0;
            const fadeSpeed = 0.02;

            const fade = () => {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                this.ctx.globalAlpha = opacity;
                this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
                this.ctx.globalAlpha = 1.0;

                if (opacity < 1) {
                    opacity += fadeSpeed;
                    requestAnimationFrame(fade);
                } else if (onComplete) {
                    onComplete();
                }
            };

            requestAnimationFrame(fade);
        };
    }

    // Zeigt einen Restart-Button auf dem Canvas an.

    showRestartButton() {
        const baseWidth = 160;
        const baseHeight = 50;
        const growScale = 1.1;
        const y = this.canvas.height - 100;
        let hovered = false;
        let currentScale = 1;

        const drawButton = () => {
            const width = baseWidth * currentScale;
            const height = baseHeight * currentScale;
            const x = this.canvas.width / 2 - width / 2;

            // Nur den Bereich um den Button leeren (nicht das ganze Canvas!)
            this.ctx.clearRect(x - 10, y - 10, width + 20, height + 20);

            // Halbtransparenter Hintergrund
            this.ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
            this.ctx.fillRect(x, y, width, height);

            // Weißer Rand
            this.ctx.strokeStyle = hovered ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.7)";
            this.ctx.lineWidth = 2;
            this.ctx.strokeRect(x, y, width, height);

            // Text
            this.ctx.font = `${hovered ? 26 : 24}px Arial`;
            this.ctx.fillStyle = "white";
            this.ctx.textAlign = "center";
            this.ctx.textBaseline = "middle";
            this.ctx.fillText("Restart", this.canvas.width / 2, y + height / 2);
        };

        drawButton();

        // Hover-Logik mit sanftem Übergang
        const handleMouseMove = (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            const width = baseWidth * currentScale;
            const height = baseHeight * currentScale;
            const x = this.canvas.width / 2 - width / 2;

            const inside =
                mouseX >= x &&
                mouseX <= x + width &&
                mouseY >= y &&
                mouseY <= y + height;

            if (inside && !hovered) {
                hovered = true;
                animateScale(growScale);
            } else if (!inside && hovered) {
                hovered = false;
                animateScale(1);
            }
        };

        // Sanftes Skalieren beim Hover
        const animateScale = (target) => {
            const step = 0.05;
            const animate = () => {
                if (Math.abs(currentScale - target) > 0.01) {
                    currentScale += (target - currentScale) * step;
                    drawButton();
                    requestAnimationFrame(animate);
                } else {
                    currentScale = target;
                    drawButton();
                }
            };
            requestAnimationFrame(animate);
        };

        // Klick → Seite neu laden
        const handleClick = (event) => {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
            const width = baseWidth * currentScale;
            const height = baseHeight * currentScale;
            const x = this.canvas.width / 2 - width / 2;

            if (
                mouseX >= x &&
                mouseX <= x + width &&
                mouseY >= y &&
                mouseY <= y + height
            ) {
                window.location.reload();
            }
        };

        // Event Listener
        this.canvas.addEventListener("mousemove", handleMouseMove);
        this.canvas.addEventListener("click", handleClick, { once: true });
    }




}
