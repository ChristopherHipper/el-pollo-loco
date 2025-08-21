class MovableObject extends DrawableObject {
    width = 720;
    x = 0;
    speedY = 0;
    speed = 5;
    health = 100;
    acceleration = 2.5;
    hurt = false;
    mirroring = false;
    timeOut = 0;
    offset = {
        top: 0,
        width: 0,
        left: 0,
        height: 0
    };
    moveLeft() {
        this.x -= this.speed;
    };

    moveRight() {
        this.x += this.speed;
    };

    jump() {
        this.speedY = 30;
    };

    updateCameraPosition(camera_x) {
        if (this.x + this.width + camera_x < 0) {
            this.x += this.width * 2;
        }
        if (this.x + camera_x > this.width) {
            this.x -= this.width * 2;
        };
    };

    animations(imageArray) {
        let i = this.currentImage % imageArray.length;
        let path = imageArray[i];
        this.img = this.images[path];
        this.currentImage++;
    };

    singleAnimation(imageArray) {
        if (this.currentImage >= imageArray.length) {
            this.currentImage = imageArray.length -1 ;
        }
        let path = imageArray[this.currentImage];
        this.img = this.images[path];
        this.currentImage++;
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            };
        }, 50);
    };

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
            ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.width * 2, this.height - this.offset.height * 2);
            ctx.stroke();
        };
    };

    isColliding(object) {
        return this.x + this.width - this.offset.width > object.x + object.offset.width &&
            this.y + this.height - this.offset.height > object.y + this.offset.height &&
            this.x + this.offset.left < object.x + object.width - object.offset.width &&
            this.y + this.offset.top < object.y + object.height - object.offset.height;
    };

    isOnGround() {
        return this.y == 230;
    };

    isAboveGround() {
        return this.y < 230;
    };

    hit() {
        if (this.health < 0) {
            this.health = 0;
        } else if (this.cooldown) {
            return;
        } else {
            this.cooldown = true;
            this.hurt = true;
            this.health -= 20;
            this.World.level.healthbar.updateHealthbar(this.health);
            setInterval(() => {
                this.cooldown = false;
                this.hurt = false;
            }, 2000);
        };
    }

    isDead() {
        return this.health == 0;
    };

    isHurt() {
        return this.hurt;
    };

    isIdle() {

    };

    stopIdle() {
        this.fallAsleep = false;
        clearTimeout(this.timeOut);
    }

    checkEnemyCollisions(enemies) {
        enemies.forEach(enemy => {
            if (this.isColliding(enemy)) {
                this.hit();
            }
        });
    }

    checkItemCollisions(coins, bottles) {
        coins.forEach(coin => {
            if (this.isColliding(coin)) {
                this.coins++;
                this.World.level.coinbar.updateCoinBar(this.coins);
                coins.splice(coins.indexOf(coin), 1);
            }
        });
        bottles.forEach(bottle => {
            if (this.isColliding(bottle)) {
                this.bottles++;
                this.World.level.bottlebar.updateBottleBar(this.bottles);
                bottles.splice(bottles.indexOf(bottle), 1);
            }
        });
    }
};
