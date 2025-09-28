let canvas;
let world;
let keyboard = new Keyboard();

function startGame() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    document.getElementById('startScreen').classList.toggle('d-none');
    document.getElementById('sound-size-button').classList.toggle('d-none');
}

window.addEventListener('keydown', (e) => {
    keyboard.keyPres(e.code)
})

window.addEventListener('keyup', (e) => {
    keyboard.keyLeave(e.code)
})

function toggleControl() {
    document.getElementById('startScreen').classList.toggle('d-none');
    document.getElementById('controll').classList.toggle('d-none');
}





