class MovableObject {
    width = canvas.width
    x = 0;
    images = {};

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }
    moveLeft(speed) {
        this.x = this.x - speed;
        requestAnimationFrame(() => this.moveLeft(speed));
    }
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.images[path] = img;
        });
    }
}