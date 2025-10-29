class DrawableObject {
    images = {};
    currentImage = 0;
    currentImageArray;
    img;

    /**
     * Draws the object's image onto the given 2D canvas context at the object's current position and size.
     *
     * Uses the instance properties:
     *  - this.img (CanvasImageSource) as the source image,
     *  - this.x, this.y as the destination coordinates,
     *  - this.width, this.height as the destination dimensions.
     *
     * @param {CanvasRenderingContext2D} ctx - The 2D rendering context of a <canvas> element.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    };

    /**
     * Loads an image from the specified path and assigns it to this.img.
     *
     * Creates a new HTMLImageElement and sets its src.
     *
     * @param {string} path - URL or relative path to the image resource.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    };

    /**
     * Create Image objects for each given source path and store them on this.images keyed by path.
     *
     * For each string in the provided array a new HTMLImageElement is created and its src is set
     * to the path.
     *
     * @param {string[]} arr - Array of image source paths or URLs.
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.images[path] = img;
        });
    };
};