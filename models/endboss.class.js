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
    speed = 5
    currentAnimation = null;
    constructor() {
        super()
        this.loadImage('../assets/img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.standImages);
        this.loadImages(this.walkingImages);
        this.x = 3000
        this.standAnimation();
        this.checkBossTrigger();
    }

    standAnimation() {
        this.stopCurrentAnimation();
        this.currentAnimation = setInterval(() => {
            this.animations(this.standImages);
        }, 250);
    }

    walkAnimation() {
        this.stopCurrentAnimation();
        this.currentAnimation = setInterval(() => {
            this.animations(this.walkingImages);
            this.x -= this.speed;
        }, 150);
    }


    stopCurrentAnimation() {
        if (this.currentAnimation) {
            clearInterval(this.currentAnimation);
            this.currentAnimation = null;
        }
    }

    checkBossTrigger() {
        setInterval(() => {
            if (!this.bossStartedWalking && this.World.character.x >= 2600) {
                this.bossStartedWalking = true;
                this.walkAnimation();
            }
        }, 1000 / 60);
    }
}