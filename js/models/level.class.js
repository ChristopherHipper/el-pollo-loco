class Level {
    levelEndX = 3450;
    Items = [];
    constructor(enemies, clouds, background, coins, bottles, endboss, healthbar, coinbar, bottlebar, endbossBar) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.background = background;
        this.endboss = endboss;
        this.coins = coins;
        this.bottles = bottles;
        this.healthbar = healthbar;
        this.coinbar = coinbar;
        this.bottlebar = bottlebar;
        this.endbossBar = endbossBar;
        this.initializeLevelObjects();
    };

    /**
     * Sets the Level End X on the Endboss X.
     *
     * If the Endboss is active. The Level End X position is settet to the Endboss X Position
     */
    uppdateLevelRange(){
        if (this.endboss.active) {
            this.levelEndX = this.endboss.x;
        };
    };

    /**
     * Initialize level objects by aggregating collectibles and positioning all objects.
     *
     * Combines the level's coin and bottle collections into `this.Items`, then iterates
     * over the resulting items and enemies to assign their positions using
     * `this.positionItems` and `this.positionEnemies`.
     *
     */
    initializeLevelObjects() {
        this.Items = this.coins.concat(bottles);
        this.Items.forEach(item => this.positionItems(item));
        this.enemies.forEach(enemie => this.positionEnemies(enemie));
    };

    /**
     * Randomly positions an item within the level while avoiding horizontal overlap with existing items.
     *
     * - If any existing item in this.Items has a horizontal distance less than 120px from the chosen x,
     *   the method retries (via recursion) until a non-colliding x coordinate is found.
     * - Finally assigns the computed coordinates to item.x and item.y.
     *
     * @param {Object} item - The item to position.
     */
    positionItems(item) {
        this.x = Math.random() * (3200 - 230) + 400;
        this.y = Math.random() * (200 - 60) + 60;
        if (item instanceof Bottle) {
            this.y = 350;
        };
        let checkX = this.Items.find(i => Math.abs(i.x - this.x) < 120);
        if (checkX) {
            this.positionItems(item);
            return;
        };
        item.x = this.x;
        item.y = this.y;
    };

    /**
    * Randomly positions an enemy within the level while avoiding horizontal overlap with existing enemies.
    *
    * - If any existing enemy in this.enemies has a horizontal distance less than 150px from the chosen x,
    *   the method retries (via recursion) until a non-colliding x coordinate is found.
    * - Finally assigns the computed coordinates to item.x.
    *
    * @param {Object} item - The enemy to position.
     */
    positionEnemies(enemie) {
        this.x = Math.random() * (3500 - 430) + 630;
        let checkX = this.enemies.find(e => Math.abs(e.x - this.x) < 150);
        if (checkX) {
            this.positionEnemies(enemie);
            return;
        };
        enemie.x = this.x;
    };
};