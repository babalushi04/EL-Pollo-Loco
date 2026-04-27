/**
 * Represents the game world, managing all game objects, collisions, and rendering.
 * @extends CollisionHandler
 */
class World extends CollisionHandler {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar = new StatusBar(StatusBar.HEALTH, 40, 10, 100);
  bottleBar = new StatusBar(StatusBar.BOTTLE, 40, 45, 0);
  bossBar = new StatusBar(StatusBar.BOSS, 520, 10, 100);
  coinBar = new StatusBar(StatusBar.COIN, 40, 80, 0);
  bossVisible = false;
  throwableObjects = [];
  throwCooldown = false;
  isWon = false;
  isRunning = true;
  lastTime = 0;
  collisionTimer = 0;

  /**
   * Creates a new World instance, initializes the canvas and starts the game loop.
   * @param {HTMLCanvasElement} canvas - The canvas element to render on.
   * @param {Keyboard} keyboard - The keyboard input handler.
   */
  constructor(canvas, keyboard) {
    super();
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.setWorld();
    
    this.lastTime = performance.now();
    requestAnimationFrame((ts) => this.gameLoop(ts));
  }

  /**
   * Assigns the world reference to the character and all enemies.
   */
  setWorld() {
    this.character.world = this;
    this.level.enemies.forEach((enemy) => {
      enemy.world = this;
    });
  }

  /**
   * Main game loop running dynamically with the screen refresh rate
   * @param {number} timestamp - The current time in milliseconds
   */
  gameLoop(timestamp) {
    if (!this.isRunning) return;
    let dt = timestamp - this.lastTime;
    this.lastTime = timestamp;

    this.update(dt);
    this.draw();

    requestAnimationFrame((ts) => this.gameLoop(ts));
  }

  /**
   * Stops the game loop
   */
  stop() {
    this.isRunning = false;
  }

  /**
   * Updates the game logic for all objects
   * @param {number} dt - Delta time since last frame
   */
  update(dt) {
    this.updateGameObjects(dt);
    this.updateCollisionTimer(dt);
  }

  updateGameObjects(dt) {
    if (this.character.update) this.character.update(dt);
    this.level.enemies.forEach(e => { if (e.update) e.update(dt); });
    this.level.clouds.forEach(c => { if (c.update) c.update(dt); });
    this.level.collectableObjects.forEach(c => { if (c.update) c.update(dt); });
    this.throwableObjects.forEach(t => { if (t.update) t.update(dt); });
  }

  updateCollisionTimer(dt) {
    this.collisionTimer += dt;
    if (this.collisionTimer > 1000 / 60) {
      this.runCollisionChecks();
      this.collisionTimer = 0;
    }
  }

  runCollisionChecks() {
    this.checkCollisions();
    this.checkThrowObjects();
    this.checkBottleCollisions();
    this.checkBottleHitsEnemy();
    this.checkBottleHitsGround();
    this.checkBossVisibility();
  }

  /**
   * Shows the Endboss health bar and plays sounds when the character reaches the boss zone.
   */
  checkBossVisibility() {
    if (this.character.x > 2300 && !this.bossVisible) {
      this.bossVisible = true;
      if (typeof soundManager !== "undefined") {
        soundManager.playEndbossGrowlSound();
        soundManager.playEndbossChickenSound();
      }
    }
  }

  /**
   * Checks if the player can throw a bottle and creates one if possible.
   */
  checkThrowObjects() {
    if (!this.canThrow()) return;
    this.throwBottle();
    this.startThrowCooldown();
  }

  throwBottle() {
    let xOffset = this.character.otherDirection ? 30 : 60;
    let bottle = new ThrowableObject(
      this.character.x + xOffset,
      this.character.y + 100,
      this.character.otherDirection
    );
    this.throwableObjects.push(bottle);
    this.bottleBar.setPercentage(this.bottleBar.percentage - 10);
  }

  startThrowCooldown() {
    this.throwCooldown = true;
    setTimeout(() => { this.throwCooldown = false; }, 2000);
  }

  /**
   * Checks whether the player is allowed to throw a bottle.
   * @returns {boolean} True if a bottle can be thrown.
   */
  canThrow() {
    return (
      this.keyboard.D &&
      !this.throwCooldown &&
      this.bottleBar.percentage > 0 &&
      !this.isWon
    );
  }

  /**
   * Main draw loop: clears the canvas and renders all game objects each frame.
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjectsToMap(this.level.backgroundObjects);
    this.addObjectsToMap(this.level.clouds);
    this.ctx.translate(-this.camera_x, 0);
    this.drawStatusBars();
    this.ctx.translate(this.camera_x, 0);
    this.drawGameObjects();
    this.ctx.translate(-this.camera_x, 0);
  }

  /**
   * Draws all fixed status bars (health, bottles, coins, boss health).
   */
  drawStatusBars() {
    this.addToMap(this.statusBar);
    this.addToMap(this.bottleBar);
    this.addToMap(this.coinBar);
    if (this.bossVisible) {
      this.addToMap(this.bossBar);
    }
  }

  /**
   * Draws all dynamic game objects (character, enemies, collectables, thrown bottles).
   */
  drawGameObjects() {
    this.addToMap(this.character);
    this.addObjectsToMap(this.level.enemies);
    this.addObjectsToMap(this.level.collectableObjects);
    this.addObjectsToMap(this.throwableObjects);
  }

  /**
   * Adds an array of objects to the canvas.
   * @param {DrawableObject[]} objects - The array of objects to draw.
   */
  addObjectsToMap(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds a single object to the canvas, handling mirrored rendering if needed.
   * @param {DrawableObject} mo - The object to draw.
   */
  addToMap(mo) {
    if (mo.otherDirection) this.flipImage(mo);
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    if (mo.otherDirection) this.flipImageBack(mo);
  }

  /**
   * Flips the canvas context horizontally to draw a mirrored object.
   * @param {DrawableObject} mo - The object to flip.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores the canvas context after drawing a mirrored object.
   * @param {DrawableObject} mo - The object to restore.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /**
   * Triggers the game over screen via the global function.
   */
  showGameOverScreen() {
    if (typeof showGameOver === "function") {
      showGameOver();
    }
  }

  /**
   * Checks if the Endboss is dead.
   * @returns {boolean} True if the Endboss has been defeated.
   */
  isEndbossDead() {
    let endboss = this.level.enemies.find((e) => e instanceof Endboss);
    return endboss ? endboss.isDead : false;
  }

  /**
   * Checks if the Endboss is dead and shows the win screen if so.
   */
  checkWinCondition() {
    if (this.isWon) return;
    if (this.isEndbossDead()) {
      this.isWon = true;
      setTimeout(() => {
        showWin();
      }, 500);
    }
  }
}