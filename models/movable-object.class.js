class MovableObject {
    x = 0;
    y = 230;
    width = 150;
    height = 200;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveLeft() {
    }
    dead() { }
}