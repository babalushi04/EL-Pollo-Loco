/**
 * Represents a cloud that moves continuously to the left.
 * @extends MoveableObject
 */
class Cloud extends MoveableObject {
  y = 10;
  width = 600;
  height = 250;

  /**
   * Creates a new Cloud with the given image and x-position.
   * @param {string} [imagePath='img/5_background/layers/4_clouds/1.png'] - The cloud image path.
   * @param {number} [x=Math.random() * 500] - The starting x-coordinate.
   */
  constructor(imagePath = "img/5_background/layers/4_clouds/1.png", x = Math.random() * 500) {
    super().loadImage(imagePath);
    this.x = x;
    this.movementTimer = 0;
  }

  /**
   * Called every frame from World.gameLoop
   * @param {number} dt 
   */
  update(dt) {
    this.movementTimer += dt;
    if (this.movementTimer > 1000 / 60) {
      this.moveLeft();
      this.movementTimer = 0;
    }
  }
}