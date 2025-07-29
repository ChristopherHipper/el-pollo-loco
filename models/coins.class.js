class Coins extends MovableObject {
    height = 150;;
    width = 150;
    y = Math.random() * (200 - 60) +60
    x = Math.random() * (2300 - 230) +200
    walkingImages = [
        '../assets/img/8_coin/coin_1.png',
        '../assets/img/8_coin/coin_2.png',
    ]
    constructor() {
        super()
        this.loadImage('../assets/img/8_coin/coin_1.png');
        this.loadImages(this.walkingImages);
        this.moveAnmation()
    }
        moveAnmation() {
        setInterval(() => {
            this.animations(this.walkingImages)
        }, 200);
    }
}