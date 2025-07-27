class Keyboard {
    right = false;
    left = false;
    up = false;

    keyPres(key) {
        key === 'ArrowLeft' ? this.left = true : 'defaukt'
        key === 'ArrowRight' ? this.right = true : 'defaukt'
        key === 'ArrowUp' ? this.up = true : 'defaukt'
    }
    keyLeave(key) {
        key === 'ArrowLeft' ? this.left = false : 'defaukt'
        key === 'ArrowRight' ? this.right = false : 'defaukt'
        key === 'ArrowUp' ? this.up = false : 'defaukt'
    }
}