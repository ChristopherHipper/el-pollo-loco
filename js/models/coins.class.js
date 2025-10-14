class Coin extends MovableObject {
    height = 150;
    width = 150;
    offset = {
        top: 50,
        width: 50,
        left: 50,
        height: 50
    };

    blinkImages = [
        '../assets/img/8_coin/coin_1.png',
        '../assets/img/8_coin/coin_2.png',
    ];

    constructor() {
        super();
        this.loadImage('../assets/img/8_coin/coin_1.png');
        this.loadImages(this.blinkImages);
    };

    moveAnmation(deltaTime) {
        this.deltaTime = deltaTime;
        this.animations(this.blinkImages,200, true);
    };
};