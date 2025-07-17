class Background extends MovableObject {
    height = 480;
    y = 0;
    constructor(path) {
        super().loadImage(path);
    }
}