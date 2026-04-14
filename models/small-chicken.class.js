/**
 * Represents a small chicken enemy that inherits behavior from Chicken.
 * @extends Chicken
 */
class SmallChicken extends Chicken {
  height = 50;
  width = 50;
  y = 370;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];

  /**
   * Creates a new SmallChicken instance, loads its images, and randomizes position and speed.
   */
  constructor() {
    super();
    this.loadImage("img/3_enemies_chicken/chicken_small/1_walk/1_w.png");
    this.loadImages(this.IMAGES_WALKING);
    this.x = 800 + Math.random() * 2000;
    this.speed = 0.5 + Math.random() * 2;
  }

  /**
   * Kills the small chicken, shows the dead image, plays a sound, and stops ambient sound if none remain.
   */
  die() {
    this.isDead = true;
    this.loadImage("img/3_enemies_chicken/chicken_small/2_dead/dead.png");
    if (typeof soundManager !== "undefined") soundManager.playSmashSound();
    this.stopSoundIfLastSmallChicken();
  }

  /**
   * Stops the small chicken ambient sound if no living small chickens remain.
   */
  stopSoundIfLastSmallChicken() {
    if (!this.world) return;
    let livingSmallChickens = this.world.level.enemies.filter(
      (e) => e instanceof SmallChicken && !e.isDead
    );
    if (livingSmallChickens.length === 0) {
      soundManager.stopSmallChickenSound();
    }
  }
}