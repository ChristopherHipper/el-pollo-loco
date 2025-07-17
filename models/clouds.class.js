class Clouds extends MovableObject {
    height = 200;
    y = 20;
    constructor() {
        super().loadImage('../assets/img/5_background/layers/4_clouds/1.png');
    }
    move() {
        this.x = this.x - 0.03;
    }
}