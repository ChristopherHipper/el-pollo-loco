const level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new SmallChicken(),
        new SmallChicken(),
        new SmallChicken(),
    ],
    [
        new Clouds('../assets/img/5_background/layers/4_clouds/1.png', 0),
        new Clouds('../assets/img/5_background/layers/4_clouds/2.png', 720),
    ],
    [
        new Background('../assets/img/5_background/layers/air.png', 0),
        new Background('../assets/img/5_background/layers/3_third_layer/1.png', 0),
        new Background('../assets/img/5_background/layers/2_second_layer/1.png', 0),
        new Background('../assets/img/5_background/layers/1_first_layer/1.png', 0),
        new Background('../assets/img/5_background/layers/air.png', 720),
        new Background('../assets/img/5_background/layers/3_third_layer/2.png', 720),
        new Background('../assets/img/5_background/layers/2_second_layer/2.png', 720),
        new Background('../assets/img/5_background/layers/1_first_layer/2.png', 720),
    ],
    [
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
        new Coins(),
    ],
        [
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
        new Bottle(),
    ],
    new Endboss(),
    new HealthbarCharacter(),
    new CoinbarCharacter(),
    new BottlebarCharacter(),

)