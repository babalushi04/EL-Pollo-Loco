/**
 * Represents a game level containing enemies, clouds, backgrounds, and collectable objects.
 */
class Level {
  enemies;
  clouds;
  backgroundObjects;
  level_end_x = 2900;
  collectableObjects = [];

  /**
   * Creates a new Level with the given game objects.
   * @param {MoveableObject[]} enemies - Array of enemy objects.
   * @param {Cloud[]} clouds - Array of cloud objects.
   * @param {BackgroundObject[]} backgroundObjects - Array of background layer objects.
   * @param {MoveableObject[]} [collectableObjects=[]] - Array of collectable items.
   */
  constructor(enemies, clouds, backgroundObjects, collectableObjects = []) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.collectableObjects = collectableObjects;
  }
}