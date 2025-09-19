class Level {
    enemies;
    clouds;
    background;
    endboss;
    coins;
    bottles;
    healthbar;
    coinbar;
    bottlebar;
    levelEndX = 3500;
    Items = [];
    constructor(enemies, clouds, background, coins, bottles, endboss, healthbar, coinbar, bottlebar) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.background = background;
        this.endboss = endboss;
        this.coins = coins;
        this.bottles = bottles;
        this.healthbar = healthbar;
        this.coinbar = coinbar;
        this.bottlebar = bottlebar;
        this.initializeLevelObjects();
    };

    initializeLevelObjects() {
        this.Items = this.coins.concat(bottles);
        this.Items.forEach(item => this.positionItems(item));
        this.enemies.forEach(enemie => this.positionEnemies(enemie));
    };

    positionItems(item) {
        this.x = Math.random() * (2300 - 230) + 200;
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

    positionEnemies(enemie) {
        this.x = Math.random() * (2300 - 430) + 430;
        let checkX = this.enemies.find(e => Math.abs(e.x - this.x) < 150);
        if (checkX) {
            this.positionEnemies(enemie);
            return;
        }
        enemie.x = this.x;
    };
};