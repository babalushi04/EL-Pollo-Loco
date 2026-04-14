/**
 * Represents a throwable salsa bottle with rotation and splash animations.
 * @extends MoveableObject
 */
class ThrowableObject extends MoveableObject {
  IMAGES_ROTATION = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  IMAGES_SPLASH = [
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  isSplashed = false;

  /**
   * Creates a new throwable bottle at the given position and direction.
   * @param {number} x - The x-coordinate of the throw origin.
   * @param {number} y - The y-coordinate of the throw origin.
   * @param {boolean} direction - True if thrown to the left, false if to the right.
   */
  constructor(x, y, direction) {
    super().loadImage("img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.IMAGES_ROTATION);
    this.loadImages(this.IMAGES_SPLASH);
    this.x = x;
    this.y = y;
    this.otherDirection = direction;
    this.height = 60;
    this.width = 50;
    this.movementTimer = 0;
    this.animationTimer = 0;
    this.throw();
  }

  /**
   * Called every frame from World.gameLoop
   * @param {number} dt 
   */
  update(dt) {
    this.updateGravity(dt);

    this.movementTimer += dt;
    if (this.movementTimer > 25) {
      if (!this.isSplashed) {
        this.x += this.otherDirection ? -10 : 10;
      }
      this.movementTimer = 0;
    }

    this.animationTimer += dt;
    if (this.animationTimer > 50) {
      if (this.isSplashed) {
        this.playAnimation(this.IMAGES_SPLASH);
      } else {
        this.playAnimation(this.IMAGES_ROTATION);
      }
      this.animationTimer = 0;
    }
  }

  /**
   * Initiates the throw by playing the throw sound and setting initial vertical speed.
   */
  throw() {
    this.speedY = 30;
    if (typeof soundManager !== "undefined") {
      soundManager.playBottleThrowSound();
    }
  }

  /**
   * Triggers the splash effect, stops movement, and plays the shatter sound.
   */
  splash() {
    this.isSplashed = true;
    this.speedY = 0;
    if (typeof soundManager !== "undefined") {
      soundManager.stopBottleThrowSound();
      soundManager.playBottleShatterSound();
    }
  }
}