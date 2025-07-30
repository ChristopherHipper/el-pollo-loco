class Level  {
    enemies;
    clouds;
    background;
    endboss;
    coins;
    bottle;
    healthbar;
    coinbar;
    bottlebar;
    levelEndX = 3500;
    constructor(enemies,clouds,background,coins,bottle, endboss, healthbar, coinbar, bottlebar) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.background = background;
        this.endboss = endboss;
        this.coins = coins;
        this.bottle = bottle;
        this.healthbar = healthbar
        this.coinbar = coinbar
        this.bottlebar = bottlebar
    };
};