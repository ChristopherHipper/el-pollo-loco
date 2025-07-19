class Character extends MovableObject {
    width = 150;
    height = 200;
    y = 230;
    gravity = 1;
    jump_y = 0;
    maxJump = 20;
    keys = [];
    speed = 0;
    maxSpeed = 3;
    constructor() {
        super().loadImage('../assets/img/2_character_pepe/1_idle/idle/I-1.png');
        this.moveCharacter();
    }
    moveCharacter() {
        window.addEventListener('keydown', (e) => {
            if ((e.key === 'ArrowRight' || 
                e.key === 'ArrowLeft'||
                e.key === 'ArrowUp'
            )
                && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
            }
        });
        window.addEventListener('keyup', (e) => {
            if (e.key === 'ArrowRight' || e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        });
    }
    updateCharacterPosition() {
        // horizontal movement
        this.x += this.speed;
        if (this.keys.includes('ArrowRight')) this.speed = this.maxSpeed;
        else if (this.keys.includes('ArrowLeft')) this.speed = -this.maxSpeed;
        else this.speed = 0;
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > canvas.width) this.x = canvas.width - this.width;
        // vertical movement
        if (this.keys.includes('ArrowUp') && this.onGround()) this.jump_y = -this.maxJump
        this.y += this.jump_y;
        if (!this.onGround()) this.jump_y += this.gravity;
        else this.jump_y = 0;
    }
    onGround() {
        return this.y >= canvas.height - this.height -50;}
    sleep() { }
    throw() { }
}