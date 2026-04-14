/**
 * Represents a collectable health heart that restores the character's energy.
 * @extends MoveableObject
 */
class HealthHeart extends MoveableObject {
  height = 50;
  width = 50;

  /**
   * Creates a new HealthHeart at the given position.
   * @param {number} x - The x-coordinate.
   * @param {number} y - The y-coordinate.
   */
  constructor(x, y) {
    super().loadImage("img/7_statusbars/3_icons/icon_health.png");
    this.x = x;
    this.y = y;
  }
}