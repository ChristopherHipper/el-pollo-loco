class Cloud extends MovableObject {
    height = 200;
    y = 20;
    speedX = 0.05
    constructor(path, x) {
        super();
        this.loadImage(path, x);
        this.x = x
        this.animation()
    }
    animation(){
        setInterval(() => {
            this.moveLeft()
        }, 1000 / 60);
    }
}