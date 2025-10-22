class Endboss extends MovableObject {

groundY = 50;

    height = 400;
    width = 300;
    y = this.groundY;

    offset = {
        top: 100,
        right: 60,
        bottom: 35,
        left: 55
    }

    IMAGES_WALKING = [
        '../img/4_enemie_boss_chicken/2_alert/G5.png',
        '../img/4_enemie_boss_chicken/2_alert/G6.png',
        '../img/4_enemie_boss_chicken/2_alert/G7.png',
        '../img/4_enemie_boss_chicken/2_alert/G8.png',
        '../img/4_enemie_boss_chicken/2_alert/G9.png',
        '../img/4_enemie_boss_chicken/2_alert/G10.png',
        '../img/4_enemie_boss_chicken/2_alert/G11.png',
        '../img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 2500;
        this.speed = 0.5;
        this.applyGravity();
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 300);

        setInterval(() => {
            if (!this.world) return;

            const character = this.world.character;
            const distance = this.x - character.x;

            this.moveLeft();

            // Direkt die Bodenhöhe prüfen (y = 50 ist Boden für Endboss)
            if (distance < 300 && distance > 0 && this.y >= this.groundY) {
                this.speed = 5;
                this.jump();
            } 

            if (distance < - 0) {
                this.speed = 0.5;
            }

        }, 1000 / 60);
    }

    jump() {
        this.speedY = 40;
    }
}