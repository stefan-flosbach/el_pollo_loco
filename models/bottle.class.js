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
