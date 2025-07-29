class Level  {
    enemies;
    clouds;
    background;
    endboss;
    coins;
    levelEndX = 3500;
    constructor(enemies,clouds,background,coins, endboss) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.background = background;
        this.endboss = endboss;
        this.coins = coins;
    };
};