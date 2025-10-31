class Character extends MovableObject {
    isIdle = true;
    bounce = 0;
    width = 150;
    height = 200;
    y = 230;
    lastMovement = new Date().getTime();
    coins = 0;
    bottles = 0;
    offset = {
        top: 80,
        width: 45,
        left: 30,
        height: 5
    };

    idleImages = [
        'assets/img/2_character_pepe/1_idle/idle/I-1.png',
        'assets/img/2_character_pepe/1_idle/idle/I-2.png',
        'assets/img/2_character_pepe/1_idle/idle/I-3.png',
        'assets/img/2_character_pepe/1_idle/idle/I-4.png',
        'assets/img/2_character_pepe/1_idle/idle/I-5.png',
        'assets/img/2_character_pepe/1_idle/idle/I-6.png',
        'assets/img/2_character_pepe/1_idle/idle/I-7.png',
        'assets/img/2_character_pepe/1_idle/idle/I-8.png',
        'assets/img/2_character_pepe/1_idle/idle/I-9.png',
        'assets/img/2_character_pepe/1_idle/idle/I-10.png',
    ];

    longIdleImages = [
        'assets/img/2_character_pepe/1_idle/long_idle/I-11.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-12.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-13.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-14.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-15.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-16.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-17.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-18.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-19.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    walkingImages = [
        'assets/img/2_character_pepe/2_walk/W-21.png',
        'assets/img/2_character_pepe/2_walk/W-22.png',
        'assets/img/2_character_pepe/2_walk/W-23.png',
        'assets/img/2_character_pepe/2_walk/W-24.png',
        'assets/img/2_character_pepe/2_walk/W-25.png',
        'assets/img/2_character_pepe/2_walk/W-26.png',
    ];

    preJumpImages = [
        'assets/img/2_character_pepe/3_jump/J-33.png',
    ];

    jumpingImages = [
        'assets/img/2_character_pepe/3_jump/J-34.png',
    ];

    fallImages = [
        'assets/img/2_character_pepe/3_jump/J-35.png',
        'assets/img/2_character_pepe/3_jump/J-36.png',
        'assets/img/2_character_pepe/3_jump/J-37.png',
        'assets/img/2_character_pepe/3_jump/J-38.png',
        'assets/img/2_character_pepe/3_jump/J-39.png',
    ];

    hurtImages = [
        'assets/img/2_character_pepe/4_hurt/H-41.png',
        'assets/img/2_character_pepe/4_hurt/H-42.png',
        'assets/img/2_character_pepe/4_hurt/H-43.png',
    ];

    deathImages = [
        'assets/img/2_character_pepe/5_dead/D-51.png',
        'assets/img/2_character_pepe/5_dead/D-52.png',
        'assets/img/2_character_pepe/5_dead/D-53.png',
        'assets/img/2_character_pepe/5_dead/D-54.png',
        'assets/img/2_character_pepe/5_dead/D-55.png',
        'assets/img/2_character_pepe/5_dead/D-56.png',
        'assets/img/2_character_pepe/5_dead/D-57.png',
    ];

    constructor() {
        super();
        this.loadImage('assets/img/2_character_pepe/1_idle/idle/I-1.png');
        this.loadImages(this.walkingImages);
        this.loadImages(this.jumpingImages);
        this.loadImages(this.preJumpImages);
        this.loadImages(this.hurtImages);
        this.loadImages(this.fallImages);
        this.loadImages(this.deathImages);
        this.loadImages(this.idleImages);
        this.loadImages(this.longIdleImages);
    };

    /**
     * Update the character for the current frame.
     *
     * Performs a death check and, if the character remains alive, advances
     * the character's state for this frame: records the delta time,
     * handles player input, updates animations, resolves bounce-back logic,
     * updates the level healthbar, applies gravity, and plays relevant sound effects.
     * @param {number} deltaTime - Time elapsed since the last update (in milliseconds).
     */
    update(deltaTime) {
        this.isDead();
        if (this.isAlive) {
            this.deltaTime = deltaTime;
            this.handleInput();
            this.playAnimation();
            this.bounceBack();
            this.world.level.healthbar.updateHealthbar(this.health);
            this.applyGravity();
            this.hanldeSoundEffects();
        };
    };

    /**
     * handles sound effects based on the character's current state.
     *
     * Checks states in priority order and triggers the appropriate sounds via the external
     * `soundEffects` object (expected to contain audio controls with `play()` / `pause()`):
     */
    hanldeSoundEffects() {
        if (this.isJumping() && !this.isHurt()) {
            soundEffects.jump.play();
        } else if (this.health > 0 && this.isMovingLeft() && !this.isAboveGround() && !this.isHurt() || this.health > 0 && this.isMovingRight() && !this.isAboveGround() && !this.isHurt()) {
            soundEffects.run.play();
        } else if (this.health <= 0) {
            soundEffects.run.pause();
            soundEffects.dying.play();
        } else if (this.isSleeping()) {
            soundEffects.snoring.play();
        } else if (this.isFalling() && this.y > 200) {
            soundEffects.landing.play();
        } else { soundEffects.run.pause(); };
    };

    /**
     * Handle current input state and update the character accordingly.
     *
     * Evaluates movement and jump input flags and triggers the corresponding
     * actions and side effects:
     */
    handleInput() {
        if (this.health > 0 && this.isMovingRight()) {
            this.moveRight();
            this.mirroring = false;
            this.lastMovement = new Date().getTime();
        };
        if (this.health > 0 && this.isMovingLeft()) {
            this.moveLeft();
            this.mirroring = true;
            this.lastMovement = new Date().getTime();
        };
        if (this.isJumping()) {
            setTimeout(() => {
                this.jump(22);
            }, 80);
            this.lastMovement = new Date().getTime();
        } else {
            this.isIdle = true;
        };
    };

    /**
     * Selects and plays the appropriate animation for the character based on its current state.
     *
     * Delegates rendering to this.animations(imagesArray, frameDurationMs, loopBoolean).
     *
     * Intended usage:
     *  - Called each update/frame to keep the visible animation in sync with the character state.
    */
    playAnimation() {
        if (this.health <= 0) this.animations(this.deathImages, 150, false);
        else if (this.isHurt()) this.animations(this.hurtImages, 100, true);
        else if (!this.isAboveGround() && this.world.keyboard.up) this.animations(this.preJumpImages, 100, true);
        else if (this.isAboveGround() && !this.isFalling()) this.animations(this.jumpingImages, 100, true);
        else if (this.isAboveGround() && this.isFalling()) this.animations(this.fallImages, 300, true);
        else if (this.world.keyboard.right || this.world.keyboard.left) this.animations(this.walkingImages, 100, true);
        else if (this.isSleeping()) this.animations(this.longIdleImages, 400, true);
        else {
            if (!this.isIdle) {
                this.currentImage = 0;
                this.isIdle = true;
            };
            this.animations(this.idleImages, 400, true);
        };
    };

    /**
     * Handle the character taking a hit.
     *
     * If the character is currently in a cooldown state, this method returns early and does nothing.
     * Otherwise it applies damage, applies a bounce effect and bounce-back behavior, updates the
     * last movement timestamp, and starts the hit cooldown.
     */
    takeHit(bounce) {
        if (this.cooldown) return;
        this.takeDamage();
        this.bounce = bounce;
        this.bounceBack();
        this.lastMovement = new Date().getTime();
        this.resetCooldown();
    };

    /**
     * Applies a horizontal "bounce back" displacement to the character based on current keyboard input.
     *
     * Relies on:
     * - this.world.keyboard.left, this.world.keyboard.right
     * - this.x, this.bounce, this.acceleration
     */
    bounceBack() {
        if (this.world.keyboard.right || !this.world.keyboard.right && !this.world.keyboard.left) {
            this.x -= this.bounce;
            this.x = Math.round(this.x);
            this.bounce -= this.acceleration;
        } else if (this.world.keyboard.left) {
            this.x += this.bounce;
            this.x = Math.round(this.x);
            this.bounce -= this.acceleration;
        };
        if (this.bounce < 0) {
            this.bounce = 0;
        };
    };

    /**
     * Apply gravity to the character by updating vertical position and velocity each frame.
     *
     * If the character is above the ground or currently moving upward (speedY > 0),
     * the method moves the character vertically by speedY and then updates speedY
     */
    characterGravity() {
        if (this.isAboveGround() || this.speedY > 0) {
            this.y -= this.speedY;
            this.speedY -= this.acceleration;
        } if (!this.isAboveGround() && this.isAlive) {
            this.speedY = 0;
            this.y = 230;
        };
    };

    /**
     * Determine whether the character should move to the right.
     *
     * @returns {boolean} True if the character can move right, otherwise false.
     */
    isMovingRight() {
        return this.world.keyboard.right && this.x < this.world.level.levelEndX && !this.isHurt();
    };

    /**
    * Determine whether the character should move to the left.
    *
    * @returns {boolean} True if the character can move left, otherwise false.
    */
    isMovingLeft() {
        return this.world.keyboard.left && this.x > -500 && !this.isHurt();
    };

    /**
    * Determine whether the character should jump.
    *
    * @returns {boolean} True if the character can move jump, otherwise false.
    */
    isJumping() {
        return this.world.keyboard.up && !this.isAboveGround() && !this.isHurt();
    };

    /**
    * Determine whether the character jump on enemy.
    *
    * @returns {boolean} True if the character jump on enemy.
    */
    jumpOnEnemy(enemy) {
        return this.isFalling() && enemy.isAlive && this.y + this.height - this.offset.height <= enemy.y + 50;
    };
};