class Chicken extends MovableObject {
    height = 80;;
    width = 80;
    y = 345;
   constructor() {
        super().loadImage('../assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png');
        this.x = 400 + Math.random() * 500;
    }
    move(){
        this.x = this.x - 0.2;
    }
    eat() {}
    attack() {}
}