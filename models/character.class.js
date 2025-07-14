class Character extends MovableObject {
    x = 0;
    constructor(x) {
        super(x, 300, 150, 100).loadImage('../assets/img/2_character_pepe/1_idle/idle/I-1.png');
    }
    jump() { }
    moveRight() {
        window.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowRight') {
                this.x ++;
            }
        })
    }
    sleep() { }
    throw() { }
}