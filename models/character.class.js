class Character extends MovableObject {
    width = 150;
    height = 200;
    y = 220;
    health = 100;
    cooldown = false;
    isHurt = false;

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
    hurtImages = [
        '../assets/img/2_character_pepe/4_hurt/H-41.png',
        '../assets/img/2_character_pepe/4_hurt/H-42.png',
        '../assets/img/2_character_pepe/4_hurt/H-43.png',
    ];
    constructor() {
        super()
        this.loadImage('../assets/img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.walkingImages);
        this.loadImages(this.jumpingImages);
        this.loadImages(this.hurtImages);
        this.playAnimation()
        this.applyGravity();
    }

    characterHit() {
        this.animations(this.hurtImages);
        if (this.cooldown) return;
        this.health -= 20;
        this.cooldown = true;
        this.isHurt = true;
        this.updateHealthbar();
        setInterval(() => {
            this.cooldown = false;
            this.isHurt = false;
        }, 2000);

    }

    playAnimation() {
        setInterval(() => {
            if (this.isHurt) {
                this.animations(this.hurtImages);
            }
            if (this.World.keyboard.right && this.x < this.World.level.levelEndX) {
                this.moveRight()
                this.mirroring = false;
            }
            if (this.World.keyboard.left && this.x > -100) {
                this.mirroring = true;
                this.moveLeft()
            }
            if (this.World.keyboard.up && this.isOnGround()) {
                this.jump()
            }
            this.World.camera_x = -this.x + 100
        }, 1000 / 60)
        setInterval(() => {
            if (this.isAboveGround()) {
                this.animations(this.jumpingImages)
            } else if (this.World.keyboard.right || this.World.keyboard.left) {
                this.animations(this.walkingImages)
            } else {
                this.loadImage('../assets/img/2_character_pepe/1_idle/idle/I-1.png');
            }
        }, 100);
    }
}