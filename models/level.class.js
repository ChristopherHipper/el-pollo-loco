class Level  {
    enemies;
    clouds;
    background;
    endboss;
    coins;
    bottle;
    levelEndX = 3500;
    constructor(enemies,clouds,background,coins,bottle, endboss) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.background = background;
        this.endboss = endboss;
        this.coins = coins;
        this.bottle = bottle;
    };
};