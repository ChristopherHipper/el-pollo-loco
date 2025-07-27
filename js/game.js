let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}

window.addEventListener('keydown', (e) => {
    keyboard.keyPres(e.code)
})

window.addEventListener('keyup', (e) => {
    keyboard.keyLeave(e.code)
})





