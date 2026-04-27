/**
 * Represents a collectable coin with a spinning animation.
 * @extends MoveableObject
 */
class Coin extends MoveableObject {
  height = 80;
  width = 80;
  offset = { top: 25, left: 25, right: 25, bottom: 25 };

  IMAGES = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  /**
   * Creates a new Coin at the given position and starts its animation.
   * @param {number} x - The x-coordinate.
   * @param {number} y - The y-coordinate.
   */
  constructor(x, y) {
    super();
    this.loadImage(this.IMAGES[0]);
    this.loadImages(this.IMAGES);
    this.x = x;
    this.y = y;
    this.animationTimer = 0;
  }

  /**
   * Called every frame from World.gameLoop
   * @param {number} dt 
   */
  update(dt) {
    this.animationTimer += dt;
    if (this.animationTimer > 250) {
      this.playAnimation(this.IMAGES);
      this.animationTimer = 0;
    }
  }
}