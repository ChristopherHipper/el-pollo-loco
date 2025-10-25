let level1;
let coins = [new Coin(), new Coin(), new Coin(), new Coin(), new Coin(),];
let bottles = [new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle(),];
let enemies = [new Chicken(), new Chicken(), new Chicken(), new SmallChicken(), new SmallChicken(), new SmallChicken(),];

function setLevel() {
    level1 = new Level(
        enemies,
        [
            new Cloud('assets/img/5_background/layers/4_clouds/1.png', 0),
            new Cloud('assets/img/5_background/layers/4_clouds/2.png', 720),
        ],
        [
            new Background('assets/img/5_background/layers/air.png', 0),
            new Background('assets/img/5_background/layers/3_third_layer/1.png', 0),
            new Background('assets/img/5_background/layers/2_second_layer/1.png', 0),
            new Background('assets/img/5_background/layers/1_first_layer/1.png', 0),
            new Background('assets/img/5_background/layers/air.png', 720),
            new Background('assets/img/5_background/layers/3_third_layer/2.png', 720),
            new Background('assets/img/5_background/layers/2_second_layer/2.png', 720),
            new Background('assets/img/5_background/layers/1_first_layer/2.png', 720),
        ],
        coins,
        bottles,
        new Endboss(),
        new HealthbarCharacter(),
        new CoinbarCharacter(),
        new BottlebarCharacter(),
        new HealthbarEndboss(),
    );
};

function resetLevel() {
    coins = [new Coin(), new Coin(), new Coin(), new Coin(), new Coin(),];
    bottles = [new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle(),];
    enemies = [new Chicken(), new Chicken(), new Chicken(), new SmallChicken(), new SmallChicken(), new SmallChicken(),];
    world.level = new Level(
        enemies,
        [
            new Cloud('assets/img/5_background/layers/4_clouds/1.png', 0),
            new Cloud('assets/img/5_background/layers/4_clouds/2.png', 720),
        ],
        [
            new Background('assets/img/5_background/layers/air.png', 0),
            new Background('assets/img/5_background/layers/3_third_layer/1.png', 0),
            new Background('assets/img/5_background/layers/2_second_layer/1.png', 0),
            new Background('assets/img/5_background/layers/1_first_layer/1.png', 0),
            new Background('assets/img/5_background/layers/air.png', 720),
            new Background('assets/img/5_background/layers/3_third_layer/2.png', 720),
            new Background('assets/img/5_background/layers/2_second_layer/2.png', 720),
            new Background('assets/img/5_background/layers/1_first_layer/2.png', 720),
        ],
        coins,
        bottles,
        new Endboss(),
        new HealthbarCharacter(),
        new CoinbarCharacter(),
        new BottlebarCharacter(),
        new HealthbarEndboss(),
    );
};
