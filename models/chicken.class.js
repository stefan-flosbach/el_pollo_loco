class Chicken extends MovableObject {
    y = 360;
    height = 70;
    width = 70;

    isDead = false; // Neues Flag
    deadSince = 0;  // Zeitpunkt des Todes

    offset = {
        top: 15,
        right: 15,
        bottom: 15,
        left: 15
    }

    IMAGES_WALKING = [
        '../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGES_DEAD = [
        '../img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 200 + Math.random() * 500;
        this.speed = 0.15 + Math.random() * 0.25;

        this.animate();
    }

    animate() {
        // Bewegung
        setInterval(() => {
            if (!gameStarted) return;
            if (!this.isDead) {
                this.moveLeft();
            }
        }, 1000 / 60);

        // Animationen
        setInterval(() => {
            if (!gameStarted) return;
            if (this.isDead) {
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 200);
    }

    /**
     * Wird aufgerufen, wenn Pepe auf das Chicken springt
     */
    die() {
        if (this.isDead) return;

        this.isDead = true;
        this.speed = 0;
        this.deadSince = Date.now();
        this.playAnimation(this.IMAGES_DEAD);
    }

    /**
     * Optional: Nach einer Weile entfernen (z. B. 5 Sekunden)
     */
    shouldBeRemoved() {
        return this.isDead && Date.now() - this.deadSince > 5000;
    }
}
