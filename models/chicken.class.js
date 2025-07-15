class Chicken extends MovableObject {
   constructor() {
        super().loadImage('../assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png');
        this.x = 400 + Math.random() * 500;
    }
    move(){
        this.x --;
    }
    eat() {}
    attack() {}
}