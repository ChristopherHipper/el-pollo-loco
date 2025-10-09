let canvas;
let world;
let keyboard = new Keyboard();

window.addEventListener('keydown', (e) => {
    keyboard.keyPres(e.code);
});

window.addEventListener('keyup', (e) => {
    keyboard.keyLeave(e.code);
});

function startGame() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    document.getElementById('start-Screen').classList.toggle('d-none');
    document.getElementById('game-ui').classList.toggle('d-none');
};


function toggleSettings() {
    document.getElementById('start-Screen').classList.toggle('d-none');
    document.getElementById('settings-screen').classList.toggle('d-none');
};

function toggleSound() {
    const soundImg = document.getElementById('mute').src;
    if (soundImg.indexOf('unmute.png') != -1) {
        document.getElementById('mute').src = "./assets/img/mute.png";
    } else {
        document.getElementById('mute').src = "./assets/img/unmute.png";
    };
};

function toggleFullscreen() {
    const screenImg = document.getElementById('fullscreen').src;
    const canvas = document.getElementById('game-content');
    if (screenImg.indexOf('fullscreen.png') != -1) {
        canvas.requestFullscreen();
        canvas.style.borderRadius = '0px';
        document.getElementById('fullscreen').src = "./assets/img/closeFullscreen.png";
    } else {
        document.getElementById('fullscreen').src = "./assets/img/fullscreen.png";
        document.exitFullscreen();
    };
};

function newGame() {
    world = null;
    console.log('--- NEW GAME START ---');
    if (world) {
        console.log('Old world exists -> stopping', world.id);
    } else {
        console.log('No world to stop');
    }
    level1 = null;
    
    document.getElementById('game-over-screen').classList.add('d-none');
    resetGame();
    setLevel();
    canvas = document.getElementById('canvas');
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    world = new World(canvas, keyboard);
};

function resetGame() {
    coins = [new Coin(), new Coin(), new Coin(), new Coin(), new Coin(),];
    bottles = [new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle(),];
    enemies = [new Chicken(), new Chicken(), new Chicken(), new SmallChicken(), new SmallChicken(), new SmallChicken(),];
}





