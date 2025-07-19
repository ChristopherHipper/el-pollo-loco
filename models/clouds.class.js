class Clouds extends MovableObject {
    height = 200;
    y = 20;
    constructor() {
        super();
        this.loadImage('../assets/img/5_background/layers/4_clouds/1.png');
        this.moveLeft(0.03);
    }
}