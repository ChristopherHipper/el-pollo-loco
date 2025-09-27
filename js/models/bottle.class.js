class Bottle extends DrawableObject {
    height = 80;
    width = 80;
    y = 350;
    offset = {
        top: 10,
        width: 20,
        left: 20,
        height: 10
    };

    groundImages = [
        '../assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        '../assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];

    constructor() {
        super();
        this.loadImage(this.groundImages[Math.floor(Math.random() * 2)]);
    };
};