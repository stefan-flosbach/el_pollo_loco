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
        new Bottle(300),
        new Bottle(600),
        new Bottle(900),
        new Bottle(1200),
        new Bottle(1500),
        new Bottle(1700),
        new Bottle(1900),
        new Bottle(2100),
        new Bottle(2300),
        new Bottle(2500)
    ]
);