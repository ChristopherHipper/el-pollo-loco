class DrawableObject {
    images = {};
    currentImage = 0;
    mirroring = false;


    draw(ctx) {
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