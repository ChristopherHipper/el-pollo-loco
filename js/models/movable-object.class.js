class MovableObject extends DrawableObject {
    damage = 20;
    deltaTime;
    gravityTimer = 0;
    frameTimer = 0;
    frameDuration = 100;
    deathTimerStarted = false;
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

    takeDamage() {
        this.cooldown = true;
        this.hurt = true;
        this.health -= this.damage;
    };

    resetCooldown() {
        this.cooldownDelay = setTimeout(() => {
            this.cooldown = false;
            this.hurt = false;
            this.currentImage = 0;
        }, 1000);
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

    isDead() {
        if (this.health <= 0) {
            this.initDeathTimer();
            this.updateDeathTimer();
            this.handelDeath();
            this.handelGameEnd();
        };
    };

    handelGameEnd() {
        if (this.deathTimer >= 2000 && !this.deathHandled) {
            if (this instanceof Endboss) this.world.gameEnd('win');
            if (this instanceof Character) this.world.gameEnd('lose');
            this.deathHandled = true;
        };
    };

    handelDeath() {
        if (this.deathTimer >= 600) {
            this.isAlive = false;
            this.y += 2;
        };
    };

    updateDeathTimer() {
        this.deathTimer += this.deltaTime;
        return this.deathTimer;
    };

    initDeathTimer() {
        if (!this.deathTimerStarted) {
            this.deathTimer = 0;
            this.deathTimerStarted = true;
        };
    };

    animations(imageArray, frameDuration, loop = true) {
        this.getCorrectedImageCache(imageArray);
        this.getFPS();
        this.handelAnimationFrame(imageArray, frameDuration, loop);
        this.drawAnimation(imageArray);
    };

    drawAnimation(imageArray) {
        let path = imageArray[this.currentImage];
        this.img = this.images[path];
    };

    handelAnimationFrame(imageArray, frameDuration, loop) {
        if (this.frameTimer >= frameDuration) {
            this.frameTimer = 0;
            loop ? this.currentImage = (this.currentImage + 1) % imageArray.length : this.currentImage = this.currentImage + 1;
        };
    };

    getCorrectedImageCache(imageArray) {
        if (this.currentImageArray != imageArray) {
            this.currentImageArray = imageArray;
            this.currentImage = 0;
            this.frameTimer = 0;
        };
    };

    getFPS() {
        this.frameTimer += this.deltaTime;
        return this.frameTimer;
    };

    applyGravity() {
        const gravityInterval = 50;
        this.gravityTimer += this.deltaTime;
        if (this.gravityTimer >= gravityInterval) {
            if (this instanceof Character) {
                this.characterGravity();
            } else if (this instanceof ThrowableObject) {
                this.throwableObjectGravity();
            }
            this.gravityTimer = 0;
        }
    };

    drawOffsetBorder(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof Endboss || this instanceof Coin || this instanceof Bottle) {
            ctx.beginPath();
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 3;
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.left - this.offset.width, this.height - this.offset.top - this.offset.height);
            ctx.stroke();
        };
    };
};
