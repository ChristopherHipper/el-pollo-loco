class Enemies extends MovableObject {
    offset = {
        top: 0,
        width: 0,
        left: 0,
        height: 0
    };
    speedX = 0.08 + Math.random() * 0.05;
    constructor() {
        super();
    };

    /**
     * Update the chicken for the current frame.
     *
     * Stores the provided delta time on the instance, advances the chicken's position to the left,
     * and triggers the walking animation while the chicken is alive.
     *
     * @param {number} deltaTime - Time elapsed since the last update (in milliseconds).
     */
    update(deltaTime) {
        this.deltaTime = deltaTime;
        this.moveLeft();
        if (this.isAlive) {
            this.animations(this.walkingImages, 100, true);
        };
    };

    /**
     * Handle the death sequence for a chicken enemy.
     *
     * Plays the appropriate death sound, marks the enemy as not alive, updates
     * the chicken's displayed image, stops horizontal movement,
     * and schedules removal of the enemy from the provided enemies array after a 1s delay.
     *
     * @param {Array<Object>} enemies - Array containing active enemy objects
     * @param {Object} enemy - The enemy object that died
     */
    chickenDied(enemies, enemy) {
        this.findSoundEffect(enemy);
        enemy.isAlive = false;
        this.loadImage(this.deadImage);
        this.speedX = 0;
        setTimeout(() => {
            enemies.splice(enemies.indexOf(enemy), 1);
        }, 1000);
    };

    /**
     * Plays the appropriate sound effect for the provided enemy instance.
     *
     *  - Chicken -> plays `soundEffects.normalChicken`
     *  - SmallChicken -> plays `soundEffects.smallChicken`
     * @param {Chicken|SmallChicken} enemy - The enemy instance to evaluate.
     */
    findSoundEffect(enemy) {
        if (enemy instanceof Chicken) {
            soundEffects.normalChicken.play();
        } else if (enemy instanceof SmallChicken) {
            soundEffects.smallChicken.play();
        };
    };
};

class Chicken extends Enemies {
    height = 80;
    width = 80;
    y = 345;
    walkingImages = [
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    deadImage = 'assets/img/3_enemies_chicken/chicken_normal/2_dead/dead.png';

    constructor() {
        super();
        this.loadImage('assets/img/3_enemies_chicken/chicken_normal/1_walk/2_w.png');
        this.loadImages(this.walkingImages);
        this.loadImage(this.deadImage);
    };
};

class SmallChicken extends Enemies {
    height = 60;
    width = 60;
    y = 360;
    walkingImages = [
        'assets/img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'assets/img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    deadImage = 'assets/img/3_enemies_chicken/chicken_small/2_dead/dead.png';

    constructor() {
        super();
        this.loadImage('assets/img/3_enemies_chicken/chicken_small/1_walk/2_w.png');
        this.loadImage(this.deadImage);
        this.loadImages(this.walkingImages);
    };
};