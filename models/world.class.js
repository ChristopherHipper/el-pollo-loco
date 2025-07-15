class World {
    ctx;
    canvas;
    character = new Character();
    enemies = [new Chicken(),new Chicken(),new Chicken()];

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }
    

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.character.updateCharacterPosition();
        this.ctx.drawImage(this.character.img, this.character.x, this.character.y, this.character.height, this.character.width);
        requestAnimationFrame(() => this.draw());
    }
}