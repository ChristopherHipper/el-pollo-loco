class Coin extends MovableObject {
    height = 150;
    width = 150;

    offset = {
        top: 50,
        width: 50,
        left: 50,
        height: 50
    }
    blinkImages = [
        '../assets/img/8_coin/coin_1.png',
        '../assets/img/8_coin/coin_2.png',
    ]
    constructor() {
        super()
        this.loadImage('../assets/img/8_coin/coin_1.png');
        this.loadImages(this.blinkImages);
        this.moveAnmation()
    }


    moveAnmation() {
        setInterval(() => {
            this.animations(this.blinkImages)
        }, 200);
    }

}



/* 
    findObjectPosition() {
        this.x = Math.random() * (2300 - 230) + 200
        this.y = Math.random() * (200 - 60) + 60

        let object = coins.find(o => o.x < this.x - 50 && o.x > this.x + 50);

        if (object) {
            this.findObjectPosition();
        }
    } */