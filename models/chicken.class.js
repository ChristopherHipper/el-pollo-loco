class Enemies extends MovableObject {
    offset = {
        top: 0,
        width: 0,
        left: 0,
        height: 0
    }
    x = Math.random() * (2300 - 430) + 430
    speed = 0.08 + Math.random() * 0.15;
    constructor() {
        super();
        this.walkingAnimation()
    }


    walkingAnimation() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        setInterval(() => {
            this.animations(this.walkingImages)
        }, 100);

    }

    chickenDied(enemyArr, currentEnemie) {

        this.loadImage(this.deadImage);
        this.speed = 0
        //enemyArr.splice(enemyArr.indexOf(currentEnemie), 1);
    }
}

class Chicken extends Enemies {
    height = 80;;
    width = 80;
    y = 345;
    walkingImages = [
        '../assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    deadImage = '../assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png'

    constructor() {
        super()
        this.loadImage('../assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png');
        this.loadImages(this.walkingImages);
        this.loadImage(this.deadImage);
    }
}

class SmallChicken extends Enemies {
    height = 60;;
    width = 60;
    y = 360;
    walkingImages = [
        '../assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        '../assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        '../assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    deadImage = '../assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png'

    constructor() {
        super()
        this.loadImage('../assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png');
        this.loadImage(this.deadImage);
        this.loadImages(this.walkingImages);
    }

}