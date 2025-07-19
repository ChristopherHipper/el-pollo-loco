class Character extends MovableObject {
    width = 150;
    height = 200;
    y = 230;
    gravity = 0.5;
    jump_y = 0;
    maxJump = 15;
    keys = [];
    speed = 0;
    maxSpeed = 3;
    currentWalkingImage = 0;
    validationInterval = null;
    walkingImages = [
        '../assets/img/2_character_pepe/2_walk/W-21.png',
        '../assets/img/2_character_pepe/2_walk/W-22.png',
        '../assets/img/2_character_pepe/2_walk/W-23.png',
        '../assets/img/2_character_pepe/2_walk/W-24.png',
        '../assets/img/2_character_pepe/2_walk/W-25.png',
        '../assets/img/2_character_pepe/2_walk/W-26.png',
    ];
    constructor() {
        super().loadImage('../assets/img/2_character_pepe/1_idle/idle/I-1.png');
        this.moveCharacter();
        this.loadImages(this.walkingImages);
    }
    moveCharacter() {
        window.addEventListener('keydown', (e) => {
            if (
                (e.key === 'ArrowRight' ||
                    e.key === 'ArrowLeft' ||
                    e.key === 'ArrowUp') &&
                this.keys.indexOf(e.key) === -1
            )
                this.keys.push(e.key);
            if (this.validationInterval == null) {
                this.validationInterval = setInterval(() => {
                    this.moveAnmation();
                }, 100);
            }

        });
        window.addEventListener('keyup', (e) => {
            if (
                e.key === 'ArrowRight' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowUp'
            ) {
                this.keys.splice(this.keys.indexOf(e.key), 1);
                if (this.validationInterval !== null) {
                    this.stopValidation();
                }
            }
        });
    }
    updateCharacterPosition() {
        // horizontal movement
        this.x += this.speed;
        if (this.keys.includes('ArrowRight')) {
            this.speed = this.maxSpeed
        }
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
        return this.y >= canvas.height - this.height - 50;
    }
    moveAnmation() {
        let i = this.currentWalkingImage % this.walkingImages.length;
        let path = this.walkingImages[i];
        this.img = this.images[path];
        this.currentWalkingImage++;
    }
    stopValidation() {
    if (this.validationInterval !== null) {
        clearInterval(this.validationInterval);
        this.validationInterval = null;
        this.loadImage('../assets/img/2_character_pepe/1_idle/idle/I-1.png');
    };
};
}