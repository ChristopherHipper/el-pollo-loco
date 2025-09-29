let canvas;
let world;
let keyboard = new Keyboard();

function startGame() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    document.getElementById('start-Screen').classList.toggle('d-none');
    document.getElementById('game-ui').classList.toggle('d-none');
}

window.addEventListener('keydown', (e) => {
    keyboard.keyPres(e.code)
})

window.addEventListener('keyup', (e) => {
    keyboard.keyLeave(e.code)
})

function toggleControl() {
    document.getElementById('start-Screen').classList.toggle('d-none');
    document.getElementById('settings-screen').classList.toggle('d-none');
}





