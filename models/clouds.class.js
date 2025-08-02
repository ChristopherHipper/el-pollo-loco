class Clouds extends MovableObject {
    height = 200;
    y = 20;
    speed = 0.05
    constructor(path, x) {
        super();
        this.loadImage(path, x);
        this.x = x
        this.moveAnimation();
    }


    moveAnimation() {
        setInterval(() => {
            this.moveLeft(this.speed);
        }, 1000 / 60);
    }

}