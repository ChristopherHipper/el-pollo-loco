class Enemies extends MovableObject {
    offset = {
        top: 5,
        width: 10,
        left: 5,
        height: 0
    };
    speedX = 20 + Math.random() * 20;
    constructor() {
        super();
    };

    /**
     * Update the chicken for the current frame.
     *
     * Stores the provided delta time on the instance, advances the chicken's position to the left,
     * and triggers the walking animation while the chicken is alive.
     * If the chicken is an SmallChicken it init the applyGravity() and if
     * the SmallChicken is alive it calls jump()
     * @param {number} deltaTime - Time elapsed since the last update (in milliseconds).
     */
    update(deltaTime) {
        this.deltaTime = deltaTime;
        this.moveLeft();
        if (this.isAlive) this.animations(this.walkingImages, 100, true);
        if (this instanceof SmallChicken){
            this.applyGravity();
            if (this.isAlive) this.jump();
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
    jumpTimer = 0;
    jumpIntervall = Math.floor(1000 + Math.random() * 2001);
    acceleration = 3.5;
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

    /**
    * Makes the character automatically jump at fixed time intervals.
    * 
    * - Uses a timer (`jumpTimer`) to measure time between jumps.
    * - When the timer exceeds the defined `jumpIntervall`, 
    *   the character performs a jump with a fixed jump strength (30).
    * - Resets the timer after each jump.
    */
    jump(){
        this.jumpTimer += this.deltaTime
        if (this.jumpTimer >= this.jumpIntervall) {
            super.jump(30)
            this.jumpTimer = 0
        };
    };

    /**
    * Simulates gravity for the chicken character.
    * 
    * - Updates the vertical position (`y`) based on the current vertical speed (`speedY`).
    * - Applies acceleration to simulate the effect of gravity.
    * - Stops the downward movement when the chicken reaches the ground (y >= 360).
    */
    chickenGravity() {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
        if (this.y >= 360) {
            this.y = 360
            this.speedY = 0;
        };
    };
};