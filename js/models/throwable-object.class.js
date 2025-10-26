class ThrowableObject extends MovableObject {
    speedX = 15;
    speedY = 20;
    width = 80;
    height = 80;
    splashed = false;

    rotateImages = [
        'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    splashImages = [
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    constructor(x, y, mirroring, throwableBottles) {
        super();
        this.mirroring = mirroring;
        this.throwableBottles = throwableBottles;
        this.x = x;
        this.y = y;
        this.loadImage('assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.splashImages);
        this.loadImages(this.rotateImages);
    };

    throw(deltaTime, level, throwableBottles) {
        this.deltaTime = deltaTime;
        this.level = level;
        this.throwableBottles = throwableBottles;
        this.hitEnemy();
        this.hitEndboss();
        this.hitGround();
        this.splash();
        this.applyGravity();
    };

    splash() {
        if (this.splashed) {
            soundEffects.splash.play();
            this.animations(this.splashImages, 50, true);
            setTimeout(() => {
                this.throwableBottles.splice(this.throwableBottles.indexOf(this), 1);
                this.splashed = false;
            }, 100);
        } else {
            this.animations(this.rotateImages, 50, true);
        };
    };

    hitGround() {
        if (this.y >= 360) {
            this.splashed = true;
        };
    };

    hitEnemy() {
        this.level.enemies.forEach(enemy => {
            if (this.isColliding(enemy) && enemy.isAlive) {
                this.level.enemies[enemies.indexOf(enemy)].chickenDied(enemies, enemy);
                this.splashed = true;
            };
        });
    };

    hitEndboss() {
        if (this.isColliding(this.level.endboss)) {
            //soundEffects.endbossHurt.play();
            this.level.endboss.takeHit();
            this.splashed = true;
        };
    };

    throwableObjectGravity() {
        if (this.mirroring) {
            this.x -= this.speedX;
        };
        if (!this.mirroring) {
            this.x += this.speedX;
        };
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
        if (this.y >= 360) {
            this.speedY = 0;
            this.speedX = 0;
        };
    };
};