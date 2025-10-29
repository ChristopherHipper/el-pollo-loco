class ThrowableObject extends MovableObject {
    speedX = 15;
    speedY = 20;
    width = 80;
    height = 80;
    splashed = false;

    rotateImages = [
        'assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'assets/img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    splashImages = [
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'assets/img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    constructor(x, y, mirroring, throwableBottles) {
        super();
        this.mirroring = mirroring;
        this.throwableBottles = throwableBottles;
        this.x = x;
        this.y = y;
        this.loadImage('assets/img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.splashImages);
        this.loadImages(this.rotateImages);
    };

    /**
    * Handles the behavior of a thrown bottle, including collisions and physics updates.
    * 
    * Checks for collisions with enemies, the Endboss, and the ground.
    * Also triggers splash effects and applies gravity for realistic motion.
    *
    * @param {number} deltaTime - The elapsed time since the last frame, used for physics calculations.
    * @param {Object} level - The current game level context containing objects and environment data.
    * @param {Array} throwableBottles - The array of active throwable bottle objects.
    */
    throw(deltaTime, level, throwableBottles) {
        this.deltaTime = deltaTime;
        this.level = level;
        this.throwableBottles = throwableBottles;
        this.hitEnemy();
        this.hitEndboss();
        this.hitGround();
        this.splash();
        this.applyGravity();
    };

    /**
    * Handles the splash animation and cleanup for a thrown bottle.
    * 
    * If the bottle has splashed, plays the splash sound effect, triggers the splash animation,
    * and removes the bottle from the active throwable bottles array after a short delay.
    * Otherwise, plays the rotation animation while the bottle is still in the air.
    */
    splash() {
        if (this.splashed) {
            soundEffects.splash.play();
            this.animations(this.splashImages, 50, true);
            setTimeout(() => {
                this.throwableBottles.splice(this.throwableBottles.indexOf(this), 1);
                this.splashed = false;
            }, 100);
        } else {
            this.animations(this.rotateImages, 50, true);
        };
    };

    /**
    * Detects when the thrown bottle hits the ground.
    * 
    * If the bottle’s position reaches the ground level,
    * it marks the bottle as splashed to trigger the splash animation and removal.
    */
    hitGround() {
        if (this.y >= 360) {
            this.splashed = true;
        };
    };

    /**
    * Checks for collisions between the thrown bottle and enemies.
    * 
    * Iterates through all enemies in the current level and, if a collision occurs
    * with a living enemy, triggers the enemy’s death behavior (`chickenDied`)
    * and marks the bottle as splashed to start the splash animation and removal.
    */
    hitEnemy() {
        this.level.enemies.forEach(enemy => {
            if (this.isColliding(enemy) && enemy.isAlive) {
                this.level.enemies[enemies.indexOf(enemy)].chickenDied(enemies, enemy);
                this.splashed = true;
            };
        });
    };

    /**
    * Checks for a collision between the thrown bottle and the Endboss.
    * 
    * If a collision occurs, triggers the Endboss's `takeHit` method
    * and marks the bottle as splashed for animation and removal.
    */
    hitEndboss() {
        if (this.isColliding(this.level.endboss)) {
            this.level.endboss.takeHit();
            this.splashed = true;
        };
    };

    /**
    * Applies gravity and horizontal movement to a throwable object.
    * 
    * Adjusts the object's horizontal position based on its mirroring direction.
    * Updates the vertical position using the current vertical speed
    * and decreases `speedY` by the acceleration to simulate gravity.
    * Stops movement when the object reaches the ground level (y ≥ 360).
    */
    throwableObjectGravity() {
        if (this.mirroring) {
            this.x -= this.speedX;
        };
        if (!this.mirroring) {
            this.x += this.speedX;
        };
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
        if (this.y >= 360) {
            this.speedY = 0;
            this.speedX = 0;
        };
    };
};