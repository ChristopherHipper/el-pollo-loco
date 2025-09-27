class DrawableObject {
    images = {};
    currentImage = 0;
    currentImageArray;
    img;

    draw(ctx) {
        if (this instanceof Character || this instanceof Endboss) {
            if (!this.isAlive) {
                return
            }
        }
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    };

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    };

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.images[path] = img;
        });
    };
};