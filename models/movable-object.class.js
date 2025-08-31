class MovableObject extends DrawableObject {
    width = 720;
    x = 0;
    speedY = 0;
    speed = 3;
    health = 100;
    acceleration = 2.5;
    hurt = false;
    mirroring = false;
    timeOut = 0;
    bounce = 0;
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

    isOnGround() {
        return this.y >= 230;
    };

    isAboveGround() {
        return this.y < 230;
    };
    moveLeft() {
        this.x -= this.speed;
    };

    moveRight() {
        this.x += this.speed;
    };

    startJump(height) {
        this.speedY = height;
        this.currentImage = 0;
    }

    jump() {
        this.startJump(30);
    }

    smallJump() {
        this.startJump(25);
    }

    isColliding(object) {
        return this.x + this.width - this.offset.width > object.x + object.offset.width &&
            this.y + this.height - this.offset.height > object.y + this.offset.height &&
            this.x + this.offset.left < object.x + object.width - object.offset.width &&
            this.y + this.offset.top < object.y + object.height - object.offset.height;
    };

    isFalling() {
        return this.speedY < 0;
    }

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
            this.currentImage = imageArray.length - 1;
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
                if (this.isOnGround()) {
                    this.y = 230;
                    this.speedY = 0;
                }
            }
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
        }
    };





    takeHit() {
        if (this.health < 0) {
            this.health = 0;
        } else if (this.cooldown) {
            return;
        } else {
            this.cooldown = true;
            this.hurt = true;
            this.health -= 20;
            this.World.level.healthbar.updateHealthbar(this.health);
            this.bounce = 20;
            this.bounceBack();
            this.lastMovement = new Date().getTime();
            setTimeout(() => {
                this.cooldown = false;
                this.hurt = false;
                this.currentImage = 0;
            }, 1500);
        };
    }

    bounceBack() {
        setInterval(() => {
            if (this.World.keyboard.right || !this.World.keyboard.right && !this.World.keyboard.left) {
                this.x -= this.bounce;
                this.x = Math.round(this.x);
                this.bounce -= this.acceleration;
                this.updateStatusBarPosition(this.x, 100);
            } else if (this.World.keyboard.left) {
                this.x += this.bounce;
                this.x = Math.round(this.x);
                this.bounce -= this.acceleration;
                this.updateStatusBarPosition(this.x, 100);
            }
            if (this.bounce < 0) {
                this.bounce = 0;
            }
        }, 1000 / 60);

    }



    checkEnemyCollision(enemies) {
        enemies.forEach(enemy => {
            this.handleEnmyCollision(enemy, enemies)
        });
    }

    handleEnmyCollision(enemy, enemies) {
        if (!this.isColliding(enemy)) {
            return
        } else if (this.isFalling()) {
            this.smallJump();
            enemy.chickenDied(enemy, enemies)
            return
        } else {
            this.takeHit()
        }
    }

    checkItemCollision(coins, bottles) {
        coins.forEach(coin => {
            if (this.isColliding(coin)) {
                this.coins++;
                this.World.level.coinbar.updateCoinBar(coins, coin, this.coins);
            }
        });
        bottles.forEach(bottle => {
            if (this.isColliding(bottle)) {
                this.bottles++;
                this.World.level.bottlebar.updateBottleBar(bottles, bottle, this.bottles);
            }
        });
    }

};
