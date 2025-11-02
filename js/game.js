let canvas;
let world;
let keyboard = new Keyboard();

// Startscreen Button
window.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const startScreen = document.getElementById('startscreen');

    startButton.addEventListener('click', () => {
        // Startscreen ausblenden
        startScreen.style.display = 'none';

        // Init Game starten
        init();

        initTouchControls(); // Touch-Steuerung aktiv!
    });
});


// Touch Controls aktivieren nach Spielstart
function initTouchControls() {
    const kb = keyboard;

    const bindBtn = (id, prop, onPress) => {
        const btn = document.getElementById(id);
        btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            kb[prop] = true;
            if (onPress) onPress();
        });
        btn.addEventListener('touchend', (e) => {
            e.preventDefault();
            kb[prop] = false;
        });
    };

    bindBtn('btn-left', 'LEFT');
    bindBtn('btn-right', 'RIGHT');
    bindBtn('btn-jump', 'UP');
    bindBtn('btn-throw', 'D', () => {
        if (world && world.statusBarBottles.percentage > 0) {
            world.throwBottle();
        }
    });
}





function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);

    console.log('My Character is', world.character);

}






window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
        if (world && world.statusBarBottles.percentage > 0) { // um Timingproblem beim Druck auf D zu vermeiden
            world.throwBottle();
        }
    }

    // console.log(e.key);   

});

window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }

});
