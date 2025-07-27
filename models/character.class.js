class Character extends MovableObject {
    width = 150;
    height = 200;
    y = 230;
    speed = 10;
    walkingImages = [
        '../assets/img/2_character_pepe/2_walk/W-21.png',
        '../assets/img/2_character_pepe/2_walk/W-22.png',
        '../assets/img/2_character_pepe/2_walk/W-23.png',
        '../assets/img/2_character_pepe/2_walk/W-24.png',
        '../assets/img/2_character_pepe/2_walk/W-25.png',
        '../assets/img/2_character_pepe/2_walk/W-26.png',
    ];
    constructor(keyboard) {
        super().loadImage('../assets/img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.walkingImages);
        this.keyboard = keyboard
        this.moveAnmation();
    }

    moveAnmation() {
        setInterval(() => {
            this.keyboard.right ? this.x += this.speed : 'default'
            this.keyboard.left ? this.x -= this.speed : 'default'
        }, 1000 / 60)
        setInterval(() => {
            if (this.keyboard.right) {
                let i = this.currentWalkingImage % this.walkingImages.length;
                let path = this.walkingImages[i];
                this.img = this.images[path];
                this.currentWalkingImage++;
            } else {
                this.loadImage('../assets/img/2_character_pepe/1_idle/idle/I-1.png')
            }
        }, 50);
    }
}