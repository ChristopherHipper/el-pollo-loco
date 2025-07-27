class Clouds extends MovableObject {
    height = 200;
    y = 20;
    constructor(path,x) {
        super();
        this.loadImage(path,x);
        this.x = x
        this.moveLeft(0.03);
    }
}