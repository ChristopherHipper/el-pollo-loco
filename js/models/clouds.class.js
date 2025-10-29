class Cloud extends MovableObject {
    height = 200;
    y = 20;
    speedX = 0.05;
    constructor(path, x) {
        super();
        this.loadImage(path, x);
        this.x = x;
    };

    /**
     * Triggers the cloud movement animation by moving the instance to the left.
     */
    moveAnmation() {
        this.moveLeft();
    };
};