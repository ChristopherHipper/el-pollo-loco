class ThrowableObject extends MovableObject {
    speedX = 15;
    speedY = 20;
    width = 80;
    height = 80

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
        this.loadImage('assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png')
        this.loadImages(this.splashImages);
        this.loadImages(this.rotateImages);
        this.applyGravity();
    }

    throw(deltaTime, level) {
        this.deltaTime = deltaTime;
        level.enemies.forEach(enemy => {
            if (this.y > 367) {
                if (this.isColliding(enemy)) {
                    level.enemies[enemies.indexOf(enemy)].chickenDied(enemies, enemy);
                }
                this.splash();
            } else {
                this.animations(this.rotateImages, 100);
            }
        })



    };

    splash() {
        this.singleAnimation(this.splashImages, 100);
        setTimeout(() => {
            this.throwableBottles.splice(this.throwableBottles.indexOf(this), 1);
        }, 100);

    }

};