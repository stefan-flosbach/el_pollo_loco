class Endboss extends MovableObject {

    groundY = 50;

    height = 400;
    width = 300;
    y = this.groundY;

    hitCount = 0;
    isDead = false;

    offset = {
        top: 100,
        right: 60,
        bottom: 35,
        left: 55
    }

    IMAGES_WALKING = [
        '../img/4_enemie_boss_chicken/1_walk/G1.png',
        '../img/4_enemie_boss_chicken/1_walk/G2.png',
        '../img/4_enemie_boss_chicken/1_walk/G3.png',
        '../img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        '../img/4_enemie_boss_chicken/2_alert/G5.png',
        '../img/4_enemie_boss_chicken/2_alert/G6.png',
        '../img/4_enemie_boss_chicken/2_alert/G7.png',
        '../img/4_enemie_boss_chicken/2_alert/G8.png',
        '../img/4_enemie_boss_chicken/2_alert/G9.png',
        '../img/4_enemie_boss_chicken/2_alert/G10.png',
        '../img/4_enemie_boss_chicken/2_alert/G11.png',
        '../img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        '../img/4_enemie_boss_chicken/3_attack/G13.png',
        '../img/4_enemie_boss_chicken/3_attack/G14.png',
        '../img/4_enemie_boss_chicken/3_attack/G15.png',
        '../img/4_enemie_boss_chicken/3_attack/G16.png',
        '../img/4_enemie_boss_chicken/3_attack/G17.png',
        '../img/4_enemie_boss_chicken/3_attack/G18.png',
        '../img/4_enemie_boss_chicken/3_attack/G19.png',
        '../img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        '../img/4_enemie_boss_chicken/4_hurt/G21.png',
        '../img/4_enemie_boss_chicken/4_hurt/G22.png',
        '../img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        '../img/4_enemie_boss_chicken/5_dead/G24.png',
        '../img/4_enemie_boss_chicken/5_dead/G25.png',
        '../img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    constructor() {
        super();
        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 2500;
        this.speed = 0.5;
        this.applyGravity();
        this.animate();

    }

    animate() {
        // Animationen wechseln
        setInterval(() => {
            if (!gameStarted) return;
            if (this.isDead) {
                this.img = this.imageCache[this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]];
            } else if (this.hitCount > 0 && this.hitCount < 5) {
                this.playAnimation(this.IMAGES_HURT);
            } else {
                const distance = this.world ? this.x - this.world.character.x : 9999;

                if (distance < 320) {
                    this.playAnimation(this.IMAGES_ATTACK);
                } else if (distance < 370) {
                    this.playAnimation(this.IMAGES_ALERT);
                } else {
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 150);

        // Bewegungslogik bleibt, wie du sie hattest
        setInterval(() => {
            if (!gameStarted) return;
            if (!this.world || this.isDead) return;

            const character = this.world.character;
            const distance = this.x - character.x;

            this.moveLeft();

            if (distance < 280 && distance > 0 && this.y >= this.groundY) {
                this.speed = 5;
                this.jump();
            }

            if (distance <= 0) {
                this.speed = 0.5;
            }
        }, 1000 / 60);
    }




    jump() {
        this.speedY = 40;
    }

    hitByBottle() {
        if (this.isDead) return;

        this.hitCount++;
        this.playAnimation(this.IMAGES_HURT);
        this.x += 20;

        if (this.hitCount >= 5) {
            this.die();
        }
    }

    die() {
        this.isDead = true;
        this.speed = 0;
        this.energy = 0;

        // Boss fällt langsam zu Boden
        let fallInterval = setInterval(() => {
            if (this.y < 400) {
                this.y += 5;
            } else {
                clearInterval(fallInterval);
            }
        }, 50);
    }


}