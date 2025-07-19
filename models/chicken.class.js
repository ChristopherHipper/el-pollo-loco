class Chicken extends MovableObject {
    height = 80;;
    width = 80;
    y = 345;
    currentWalkingImage = 0;
    walkingImages = [
        '../assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    constructor() {
        super()
        this.loadImage('../assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png');
        this.moveLeft(0.08);
        this.loadImages(this.walkingImages);
        this.x = 400 + Math.random() * 500;
        this.moveAnmation();
    }

    moveAnmation() {
        setInterval(() => {
            let i = this.currentWalkingImage % this.walkingImages.length;
            let path = this.walkingImages[i];
            this.img = this.images[path];
            this.currentWalkingImage++;
        }, 100);
    }
}