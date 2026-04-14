/**
 * Represents a normal chicken enemy that follows the character.
 * @extends MoveableObject
 */
class Chicken extends MoveableObject {
  height = 70;
  width = 70;
  y = 350;
  offset = {
    top: 15,
    left: 15,
    right: 15,
    bottom: 15,
  };

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];

  isDead = false;

  /**
   * Creates a new Chicken instance, loads walking images, and starts animations.
   */
  constructor() {
    super().loadImage("img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = 500 + Math.random() * 2000;
    this.speed = 0.15 + Math.random() * 0.5;
    this.movementTimer = 0;
    this.walkingTimer = 0;
  }

  /**
   * Called every frame from World.gameLoop
   * @param {number} dt 
   */
  update(dt) {
    this.movementTimer += dt;
    if (this.movementTimer > 1000 / 60) {
      this.handleMovement();
      this.movementTimer = 0;
    }

    this.walkingTimer += dt;
    if (this.walkingTimer > 300) {
      this.handleWalkingAnimation();
      this.walkingTimer = 0;
    }
  }

  /**
   * Checks if the chicken can act and moves it towards the character.
   */
  handleMovement() {
    if (!this.canAct()) return;
    if (this.isColliding(this.world.character)) return;
    if (this.x > this.world.character.x + 10) {
      this.moveLeft();
      this.otherDirection = false;
    } else if (this.x < this.world.character.x - 10) {
      this.moveRight();
      this.otherDirection = true;
    }
  }

  /**
   * Plays the walking animation if the chicken can act.
   */
  handleWalkingAnimation() {
    if (!this.canAct()) return;
    this.playAnimation(this.IMAGES_WALKING);
  }

  /**
   * Checks whether the chicken is allowed to act (not dead, world exists, character alive, game not won).
   * @returns {boolean} True if the chicken can act.
   */
  canAct() {
    return (
      !this.isDead &&
      this.world &&
      !this.world.character.isDead() &&
      !this.world.isWon
    );
  }

  /**
   * Kills the chicken, shows the dead image, plays a sound, and stops chicken sounds if none remain.
   */
  die() {
    this.isDead = true;
    this.loadImage("img/3_enemies_chicken/chicken_normal/2_dead/dead.png");
    if (typeof soundManager !== 'undefined') soundManager.playSmashSound();
    this.stopSoundIfLastChicken();
  }

  /**
   * Stops the chicken ambient sound if no living normal chickens remain.
   */
  stopSoundIfLastChicken() {
    if (!this.world) return;
    let livingChickens = this.world.level.enemies.filter(
      (e) => e instanceof Chicken && !(e instanceof SmallChicken) && !e.isDead
    );
    if (livingChickens.length === 0) {
      soundManager.stopChickenSound();
    }
  }
}