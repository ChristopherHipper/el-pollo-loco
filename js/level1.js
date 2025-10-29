let level1;
let coins = [new Coin(), new Coin(), new Coin(), new Coin(), new Coin(),];
let bottles = [new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle(),new Bottle(), new Bottle(), new Bottle()];
let enemies = [new Chicken(), new Chicken(), new Chicken(),new Chicken(), new Chicken(), new Chicken(), new SmallChicken(), new SmallChicken(), new SmallChicken(),new SmallChicken(), new SmallChicken(), new SmallChicken(),];

/**
 * Initializes and sets up the first game level (`level1`) with all its elements.
 * 
 * Creates a new `Level` instance containing:
 * - Enemies
 * - Clouds at specific positions
 * - Multiple background layers for parallax effect
 * - Coins and bottles for collection
 * - The Endboss
 * - UI elements: character health bar, coin bar, bottle bar, and Endboss health bar
 */
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

/**
 * Resets the current level to its initial state.
 * 
 * Re-initializes:
 * - Coins and bottles arrays with fresh instances
 * - Enemies array with new Chickens and SmallChickens
 * - The world level, including backgrounds, clouds, Endboss, and UI elements
 * 
 * Effectively restarts the level for a new game.
 */
function resetLevel() {
    coins = [new Coin(), new Coin(), new Coin(), new Coin(), new Coin(),];
    bottles = [new Bottle(), new Bottle(), new Bottle(), new Bottle(), new Bottle(),new Bottle(),new Bottle(),new Bottle()];
    enemies = [new Chicken(), new Chicken(), new Chicken(),new Chicken(), new Chicken(), new Chicken(), new SmallChicken(), new SmallChicken(), new SmallChicken(),new SmallChicken(), new SmallChicken(), new SmallChicken(),];
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
