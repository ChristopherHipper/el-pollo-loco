class HealthbarCharacter extends MovableObject {
    height = 50;;
    width = 200;
    y = 0
    x = -100
    healthbarImages = [
        '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ]
    constructor() {
        super()
        this.loadImage('../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png');
        this.loadImages(this.healthbarImages);
    }

    updateHealthbar(health) {
        if (health > 0) {
            let index = health / 20;
            this.loadImage(this.healthbarImages[index]);
        } else {
            this.loadImage('../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png');
        }
    }
}

class CoinbarCharacter extends MovableObject {
    height = 50;;
    width = 200;
    y = 50
    x = -100
    coinhbarImages = [
        '../assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        '../assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        '../assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        '../assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        '../assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        '../assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ]
    constructor() {
        super()
        this.loadImage('../assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png');
        this.loadImages(this.coinhbarImages);
    }

    updateCoinBar(coins) {
        if (coins > 5) {
            coins = 5;
        }
        this.loadImage(this.coinhbarImages[coins]);
    }
}

class BottlebarCharacter extends MovableObject {
    height = 50;;
    width = 200;
    y = 100
    x = -100
    bottlehbarImages = [
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',

    ]
    constructor() {
        super()
        this.loadImage('../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png');
        this.loadImages(this.bottlehbarImages);
    }

    updateBottleBar(bottles) {
        if (bottles > 5) {
            bottles = 5;
        }
        this.loadImage(this.bottlehbarImages[bottles]);
    }
}