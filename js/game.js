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
    resetGame();
    document.getElementById('game-over-screen').classList.add('d-none');
    world.gameLoop = requestAnimationFrame(() => world.loop());
};


function resetGame() {
    resetLevel();
    resetWorld();
};

function resetWorld() {
    world.camera_x = 100;
    world.gameLoop = 0;
    world.character = new Character();
    world.setWorld();
};

function resetLevel() {
    coins = [new Coin(), new Coin(), new Coin(), new Coin(), new Coin(),];
    bottles = [new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle(),];
    enemies = [new Chicken(), new Chicken(), new Chicken(), new SmallChicken(), new SmallChicken(), new SmallChicken(),];
    world.level = new Level(
        enemies,
        [
            new Cloud('../assets/img/5_background/layers/4_clouds/1.png', 0),
            new Cloud('../assets/img/5_background/layers/4_clouds/2.png', 720),
        ],
        [
            new Background('../assets/img/5_background/layers/air.png', 0),
            new Background('../assets/img/5_background/layers/3_third_layer/1.png', 0),
            new Background('../assets/img/5_background/layers/2_second_layer/1.png', 0),
            new Background('../assets/img/5_background/layers/1_first_layer/1.png', 0),
            new Background('../assets/img/5_background/layers/air.png', 720),
            new Background('../assets/img/5_background/layers/3_third_layer/2.png', 720),
            new Background('../assets/img/5_background/layers/2_second_layer/2.png', 720),
            new Background('../assets/img/5_background/layers/1_first_layer/2.png', 720),
        ],
        coins,
        bottles,
        new Endboss(),
        new HealthbarCharacter(),
        new CoinbarCharacter(),
        new BottlebarCharacter(),
        new HealthbarEndboss(),
    );
};





