class HealthbarCharacter extends DrawableObject {
    height = 50;;
    width = 200;
    y = 0;
    x = 0;
    healthbarImages = [
        '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        '../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];
    constructor() {
        super();
        this.loadImage('../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png');
        this.loadImages(this.healthbarImages);
    };

    updateHealthbar(health) {
        if (health > 0) {
            let index = health / 20;
            this.loadImage(this.healthbarImages[index]);
        } else {
            this.loadImage('../assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png');
        };
    };
}

class CoinbarCharacter extends DrawableObject {
    height = 50;
    width = 200;
    y = 50;
    x = 0;
    coinhbarImages = [
        '../assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        '../assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        '../assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        '../assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        '../assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        '../assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ];
    constructor() {
        super();
        this.loadImage('../assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png');
        this.loadImages(this.coinhbarImages);
    };

    updateCoinBar(coinsArr, CurrentCoin, ammountOfCoins) {
        coinsArr.splice(coinsArr.indexOf(CurrentCoin), 1);
        if (ammountOfCoins > 5) {
            ammountOfCoins = 5;
        };
        this.loadImage(this.coinhbarImages[ammountOfCoins]);
    };
};

class BottlebarCharacter extends DrawableObject {
    height = 50;
    width = 200;
    y = 100;
    x = 0;
    bottlehbarImages = [
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        '../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ];
    constructor() {
        super();
        this.loadImage('../assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png');
        this.loadImages(this.bottlehbarImages);
    };

    addBottleToBar(bottleArr, CurrentBottle, amountOfBottles) {
        bottleArr.splice(bottleArr.indexOf(CurrentBottle), 1);
        if (amountOfBottles > 5) {
            amountOfBottles = 5;
        };
        this.updateBottleBar(amountOfBottles);
    };

    updateBottleBar(amountOfBottles) {
        this.loadImage(this.bottlehbarImages[amountOfBottles]);
    };
};

class HealthbarEndboss extends DrawableObject {
    height = 50;
    width = 200;
    y = 80;
    x = 300;
    HealthbarEndbossImages = [
        'assets/img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'assets/img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'assets/img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'assets/img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'assets/img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'assets/img/7_statusbars/2_statusbar_endboss/orange/orange100.png',
    ];
    constructor() {
        super();
        this.loadImage('assets/img/7_statusbars/2_statusbar_endboss/orange/orange100.png',);
        this.loadImages(this.HealthbarEndbossImages);
    };

    updateEndbossHealtbarPosition(x, y, detected, character) {
        if (!detected) {
            this.y = 6;
            this.x = character.x + 400;
        } else {
            this.x = x;
            this.y = y - 20;
        }
    };

    updateEndbossHealthbar(health) {
        if (health > 0) {
            let index = health / 20;
            this.loadImage(this.HealthbarEndbossImages[index]);
        } else {
            this.loadImage('assets/img/7_statusbars/2_statusbar_endboss/orange/orange0.png');
        };
    };
};