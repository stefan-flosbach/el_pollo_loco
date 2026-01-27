class Cloud extends MovableObject {
    y = 20;
    height = 250;
    width = 500;
   
/*
    constructor() {
        super();
        this.loadImage('../img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 500;
        this.animate();
    }

    animate() {
    this.moveLeft();
    }
*/


    constructor() {
        super();

        const images = [
            '../img/5_background/layers/4_clouds/1.png',
            '../img/5_background/layers/4_clouds/2.png'
        ];

        // Zufällig eines auswählen
        const randomImage = images[Math.floor(Math.random() * images.length)];

        // Bild laden
        this.loadImage(randomImage);

        // Zufällige Startposition
        this.x = Math.random() * 3000;
        this.y = 10 + Math.random() * 110;

        this.speed = 0.01;

        // Bewegung starten
        this.animate();
    }

    animate() {
        setInterval(() => {
            if (!gameStarted) return;
            this.moveLeft();

            // Wenn Wolke ganz links raus ist, wieder rechts einsetzen
            if (this.x < -this.width) {
                this.x = 2000 + Math.random() * 500;
            }
        }, 1000 / 60);
    }

}

