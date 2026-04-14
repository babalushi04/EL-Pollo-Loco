/**
 * Represents a drawable game object with position, dimensions, and image rendering.
 */
class DrawableObject {
  img;
  imageCache = {};
  currentImage = 0;
  x = 120;
  y = 250;
  height = 150;
  width = 100;

  /**
   * Loads a single image from the given path.
   * @param {string} path - The file path to the image.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the object's image onto the canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Draws a debug frame around certain object types (currently disabled).
   * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
   */
  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
      // Debug frame (disabled)
    }
  }

  /**
   * Preloads an array of images into the image cache.
   * @param {string[]} arr - Array of image file paths to preload.
   */
  loadImages(arr) {
    arr.forEach((path) => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }
}