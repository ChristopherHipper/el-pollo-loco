class Character extends MovableObject {
    isIdle = true;
    timeOut = 0;
    bounce = 0;
    level;
    keyboard;
    width = 150;
    height = 200;
    y = 230;
    cooldown = false;
    lastMovement = new Date().getTime();
    coins = 0;
    bottles = 0;

    offset = {
        top: 80,
        width: 30,
        left: 30,
        height: 5
    };

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

    preJumpImages = [
        '../assets/img/2_character_pepe/3_jump/J-33.png',
    ];

    jumpingImages = [
        '../assets/img/2_character_pepe/3_jump/J-34.png',
    ];

    fallImages = [
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
        super();
        this.loadImage('../assets/img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.walkingImages);
        this.loadImages(this.jumpingImages);
        this.loadImages(this.preJumpImages);
        this.loadImages(this.hurtImages);
        this.loadImages(this.fallImages);
        this.loadImages(this.deathImages);
        this.loadImages(this.idleImages);
        this.loadImages(this.longIdleImages);
        this.applyGravity();
    }

    update(deltaTime, keyboard, level) {
        this.level = level;
        this.keyboard = keyboard;
        this.deltaTime = deltaTime;
        this.handleInput();
        this.playAnimation();
        this.checkCollision();
        this.bounceBack();
    };

    checkCollision() {
        this.checkEnemyCollision(this.level.enemies);
        this.checkItemCollision(this.level.coins, this.level.bottles);
    };

    isSleeping() {
        const now = new Date().getTime();
        return (now - this.lastMovement > 16000);
    };

    handleInput() {
        if (this.keyboard.throw && !this.isHurt()) {
            this.throwBottle();
        };
        if (this.keyboard.right && this.x < this.level.levelEndX && !this.isHurt()) {
            this.moveRight();
            this.mirroring = false;
            this.lastMovement = new Date().getTime();
        };
        if (this.keyboard.left && this.x > -500 && !this.isHurt()) {
            this.moveLeft();
            this.mirroring = true;
            this.lastMovement = new Date().getTime();
        };
        if (this.keyboard.up && !this.isAboveGround() && !this.isHurt()) {
            setTimeout(() => {
                this.jump(22);
            }, 80);
            this.lastMovement = new Date().getTime();
        } else {
            this.isIdle = true;
        };
    };

    playAnimation() {
        if (this.isDead()) {
            this.animations(this.deathImages, 100);
        }
        else if (this.isHurt()) {
            this.animations(this.hurtImages, 100);
        }
        else if (!this.isAboveGround() && this.keyboard.up) {
            this.animations(this.preJumpImages, 100);
        }
        else if (this.isAboveGround() && !this.isFalling()) {
            this.animations(this.jumpingImages, 100);
        }
        else if (this.isAboveGround() && this.isFalling()) {
            this.animations(this.fallImages, 300);
        }
        else if (this.keyboard.right || this.keyboard.left) {
            this.animations(this.walkingImages, 100);
        }
        else if (this.isSleeping()) {
            this.animations(this.longIdleImages, 400);
        }
        else {
            if (!this.isIdle) {
                this.currentImage = 0;
                this.isIdle = true;
            }
            this.animations(this.idleImages, 400);
        };
    };

    takeHit() {
        if (this.health < 0) {
            this.health = 0;
        } else if (this.cooldown) {
            return;
        } else {
            this.cooldown = true;
            this.hurt = true;
            this.health -= 20;
            this.level.healthbar.updateHealthbar(this.health);
            this.bounce = 20;
            this.bounceBack();
            this.lastMovement = new Date().getTime();
            setTimeout(() => {
                this.cooldown = false;
                this.hurt = false;
                this.currentImage = 0;
            }, 1500);
        };
    };

    throwBottle() {
        if (this.bottles <= 0) {
            return;
        } else {
            const throwBottle = new ThrowableObject();
            throwBottle.throw();
            this.bottles--;
            console.log(this.bottles);
            
        }
    };

    bounceBack() {
        if (this.keyboard.right || !this.keyboard.right && !this.keyboard.left) {
            this.x -= this.bounce;
            this.x = Math.round(this.x);
            this.bounce -= this.acceleration;
        } else if (this.keyboard.left) {
            this.x += this.bounce;
            this.x = Math.round(this.x);
            this.bounce -= this.acceleration;
        };
        if (this.bounce < 0) {
            this.bounce = 0;
        };
    };

    checkEnemyCollision(enemies) {
        enemies.forEach(enemy => {
            this.handleEnmyCollision(enemies, enemy);
        });
    };

    handleEnmyCollision(enemies, enemy) {
        if (!this.isColliding(enemy)) {
            return;
        } else if (this.isFalling() && enemy.isAlive) {
            this.jump(22);
            this.level.enemies[enemies.indexOf(enemy)].chickenDied(enemies, enemy);
            return;
        } else if (enemy.isAlive) {
            this.takeHit();
        };
    };

    checkItemCollision(coins, bottles) {
        coins.forEach(coin => {
            if (this.isColliding(coin)) {
                this.coins++;
                this.level.coinbar.updateCoinBar(coins, coin, this.coins);
            };
        });
        bottles.forEach(bottle => {
            if (this.isColliding(bottle)) {
                this.bottles++;
                this.level.bottlebar.updateBottleBar(bottles, bottle, this.bottles);
            };
        });
    };
};