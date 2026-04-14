/**
 * Manages all game audio including background music, sound effects, and mute state persistence.
 */
class SoundManager {
  backgroundMusic = new Audio("audio/audio_elpolloloco-background-music.mp3");
  bottleThrowSound = new Audio("audio/audio_throwing-bottle.mp3");
  bottleShatterSound = new Audio("audio/audio_bottle-shattering.mp3");
  chickenSound = new Audio("audio/audio_chicken-sound.mp3");
  smallChickenSound = new Audio("audio/audio_chicken-small-sound.mp3");
  snoreSound = new Audio("audio/audio_snore-sound.mp3");
  smashSound = new Audio("audio/audio_smash-sound.mp3");
  coinCollectSound = new Audio("audio/audio_coin-collect.mp3");
  winSound = new Audio("audio/audio_win-sound.mp3");
  gameOverSound = new Audio("audio/audio_game-over-sound.mp3");
  ouchSound = new Audio("audio/audio_ouch-sound.mp3");
  endbossGrowlSound = new Audio("audio/audio_endboss-growl.mp3");
  endbossChickenSound = new Audio("audio/audio_endboss-chicken-sound.mp3");
  jumpSound = new Audio("audio/audio_jump.mp3");
  landingSound = new Audio("audio/audio_landing.mp3");
  deathScreamSound = new Audio("audio/audio_death-scream.mp3");

  isMusicMuted = false;
  isSoundsMuted = false;

  /**
   * Creates a new SoundManager, configures looping sounds, and restores mute state from localStorage.
   */
  constructor() {
    this.backgroundMusic.loop = true;
    this.bottleThrowSound.loop = true;
    this.chickenSound.loop = true;
    this.smallChickenSound.loop = true;
    this.snoreSound.loop = true;
    this.endbossChickenSound.loop = true;
    this.isMusicMuted = localStorage.getItem("isMusicMuted") === "true";
    this.isSoundsMuted = localStorage.getItem("isSoundsMuted") === "true";
  }

  /**
   * Plays the Endboss growl sound effect.
   */
  playEndbossGrowlSound() {
    if (this.isSoundsMuted) return;
    this.endbossGrowlSound.currentTime = 0;
    this.endbossGrowlSound.play().catch((e) => console.warn(e));
  }

  /**
   * Plays the Endboss ambient chicken sound if not already playing.
   */
  playEndbossChickenSound() {
    if (this.isSoundsMuted) return;
    if (this.endbossChickenSound.paused) {
      this.endbossChickenSound.play().catch((e) => console.warn(e));
    }
  }

  /**
   * Stops the Endboss ambient chicken sound.
   */
  stopEndbossChickenSound() {
    this.endbossChickenSound.pause();
  }

  /**
   * Plays the ouch sound when the character is hit.
   */
  playOuchSound() {
    if (this.isSoundsMuted) return;
    this.ouchSound.currentTime = 0;
    this.ouchSound.play().catch((e) => console.warn(e));
  }

  /**
   * Plays the win sound effect.
   */
  playWinSound() {
    if (this.isSoundsMuted) return;
    this.winSound.currentTime = 0;
    this.winSound.play().catch((e) => console.warn(e));
  }

  /**
   * Plays the game over sound effect.
   */
  playGameOverSound() {
    if (this.isSoundsMuted) return;
    this.gameOverSound.currentTime = 0;
    this.gameOverSound.play().catch((e) => console.warn(e));
  }

  /**
   * Plays the coin collection sound effect.
   */
  playCoinCollectSound() {
    if (this.isSoundsMuted) return;
    this.coinCollectSound.currentTime = 0;
    this.coinCollectSound.play().catch((e) => console.warn(e));
  }

  /**
   * Plays the smash sound when an enemy is killed.
   */
  playSmashSound() {
    if (this.isSoundsMuted) return;
    this.smashSound.currentTime = 0;
    this.smashSound.play().catch((e) => console.warn(e));
  }

  /**
   * Plays the snore sound if not already playing.
   */
  playSnoreSound() {
    if (this.isSoundsMuted) return;
    if (this.snoreSound.paused) {
      this.snoreSound.play().catch((e) => console.warn(e));
    }
  }

  /**
   * Stops the snore sound.
   */
  stopSnoreSound() {
    if (!this.snoreSound.paused) {
      this.snoreSound.pause();
    }
  }

  /**
   * Plays the chicken ambient sound.
   */
  playChickenSound() {
    if (this.isSoundsMuted) return;
    this.chickenSound.play().catch((e) => console.warn(e));
  }

  /**
   * Stops the chicken ambient sound.
   */
  stopChickenSound() {
    this.chickenSound.pause();
  }

  /**
   * Plays the small chicken ambient sound.
   */
  playSmallChickenSound() {
    if (this.isSoundsMuted) return;
    this.smallChickenSound.play().catch((e) => console.warn(e));
  }

  /**
   * Stops the small chicken ambient sound.
   */
  stopSmallChickenSound() {
    this.smallChickenSound.pause();
  }

  /**
   * Plays the background music if not muted.
   */
  playBackgroundMusic() {
    if (this.isMusicMuted) return;
    this.backgroundMusic.play().catch((e) => {
      console.warn("Autoplay prevented:", e);
    });
  }

  /**
   * Pauses and resets the background music.
   */
  pauseBackgroundMusic() {
    this.backgroundMusic.pause();
    this.backgroundMusic.currentTime = 0;
  }

  /**
   * Plays the bottle throw sound effect.
   */
  playBottleThrowSound() {
    if (this.isSoundsMuted) return;
    this.bottleThrowSound.currentTime = 0;
    this.bottleThrowSound.play().catch((e) => console.warn(e));
  }

  /**
   * Stops the bottle throw sound and resets its position.
   */
  stopBottleThrowSound() {
    this.bottleThrowSound.pause();
    this.bottleThrowSound.currentTime = 0;
  }

  /**
   * Plays the bottle shatter sound effect.
   */
  playBottleShatterSound() {
    if (this.isSoundsMuted) return;
    this.bottleShatterSound.currentTime = 0;
    this.bottleShatterSound.play().catch((e) => console.warn(e));
  }

  /**
   * Plays the jump sound effect.
   */
  playJumpSound() {
    if (this.isSoundsMuted) return;
    this.jumpSound.currentTime = 0;
    this.jumpSound.play().catch((e) => console.warn(e));
  }

  /**
   * Plays the landing sound effect.
   */
  playLandingSound() {
    if (this.isSoundsMuted) return;
    this.landingSound.currentTime = 0;
    this.landingSound.play().catch((e) => console.warn(e));
  }

  /**
   * Plays the death scream sound effect.
   */
  playDeathScreamSound() {
    if (this.isSoundsMuted) return;
    this.deathScreamSound.currentTime = 0;
    this.deathScreamSound.play().catch((e) => console.warn(e));
  }

  /**
   * Stops all looping gameplay sounds (chickens, snore, bottle throw).
   */
  stopAllGameplaySounds() {
    this.stopChickenSound();
    this.stopSmallChickenSound();
    this.stopEndbossChickenSound();
    this.stopSnoreSound();
    this.stopBottleThrowSound();
  }
}