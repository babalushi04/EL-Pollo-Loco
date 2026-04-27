/**
 * Represents the playable character Pepe.
 * Handles movement, animations, and player input.
 * @extends MoveableObject
 */
class Character extends MoveableObject {
    height = 180;
    width = 100;
    speed = 10;
    y = 250;
    offset = {
        top: 100,
        left: 20,
        right: 20,
        bottom: 10
    };

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONG_IDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGE_DEAD_FINAL = 'img/2_character_pepe/5_dead/D-57.png';

    world;
    idleTimer = 0;
    movementTimer = 0;
    walkingTimer = 0;
    stateTimer = 0;
    wasAboveGround = false;

    /**
     * Creates a new Character instance, loads all image sets, applies gravity, and starts animations.
     */
    constructor(){
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
    }

    isDeadAnimationTriggered = false;
    lastBounce = 0;

    /**
     * Applies damage to the character and plays a hurt sound effect.
     * @param {number} damage - The amount of damage to apply.
     */
    hit(damage) {
        super.hit(damage);

        if (typeof soundManager !== 'undefined' && !this.isDead()) {
            soundManager.playOuchSound();
        }
    }

    /**
     * Called every frame from World.gameLoop
     * @param {number} dt 
     */
    update(dt) {
        this.updateGravity(dt);

        this.movementTimer += dt;
        if (this.movementTimer > 1000 / 60) {
            this.handleMovementTick();
            this.movementTimer = 0;
        }

        this.walkingTimer += dt;
        if (this.walkingTimer > 100) {
            this.handleWalkingAnimation();
            this.walkingTimer = 0;
        }

        this.stateTimer += dt;
        if (this.stateTimer > 200) {
            this.handleStateAnimation();
            this.stateTimer = 0;
        }
    }

    /**
     * Handles one frame of the movement loop: processes input, stops snoring, checks landing, and updates the camera.
     */
    handleMovementTick() {
        if (!this.isDead() && !this.world.isWon) {
            this.handleMovement();
        }
        if (this.idleTimer <= 2000) {
            if (typeof soundManager !== 'undefined') soundManager.stopSnoreSound();
        }
        this.handleLanding();
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Processes keyboard input to move the character left, right, or jump.
     */
    handleMovement() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            this.idleTimer = 0;
        }
        if (this.world.keyboard.LEFT && this.x > -600) {
            this.moveLeft();
            this.otherDirection = true;
            this.idleTimer = 0;
        }
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            this.idleTimer = 0;
        }
        if (this.world.keyboard.D) this.idleTimer = 0;
    }

    /**
     * Detects when the character lands on the ground and plays the landing sound.
     */
    handleLanding() {
        if (!this.isAboveGround() && this.wasAboveGround) {
            if (typeof soundManager !== 'undefined') soundManager.playLandingSound();
        }
        this.wasAboveGround = this.isAboveGround();
    }

    /**
     * Handles the walking and hurt animation cycle (called every 100ms).
     */
    handleWalkingAnimation() {
        if (this.isDead() || this.world.isWon) return;
        if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            this.idleTimer = 0;
        } else if (!this.isAboveGround()) {
            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
                this.idleTimer = 0;
            }
        }
    }

    /**
     * Dispatches the correct animation state: death, jump, or idle (called every 200ms).
     */
    handleStateAnimation() {
        if (this.isDead()) {
            this.handleDeathAnimation();
        } else if (this.world.isWon) {
            return;
        } else if (this.isAboveGround() && !this.isHurt()) {
            this.playJumpFrame();
            this.idleTimer = 0;
        } else if (!this.isHurt()) {
            this.handleIdleAnimation();
        }
    }

    /**
     * Plays the death animation sequence and triggers the game over screen after completion.
     */
    handleDeathAnimation() {
        if (!this.isDeadAnimationTriggered) {
            this.isDeadAnimationTriggered = true;
            if (typeof soundManager !== 'undefined') soundManager.playDeathScreamSound();
            this.currentImage = 0;
            setTimeout(() => {
                this.world.showGameOverScreen();
            }, (this.IMAGES_DEAD.length * 200) + 500);
        }
        if (this.currentImage < this.IMAGES_DEAD.length) {
            this.playAnimation(this.IMAGES_DEAD);
        } else {
            this.loadImage(this.IMAGES_DEAD[this.IMAGES_DEAD.length - 1]);
        }
    }

    /**
     * Plays the idle or long idle animation depending on the idle timer duration.
     */
    handleIdleAnimation() {
        this.idleTimer += 200;
        if (this.idleTimer > 2000) {
            this.playAnimation(this.IMAGES_LONG_IDLE);
            if (typeof soundManager !== 'undefined') soundManager.playSnoreSound();
        } else {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }

    /**
     * Selects the correct jump frame based on current vertical speed,
     * so the animation matches the actual jump arc instead of looping randomly.
     */
    playJumpFrame() {
        const last = this.IMAGES_JUMPING.length - 1;
        const frameIndex = Math.round((30 - this.speedY) / 60 * last);
        const clamped = Math.max(0, Math.min(last, frameIndex));
        this.loadImage(this.IMAGES_JUMPING[clamped]);
    }

    /**
     * Makes the character jump by setting vertical speed and plays the jump sound.
     */
    jump() {
        this.speedY = 30;
        this.idleTimer = 0;
        if (typeof soundManager !== 'undefined') soundManager.playJumpSound();
    }

    /**
     * Makes the character bounce after stomping on an enemy.
     */
    bounce() {
        this.speedY = 15;
        this.idleTimer = 0;
        this.lastBounce = new Date().getTime();
    }

    /**
     * Checks if the character has recently bounced off an enemy.
     * @returns {boolean} True if the last bounce was less than 200ms ago.
     */
    isRecentBounce() {
        let timePassed = new Date().getTime() - this.lastBounce;
        return timePassed < 200;
    }
}