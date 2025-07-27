class Keyboard {
    right = false;
    left = false;
    space = false;

    keyPres(key) {
        key === 'ArrowLeft' ? this.left = true : 'defaukt'
        key === 'ArrowRight' ? this.right = true : 'defaukt'
        key === 'Space' ? this.space = true : 'defaukt'
    }
    keyLeave(key) {
        key === 'ArrowLeft' ? this.left = false : 'defaukt'
        key === 'ArrowRight' ? this.right = false : 'defaukt'
        key === 'Space' ? this.space = false : 'defaukt'
    }
}