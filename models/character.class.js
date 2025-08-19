class Character extends MovableObject {
    width = 150;
    height = 200;
    y = 230;
    cooldown = false;
    offset = {
        top: 80,
        width: 40,
        left: 30,
        height: 30
    }
    coins = 0;
    bottles = 0;

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
    deathImages = [
        '../assets/img/2_character_pepe/5_dead/D-51.png',
        '../assets/img/2_character_pepe/5_dead/D-52.png',
        '../assets/img/2_character_pepe/5_dead/D-53.png',
        '../assets/img/2_character_pepe/5_dead/D-54.png',
        '../assets/img/2_character_pepe/5_dead/D-55.png',
        '../assets/img/2_character_pepe/5_dead/D-56.png',
        '../assets/img/2_character_pepe/5_dead/D-57.png',
    ];
    constructor() {
        super()
        this.loadImage('../assets/img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.walkingImages);
        this.loadImages(this.jumpingImages);
        this.loadImages(this.hurtImages);
        this.loadImages(this.deathImages);
        this.applyGravity();
    }

    playAnimation() {
        setInterval(() => {
            if (this.World.keyboard.right && this.x < this.World.level.levelEndX) {
                this.moveRight();
                this.World.level.healthbar.x = this.x - 100
                this.World.level.coinbar.x = this.x - 100
                this.World.level.bottlebar.x = this.x - 100
                this.mirroring = false;
            }
            if (this.World.keyboard.left && this.x > -100) {
                this.mirroring = true;
                this.World.level.healthbar.x = this.x - 110
                this.World.level.coinbar.x = this.x - 110
                this.World.level.bottlebar.x = this.x - 110
                this.moveLeft()
            }
            if (this.World.keyboard.up && this.isOnGround()) {
                this.jump()
            }
            this.World.camera_x = -this.x + 100
        }, 1000 / 60)
        setInterval(() => {
            if (this.isDead()) {
                this.animations(this.deathImages);
            } else if (this.isHurt()) {
                this.animations(this.hurtImages);
            } else if (this.isAboveGround()) {
                this.animations(this.jumpingImages)
            } else if (this.World.keyboard.right || this.World.keyboard.left) {
                this.animations(this.walkingImages)
            } else {
                this.loadImage('../assets/img/2_character_pepe/1_idle/idle/I-1.png');
            }
        }, 100);
    }
}