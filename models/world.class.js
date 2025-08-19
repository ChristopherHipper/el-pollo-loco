class World {
    character = new Character()
    level = level1;
    ctx;
    canvas;
    keyboard;
    camera_x;



    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard
        this.draw();
        this.setWorld()
        this.checkCollisions();
    }

    setWorld() {
        this.character.World = this
        this.character.playAnimation();
    }

    checkCollisions() {
        this.character.checkEnemyCollisions(this.level.enemies);
        this.character.checkItemCollisions(this.level.coins, this.level.bottle);
        requestAnimationFrame(() => this.checkCollisions());
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.level.background.forEach(bg => bg.updateCameraPosition(this.camera_x));
        this.level.clouds.forEach(cloud => cloud.updateCameraPosition(this.camera_x));
        this.ctx.translate(this.camera_x, 0)

        this.addObjectsToMap(this.level.background);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottle);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.level.endboss);
        this.addToMap(this.level.healthbar);
        this.addToMap(this.level.coinbar);
        this.addToMap(this.level.bottlebar);
        this.addToMap(this.character);

        this.ctx.translate(-this.camera_x, 0)

        requestAnimationFrame(() => this.draw());
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    addToMap(object) {
        if (object.mirroring) this.mirrorImage(object);
        object.draw(this.ctx);
        if (typeof object.drawBorder === 'function') object.drawBorder(this.ctx);
        if (typeof object.drawOffsetBorder === 'function') object.drawOffsetBorder(this.ctx);
        if (object.mirroring) this.mirrorImageBack(object);
    }

    mirrorImage(object) {
        this.ctx.save();
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1, 1);
        object.x = object.x * -1
    }
    mirrorImageBack(object) {
        object.x = object.x * -1
        this.ctx.restore()
    }
}