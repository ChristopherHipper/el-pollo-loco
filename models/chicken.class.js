class Chicken extends MovableObject {
    height = 80;;
    width = 80;
    y = 340;
    walkingImages = [
        '../assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    speed = 0.08 + Math.random() * 0.15;
    constructor() {
        super()
        this.loadImage('../assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png');
        this.loadImages(this.walkingImages);
        this.x = Math.random() * (2300 - 430) + 430
        this.walkingAnimation();
    }
}

class SmallChicken extends MovableObject {
    height = 60;;
    width = 60;
    y = 355;
    walkingImages = [
        '../assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        '../assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        '../assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    speed = 0.08 + Math.random() * 0.15;
    constructor() {
        super()
        this.loadImage('../assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png');
        this.loadImages(this.walkingImages);
        this.x = Math.random() * (2300 - 430) + 430
        this.walkingAnimation();
    }
}