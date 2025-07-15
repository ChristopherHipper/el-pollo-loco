class MovableObject {
    x = 0;
    y = 300;
    width = 100;
    height = 150;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveLeft() {
    }
    dead() { }
}