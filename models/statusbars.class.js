class HealthbarCharacter extends MovableObject {
    height = 50;;
    width = 200;
    y = 0
    x = 0
    speed = 10
    healthbarImages = [
        '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
        '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
    ]
    constructor() {
        super()
        this.loadImage('../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png');
        this.loadImages(this.healthbarImages);
        this.moveAnmation()
    }
    moveAnmation() {
        setInterval(() => {
            if (this.World.keyboard.right && this.x < this.World.level.levelEndX) {
                this.x = this.World.character.x
            }
            if (this.World.keyboard.left && this.x > -100) {
                this.x -= this.speed
            }
            
        }, 1000 / 60)

    }
}

class CoinbarCharacter extends MovableObject {
    height = 50;;
    width = 200;
    y = 50
    x = -80
    coinhbarImages = [
        '../assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
        '../assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        '../assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        '../assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        '../assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        '../assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
    ]
    constructor() {
        super()
        this.loadImage('../assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png');
        this.loadImages(this.coinhbarImages);
    }
    moveAnmation() {
        setInterval(() => {
            this.animations(this.coinhbarImages)
        }, 200);
    }
}

class BottlebarCharacter extends MovableObject {
    height = 50;;
    width = 200;
    y = 100
    x = -80
    bottlehbarImages = [
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',

    ]
    constructor() {
        super()
        this.loadImage('../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png');
        this.loadImages(this.bottlehbarImages);
    }
    moveAnmation() {
        setInterval(() => {
            this.animations(this.bottlehbarImages)
        }, 200);
    }
}