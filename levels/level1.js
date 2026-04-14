let level1;

/**
 * Initializes the first level of the game by creating enemies, clouds, backgrounds, and collectables.
 */
function initLevel() {
  const enemies = getLevelEnemies();
  const clouds = getLevelClouds();
  const backgroundObjects = getLevelBackgroundObjects();
  const collectables = getLevelCollectables();

  level1 = new Level(enemies, clouds, backgroundObjects, collectables);
}

/**
 * Creates and returns an array of enemies for the level.
 * @returns {Enemy[]} An array of chicken and endboss objects.
 */
function getLevelEnemies() {
  return [
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new SmallChicken(),
    new SmallChicken(),
    new SmallChicken(),
    new SmallChicken(),
    new SmallChicken(),
    new Endboss(),
  ];
}

/**
 * Creates and returns an array of cloud objects for the level.
 * @returns {Cloud[]} An array of clouds.
 */
function getLevelClouds() {
  return [
    new Cloud("img/5_background/layers/4_clouds/1.png", 0),
    new Cloud("img/5_background/layers/4_clouds/2.png", 700),
    new Cloud("img/5_background/layers/4_clouds/1.png", 1400),
    new Cloud("img/5_background/layers/4_clouds/2.png", 2100),
    new Cloud("img/5_background/layers/4_clouds/1.png", 2800),
    new Cloud("img/5_background/layers/4_clouds/2.png", 3500),
  ];
}

/**
 * Creates and returns an array of background objects for the level.
 * @returns {BackgroundObject[]} An array of background layers.
 */
function getLevelBackgroundObjects() {
  return [
    new BackgroundObject("img/5_background/layers/air.png", -719),
    new BackgroundObject("img/5_background/layers/3_third_layer/1.png", -719, 0),
    new BackgroundObject("img/5_background/layers/2_second_layer/1.png", -719, 0),
    new BackgroundObject("img/5_background/layers/1_first_layer/1.png", -719, 0),

    new BackgroundObject("img/5_background/layers/air.png", 0),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 0, 0),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 0, 0),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 0, 0),

    new BackgroundObject("img/5_background/layers/air.png", 719),
    new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719, 0),
    new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719, 0),
    new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719, 0),

    new BackgroundObject("img/5_background/layers/air.png", 719 * 2),
    ...getAdditionalBackgrounds(),
  ];
}

/**
 * Helper function to provide more background layers to keep the list short.
 * @returns {BackgroundObject[]} An array of background layers.
 */
function getAdditionalBackgrounds() {
  return [
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719 * 2, 0),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719 * 2, 0),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719 * 2, 0),

    new BackgroundObject("img/5_background/layers/air.png", 719 * 3),
    new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719 * 3, 0),
    new BackgroundObject("img/5_background/layers/2_second_layer/1.png", 719 * 3, 0),
    new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719 * 3, 0),

    new BackgroundObject("img/5_background/layers/air.png", 719 * 4),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 719 * 4, 0),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 719 * 4, 0),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 719 * 4, 0),
  ];
}

/**
 * Creates and returns an array of collectables (bottles and coins) for the level.
 * @returns {DrawableObject[]} An array of collectable items.
 */
function getLevelCollectables() {
  let collectables = [];
  for (let i = 0; i < 10; i++) {
    collectables.push(new Bottle(200 + Math.random() * 2000, 360));
  }

  const coinGrid = [
    "XXXX X   XXX .XX. X X .XX.   X .XX. .XX. .XX.",
    "X    X   X X X  X X X X  X   X X  X X  X X  X",
    "XXX  X   XXX X  X X X X  X   X X  X X    X  X",
    "X    X   X   X  X X X X  X   X X  X X  X X  X",
    "XXXX X   X   .XX. X X .XX.   X .XX. .XX. .XX.",
  ];

  generateCoinsFromGrid(collectables, coinGrid, 300, 80);
  return collectables;
}

/**
 * Generates coin objects based on a text-based grid and adds them to collectables.
 * @param {DrawableObject[]} collectables - The array to add coins to.
 * @param {string[]} grid - The text grid representing the coin pattern.
 * @param {number} startX - The starting X coordinate.
 * @param {number} startY - The starting Y coordinate.
 */
function generateCoinsFromGrid(collectables, grid, startX, startY) {
  const size = 60;
  grid.forEach((row, rowIndex) => {
    row.split("").forEach((char, colIndex) => {
      if (char === "X" || char === ".") {
        collectables.push(new Coin(startX + colIndex * size, startY + rowIndex * size));
      }
    });
  });
}