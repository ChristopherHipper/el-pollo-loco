class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 60;
    rageSpeed = 0.8;
    speedX = 0.4;
    attackMode = false;
    startWalking = false;
    detected = false;
    activeBar = false;
    standImages = [
        'assets/img/4_enemie_boss_chicken/2_alert/G5.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G6.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G7.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G8.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G9.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G10.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G11.png',
        'assets/img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    walkingImages = [
        'assets/img/4_enemie_boss_chicken/1_walk/G1.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G2.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G3.png',
        'assets/img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    attackImages = [
        'assets/img/4_enemie_boss_chicken/3_attack/G13.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G14.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G15.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G16.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G17.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G18.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G19.png',
        'assets/img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    hurtImages = [
        'assets/img/4_enemie_boss_chicken/4_hurt/G21.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G22.png',
        'assets/img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];

    deathImages = [
        'assets/img/4_enemie_boss_chicken/5_dead/G24.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G25.png',
        'assets/img/4_enemie_boss_chicken/5_dead/G26.png',
    ];

    offset = {
        top: 70,
        width: 0,
        left: 20,
        height: 10
    };
    constructor() {
        super()
        this.loadImage('assets/img/4_enemie_boss_chicken/2_alert/G5.png');
        this.loadImages(this.standImages);
        this.loadImages(this.walkingImages);
        this.loadImages(this.attackImages);
        this.loadImages(this.hurtImages);
        this.loadImages(this.deathImages);
        this.x = 4000;
    };

    /**
     * Updates the endboss state for a single frame.
     *
     * Calls a death check and, if the endboss remains alive, applies frame-specific updates:
     * stores the provided deltaTime, advances animations,
     * updates walking and attack behavior, performs character detection,
     * handles sound effects, updates the endboss healthbar position and value in the world level UI.
     *
     * @param {number} deltaTime - Time elapsed since the last update (in milliseconds).
     */
    update(deltaTime) {
        this.isDead();
        if (this.isAlive) {
            this.deltaTime = deltaTime;
            this.playAnimation();
            this.walking();
            this.attack();
            this.characterDetection();
            this.hanldeSoundEffects();
            this.world.level.endbossBar.updateEndbossHealtbarPosition(this.x, this.y, this.detected, this.world.character);
            this.world.level.endbossBar.updateEndbossHealthbar(this.health);
        }
    };

    /**
     * Handles the endboss' sound effects and background music transitions.
     *
     * Checks states in priority order and triggers the appropriate sounds via the external
     * `soundEffects`and `gameBGMusic` objects (expected to contain audio controls with `play()` / `pause()`):
     *
     */
    hanldeSoundEffects() {
        if (this.health <= 0) {
            soundEffects.endbossHurt.play();
        };
        if (this.isHurt() && this.health > 0) {
            soundEffects.endbossHurt.play();
        };
        if (this.detected) {
            gameBGMusic.gameBGM.pause();
            gameBGMusic.bossfightBGM.play();
        } else {
            gameBGMusic.bossfightBGM.pause();
            gameBGMusic.gameBGM.play();
        };
    };

    /**
     * Update the endboss animation according to its current state.
     *
     * Priority (highest to lowest):
     *   1. Death: if this.health <= 0 -> use this.deathImages at 250ms, non-looping.
     *   2. Hurt: if this.isHurt() -> use this.hurtImages at 200ms, looping.
     *   3. Attack: if this.attackMode -> use this.attackImages at 150ms, looping.
     *   4. Walk: if this.startWalking -> use this.walkingImages at 200ms, looping.
     *   5. Stand: fallback -> use this.standImages at 300ms, looping.
     *
     */
    playAnimation() {
        if (this.health <= 0) {
            this.animations(this.deathImages, 250, false);
        } else if (this.isHurt()) {
            this.animations(this.hurtImages, 200, true);
        } else if (this.attackMode) {
            this.animations(this.attackImages, 150, true);
        } else if (this.startWalking) {
            this.animations(this.walkingImages, 200, true);
        }
        else this.animations(this.standImages, 300, true);
    };

    /**
     * Checks for a collision with the character and, if colliding, performs the endboss attack routine.
     *
     * When a collision is detected this method:
     * - sets this.attackMode to true,
     * - calls this.world.character.takeHit(),
     * - stop horizontal movement,
     * - plays the hurt sound effect (soundEffects.hurt.play()),
     * - schedules a timeout (1300 ms) after which this.attackMode is set to false and this.speedX is restored to 0.4.
     */
    attack() {
        if (this.isColliding(this.world.character)) {
            this.attackMode = true;
            this.world.character.takeHit();
            this.speedX = 0;
            soundEffects.hurt.play();
            setTimeout(() => {
                this.attackMode = false;
                this.speedX = 0.4;
            }, 1300);
        };
    };

    /**
     * If the instance's `startWalking` flag is true, initiates leftward movement by calling `this.moveLeft()`.
     */
    walking() {
        if (this.startWalking) {
            this.moveLeft();
        };
    };

    /**
     * Resume walking after a short delay by applying rage-based speed adjustments.
     *
     * Schedules a callback 1000ms later that:
     * - increases this.speedX by the current this.rageSpeed,
     * - increments this.rageSpeed by 0.2,
     * - sets this.startWalking to true.
     */
    continueWalking() {
        setTimeout(() => {
            this.speedX += this.rageSpeed;
            this.rageSpeed += 0.2;
            this.startWalking = true;
        }, 1000);
    };

    /**
     * Checks the distance between this endboss and the character,
     * and updates the endboss state flags accordingly.
     *
     * - If the distance is <= 400, the endboss becomes detected, begins walking, and shows its active bar.
     * - If the distance is >= 1200, the endboss is no longer detected and stops walking.
     *
     */
    characterDetection() {
        const distance = Math.abs(this.world.character.x - this.x);
        if (distance <= 400) {
            this.detected = true;
            this.startWalking = true;
            this.activeBar = true;
        } else if (distance >= 1200) {
            this.detected = false;
            this.startWalking = false;
        };
    };

    /**
     * Process a hit on the end boss
     *
     * - If a cooldown is active, the hit is ignored.
     * - Stops horizontal movement (sets speedX to 0) before applying damage.
     * - Calls takeDamage() to reduce health.
     * - If health is <= 0 after damage, calls isDead() and exits early.
     * - Otherwise, resets the hit cooldown and resumes walking via continueWalking().
     */
    takeHit() {
        if (this.cooldown) return;
        this.speedX = 0;
        this.takeDamage();
        if (this.health <= 0) {
            this.isDead();
            return;
        };
        this.resetCooldown();
        this.continueWalking();
    };
};