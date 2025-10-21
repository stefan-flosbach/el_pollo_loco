const level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss()
    ],

    [
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud()
    ],

    [
        new BackgroundObject('../img/5_background/layers/air.png', -720),
        new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', -720),
        new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', -720),
        new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', -720),
        new BackgroundObject('../img/5_background/layers/air.png', 0),
        new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 0),
        new BackgroundObject('../img/5_background/layers/air.png', 720),
        new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', 720),
        new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', 720),
        new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', 720),
        new BackgroundObject('../img/5_background/layers/air.png', 720 * 2),
        new BackgroundObject('../img/5_background/layers/3_third_layer/1.png', 720 * 2),
        new BackgroundObject('../img/5_background/layers/2_second_layer/1.png', 720 * 2),
        new BackgroundObject('../img/5_background/layers/1_first_layer/1.png', 720 * 2),
        new BackgroundObject('../img/5_background/layers/air.png', 720 * 3),
        new BackgroundObject('../img/5_background/layers/3_third_layer/2.png', 720 * 3),
        new BackgroundObject('../img/5_background/layers/2_second_layer/2.png', 720 * 3),
        new BackgroundObject('../img/5_background/layers/1_first_layer/2.png', 720 * 3)
    ],

    [
        new Bottle(400),
        new Bottle(700),
        new Bottle(800),
        new Bottle(900),
        new Bottle(1100),
        new Bottle(1400),
        new Bottle(1500),
        new Bottle(1700),
        new Bottle(2000),
        new Bottle(2050)
    ],

    [
        new Coin(500),
        new Coin(900),
        new Coin(1000),
        new Coin(1100),
        new Coin(1600),
        new Coin(1650),
        new Coin(1800),
        new Coin(2140),
        new Coin(2150),
        new Coin(2160)
    ]
);