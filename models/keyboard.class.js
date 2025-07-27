class Keyboard {
    right = false;
    left = false;
    space = false;

    constructor() {
        this.moveCharacter();
    }
    moveCharacter() {
        window.addEventListener('keydown', (e) => {
            e.code === 'ArrowRight' ? this.right = true : 'default';
            e.code === 'ArrowLeft' ? this.left = true : 'default';
            e.code === 'Space' ? this.space = true : 'default';
        })

        window.addEventListener('keyup', (e) => {
            e.code === 'ArrowRight' ? this.right = false : 'default';
            e.code === 'ArrowLeft' ? this.left = false : 'default';
            e.code === 'Space' ? this.space = false : 'default';
        })
    };
}