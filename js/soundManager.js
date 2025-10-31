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

/**
 * Saves the current mute state of the game to localStorage.
 * 
 * Stores the `isMuted` boolean as a JSON string so it can be
 * retrieved later to maintain audio settings across sessions.
 */
function safeToLocalStorage() {
    localStorage.setItem('isMuted', JSON.stringify(isMuted));
};

/**
 * Retrieves the game's mute state from localStorage.
 * 
 * Parses the stored JSON value of `isMuted` and applies it
 * to the game's current audio settings.
 */
function getSoundSettingsFromLocalStorage() {
    isMuted = JSON.parse(localStorage.getItem('isMuted'));
};

/**
 * Plays the main background music of the game.
 */
function playGameSound() {
    const bgm = gameBGMusic.gameBGM;
    if (bgm.paused) {
        setTimeout(() => {
            bgm.play().catch(err => {
                console.warn('Fehler beim Abspielen der Hintergrundmusik:', err);
            });
        }, 1000);
    }
};

/**
 * Toggles the game's sound on or off.
 * 
 * - Switches the `isMuted` state between 'true' and 'false'.
 * - Updates the mute/unmute button image accordingly.
 * - Applies the new sound settings and saves the state to localStorage.
 */
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

/**
 * Initializes the game's sound state based on the current `isMuted` value.
 * 
 * Ensures `isMuted` is set to 'false' if it is null or explicitly 'false',
 * otherwise sets it to 'true'.
 */
function getSound() {
    if (isMuted == 'false' || isMuted == null) {
        isMuted = 'false';
    } else {
        isMuted = 'true';
    };
};

/**
 * Applies the current sound settings based on the `isMuted` state.
 * 
 * - If `isMuted` is 'true', mutes all game sounds.
 * - If `isMuted` is 'false', plays or resumes all game sounds.
 */
function handleSoundSettings() {
    if (isMuted == 'true') {
        muteSounds();
    } else {
        playSounds();
    };
};

/**
 * Mutes all game audio.
 * 
 * Sets the volume of all background music tracks and sound effects
 * to 0 to silence the game.
 */
function muteSounds() {
    for (const sound in gameBGMusic) {
        gameBGMusic[sound].volume = 0;
    };
    for (const effect in soundEffects) {
        soundEffects[effect].volume = 0;
    };
};

/**
 * Sets the volume of all game audio to normal levels.
 * 
 * Restores the volume of all background music tracks and sound effects
 * to 0.3 to enable sound playback.
 */
function playSounds() {
    for (const sound in gameBGMusic) {
        gameBGMusic[sound].volume = 0.3;
    };
    for (const effect in soundEffects) {
        soundEffects[effect].volume = 0.3;
    };
};

/**
 * Stops all game audio and resets playback to the beginning.
 * 
 * Pauses all background music tracks and sound effects,
 * and sets their current playback time to 0.
 */
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

/**
 * Updates the mute/unmute button image based on the current sound state.
 * 
 * - If `isMuted` is 'true', shows the mute icon.
 * - If `isMuted` is 'false', shows the unmute icon.
 */
function handleSoundUIElement() {
    if (isMuted == 'true') {
        document.getElementById('mute').src = "./assets/img/mute.png";
    } else if (isMuted === 'false') {
        document.getElementById('mute').src = "./assets/img/unmute.png";
    };
};