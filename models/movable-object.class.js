class MovableObject {
    width = canvas.width
    x = 0;
    images = {};
    currentWalkingImage = 0;
    currentJumpingImage = 0;
    mirroring = false;
    speedY = 0;
    speed = 10;
    acceleration = 2.5;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.images[path] = img;
        });
    }
    moveLeft() {
        this.x -= this.speed;
    }

    moveRight() {
        this.x += this.speed
    }

    jump() {
        this.speedY = 30;
    }

    updateCameraPosition(camera_x) {
        if (this.x + this.width + camera_x < 0) {
            this.x += this.width * 2;
        }
        if (this.x + camera_x > this.width) {
            this.x -= this.width * 2;
        }
    }
    animations(imageArray) {
        let i = this.currentWalkingImage % imageArray.length;
        let path = imageArray[i];
        this.img = this.images[path];
        this.currentWalkingImage++;
    }
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 50);
    }

    walkingAnimation() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        setInterval(() => {
            this.animations(this.walkingImages)
        }, 100); 
    }

    isOnGround() {
        return this.y == 220
    }
    isAboveGround() {
        return this.y < 220
    }
}