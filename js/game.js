let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    getSoundSettingsFromLocalStorage();
    getSound();
    toggleLandscapeOverlay();
    setLevel();
};

window.addEventListener('keydown', (e) => {
    keyboard.keyPres(e.code);
});

function mobileTouchStart(key) {
    keyboard.keyPres(key);
};

function mobileTouchEnd(key) {
    keyboard.keyLeave(key);
};

window.addEventListener('keyup', (e) => {
    keyboard.keyLeave(e.code);
});

function isMobile() {
    return navigator.maxTouchPoints > 0;
};

function toggleLandscapeOverlay() {
    let landscapeVideo = document.getElementById('landscape');
    if (isMobile() && screen.orientation.type.includes('landscape') || !isMobile() && window.innerWidth > 720) {
        landscapeVideo.classList.add('d-none');
        landscapeVideo.pause();
        landscapeVideo.currentTime = 0;
    } else {
        landscapeVideo.classList.remove('d-none');
        landscapeVideo.play();
    };
};

function handleUIKeys() {
    let mobileUI = document.getElementById('game-ui');
    let mobileKeys = document.getElementById('game-ui-mobile');
    if (isMobile()) {
        mobileUI.style.top = '40px'
        mobileKeys.classList.remove('d-none');
    } else {
        mobileKeys.classList.add('d-none');
        mobileUI.style.bottom = '15px';
    };
    handleSoundUIElement();
};

function startGame() {
    handleUIKeys();
    handleSoundSettings();
    playGameSound();
    if (world) {
        resetGame();
    } else {
        canvas = document.getElementById('canvas');
        world = new World(canvas, keyboard);
    };
    document.getElementById('start-Screen').classList.toggle('d-none');
    document.getElementById('game-ui').classList.toggle('d-none');
};

function toggleSettings() {
    document.getElementById('start-Screen').classList.toggle('d-none');
    document.getElementById('settings-screen').classList.toggle('d-none');
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

function backToHome() {
    resetSounds();
    document.getElementById('game-over-screen').classList.add('d-none');
    document.getElementById('win-screen').classList.add('d-none');
    document.getElementById('start-Screen').classList.remove('d-none');
    document.getElementById('game-ui').classList.add('d-none');
    document.getElementById('pause-screen').classList.add('d-none');
};

function newGame() {
    resetGame();
    resetSounds();
    handleSoundSettings();
    playGameSound();
    handleUIKeys();
    document.getElementById('game-over-screen').classList.add('d-none');
    document.getElementById('win-screen').classList.add('d-none');
};

function resetGame() {
    resetLevel();
    resetWorld();
};

function continueGame() {
    document.getElementById('pause-screen').classList.add('d-none');
    world.gameRunning = true;
    world.loop();
};

function resetWorld() {
    world.gameRunning = true;
    world.camera_x = 100;
    world.gameLoop = 0;
    world.character = new Character();
    world.setWorld();
    world.loop();
};

function pauseGame() {
    cancelAnimationFrame(world.gameLoop);
    world.gameRunning = false;
    resetSounds();
    document.getElementById('pause-screen').classList.remove('d-none');
};




