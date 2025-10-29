class MovableObject extends DrawableObject {
    damage = 20;
    deltaTime;
    gravityTimer = 0;
    frameTimer = 0;
    frameDuration = 100;
    deathTimerStarted = false;
    width = 720;
    x = 0;
    speedY = 0;
    speedX = 3;
    health = 100;
    acceleration = 2.5;
    hurt = false;
    cooldown = false;
    mirroring = false;
    isAlive = true;
    offset = {
        top: 0,
        width: 0,
        left: 0,
        height: 0
    };

    /**
     * Apply damage to this object.
     *
     * Decreases this.health by this.damage and marks the object as recently damaged by
     * setting this.cooldown and this.hurt to true.
     */
    takeDamage() {
        this.cooldown = true;
        this.hurt = true;
        this.health -= this.damage;
    };

    /**
     * Reset temporary damage and cooldown states after short delays.
     *
     * Starts two timers and stores their IDs on the instance:
     *  - After ~500ms the `hurt` flag is cleared.
     *  - After ~1000ms the `cooldown` flag is cleared and `currentImage` is reset to 0.
     */
    resetCooldown() {
        this.hurtDelay = setTimeout(() => {
            this.hurt = false;
        }, 500);
        this.cooldownDelay = setTimeout(() => {
            this.cooldown = false;
            this.currentImage = 0;
        }, 1000);
    };

    /**
     * Returns when a movable object is currently in a "hurt" state.
     *
     * @returns {boolean} True if the object is hurt otherwise false.
     */
    isHurt() {
        return this.hurt;
    };

    /**
     * Initiates a jump for this movable object by resetting its animation frame index and applying a vertical force.
     *
     * @param {number} force - Initial vertical speed to apply.
     */
    jump(force) {
        this.currentImage = 0;
        this.speedY = force;
    };

    /**
    * Returns when a movable object is currently in a "falling" state.
    *
    * @returns {boolean} True if the object sppedY is less then 0 otherwise false.
    */
    isFalling() {
        return this.speedY < 0;
    };

    /**
    * Returns when a movable object is currently above the ground.
    *
    * @returns {boolean} True if the object y is less then 230 (ground) otherwise false.
    */
    isAboveGround() {
        return this.y < 230;
    };

    /**
    * Move the object left by its horizontal speed.
    *
    * Decreases this.x by this.speedX, effectively translating the object leftwards
    */
    moveLeft() {
        this.x -= this.speedX;
    };

    /**
    * Move the object right by its horizontal speed.
    *
    * Increases this.x by this.speedX, effectively translating the object righttwards
    */
    moveRight() {
        this.x += this.speedX;
    };

    /**
     * Determine whether this movable object is colliding with another rectangular object.
     *
     * The collision test compares axis-aligned bounding boxes adjusted by each object's
     * offset values.
     *
     * @param {object} - The other object to test for collision. Expected to have numeric x/y position,
     * width/height dimensions, and an offset object describing adjustments to its bounding box.
     * @returns {boolean} True if the adjusted bounding boxes overlap (collision), false otherwise.
     */
    isColliding(object) {
        return this.x + this.width - this.offset.width > object.x + object.offset.width &&
            this.y + this.height - this.offset.height > object.y + this.offset.height &&
            this.x + this.offset.left < object.x + object.width - object.offset.width &&
            this.y + this.offset.top < object.y + object.height - object.offset.height;
    };

    /**
     * Check whether the object is considered "sleeping" due to inactivity.
     *
     * Compares the current time against the instance's `lastMovement` timestamp
     *
     * @returns {boolean} True when the object has been inactive for more than 16 seconds; otherwise false.
     */
    isSleeping() {
        const now = new Date().getTime();
        return (now - this.lastMovement > 16000);
    };

    /**
     * Adjusts the object's x position to wrap it horizontally relative to the camera.
     *
     * @param {number} camera_x - Horizontal camera offset (pixels). Positive values shift the world left.
     */
    updateCameraPosition(camera_x) {
        if (this.x + this.width + camera_x < 0) {
            this.x += this.width * 2;
        };
        if (this.x + camera_x > this.width) {
            this.x -= this.width * 2;
        };
    };

    /**
     * Check whether this object is dead and, if so, initiate and progress its death sequence.
     *
     * When this.health <= 0 this method:
     * - calls this.initDeathTimer() to initialize the death timer,
     * - calls this.updateDeathTimer() to advance/update the death timer,
     * - calls this.handelDeath() to perform death handling (animations, cleanup, etc.),
     * - calls this.handelGameEnd() to trigger end-of-game logic if applicable.
     */
    isDead() {
        if (this.health <= 0) {
            this.initDeathTimer();
            this.updateDeathTimer();
            this.handelDeath();
            this.handelGameEnd();
        };
    };

    /**
     * Evaluate and handle end-of-game logic for this movable object.
     *
     * If the object's death timer has reached or exceeded 2000 milliseconds and the death has not
     * already been handled, this method will:
     *  - call this.world.gameEnd('win') when the object is an instance of Endboss,
     *  - call this.world.gameEnd('lose') when the object is an instance of Character,
     *  - set this.deathHandled to true to prevent multiple triggers.
     */
    handelGameEnd() {
        if (this.deathTimer >= 2000 && !this.deathHandled) {
            if (this instanceof Endboss) this.world.gameEnd('win');
            if (this instanceof Character) this.world.gameEnd('lose');
            this.deathHandled = true;
        };
    };

    /**
     * Evaluate and apply death state when the object's death timer reaches the threshold.
     *
     * If this.deathTimer is greater than or equal to 600 (ticks/frames), the object is
     * marked as not alive and nudged downwards by 2 units
     */
    handelDeath() {
        if (this.deathTimer >= 600) {
            this.isAlive = false;
            this.y += 2;
        };
    };

    /**
     * Increment the object's internal death timer by the current deltaTime and return the new value.
     *
     * @returns {number} The updated death timer
     */
    updateDeathTimer() {
        this.deathTimer += this.deltaTime;
        return this.deathTimer;
    };

    /**
     * Initialize the death timer for the object if it hasn't been started yet.
     *
     * On first invocation this method sets `this.deathTimer` to 0 and marks
     * `this.deathTimerStarted` as true. Subsequent calls are idempotent and
     * will not reset the timer.
     */
    initDeathTimer() {
        if (!this.deathTimerStarted) {
            this.deathTimer = 0;
            this.deathTimerStarted = true;
        };
    };

    /**
     * Orchestrates the object's animation pipeline: prepares image cache, updates timing,
     * advances the animation frame, and renders the current frame.
     *
     * This method ensures the provided images are available in the corrected image cache,
     * updates or reads FPS/timing information, progresses the internal animation frame
     * according to the given duration and looping policy, and draws the resulting frame.
     *
     * @param {Array} imageArray - Array of image elements.
     * @param {number} frameDuration - Duration each frame should be displayed.
     * @param {boolean} [loop=true] - Whether the animation should loop back to the start after reaching the last frame.
     */
    animations(imageArray, frameDuration, loop = true) {
        this.getCorrectedImageCache(imageArray);
        this.getFPS();
        this.handelAnimationFrame(imageArray, frameDuration, loop);
        this.drawAnimation(imageArray);
    };

    /**
     * Updates the object's displayed image by selecting a path from the provided array
     * using this.currentImage as the index, then assigning the corresponding preloaded
     * image from this.images to this.img.
     *
     * @param {Array} imageArray - Array of image path keys.
     */
    drawAnimation(imageArray) {
        let path = imageArray[this.currentImage];
        this.img = this.images[path];
    };

    /**
     * Advance the current animation frame when the accumulated frame timer reaches the provided duration.
     *
     * This method checks this.frameTimer against frameDuration. If the timer has reached or
     * exceeded the duration, the timer is reset to 0 and this.currentImage is advanced.
     * When loop is true the index wraps around using the length of imageArray; when loop is false
     * the index is simply incremented (no wrapping — callers should handle bounds if needed).
     * @param {Array} imageArray - Array of image elements.
     * @param {number} frameDuration - Duration each frame should be displayed.
     * @param {boolean} [loop=true] - Whether the animation should loop back to the start after reaching the last frame.
     */
    handelAnimationFrame(imageArray, frameDuration, loop) {
        if (this.frameTimer >= frameDuration) {
            this.frameTimer = 0;
            loop ? this.currentImage = (this.currentImage + 1) % imageArray.length : this.currentImage = this.currentImage + 1;
        };
    };

    /**
    * Updates the current image cache if a new image array is provided.
    * Resets the current image index and frame timer when the image array changes.
    *
    * @param {Array} imageArray - Array of image elements.
    */
    getCorrectedImageCache(imageArray) {
        if (this.currentImageArray != imageArray) {
            this.currentImageArray = imageArray;
            this.currentImage = 0;
            this.frameTimer = 0;
        };
    };

    /**
    * Increments the frame timer by the elapsed time and returns it.
    *
    * @returns {number} The updated frame timer value.
    */
    getFPS() {
        this.frameTimer += this.deltaTime;
        return this.frameTimer;
    };

    /**
    * Applies gravity to the object at regular intervals.
    * 
    * Increases the gravity timer by the elapsed time (`deltaTime`) and,
    * if the timer exceeds the defined interval, applies gravity based on the object type:
    * - Calls `characterGravity()` if the object is a Character.
    * - Calls `throwableObjectGravity()` if the object is a ThrowableObject.
    * 
    * Resets the gravity timer after applying gravity to ensure consistent timing.
    */
    applyGravity() {
        const gravityInterval = 50;
        this.gravityTimer += this.deltaTime;
        if (this.gravityTimer >= gravityInterval) {
            if (this instanceof Character) {
                this.characterGravity();
            } else if (this instanceof ThrowableObject) {
                this.throwableObjectGravity();
            };
            this.gravityTimer = 0;
        };
    };

    /**
    * Draws a red offset border around the object for debugging purposes.
    * 
    * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw on.
    */
    /*     drawOffsetBorder(ctx) {
            if (this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof Endboss || this instanceof Coin || this instanceof Bottle) {
                ctx.beginPath();
                ctx.strokeStyle = 'red';
                ctx.lineWidth = 3;
                ctx.rect(this.x + this.offset.left, this.y + this.offset.top, this.width - this.offset.left - this.offset.width, this.height - this.offset.top - this.offset.height);
                ctx.stroke();
            };
        }; */
};
