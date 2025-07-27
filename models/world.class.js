class World {
    ctx;
    canvas;
    keyboard;
    camera_x;
    character = new Character()
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken()];
    clouds = [
            new Clouds('../assets/img/5_background/layers/4_clouds/1.png',0),
            new Clouds('../assets/img/5_background/layers/4_clouds/2.png',720),
    ];
    background = [
        new Background('../assets/img/5_background/layers/air.png', 0),
        new Background('../assets/img/5_background/layers/3_third_layer/1.png', 0),
        new Background('../assets/img/5_background/layers/2_second_layer/1.png', 0),
        new Background('../assets/img/5_background/layers/1_first_layer/1.png', 0),
        new Background('../assets/img/5_background/layers/air.png', 720),
        new Background('../assets/img/5_background/layers/3_third_layer/2.png', 720),
        new Background('../assets/img/5_background/layers/2_second_layer/2.png', 720),
        new Background('../assets/img/5_background/layers/1_first_layer/2.png', 720),
    ];


    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard
        this.draw();
        this.setWorld()
    }


    setWorld() {
        this.character.World = this
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.background.forEach(bg => bg.updatePosition(this.camera_x));
        this.clouds.forEach(cloud => cloud.updatePosition(this.camera_x));
        this.ctx.translate(this.camera_x, 0)

        this.addObjectsToMap(this.background);
        this.addObjectsToMap(this.clouds);
        this.addObjectsToMap(this.enemies);
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
        if (object.mirroring) this.mirrorImage(object)
        this.ctx.drawImage(object.img, object.x, object.y, object.width, object.height);
        if (object.mirroring) this.mirrorImageBack(object)
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