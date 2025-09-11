class ThrowableObject extends MovableObject {
    speedX = 3;
    speedY = 3;
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

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.loadImage('assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png')
        this.loadImages(this.splashImages);
        this.loadImages(this.rotateImages);
    }

    throw(deltaTime) {
        this.deltaTime = deltaTime;
        this.animations(this.rotateImages, 100);
        this.x += this.speedX
        this.y -= this.speedY
    };

};