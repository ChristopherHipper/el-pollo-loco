let canvas;
let world;
let keyboard = new Keyboard();

window.addEventListener('keydown', (e) => {
    keyboard.keyPres(e.code)
})

window.addEventListener('keyup', (e) => {
    keyboard.keyLeave(e.code)
})

function startGame() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    document.getElementById('start-Screen').classList.toggle('d-none');
    document.getElementById('game-ui').classList.toggle('d-none');
}


function toggleSettings() {
    document.getElementById('start-Screen').classList.toggle('d-none');
    document.getElementById('settings-screen').classList.toggle('d-none');
}

function toggleSound() {
    const soundImg = document.getElementById('mute').src;
    if (soundImg.indexOf('unmute.png') != -1) {
        document.getElementById('mute').src = "./assets/img/mute.png"
    } else {
        document.getElementById('mute').src = "./assets/img/unmute.png"
    }
}

function toggleFullscreen() {
    const screenImg = document.getElementById('fullscreen').src;
    const canvas = document.getElementById('canvas')
    if (screenImg.indexOf('fullscreen.png') != -1) {
        canvas.webkitRequestFullScreen()
        canvas.style.borderRadius = '0px';
        document.getElementById('fullscreen').src = "./assets/img/closeFullscreen.png"
    } else {
        document.getElementById('fullscreen').src = "./assets/img/fullscreen.png"
        canvas.mozRequestFullScreen()
    }
}





