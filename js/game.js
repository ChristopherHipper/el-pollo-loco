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
    resetLevel();
    setLevel();
    document.getElementById('game-over-screen').classList.add('d-none');
};


function resetLevel() {
    coins = [new Coin(), new Coin(), new Coin(), new Coin(), new Coin(),];
    bottles = [new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle(),];
    enemies = [new Chicken(), new Chicken(), new Chicken(), new SmallChicken(), new SmallChicken(), new SmallChicken(),];
    world.level.endboss.health = 100;
    world.level.endboss.isAlive = true;
    world.level.endboss.x = 3000;
    world.level.endboss.y = 60;
    world.level.endboss.activeBar = false;
    world.character.health = 100;
    world.character.isAlive = true;
    world.character.lastMove = 0;
    world.character.x = 0;
    world.character.y = 230;
    world.character.coins = 0;
    world.character.bottles = 0;
    world.level.coinbar.updateCoinBar(coins, null, 0);
    world.level.bottlebar.updateBottleBar(0);
    world.isRunning = true;
    world.camera_x = 100;
    world.gameLoop = 0;
    world.gameLoop = requestAnimationFrame(() => world.loop());
}





