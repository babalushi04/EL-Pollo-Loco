/**
 * Represents the Endboss enemy chicken.
 * Handles AI behavior, attack patterns, and boss-specific animations.
 * @extends MoveableObject
 */
class Endboss extends MoveableObject {
  height = 350;
  width = 280;
  y = 100;

  offset = {
    top: 50,
    bottom: 40,
    left: 40,
    right: 40,
  };

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  energy = 100;
  isDead = false;
  hadFirstContact = false;
  isAlert = false;
  isHurt = false;
  isAttacking = false;
  speed = 3.5;

  /**
   * Creates a new Endboss instance, loads all image sets, and starts animations.
   */
  constructor() {
    super().loadImage(this.IMAGES_ALERT[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.x = 2900;
    this.movementTimer = 0;
    this.stateTimer = 0;
    this.attackTimer = 0;
  }

  /**
   * Called every frame from World.gameLoop
   * @param {number} dt 
   */
  update(dt) {
    this.updateGravity(dt);

    this.movementTimer += dt;
    if (this.movementTimer > 1000 / 60) {
      this.checkFirstContact();
      this.moveTowardsCharacter();
      this.movementTimer = 0;
    }

    this.stateTimer += dt;
    if (this.stateTimer > 200) {
      this.playStates();
      this.stateTimer = 0;
    }

    this.attackTimer += dt;
    if (this.attackTimer > 2500) {
      this.triggerRandomAttack();
      this.attackTimer = 0;
    }
  }

  /**
   * Checks if the character has reached the boss zone and triggers the alert state.
   */
  checkFirstContact() {
    if (!this.hadFirstContact && this.world && this.world.character.x > 2300) {
      this.hadFirstContact = true;
      this.isAlert = true;
      setTimeout(() => {
        this.isAlert = false;
      }, 1500);
    }
  }

  /**
   * Checks whether the Endboss is allowed to move.
   * @returns {boolean} True if the Endboss can move towards the character.
   */
  canMove() {
    return (
      this.hadFirstContact &&
      !this.isDead &&
      !this.isAlert &&
      !this.isHurt &&
      (!this.world || !this.world.character.isDead())
    );
  }

  /**
   * Moves the Endboss towards the character if conditions are met.
   */
  moveTowardsCharacter() {
    if (!this.canMove()) return;
    if (this.isColliding(this.world.character)) return;
    if (this.world && this.x > this.world.character.x + 0.5) {
      this.moveLeft();
      this.otherDirection = false;
    } else if (this.world && this.x < this.world.character.x - 0.5) {
      this.moveRight();
      this.otherDirection = true;
    }
  }

  /**
   * Applies damage to the Endboss and stops its ambient sound when energy reaches zero.
   * @param {number} damage - The amount of damage to apply.
   */
  hit(damage) {
    super.hit(damage);
    if (this.energy === 0) {
      if (typeof soundManager !== "undefined") {
        soundManager.stopEndbossChickenSound();
      }
    }
  }

  /**
   * Plays the correct animation based on the current state of the Endboss.
   */
  playStates() {
    if (this.isDead) {
      this.playDeadState();
    } else if (this.world && this.world.character.isDead()) {
      return;
    } else {
      this.playAliveState();
    }
  }

  /**
   * Plays the death animation once and then freezes on the last frame.
   */
  playDeadState() {
    if (this.currentImage < this.IMAGES_DEAD.length) {
      this.playAnimation(this.IMAGES_DEAD);
    }
  }

  /**
   * Plays the appropriate alive-state animation (hurt, alert, attack, walking, or idle).
   */
  playAliveState() {
    if (this.isHurt) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (this.isAlert) {
      this.playAnimation(this.IMAGES_ALERT);
    } else if (this.isAttacking || this.isColliding(this.world.character)) {
      this.playAnimation(this.IMAGES_ATTACK);
    } else if (this.hadFirstContact) {
      this.playAnimation(this.IMAGES_WALKING);
    } else {
      this.loadImage(this.IMAGES_ALERT[0]);
    }
  }

  /**
   * Randomly triggers an attack with a 40% chance every 2.5 seconds.
   */
  triggerRandomAttack() {
    if (!this.canTriggerAttack()) return;
    if (Math.random() < 0.4) {
      this.leap();
    }
  }

  /**
   * Performs a leaping attack movement towards the character.
   */
  leap() {
    this.isAttacking = true;
    this.speedY = 15;
    let originalSpeed = this.speed;
    this.speed = 15;
    setTimeout(() => {
      this.isAttacking = false;
      this.speed = originalSpeed;
    }, 1000);
  }

  /**
   * Returns the ground level for the Endboss.
   * @returns {number} The y-coordinate of the Endboss ground.
   */
  getGroundLevel() {
    return 100;
  }

  /**
   * Checks whether the Endboss can initiate a random attack.
   * @returns {boolean} True if the Endboss is eligible to attack.
   */
  canTriggerAttack() {
    return (
      this.hadFirstContact &&
      !this.isDead &&
      !this.isAlert &&
      !this.isHurt &&
      (!this.world || !this.world.character.isDead())
    );
  }

  /**
   * Activates the hurt state for 400ms, playing the hurt animation.
   */
  playHurt() {
    this.isHurt = true;
    setTimeout(() => {
      this.isHurt = false;
    }, 400);
  }

  /**
   * Marks the Endboss as dead and resets the animation frame counter.
   */
  die() {
    this.isDead = true;
    this.currentImage = 0;
  }
}