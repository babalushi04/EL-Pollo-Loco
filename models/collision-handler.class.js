/**
 * Handles all collision detection and resolution logic for the game world.
 * This class is mixed into the World class and operates on its properties.
 */
class CollisionHandler {
  /**
   * Checks for collisions between the character and all enemies.
   */
  checkCollisions() {
    this.level.enemies.forEach((enemy) => {
      if (this.character.isColliding(enemy)) {
        this.handleEnemyCollision(enemy);
        this.checkWinCondition();
      }
    });
  }

  /**
   * Handles a collision between the character and a single enemy.
   * @param {MoveableObject} enemy - The enemy that was collided with.
   */
  handleEnemyCollision(enemy) {
    if (this.isStompingChicken(enemy)) {
      this.handleChickenStomp(enemy);
    } else if (this.canTakeDamage(enemy)) {
      let damage = enemy instanceof Endboss ? 10 : 5;
      this.character.hit(damage);
      this.statusBar.setPercentage(this.character.energy);
    }
  }

  /**
   * Checks if the character is stomping on a chicken from above.
   * @param {MoveableObject} enemy - The enemy to check.
   * @returns {boolean} True if the character is stomping the chicken.
   */
  isStompingChicken(enemy) {
    return (
      this.character.speedY < 0 &&
      this.character.isAboveGround() &&
      enemy instanceof Chicken &&
      !enemy.isDead
    );
  }

  /**
   * Checks if the character can take damage from the given enemy.
   * @param {MoveableObject} enemy - The enemy to check.
   * @returns {boolean} True if damage should be applied.
   */
  canTakeDamage(enemy) {
    return (
      !enemy.isDead &&
      !this.character.isHurt() &&
      !this.character.isRecentBounce() &&
      !this.isWon
    );
  }

  /**
   * Handles the stomp on a chicken: kills it, bounces the character, and spawns a drop.
   * @param {MoveableObject} enemy - The chicken that was stomped.
   */
  handleChickenStomp(enemy) {
    enemy.die();
    this.character.bounce();
    setTimeout(() => {
      let index = this.level.enemies.indexOf(enemy);
      if (index > -1) {
        this.level.enemies.splice(index, 1);
        this.spawnDrop(enemy.x);
      }
    }, 200);
  }

  /**
   * Spawns a random collectable item (bottle or health heart) at the given position.
   * @param {number} x - The x-coordinate for the spawned item.
   */
  spawnDrop(x) {
    if (Math.random() < 0.5) {
      this.level.collectableObjects.push(new Bottle(x, 360));
    } else {
      this.level.collectableObjects.push(new HealthHeart(x, 360));
    }
  }

  /**
   * Checks for collisions between the character and collectable objects (bottles, coins, hearts).
   */
  checkBottleCollisions() {
    this.level.collectableObjects.forEach((item, index) => {
      if (this.character.isColliding(item)) {
        this.handleItemPickup(item, index);
      }
    });
  }

  /**
   * Handles picking up a collectable item based on its type.
   * @param {DrawableObject} item - The collectable item.
   * @param {number} index - The index of the item in the collectables array.
   */
  handleItemPickup(item, index) {
    if (item instanceof Bottle && this.bottleBar.percentage < 100) {
      this.level.collectableObjects.splice(index, 1);
      let newPct = Math.min(this.bottleBar.percentage + 10, 100);
      this.bottleBar.setPercentage(newPct);
    } else if (item instanceof Coin) {
      this.collectCoin(index);
    } else if (item instanceof HealthHeart && this.character.energy < 100) {
      this.collectHeart(index);
    }
  }

  /**
   * Collects a coin and updates the coin bar.
   * @param {number} index - The index of the coin in the collectables array.
   */
  collectCoin(index) {
    this.level.collectableObjects.splice(index, 1);
    let newPct = Math.min(this.coinBar.percentage + 2, 100);
    if (typeof soundManager !== "undefined") soundManager.playCoinCollectSound();
    this.coinBar.setPercentage(newPct);
  }

  /**
   * Collects a health heart and restores the character's energy.
   * @param {number} index - The index of the heart in the collectables array.
   */
  collectHeart(index) {
    this.level.collectableObjects.splice(index, 1);
    this.character.energy = Math.min(this.character.energy + 20, 100);
    this.statusBar.setPercentage(this.character.energy);
  }

  /**
   * Checks if any thrown bottle has hit an enemy.
   */
  checkBottleHitsEnemy() {
    this.throwableObjects.forEach((bottle, bIndex) => {
      this.level.enemies.forEach((enemy) => {
        if (bottle.isColliding(enemy) && !enemy.isDead && !bottle.isSplashed) {
          this.handleBottleHit(bottle, bIndex, enemy);
        }
      });
    });
  }

  /**
   * Handles a bottle hitting an enemy, distinguishing between chickens and the Endboss.
   * @param {ThrowableObject} bottle - The bottle that hit.
   * @param {number} bIndex - The index of the bottle.
   * @param {MoveableObject} enemy - The enemy that was hit.
   */
  handleBottleHit(bottle, bIndex, enemy) {
    if (enemy instanceof Chicken) {
      this.handleBottleHitsChicken(bottle, bIndex, enemy);
    } else if (enemy instanceof Endboss) {
      this.handleBottleHitsEndboss(bottle, bIndex, enemy);
    }
  }

  /**
   * Handles a bottle hitting a chicken: kills it, splashes the bottle, and spawns a drop.
   * @param {ThrowableObject} bottle - The bottle that hit.
   * @param {number} bIndex - The index of the bottle.
   * @param {Chicken} enemy - The chicken that was hit.
   */
  handleBottleHitsChicken(bottle, bIndex, enemy) {
    enemy.die();
    bottle.splash();
    setTimeout(() => this.throwableObjects.splice(bIndex, 1), 300);
    setTimeout(() => {
      let index = this.level.enemies.indexOf(enemy);
      if (index > -1) {
        this.level.enemies.splice(index, 1);
        this.spawnDrop(enemy.x);
      }
    }, 200);
  }

  /**
   * Handles a bottle hitting the Endboss: applies damage and checks for death.
   * @param {ThrowableObject} bottle - The bottle that hit.
   * @param {number} bIndex - The index of the bottle.
   * @param {Endboss} enemy - The Endboss that was hit.
   */
  handleBottleHitsEndboss(bottle, bIndex, enemy) {
    enemy.energy -= 20;
    if (enemy.energy < 0) enemy.energy = 0;
    this.bossBar.setPercentage(enemy.energy);
    enemy.playHurt();
    bottle.splash();
    setTimeout(() => this.throwableObjects.splice(bIndex, 1), 300);
    if (enemy.energy == 0) enemy.die();
    this.checkWinCondition();
  }

  /**
   * Checks if any thrown bottle has hit the ground and triggers a splash.
   */
  checkBottleHitsGround() {
    this.throwableObjects.forEach((bottle) => {
      if (bottle.y >= 360 && !bottle.isSplashed) {
        bottle.splash();
        setTimeout(() => {
          let index = this.throwableObjects.indexOf(bottle);
          if (index > -1) this.throwableObjects.splice(index, 1);
        }, 300);
      }
    });
  }
}