let canvas;
let world;
let keyboard = new Keyboard();

/**
 * Initializes the game environment when the page loads.
 * 
 * - Sets up the landscape overlay.
 * - Retrieves sound settings from localStorage and applies them.
 * - Initializes the sound state.
 * - Sets up the first game level.
 */
function init() {
    initLandscapeOverlay();
    getSoundSettingsFromLocalStorage();
    getSound();
    setLevel();
};

/**
 * Listens for keydown events and updates the keyboard input state.
 * 
 * Calls `keyPres` on the `keyboard` object with the pressed key code
 * whenever a key is pressed.
 */
window.addEventListener('keydown', (e) => {
    keyboard.keyPres(e.code);
});

/**
 * Handles touch start events for mobile controls.
 * 
 * Prevents the default touch behavior and updates the keyboard state
 * by simulating a key press corresponding to the given key.
 *
 * @param {string} key - The key to simulate as pressed.
 * @param {TouchEvent} e - The touch event object.
 */
function mobileTouchStart(key, e) {
    e.preventDefault();
    keyboard.keyPres(key);
};

/**
 * Handles touch end events for mobile controls.
 * 
 * Prevents the default touch behavior and updates the keyboard state
 * by simulating a key release corresponding to the given key.
 *
 * @param {string} key - The key to simulate as released.
 * @param {TouchEvent} e - The touch event object.
 */
function mobileTouchEnd(key, e) {
    e.preventDefault();
    keyboard.keyLeave(key);
};

/**
 * Listens for keyup events and updates the keyboard input state.
 * 
 * Calls `keyLeave` on the `keyboard` object with the released key code
 * whenever a key is released.
 */
window.addEventListener('keyup', (e) => {
    keyboard.keyLeave(e.code);
});

/**
 * Determines if the current device supports touch input (i.e., is a mobile device).
 * 
 * @returns {boolean} True if the device has touch capabilities, false otherwise.
 */
function isMobile() {
    return navigator.maxTouchPoints > 0;
};

/**
 * Stops a landscape video and hides it from view.
 * 
 * - Adds the 'd-none' class to hide the video element.
 * - Pauses video playback and resets it to the beginning.
 *
 * @param {HTMLVideoElement} landscapeVideo - The video element to stop.
 */
function stopLandScapeVideo(landscapeVideo) {
    landscapeVideo.classList.add('d-none');
    landscapeVideo.pause();
    landscapeVideo.currentTime = 0;
};

/**
 * Plays a landscape video and makes it visible.
 * 
 * - Removes the 'd-none' class to show the video element.
 * - Starts video playback.
 *
 * @param {HTMLVideoElement} landscapeVideo - The video element to play.
 */
function playLandScapeVideo(landscapeVideo) {
    landscapeVideo.classList.remove('d-none');
    landscapeVideo.play();
};

/**
 * Initializes the landscape orientation overlay for the game.
 * 
 * - Retrieves the landscape video element.
 * - Checks if the device is mobile and the screen orientation.
 * - Plays the video overlay if the device is mobile in portrait mode
 *   or the screen width is small; otherwise, stops/hides the overlay.
 */
function initLandscapeOverlay() {
    const landscapeVideo = document.getElementById('landscape');
    const mobile = isMobile();
    const landscapeOrientation = screen.orientation.type.includes('landscape');
    if (mobile && landscapeOrientation || !mobile && window.innerWidth > 720) {
        stopLandScapeVideo(landscapeVideo);
    } else {
        playLandScapeVideo(landscapeVideo);
    };
};

/**
 * Returns a promise that resolves after a specified delay.
 *
 * @param {number} ms - The delay duration in milliseconds.
 * @returns {Promise<void>} A promise that resolves after the delay.
 */
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Toggles the landscape overlay based on device type and screen orientation.
 * 
 * - Waits briefly (100ms) to ensure accurate orientation detection.
 * - On mobile devices in portrait mode or small screens on non-mobile devices,
 *   shows the landscape overlay and pauses the game.
 * - Otherwise, hides the overlay and initializes the mobile UI.
 */
async function toggleLandscapeOverlay() {
    const landscapeVideo = document.getElementById('landscape');
    const mobile = isMobile();
    const landscapeOrientation = screen.orientation.type.includes('landscape')
    await delay(100);
    if (mobile && !landscapeOrientation || !mobile && window.innerWidth < 720) {
        playLandScapeVideo(landscapeVideo);
        pauseGame();
    } else {
        stopLandScapeVideo(landscapeVideo)
        initMobileUI();
    };
};

/**
 * Initializes the mobile UI controls based on device type and game state.
 * 
 * - Hides the mobile controls if the game is not running or the world is not initialized.
 * - Shows the mobile controls if the device is mobile and the game is running.
 * - Hides the controls for non-mobile devices.
 */
function initMobileUI() {
    const mobileUI = document.getElementById('mobile-controls');
    if (!world || world && !world.gameRunning) {
        mobileUI.classList.add('d-none');
    } else if (isMobile()) {
        mobileUI.classList.remove('d-none');
    } else {
        mobileUI.classList.add('d-none');
    };
};

/**
 * Adjusts the game UI and mobile controls based on device type.
 * 
 * - On mobile devices: positions the game UI at the top and shows mobile controls.
 * - On non-mobile devices: hides mobile controls and positions the UI at the bottom.
 * - Updates the sound button icon based on the current sound state.
 */
