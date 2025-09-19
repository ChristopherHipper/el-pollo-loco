class MovableObject extends DrawableObject {
    deltaTime;
    frameTimer = 0;
    frameDuration = 100;
    width = 720;
    x = 0;
    speedY = 0;
    speedX = 3;
    health = 100;
    acceleration = 2.5;
    hurt = false;
    cooldown = false;
    mirroring = false;
    isAlive = true;
    offset = {
        top: 0,
        width: 0,
        left: 0,
        height: 0
    };

    isDead() {
        return this.health == 0;
    };

    isHurt() {
        return this.hurt;
    };

    jump(force) {
        this.currentImage = 0;
        this.speedY = force;
    };

    isFalling() {
        return this.speedY < 0;
    };

    isAboveGround() {
        return this.y < 230;
    };

    moveLeft() {
        this.x -= this.speedX;
    };

    moveRight() {
        this.x += this.speedX;
    };

    isColliding(object) {
        return this.x + this.width - this.offset.width > object.x + object.offset.width &&
            this.y + this.height - this.offset.height > object.y + this.offset.height &&
            this.x + this.offset.left < object.x + object.width - object.offset.width &&
            this.y + this.offset.top < object.y + object.height - object.offset.height;
    };

    isSleeping() {
        const now = new Date().getTime();
        return (now - this.lastMovement > 16000);
    };

    updateCameraPosition(camera_x) {
        if (this.x + this.width + camera_x < 0) {
            this.x += this.width * 2;
        };
        if (this.x + camera_x > this.width) {
            this.x -= this.width * 2;
        };
    };

    animations(imageArray, frameDuration) {
        if (this.currentImageArray != imageArray) {
            this.currentImageArray = imageArray;
            this.currentImage = 0;
            this.frameTimer = 0;
            this.frameDuration = frameDuration;
        }
        this.frameTimer += this.deltaTime;
        if (this.frameTimer >= this.frameDuration) {
            this.frameTimer = 0;
            this.currentImage = (this.currentImage + 1) % imageArray.length
        }
        let path = imageArray[this.currentImage];
        this.img = this.images[path];
    };

    applyGravity() {
        setInterval(() => {
            if (this instanceof Character) {
                if (this.isAboveGround() || this.speedY > 0) {
                    this.y -= this.speedY;
                    this.speedY -= this.acceleration;
                } if (!this.isAboveGround()) {
                    this.speedY = 0;
                    this.y = 230;
                };
            } else if (this instanceof ThrowableObject) {
                if (this.mirroring) {
                    this.x -= this.speedX;
                };
                if (!this.mirroring) {
                    this.x += this.speedX;
                };
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                if (this.y >= 360) {
                    this.speedY = 0;
                    this.speedX = 0;
                };
            };
        }, 50);
    };

    drawBorder(ctx) {
        /*         if (this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof Bottle || this instanceof Coin) {
                    ctx.beginPath();
                    ctx.strokeStyle = 'blue';
                    ctx.lineWidth = 5;
                    ctx.rect(this.x, this.y, this.width, this.height);
                    ctx.stroke();
                } */
    }

    drawOffsetBorder(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof Endboss || this instanceof Coin || this instanceof Bottle
        ) {
            ctx.beginPath();
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 3;
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.left - this.offset.width, this.height - this.offset.top - this.offset.height);
            ctx.stroke();
        };
    };
};
