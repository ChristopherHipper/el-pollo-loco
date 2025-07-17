class MovableObject {
    width = canvas.width
    x = 0;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    moveLeft() {
    }
    dead() { }
}