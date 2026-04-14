/**
 * Represents a collectable salsa bottle on the ground.
 * @extends MoveableObject
 */
class Bottle extends MoveableObject {
  height = 60;
  width = 50;

  IMAGES = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  /**
   * Creates a new Bottle at the given position with a random image variant.
   * @param {number} x - The x-coordinate.
   * @param {number} y - The y-coordinate.
   */
  constructor(x, y) {
    super();
    let randomIndex = Math.floor(Math.random() * this.IMAGES.length);
    this.loadImage(this.IMAGES[randomIndex]);
    this.x = x;
    this.y = y;
  }
}