class World {
    lastFrameTime = new Date().getTime();
    camera_x;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.level = level1;
        this.keyboard = keyboard
        this.character = new Character();
        this.throwableBottles = [];
        this.lastThrow = 0;
        this.loop();
    };

    loop() {
        let now = new Date().getTime();
        let deltaTime = now - this.lastFrameTime;
        this.lastFrameTime = now;
        this.checkCollision();
        this.checkThrowableObject();
        this.character.update(deltaTime, this.keyboard, this.level);
        this.level.endboss.update(deltaTime, this.level, this.character);
        this.throwableBottles.forEach(b => b.throw(deltaTime, this.level, this.throwableBottles));
        this.level.enemies.forEach(e => e.update(deltaTime));
        this.level.coins.forEach(c => c.moveAnmation(deltaTime));
        this.camera_x = -this.character.x + 100;
        this.draw();

        requestAnimationFrame(() => this.loop());
    };

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);

        this.level.background.forEach(bg => bg.updateCameraPosition(this.camera_x));
        this.level.clouds.forEach(cloud => cloud.updateCameraPosition(this.camera_x));

        this.addObjectsToMap(this.level.background);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableBottles);

        this.addToMap(this.level.endboss);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.level.healthbar);
        this.addToMap(this.level.coinbar);
        this.addToMap(this.level.bottlebar);
        this.ctx.translate(this.camera_x, 0);

        this.ctx.translate(-this.camera_x, 0);
    };

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    };

    addToMap(object) {
        if (object.mirroring) this.mirrorImage(object);
        object.draw(this.ctx);
        if (typeof object.drawBorder === 'function') object.drawBorder(this.ctx);
        if (typeof object.drawOffsetBorder === 'function') object.drawOffsetBorder(this.ctx);
        if (object.mirroring) this.mirrorImageBack(object);
    };

    mirrorImage(object) {
        this.ctx.save();
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1, 1);
        object.x = object.x * -1;
    };

    mirrorImageBack(object) {
        object.x = object.x * -1;
        this.ctx.restore();
    };

    checkCollision() {
        this.checkEnemyCollision(this.level.enemies);
        this.checkItemCollision(this.level.coins, this.level.bottles);
    };

    checkEnemyCollision(enemies) {
        enemies.forEach(enemy => {
            this.handleEnmyCollision(enemies, enemy);
        });
    };

    handleEnmyCollision(enemies, enemy) {
        if (!this.character.isColliding(enemy)) {
            return;
        } else if (this.character.isFalling() && enemy.isAlive) {
            this.character.jump(22);
            this.level.enemies[enemies.indexOf(enemy)].chickenDied(enemies, enemy);
            return;
        } else if (enemy.isAlive) {
            this.character.takeHit();
        };
    };

    checkItemCollision(coins, bottles) {
        coins.forEach(coin => {
            if (this.character.isColliding(coin)) {
                this.character.coins++;
                this.level.coinbar.updateCoinBar(coins, coin, this.character.coins);
            };
        });
        bottles.forEach(bottle => {
            if (this.character.isColliding(bottle)) {
                this.character.bottles++;
                this.level.bottlebar.addBottleToBar(bottles, bottle, this.character.bottles);
            };
        });
    };

    checkThrowableObject() {
        let now = new Date().getTime();
        if (this.character.bottles <= 0) {
            return;
        } else if (this.keyboard.throw && !this.character.isHurt() && now - this.lastThrow > 1400) {
            let bottle = new ThrowableObject(this.character.x + this.character.offset.width, this.character.y, this.character.mirroring);
            this.throwableBottles.push(bottle);
            this.character.bottles--;
            this.level.bottlebar.updateBottleBar(this.character.bottles);
            this.lastThrow = now;
        };
    };
};