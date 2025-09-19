class Keyboard {
    right = false;
    left = false;
    up = false;
    throw = false;

    keyPres(key) {
        key === 'ArrowLeft' ? this.left = true : 'default';
        key === 'ArrowRight' ? this.right = true : 'default';
        key === 'ArrowUp' ? this.up = true : 'default';
        key === 'KeyD' ? this.throw = true : 'default';
    };
    keyLeave(key) {
        key === 'ArrowLeft' ? this.left = false : 'default';
        key === 'ArrowRight' ? this.right = false : 'default';
        key === 'ArrowUp' ? this.up = false : 'default';
        key === 'KeyD' ? this.throw = false : 'default';
    };
};