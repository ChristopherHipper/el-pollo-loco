class Character extends MovableObject {
    World;
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
    lastMovement = new Date().getTime();
    coins = 0;
    bottles = 0;

    idleImages = [
        'assets/img/2_character_pepe/1_idle/idle/I-1.png',
        'assets/img/2_character_pepe/1_idle/idle/I-2.png',
        'assets/img/2_character_pepe/1_idle/idle/I-3.png',
        'assets/img/2_character_pepe/1_idle/idle/I-4.png',
        'assets/img/2_character_pepe/1_idle/idle/I-5.png',
        'assets/img/2_character_pepe/1_idle/idle/I-6.png',
        'assets/img/2_character_pepe/1_idle/idle/I-7.png',
        'assets/img/2_character_pepe/1_idle/idle/I-8.png',
        'assets/img/2_character_pepe/1_idle/idle/I-9.png',
        'assets/img/2_character_pepe/1_idle/idle/I-10.png',

    ];
    longIdleImages = [
        'assets/img/2_character_pepe/1_idle/long_idle/I-11.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-12.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-13.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-14.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-15.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-16.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-17.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-18.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-19.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-20.png',

    ];

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
    constructor(game) {
        super()
        this.World = game
        this.loadImage('../assets/img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.walkingImages);
        this.loadImages(this.jumpingImages);
        this.loadImages(this.hurtImages);
        this.loadImages(this.deathImages);
        this.loadImages(this.idleImages);
        this.loadImages(this.longIdleImages);
        this.playAnimation();
        this.applyGravity();
    }

    playAnimation() {
        this.animateMovement();
        this.animateIdle();
        this.animateStatus();
    }

    isSleeping() {
        const now = new Date().getTime();
        return (now - this.lastMovement > 15000);
    }

    animateIdle() {
        setInterval(() => {
            if (!this.World.keyboard.right && !this.World.keyboard.left && !this.World.keyboard.up
                && !this.isAboveGround()
                && !this.isHurt()
                && !this.isDead()
                && !this.isSleeping()) {
                if (!this.isIdle) {
                    this.currentImage = 0;
                    this.isIdle = true;
                }
                this.animations(this.idleImages);
            } else {
                this.isIdle = false;
            }
        }, 200);
    }

    animateMovement() {
        if (this.World.keyboard.right && this.x < this.World.level.levelEndX && !this.isHurt()) {
            this.moveRight();
            this.updateStatusBarPosition(this.x, 100);
            this.mirroring = false;
            this.lastMovement = new Date().getTime();

        }
        if (this.World.keyboard.left && this.x > -500 && !this.isHurt()) {
            this.updateStatusBarPosition(this.x, 103);
            this.moveLeft()
            this.mirroring = true;
            this.lastMovement = new Date().getTime();
        }
        if (this.World.keyboard.up && this.isOnGround() && !this.isHurt()) {
            this.currentImage = 0;
            this.jump()
            this.lastMovement = new Date().getTime();
        }
        this.World.camera_x = -this.x + 100
        requestAnimationFrame(() => this.animateMovement());
    }

    animateStatus() {
        setInterval(() => {
            if (this.isDead()) {
                this.animations(this.deathImages);
            } else if (this.isHurt()) {
                this.animations(this.hurtImages);
            } else if (this.isAboveGround()) {
                this.singleAnimation(this.jumpingImages)
            } else if (this.World.keyboard.right || this.World.keyboard.left) {
                this.animations(this.walkingImages)
            } else if (this.isSleeping()) {
                this.animations(this.longIdleImages);
            }
        }, 100);
    }
}