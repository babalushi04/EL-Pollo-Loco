/**
 * Represents a background layer image positioned at the bottom of the canvas.
 * @extends MoveableObject
 */
class BackgroundObject extends MoveableObject {
  width = 720;
  height = 480;

  /**
   * Creates a new BackgroundObject with the given image and x-position.
   * @param {string} imagePath - The path to the background image.
   * @param {number} x - The x-coordinate for the background layer.
   */
  constructor(imagePath, x) {
    super().loadImage(imagePath);
    this.x = x;
    this.y = 480 - this.height;
  }
}