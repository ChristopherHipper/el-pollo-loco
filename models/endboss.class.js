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
    speed = 0.08 + Math.random() * 0.15;
    constructor() {
        super()
        this.loadImage('../assets/img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.standImages);
        this.x = 700
        this.standAnimation();
    }

    standAnimation() {
        setInterval(() => {
            this.animations(this.standImages)
        }, 250);
    }
}