class DrawableObject {
    images = {};
    currentImage = 0;
    img;


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

    updateStatusBarPosition(charcter_x, camera_x) {
        this.World.level.healthbar.x = charcter_x - camera_x
        this.World.level.coinbar.x = charcter_x - camera_x
        this.World.level.bottlebar.x = charcter_x - camera_x
    }




};