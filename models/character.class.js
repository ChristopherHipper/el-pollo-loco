class Character extends MovableObject {
    width = 150;
    height = 200;
    y = 230;
    keys = [];
    speed = 0;
    maxSpeed = 3;
    constructor() {
        super().loadImage('../assets/img/2_character_pepe/1_idle/idle/I-1.png');
        this.moveCharacter();
    }
    moveCharacter() {
        window.addEventListener('keydown', (e) => {
            if ((e.key === 'ArrowRight' || e.key === 'ArrowLeft')
                && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
            }
            console.log(e.key, this.keys);

        });
        window.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
            console.log(e.key, this.keys);
        });
    }
    updateCharacterPosition() {
        this.x += this.speed;
        if (this.keys.includes('ArrowRight')) {
            this.speed = this.maxSpeed;
        } else if (this.keys.includes('ArrowLeft')) {
            this.speed = -this.maxSpeed;
        } else {
            this.speed = 0;
        }
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.x + this.width > canvas.width) {
            this.x = canvas.width - this.width;
        }
    }
    jump() { }
    sleep() { }
    throw() { }
}