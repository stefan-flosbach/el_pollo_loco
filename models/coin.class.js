class Coin extends MovableObject {
    width = 60;
    height = 60;
    y = 375;

    constructor(x) {
        super();

        const random = Math.random() < 0.5 ? 1 : 2;
        const imagePath = `../img/8_coin/coin_${random}.png`;

        this.loadImage(imagePath);
        this.x = x;
    }
}
