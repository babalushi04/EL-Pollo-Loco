/**
 * Represents a moveable game object with physics, collision detection, and animation support.
 * @extends DrawableObject
 */
class MoveableObject extends DrawableObject {
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  gravityTimer = 0;
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  /**
   * Applies gravity to the object frame-by-frame.
   * @param {number} dt - delta time since last frame
   */
  updateGravity(dt) {
    this.gravityTimer += dt;
    if (this.gravityTimer > 1000 / 25) {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      } else {
        this.speedY = 0;
        this.y = this.getGroundLevel();
      }
      this.gravityTimer = 0;
    }
  }

  /**
   * Determines the ground level for this object.
   * @returns {number} The y-coordinate where the object should stop falling.
   */
  getGroundLevel() {
    if (this instanceof ThrowableObject) return 360;
    return 250;
  }

  /**
   * Checks whether the object is above its ground level.
   * @returns {boolean} True if the object is in the air.
   */
  isAboveGround() {
    return this.y < this.getGroundLevel();
  }

  /**
   * Checks if this object is colliding with another moveable object using offset-based hitboxes.
   * @param {MoveableObject} mo - The other object to check collision against.
   * @returns {boolean} True if the two objects are overlapping.
   */
  isColliding(mo) {
    let moOffsetTop = mo.offset ? mo.offset.top : 0;
    let moOffsetBottom = mo.offset ? mo.offset.bottom : 0;
    let moOffsetLeft = mo.offset ? mo.offset.left : 0;
    let moOffsetRight = mo.offset ? mo.offset.right : 0;
    return (
      this.x + this.width - this.offset.right > mo.x + moOffsetLeft &&
      this.y + this.height - this.offset.bottom > mo.y + moOffsetTop &&
      this.x + this.offset.left < mo.x + mo.width - moOffsetRight &&
      this.y + this.offset.top < mo.y + mo.height - moOffsetBottom
    );
  }

  /**
   * Reduces the object's energy by the given damage amount.
   * @param {number} [damage=2] - The amount of damage to apply.
   */
  hit(damage = 2) {
    this.energy -= damage;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Checks if the object was recently hit (within the last second).
   * @returns {boolean} True if the object is in a hurt state.
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHit;
    timePassed = timePassed / 1000;
    return timePassed < 1;
  }

  /**
   * Checks if the object's energy has reached zero.
   * @returns {boolean} True if the object is dead.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Moves the object to the right by its speed value.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left by its speed value.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Makes the object jump by setting vertical speed.
   */
  jump() {
    this.speedY = 30;
  }

  /**
   * Plays the next frame of an animation cycle from the given image array.
   * @param {string[]} images - Array of image paths for the animation.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }
}