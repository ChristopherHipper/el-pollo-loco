class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 60;
    speedX = 0.4;
    attackMode = false;
    startWalking = false;
    detected = false;
    activeBar = false;
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
        left: 20,
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
        this.x = 3000;
    };

    update(deltaTime) {
        this.isDead();
        if (this.isAlive) {
            this.deltaTime = deltaTime;
            this.playAnimation();
            this.walking();
            this.attack();
            this.characterDetection();
            this.world.level.endbossBar.updateEndbossHealtbarPosition(this.x, this.y, this.detected, this.world.character);
            this.world.level.endbossBar.updateEndbossHealthbar(this.health);
        }
    };

    playAnimation() {
        if (this.health <= 0) {
            this.animations(this.deathImages, 250, false);
        } else if (this.isHurt()) {
            this.animations(this.hurtImages, 200, true);
        } else if (this.attackMode) {
            this.animations(this.attackImages, 150, true);
        } else if (this.startWalking) {
            this.animations(this.walkingImages, 200, true);
        }
        else this.animations(this.standImages, 300, true);
    };

    attack() {
        if (this.isColliding(this.world.character)) {
            this.attackMode = true;
            this.world.character.takeHit();
            this.speedX = 0;
            setTimeout(() => {
                this.attackMode = false;
                this.speedX = 0.4;
            }, 1300);
        };
    };

    walking() {
        if (this.startWalking) {
            this.moveLeft();
        };
    };

    continueWalking() {
        setTimeout(() => {
            this.speedX = 0.4;
            this.startWalking = true;
        }, 1000);
    };

    characterDetection() {
        const distance = Math.abs(this.world.character.x - this.x);
        if (distance <= 400) {
            this.detected = true;
            this.startWalking = true;
            this.activeBar = true;
        } else if (distance >= 650) {
            this.detected = false;
            this.startWalking = false;
        };
    };

    takeHit() {
        if (this.cooldown) return;
        this.speedX = 0;
        this.takeDamage();
        if (this.health <= 0) {
            this.isDead();
            return;
        }
        this.resetCooldown();
        this.continueWalking();
    };
};