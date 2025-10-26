let isMuted = false;
const gameBGMusic = {
    gameBGM: new Audio('assets/audio/game-bgm.mp3'),
    bossfightBGM: new Audio('assets/audio/boss-fight-bgm.wav'),
    winBGM: new Audio('assets/audio/win-bgm.mp3'),
    loseBGM: new Audio('assets/audio/lose-bgm.mp3'),
};

const soundEffects = {
    jump: new Audio('assets/audio/jump.wav'),
    landing: new Audio('assets/audio/landing.wav'),
    run: new Audio('assets/audio/run-gravel.wav'),
    hurt: new Audio('assets/audio/hurt.wav'),
    dying: new Audio('assets/audio/dying.wav'),
    collect: new Audio('assets/audio/collect.wav'),
    splash: new Audio('assets/audio/splash.wav'),
    snoring: new Audio('assets/audio/snoring.wav'),
    normalChicken: new Audio('assets/audio/normal-chicken-dying.wav'),
    smallChicken: new Audio('assets/audio/small-chicken-dying.wav'),
    endbossHurt: new Audio('assets/audio/endboss-hurt.wav'),
};

function safeToLocalStorage() {
    localStorage.setItem('isMuted', JSON.stringify(isMuted));
};

function getSoundSettingsFromLocalStorage() {
    isMuted = JSON.parse(localStorage.getItem('isMuted'));
};

function playGameSound() {
    gameBGMusic.gameBGM.play();
};

function toggleSound() {
    isMuted === 'true' ? isMuted = 'false' : isMuted = 'true';
    if (isMuted === 'true') {
        document.getElementById('mute').src = "./assets/img/mute.png";
    } else if (isMuted === 'false') {
        document.getElementById('mute').src = "./assets/img/unmute.png";
    };
    handleSoundSettings();
    safeToLocalStorage();
};

function getSound() {
    if (isMuted == 'false' || isMuted == null) {
        isMuted = 'false';
    } else {
        isMuted = 'true';
    };
};

function handleSoundSettings() {
    if (isMuted == 'true') {
        muteSounds();
    } else {
        playSounds();
    };
};

function muteSounds() {
    for (const sound in gameBGMusic) {
        gameBGMusic[sound].volume = 0;
    };
    for (const effect in soundEffects) {
        soundEffects[effect].volume = 0;
    };
};

function playSounds() {
    for (const sound in gameBGMusic) {
        gameBGMusic[sound].volume = 0.3;
    };
    for (const effect in soundEffects) {
        soundEffects[effect].volume = 0.3;
    };
};

function resetSounds() {
    for (const sound in gameBGMusic) {
        gameBGMusic[sound].pause();
        gameBGMusic[sound].currentTime = 0;
    };
    for (const effect in soundEffects) {
        soundEffects[effect].pause();
        soundEffects[effect].currentTime = 0;
    };
};

function handleSoundUIElement() {
    if (isMuted == 'true') {
        document.getElementById('mute').src = "./assets/img/mute.png";
    } else if (isMuted === 'false') {
        document.getElementById('mute').src = "./assets/img/unmute.png";
    };
};