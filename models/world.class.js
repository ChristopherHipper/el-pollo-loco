class World {
    ctx;
    canvas;
    character = new Character();
    enemies = [new Chicken(), new Chicken(), new Chicken()];
    clouds = [new Clouds()];
    firstLayer = [new FirstLayer()];
    secondLayer = [new SecondLayer()];
    thirdLayer = [new ThirdLayer()];

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (let layer of this.thirdLayer) {
            this.ctx.drawImage(layer.img, layer.x, layer.y, layer.width, layer.height);
        }
        for (let layer of this.secondLayer) {
            this.ctx.drawImage(layer.img, layer.x, layer.y, layer.width, layer.height);
        }
        for (let layer of this.firstLayer) {
            this.ctx.drawImage(layer.img, layer.x, layer.y, layer.width, layer.height);
        }


        for (let enemy of this.enemies) {
            this.ctx.drawImage(enemy.img, enemy.x, enemy.y, enemy.width, enemy.height);
            enemy.move();
        }
        for (let cloud of this.clouds) {
            this.ctx.drawImage(cloud.img, cloud.x, cloud.y, cloud.width, cloud.height);
        }
        this.character.updateCharacterPosition();
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.width, this.character.height);

        requestAnimationFrame(() => this.draw());
    }
}