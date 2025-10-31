class World {
    lastFrameTime = new Date().getTime();
    camera_x;
    gameLoop;
    gameRunning = true;
    levelOpen = false;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.level = level1;
        this.keyboard = keyboard
        this.character = new Character();
        this.throwableBottles = [];
        this.lastThrow = 0;
        this.setWorld();
        this.loop();
    };

    /**
    * Links the current world instance to the character and the Endboss.
    * 
    * Sets references so both the character and the Endboss can access
    * world properties and interact with other world objects.
    */
    setWorld() {
        this.character.world = this;
        if (this.level.endboss) {
            this.level.endboss.world = this;
        };
    };

    /**
    * Main game loop that updates and renders the world each frame.
    *   
    * Calculates the time difference (`deltaTime`) between frames, performs collision
    * and throwable object checks, updates game logic, and redraws the scene.
    * Continues looping using `requestAnimationFrame` as long as the game is running.
    */
    loop() {
        if (!this.gameRunning) return;
        let now = new Date().getTime();
        let deltaTime = now - this.lastFrameTime;
        this.lastFrameTime = now;
        this.checkCollision();
        this.checkThrowableObject();
        this.update(deltaTime);
        this.draw();
        this.openWorld();
        this.gameLoop = requestAnimationFrame(() => this.loop());
    };

    /**
    * Updates all dynamic game elements for the current frame.
    * 
    * Refreshes positions, animations, and logic for the character, Endboss,
    * throwable bottles, enemies, coins, and clouds using the provided `deltaTime`.
    * Also updates the camera position to follow the character.
    *
    * @param {number} deltaTime - The elapsed time since the last frame, used for animation and movement updates.
    */
    update(deltaTime) {
        this.character.update(deltaTime, this.keyboard, this.level);
        this.level.endboss.update(deltaTime, this.level, this.character);
        if (this.levelOpen) this.level.uppdateLevelRange();
        this.throwableBottles.forEach(b => b.throw(deltaTime, this.level, this.throwableBottles));
        this.level.enemies.forEach(e => e.update(deltaTime));
        this.level.coins.forEach(c => c.moveAnmation(deltaTime));
        this.level.clouds.forEach(c => c.moveAnmation());
        this.camera_x = -this.character.x + 100;
    };

    /**
    * Renders all game elements on the canvas for the current frame.
    * 
    * Clears the previous frame, adjusts the camera position, and draws all
    * world objects including the background, clouds, enemies, coins, bottles,
    * throwable bottles, the Endboss, and the character. 
    * Also renders HUD elements like health, coin, and bottle bars.
    * 
    * Uses `translate()` to simulate camera movement relative to the character.
    */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.level.background.forEach(bg => bg.updateCameraPosition(this.camera_x));
        this.level.clouds.forEach(cloud => cloud.updateCameraPosition(this.camera_x));
        this.addObjectsToMap(this.level.background);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.throwableBottles);
        this.addToMap(this.level.endboss);
        if (this.level.endboss.active) this.addToMap(this.level.endbossBar);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.level.healthbar);
        this.addToMap(this.level.coinbar);
        this.addToMap(this.level.bottlebar);
        this.addToMap(this.level.bottlebar);
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);
    };

    /**
    * Adds an array of drawable game objects to the canvas.
    * 
    * Iterates through all objects in the given array and calls `addToMap()`
    * for each one to render it on the canvas.
    *
    * @param {Array<Object>} objects - The array of game objects to be drawn.
    */
    addObjectsToMap(objects) {
        objects.forEach(object => {
            this.addToMap(object);
        });
    };

    /**
    * Draws a single game object on the canvas, handling mirroring if needed.
    * 
    * If the object has `mirroring` enabled, flips it horizontally before drawing
    * and restores the original orientation afterward. Calls the object's `draw` method
    * to render it. (Optional: can draw offset borders for debugging.)
    *
    * @param {Object} object - The game object to be drawn on the canvas.
    */
    addToMap(object) {
        if (object.mirroring) this.mirrorImage(object);
        object.draw(this.ctx);
        //if (typeof object.drawOffsetBorder === 'function') object.drawOffsetBorder(this.ctx);
        if (object.mirroring) this.mirrorImageBack(object);
    };

    /**
    * Flips a game object horizontally on the canvas for mirroring effects.
    * 
    * Saves the current canvas state, translates the context by the object's width,
    * scales horizontally by -1 to mirror, and adjusts the object's x-position accordingly.
    *
    * @param {Object} object - The game object to be mirrored.
    */
    mirrorImage(object) {
        this.ctx.save();
        this.ctx.translate(object.width, 0);
        this.ctx.scale(-1, 1);
        object.x = object.x * -1;
    };

    /**
    * Restores a mirrored game object to its original orientation on the canvas.
    * 
    * Reverses the horizontal position adjustment and restores the previous canvas state
    * saved by `mirrorImage()`.
    *
    * @param {Object} object - The game object to restore after mirroring.
    */
    mirrorImageBack(object) {
        object.x = object.x * -1;
        this.ctx.restore();
    };

    /**
    * Checks for collisions between the character and other game objects.
    * 
    * Performs collision detection with enemies and collectible items (coins and bottles)
    */
    checkCollision() {
        this.checkEnemyCollision(this.level.enemies);
        this.checkItemCollision(this.level.coins, this.level.bottles);
    };

    /**
    * Checks collisions between the character and all enemies in the level.
    * 
    * Iterates through each enemy and calls `handleEnmyCollision` to process
    * collision effects.
    *
    * @param {Array<Object>} enemies - The array of enemy objects to check collisions against.
    */
    checkEnemyCollision(enemies) {
        enemies.forEach(enemy => {
            this.handleEnmyCollision(enemies, enemy);
        });
    };

    /**
    * Handles the collision logic between the character and a single enemy.
    * 
    * - If there is no collision, does nothing.
    * - If the character is falling onto a living enemy, plays a jump sound,
    *   makes the character bounce, and triggers the enemy's death.
    * - If the enemy is alive and the character is not falling, the character takes damage
    *   and plays the hurt sound (respecting cooldowns).
    *
    * @param {Array<Object>} enemies - The array of enemies in the current level.
    * @param {Object} enemy - The specific enemy object being checked for collision.
    */
    handleEnmyCollision(enemies, enemy) {
        if (!this.character.isColliding(enemy)) {
            return;
        } else if (this.character.isFalling() && enemy.isAlive) {
            soundEffects.jump.play();
            this.character.jump(22);
            this.level.enemies[enemies.indexOf(enemy)].chickenDied(enemies, enemy);
            return;
        } else if (enemy.isAlive) {
            if (!this.character.cooldown) soundEffects.hurt.play()
            this.character.takeHit();
        };
    };

    /**
    * Checks for collisions between the character and collectible items.
    * 
    * - Coins: If the character collides with a coin, increments the coin count,
    *   updates the coin bar, and plays the collect sound.
    * - Bottles: If the character collides with a bottle and has fewer than 5 bottles,
    *   increments the bottle count, updates the bottle bar, and plays the collect sound.
    *
    * @param {Array<Object>} coins - Array of coin objects to check for collisions.
    * @param {Array<Object>} bottles - Array of bottle objects to check for collisions.
    */
    checkItemCollision(coins, bottles) {
        coins.forEach(coin => {
            if (this.character.isColliding(coin)) {
                soundEffects.collect.currentTime = 0;
                this.character.coins++;
                this.level.coinbar.updateCoinBar(coins, coin, this.character.coins);
                soundEffects.collect.play();
            };
        });
        bottles.forEach(bottle => {
            if (this.character.isColliding(bottle)) {
                if (this.character.bottles === 5) return
                soundEffects.collect.currentTime = 0;
                this.character.bottles++;
                this.level.bottlebar.addBottleToBar(bottles, bottle, this.character.bottles);
                soundEffects.collect.play();
            };
        });
    };

    /**
    * Handles the logic for throwing bottles from the character.
    * 
    * Checks if the character has bottles available, is not hurt, and the throw cooldown
    * has passed. If so, creates a new ThrowableObject at the character's
    * position, adds it to the active throwable bottles array, decrements the bottle count,
    * updates the bottle bar, and records the time of the throw.
    */
    checkThrowableObject() {
        let now = new Date().getTime();
        if (this.character.bottles <= 0) {
            return;
        } else if (this.keyboard.throw && !this.character.isHurt() && now - this.lastThrow > 1400) {
            let bottle = new ThrowableObject(this.character.x + this.character.offset.width, this.character.y, this.character.mirroring);
            this.throwableBottles.push(bottle);
            this.character.bottles--;
            this.level.bottlebar.updateBottleBar(this.character.bottles);
            this.lastThrow = now;
        };
    };

    /**
    * Unlocks the game world based on the character's progress.
    * 
    * When the character collects 5 coins,
    * the level's endpoint (`levelEndX`) is set to 4000, effectively opening
    * the rest of the world for reaching the Endboss.
    */
    openWorld() {
        if (!this.levelOpen && this.character.coins == 5) {
            this.levelOpen = true
            this.level.levelEndX = 4000;
        };
    };

    /**
    * Ends the game and displays the appropriate end screen.
    * 
    * - Shows the win screen if `state` is 'win', otherwise shows the game over screen.
    * - Plays the corresponding end game audio.
    * - Hides mobile controls, stops the game loop, and sets the game running flag to false.
    *
    * @param {string} state - The state of the game ending.
    */
    gameEnd(state) {
        if (state === 'win') {
            document.getElementById('win-screen').classList.remove('d-none');
            this.endGameAudio(state);
        } else {
            document.getElementById('game-over-screen').classList.remove('d-none');
            this.endGameAudio(state);
        };
        document.getElementById('mobile-controls').classList.add('d-none');
        cancelAnimationFrame(this.gameLoop);
        this.gameRunning = false;
    };

    /**
    * pause the level Movement of enemy's and Endboss
    * 
    * Sets the speedX value of the Endboss and for each enemy in enemies to 0.
    * 
    */
    pauseGame() {
        this.level.endboss.speedX = 0;
        this.level.enemies.forEach(e => e.speedX = 0);
    };

    /**
    * continue the level Movement of enemy's and Endboss
    * 
    * Sets the speedX value of the Endboss and for each enemy in enemies to back.
    * 
    */
    continueGame() {
        this.level.endboss.speedX = 80 +  this.level.endboss.rageSpeed;
        this.level.enemies.forEach(e => e.speedX = 20 + Math.random() * 20);
    }

    /**
    * Plays the appropriate audio when the game ends.
    * 
    * - If the player wins, mutes the boss fight music and plays the looping win music.
    * - If the player loses, mutes the boss fight and regular game music, then plays
    *   the looping lose music.
    *
    * @param {string} state - The state of the game ending.
    */
    endGameAudio(state) {
        if (state === 'win') {
            gameBGMusic.bossfightBGM.volume = 0;
            gameBGMusic.winBGM.loop = true;
            gameBGMusic.winBGM.play();
        } else {
            gameBGMusic.bossfightBGM.volume = 0;
            gameBGMusic.gameBGM.volume = 0;
            gameBGMusic.loseBGM.loop = true;
            gameBGMusic.loseBGM.play();
        };
    };
};