function handleUIKeys() {
    const mobileUI = document.getElementById('game-ui');
    const mobileKeys = document.getElementById('mobile-controls');
    if (isMobile()) {
        mobileUI.style.top = '40px';
        mobileKeys.classList.remove('d-none');
    } else {
        mobileKeys.classList.add('d-none');
        mobileUI.style.bottom = '15px';
    };
    handleSoundUIElement();
};

/**
 * Starts the game by initializing UI, sounds, and the game world.
 * 
 * - Adjusts the UI for the current device and applies sound settings.
 * - Plays the main game background music.
 * - If a world already exists, resets the game; otherwise, creates a new World instance.
 * - Toggles visibility of the start screen and the game UI.
 */
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

/**
 * Toggles the visibility of the start screen and settings screen.
 * 
 */
function toggleSettings() {
    document.getElementById('start-Screen').classList.toggle('d-none');
    document.getElementById('settings-screen').classList.toggle('d-none');
};

/**
 * Toggles fullscreen mode for the game canvas.
 * 
 * - If not in fullscreen, requests fullscreen for the canvas, removes border radius,
 *   and updates the fullscreen button icon to "close fullscreen".
 * - If already in fullscreen, exits fullscreen and updates the icon back to "fullscreen".
 */
function toggleFullscreen() {
    const screenImg = document.getElementById('fullscreen').src;
    const canvas = document.getElementById('game-content');
    if (screenImg.indexOf('fullscreen.png') != -1) {
        canvas.requestFullscreen();
        canvas.style.borderRadius = '0px';
        document.getElementById('fullscreen').src = "./assets/img/closeFullscreen.png";
    } else if (screenImg.indexOf('closeFullscreen.png') != -1 || document.fullscreenElement) {
        document.getElementById('fullscreen').src = "./assets/img/fullscreen.png";
        document.exitFullscreen();
    };
};

/**
 * Updates the fullscreen button icon when the fullscreen state changes.
 * 
 * - Listens for the `fullscreenchange` event on the document.
 */
document.addEventListener('fullscreenchange', () => {
    if (document.fullscreenElement) {
        document.getElementById('fullscreen').src = "./assets/img/closeFullscreen.png";
    } else {
        document.getElementById('fullscreen').src = "./assets/img/fullscreen.png";
    };
});

/**
 * Returns the player to the home/start screen from any game state.
 * 
 * - Stops and resets all game sounds.
 * - Hides the game over, win, and pause screens.
 * - Shows the start screen and hides the game UI.
 */
function backToHome() {
    resetSounds();
    document.getElementById('game-over-screen').classList.add('d-none');
    document.getElementById('win-screen').classList.add('d-none');
    document.getElementById('start-Screen').classList.remove('d-none');
    document.getElementById('game-ui').classList.add('d-none');
    document.getElementById('pause-screen').classList.add('d-none');
};

/**
 * Starts a new game by resetting game state, sounds, and UI.
 * 
 * - Resets the game world and all sounds.
 * - Applies sound settings and plays the main game music.
 * - Updates the UI for the current device.
 * - Hides the game over and win screens.
 */
function newGame() {
    resetGame();
    resetSounds();
    handleSoundSettings();
    playGameSound();
    handleUIKeys();
    document.getElementById('game-over-screen').classList.add('d-none');
    document.getElementById('win-screen').classList.add('d-none');
};

/**
 * Resets the entire game state to start fresh.
 * 
 * - Resets the current level, including enemies, items, and backgrounds.
 * - Resets the world instance and associated game properties.
 */
function resetGame() {
    resetLevel();
    resetWorld();
};

/**
 * Continues the game from a paused state.
 * 
 * - Hides the pause screen.
 * - Shows mobile controls if the device is mobile.
 * - Sets the game's running state to true and resumes the game loop.
 */
function continueGame() {
    document.getElementById('pause-screen').classList.add('d-none');
    isMobile() ? document.getElementById('mobile-controls').classList.remove('d-none') : 'default';
    world.gameRunning = true;
    world.loop();
};

/**
 * Resets the world state to restart the game environment.
 * 
 * - Sets the game as running, resets the camera position and game loop.
 * - Re-initializes the main character.
 * - Re-links the world to the character and Endboss.
 * - Starts the game loop.
 */
function resetWorld() {
    world.gameRunning = true;
    world.camera_x = 100;
    world.gameLoop = 0;
    world.character = new Character();
    world.setWorld();
    world.loop();
};

/**
 * Pauses the game if and World exists or it is currently running.
 * 
 * - Stops the game loop using.
 * - Sets the game running flag to false.
 * - Resets all game sounds.
 * - Shows the pause screen and hides mobile controls.
 */
function pauseGame() {
    if (!world || !world.gameRunning) return;
    cancelAnimationFrame(world.gameLoop);
    world.gameRunning = false;
    resetSounds();
    document.getElementById('pause-screen').classList.remove('d-none');
    document.getElementById('mobile-controls').classList.add('d-none');
};

/**
 * Toggles the visibility of the impressum (legal notice) screen.
 * 
 * - Resets the scroll position of the impressum content to the top.
 * - Toggles between showing the start screen and the impressum screen.
 */
function toggleImpressum() {
    document.getElementById('impressum-content').scrollTop = 0;
    document.getElementById('start-Screen').classList.toggle('d-none');
    document.getElementById('impressum').classList.toggle('d-none');
};




