class Clouds extends MovableObject {
    width = canvas.width
    height = 200;
    y = 20;
    constructor() {
        super().loadImage('../assets/img/5_background/layers/4_clouds/1.png');
        this.x = Math.random() * 500;

    }
}