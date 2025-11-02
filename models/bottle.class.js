class Bottle extends MovableObject {
    width = 60;
    height = 60;
    y = 360;

    offset = {
        top: 10,
        right: 15,
        bottom: 5,
        left: 25
    }

    IMAGES_BOTTLE_ROTATION = [
        '../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_BOTTLE_SPLASH = [
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    constructor(x) {
        // super().loadImage('../img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        super();
        // zufällig 1 oder 2 wählen
        const random = Math.random() < 0.5 ? 1 : 2;
        const imagePath = `../img/6_salsa_bottle/${random}_salsa_bottle_on_ground.png`;

        this.loadImage(imagePath);
        this.x = x;
    }
}
