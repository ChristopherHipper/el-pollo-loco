class HealthbarCharacter extends MovableObject {
    height = 50;;
    width = 200;
    y = 0
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
                this.x = this.World.character.x-80
        }, 1000 / 60)
    }
}

class CoinbarCharacter extends MovableObject {
    height = 50;;
    width = 200;
    y = 50
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
        this.loadImage('../assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png');
        this.loadImages(this.coinhbarImages);
        this.moveAnmation()
    }
    moveAnmation() {
        setInterval(() => {
                this.x = this.World.character.x-80
        }, 1000 / 60)
    }
}

class BottlebarCharacter extends MovableObject {
    height = 50;;
    width = 200;
    y = 100
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
        this.loadImage('../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png');
        this.loadImages(this.bottlehbarImages);
        this.moveAnmation()
    }
    moveAnmation() {
        setInterval(() => {
                this.x = this.World.character.x-80
        }, 1000 / 60)
    }
}