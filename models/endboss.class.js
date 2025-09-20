class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 60;
    standImages = [
        '../assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        '../assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        '../assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        '../assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        '../assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        '../assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        '../assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        '../assets/img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    walkingImages = [
        '../assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        '../assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        '../assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        '../assets/img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    attackImages = [
        'assets/img/4_enemie_boss_chicken/3_attack/G13.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G14.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G15.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G16.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G17.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G18.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G19.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    hurtImages = [
        'assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    deathImages = [
        'assets/img/4_enemie_boss_chicken/5_dead/G24.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G25.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    offset = {
        top: 70,
        width: 0,
        left: 0,
        height: 10
    };
    constructor() {
        super()
        this.loadImage('../assets/img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.standImages);
        this.loadImages(this.walkingImages);
        this.loadImages(this.attackImages);
        this.loadImages(this.hurtImages);
        this.loadImages(this.deathImages);
        this.x = 300;
    };

    update(deltaTime, level, character) {
        this.character = character;
        this.level = level;
        this.deltaTime = deltaTime;
        this.playAnimation();
    };

    playAnimation() {
        if (this.isDead()) {
            this.animations(this.deathImages, 200);
        } else if (this.isHurt()) {
            this.animations(this.hurtImages, 200);
        } else if (this.isColliding(this.character)) {
            this.animations(this.attackImages, 100);
        }
        else this.animations(this.standImages, 300);
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
            this.level.endbossBar.updateEndbossHealthbar(this.health);
            setTimeout(() => {
                this.cooldown = false;
                this.hurt = false;
                this.currentImage = 0;
            }, 1500);
        };
    };
};