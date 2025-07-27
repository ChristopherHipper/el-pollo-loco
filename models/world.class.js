class World {
    keyboard = new Keyboard();
    ctx;
    canvas;
    character = new Character();
    enemies = [
        new Chicken(), 
        new Chicken(), 
        new Chicken()];
    clouds = [new Clouds()];
    background = [
        new Background('../assets/img/5_background/layers/air.png'),
        new Background('../assets/img/5_background/layers/3_third_layer/1.png'),
        new Background('../assets/img/5_background/layers/2_second_layer/1.png'),
        new Background('../assets/img/5_background/layers/1_first_layer/1.png')];


    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.draw();
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);


        this.addObjectsToMap(this.background);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.enemies);
        this.character.updateCharacterPosition();
        this.addToMap(this.character);


        requestAnimationFrame(() => this.draw());
    }

    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    }

    addToMap(object) {
        this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
    }
}