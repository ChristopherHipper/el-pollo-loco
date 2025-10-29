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
        'assets/img/8_coin/coin_1.png',
        'assets/img/8_coin/coin_2.png',
    ];

    constructor() {
        super();
        this.loadImage('assets/img/8_coin/coin_1.png');
        this.loadImages(this.blinkImages);
    };

    /**
     * Update animation timing and advance the blink animation.
     *
     * Stores the provided delta time on the instance and invokes the instance
     * animation routine for blinkImages using a frame duration of 200ms and
     * looping enabled.
     *
     * @param {number} deltaTime - Time elapsed since the last update (in milliseconds).
     */
    moveAnmation(deltaTime) {
        this.deltaTime = deltaTime;
        this.animations(this.blinkImages,200, true);
    };
};