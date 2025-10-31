class Keyboard {
    right = false;
    left = false;
    up = false;
    throw = false;
    inputAble = true;

    /**
     * Handle a single keyboard key press by setting the corresponding boolean flag on the instance.
     *
     * @param {string} key - The KeyboardEvent.key value to process. Expected values:
     * 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'Space'.
     */
    keyPres(key) {
        if (!this.inputAble) return
        key === 'ArrowLeft' ? this.left = true : 'default';
        key === 'ArrowRight' ? this.right = true : 'default';
        key === 'ArrowUp' ? this.up = true : 'default';
        key === 'Space' ? this.throw = true : 'default';
    };

    /**
    * Handle a single keyboard key leaves by setting the corresponding boolean flag on the instance.
    *
    * @param {string} key - The KeyboardEvent.key value to process. Expected values:
    * 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'Space'.
    */
    keyLeave(key) {
        key === 'ArrowLeft' ? this.left = false : 'default';
        key === 'ArrowRight' ? this.right = false : 'default';
        key === 'ArrowUp' ? this.up = false : 'default';
        key === 'Space' ? this.throw = false : 'default';
    };
};