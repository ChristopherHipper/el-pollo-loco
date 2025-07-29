class Character extends MovableObject {
    width = 150;
    height = 200;
    y = 230;
    speed = 10;
    walkingImages = [
        '../assets/img/2_character_pepe/2_walk/W-21.png',
        '../assets/img/2_character_pepe/2_walk/W-22.png',
        '../assets/img/2_character_pepe/2_walk/W-23.png',
        '../assets/img/2_character_pepe/2_walk/W-24.png',
        '../assets/img/2_character_pepe/2_walk/W-25.png',
        '../assets/img/2_character_pepe/2_walk/W-26.png',
    ];
    jumpingImages = [
        '../assets/img/2_character_pepe/3_jump/J-31.png',
        '../assets/img/2_character_pepe/3_jump/J-32.png',
        '../assets/img/2_character_pepe/3_jump/J-33.png',
        '../assets/img/2_character_pepe/3_jump/J-34.png',
        '../assets/img/2_character_pepe/3_jump/J-35.png',
        '../assets/img/2_character_pepe/3_jump/J-36.png',
        '../assets/img/2_character_pepe/3_jump/J-37.png',
        '../assets/img/2_character_pepe/3_jump/J-38.png',
        '../assets/img/2_character_pepe/3_jump/J-39.png',
    ];
    constructor() {
        super().loadImage('../assets/img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.walkingImages);
        this.loadImages(this.jumpingImages);
        this.moveAnmation()
        this.jumpAnmation()
    }

    moveAnmation() {
        setInterval(() => {
            if (this.World.keyboard.right && this.x < this.World.level.levelEndX) {
                this.x += this.speed
                this.mirroring = false;
            }
            if (this.World.keyboard.left && this.x > -100) {
                this.x -= this.speed
                this.mirroring = true;
            }
            this.World.camera_x = -this.x + 100
        }, 1000 / 60)
        setInterval(() => {
            if (this.World.keyboard.right || this.World.keyboard.left) {
                this.animations(this.walkingImages)
            } else {
                this.loadImage('../assets/img/2_character_pepe/1_idle/idle/I-1.png');
            }
        }, 50);
    }

    jumpAnmation() {
        setInterval(() => {
            this.World.keyboard.up ? this.y -= this.speed : 'default'
        }, 1000 / 60)
        setInterval(() => {
            if (this.World.keyboard.up) {
                let i = this.currentJumpingImage % this.jumpingImages.length;
                let path = this.jumpingImages[i];
                this.img = this.images[path];
                this.currentJumpingImage++;
            }
        }, 50);
    }
}