class Air extends MovableObject {
    width = canvas.width
    height = 480;
    x = 0;
    y = 0;
    constructor() {
        super().loadImage('../assets/img/5_background/layers/air.png');
    }
}