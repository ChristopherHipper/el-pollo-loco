class MovableObject {
    x;
    y;
    img;
    width;
    height;

    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveLeft() {
    }
    dead() { }
}