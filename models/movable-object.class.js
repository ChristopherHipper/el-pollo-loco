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
    offset = {
        top: 0,
        width: 0,
        left: 0,
        height: 0
    }

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

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawBorder(ctx) {
   /*      if (this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof Bottle || this instanceof Coins) {
            ctx.beginPath();
            ctx.strokeStyle = 'blue';
            ctx.lineWidth = 5;
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        } */
    }

    drawOffsetBorder(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof Endboss || this instanceof Coins || this instanceof Bottle) {
            ctx.beginPath();
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 3;
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.width*2, this.height - this.offset.height*2);
            ctx.stroke();
        }
        
    }

    isColliding(object) {
        return this.x + this.width - this.offset.width > object.x + object.offset.width &&
            this.y + this.height - this.offset.height > object.y + this.offset.height &&
            this.x + this.offset.left < object.x + object.width - object.offset.width &&
            this.y + this.offset.top < object.y + object.height - object.offset.height;
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
        return this.y == 230
    }
    isAboveGround() {
        return this.y < 230
    }

}
