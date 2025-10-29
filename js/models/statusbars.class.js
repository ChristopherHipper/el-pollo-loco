class HealthbarCharacter extends DrawableObject {
    height = 50;;
    width = 200;
    y = 0;
    x = 0;
    healthbarImages = [
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png',
    ];
    constructor() {
        super();
        this.loadImage('assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png');
        this.loadImages(this.healthbarImages);
    };

    /**
    * Updates the health bar image based on the current health value.
    * 
    * Selects the corresponding health bar image depending on the given health level,
    * where each image represents a 20% increment (from 0% to 100%).
    * If health is 0 or less, the empty health bar image is displayed.
    *
    * @param {number} health - The current health value of the entity (0–100).
    */
    updateHealthbar(health) {
        if (health > 0) {
            let index = health / 20;
            this.loadImage(this.healthbarImages[index]);
        } else {
            this.loadImage('assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png');
        };
    };
};

class CoinbarCharacter extends DrawableObject {
    height = 50;
    width = 200;
    y = 50;
    x = 0;
    coinhbarImages = [
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png',
    ];
    constructor() {
        super();
        this.loadImage('assets/img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png');
        this.loadImages(this.coinhbarImages);
    };

    /**
    * Updates the coin bar image based on the current number of collected coins.
    * 
    * Removes the current coin from the given coin array and updates the displayed
    * coin bar image according to the total collected coins. The maximum displayed
    * coin amount is capped at 5.
    *
    * @param {Array} coinsArr - The array containing all remaining coin objects.
    * @param {Object} CurrentCoin - The coin object that was just collected.
    * @param {number} ammountOfCoins - The total number of collected coins.
    */
    updateCoinBar(coinsArr, CurrentCoin, ammountOfCoins) {
        coinsArr.splice(coinsArr.indexOf(CurrentCoin), 1);
        if (ammountOfCoins > 5) {
            ammountOfCoins = 5;
        };
        this.loadImage(this.coinhbarImages[ammountOfCoins]);
    };
};

class BottlebarCharacter extends DrawableObject {
    height = 50;
    width = 200;
    y = 100;
    x = 0;
    bottlehbarImages = [
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png',
    ];
    constructor() {
        super();
        this.loadImage('assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png');
        this.loadImages(this.bottlehbarImages);
    };

    /**
    * Updates the bottle bar when a new bottle is collected.
    * 
    * Removes the collected bottle from the given bottle array and updates
    * the bottle bar display based on the total number of collected bottles.
    * The displayed amount is capped at a maximum of 5 bottles.
    *
    * @param {Array} bottleArr - The array containing all remaining bottle objects.
    * @param {Object} CurrentBottle - The bottle object that was just collected.
    * @param {number} amountOfBottles - The total number of collected bottles.
    */
    addBottleToBar(bottleArr, CurrentBottle, amountOfBottles) {
        bottleArr.splice(bottleArr.indexOf(CurrentBottle), 1);
        if (amountOfBottles > 5) {
            amountOfBottles = 5;
        };
        this.updateBottleBar(amountOfBottles);
    };

    /**
    * Updates the bottle bar image based on the current number of collected bottles.
    * 
    * Loads the corresponding bottle bar image that visually represents
    * the specified amount of collected bottles.
    *
    * @param {number} amountOfBottles - The total number of collected bottles (0–5).
    */
    updateBottleBar(amountOfBottles) {
        this.loadImage(this.bottlehbarImages[amountOfBottles]);
    };
};

class HealthbarEndboss extends DrawableObject {
    height = 50;
    width = 200;
    y = 80;
    x = 300;
    HealthbarEndbossImages = [
        'assets/img/7_statusbars/2_statusbar_endboss/orange/orange0.png',
        'assets/img/7_statusbars/2_statusbar_endboss/orange/orange20.png',
        'assets/img/7_statusbars/2_statusbar_endboss/orange/orange40.png',
        'assets/img/7_statusbars/2_statusbar_endboss/orange/orange60.png',
        'assets/img/7_statusbars/2_statusbar_endboss/orange/orange80.png',
        'assets/img/7_statusbars/2_statusbar_endboss/orange/orange100.png',
    ];
    constructor() {
        super();
        this.loadImage('assets/img/7_statusbars/2_statusbar_endboss/orange/orange100.png',);
        this.loadImages(this.HealthbarEndbossImages);
    };

    /**
    * Updates the position of the Endboss health bar based on detection status.
    * 
    * When the Character is not detected, the health bar follows the character’s position,
    * When detected, the health bar follows the endboss's positions.
    *
    * @param {number} x - The target x-coordinate for the health bar
    * @param {number} y - The target y-coordinate for the health bar
    * @param {boolean} detected - Whether the character has been detected by the Endboss.
    * @param {Object} character - The player character object, used for positioning when undetected.
    */
    updateEndbossHealtbarPosition(x, y, detected, character) {
        if (!detected) {
            this.y = 6;
            this.x = character.x + 400;
        } else {
            this.x = x;
            this.y = y - 20;
        };
    };

    /**
    * Updates the Endboss health bar image based on the current health value.
    * 
    * Selects and loads the appropriate image that represents the Endboss’s health level,
    * where each image corresponds to a 20% increment (from 0% to 100%).
    * If health is 0 or less, the empty health bar image is displayed.
    *
    * @param {number} health - The current health value of the Endboss (0–100).
    */
    updateEndbossHealthbar(health) {
        if (health > 0) {
            let index = health / 20;
            this.loadImage(this.HealthbarEndbossImages[index]);
        } else {
            this.loadImage('assets/img/7_statusbars/2_statusbar_endboss/orange/orange0.png');
        };
    };
};