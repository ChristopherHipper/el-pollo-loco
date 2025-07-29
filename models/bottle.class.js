class Bottle extends MovableObject {
    height = 80;;
    width = 80;
    y = 350
    x = Math.random() * (2300 - 230) +20
    walkingImages = [
        '../assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        '../assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ]
    constructor() {
        super()
        this.loadImage('../assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
    }
}