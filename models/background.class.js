class Background extends MovableObject {
    height = 480;
    y = 0;
    constructor(path,x) {
        super().loadImage(path);
        this.x = x
    }
}