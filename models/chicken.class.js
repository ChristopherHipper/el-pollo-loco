class Chicken extends MovableObject {
    height = 80;;
    width = 80;
    y = 345;
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
        this.x = 400 + Math.random() * 500;
        this.moveAnmation();
    }

    moveAnmation() {
        this.moveLeft(this.speed);
        setInterval(() => {
            this.animations(this.walkingImages)
        }, 100);
    }
}