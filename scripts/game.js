let canvas;
let world;
let keyboard = new Keyboard();
let soundManager = new SoundManager();

/**
 * Initializes the game world and sets up mobile controls and sounds.
 */
function init() {
  canvas = document.getElementById("canvas");
  initLevel();
  world = new World(canvas, keyboard);

  syncMuteButtons();
  bindMobileControls();

  document.getElementById("mobile-controls").classList.remove("hidden");

  soundManager.playBackgroundMusic();
  soundManager.playChickenSound();
  soundManager.playSmallChickenSound();
}

/**
 * Handles keydown events to set the respective state in the keyboard object.
 * @param {KeyboardEvent} event - The keydown event.
 */
function handleKeyDown(event) {
  if (event.keyCode == 39) keyboard.RIGHT = true;
  if (event.keyCode == 37) keyboard.LEFT = true;
  if (event.keyCode == 38) keyboard.UP = true;
  if (event.keyCode == 40) keyboard.DOWN = true;
  if (event.keyCode == 32) keyboard.SPACE = true;
  if (event.keyCode == 68) keyboard.D = true;
}

/**
 * Handles keyup events to reset the respective state in the keyboard object.
 * @param {KeyboardEvent} event - The keyup event.
 */
function handleKeyUp(event) {
  if (event.keyCode == 39) keyboard.RIGHT = false;
  if (event.keyCode == 37) keyboard.LEFT = false;
  if (event.keyCode == 38) keyboard.UP = false;
  if (event.keyCode == 40) keyboard.DOWN = false;
  if (event.keyCode == 32) keyboard.SPACE = false;
  if (event.keyCode == 68) keyboard.D = false;
}

window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);

/**
 * Toggles the background music state.
 */
function toggleMusic() {
  const btn = document.getElementById("btn-mute-music");
  if (btn && btn.classList.contains("disabled")) return;

  soundManager.isMusicMuted = !soundManager.isMusicMuted;
  localStorage.setItem("isMusicMuted", soundManager.isMusicMuted);
  syncMuteButtons();
  if (soundManager.isMusicMuted) {
    soundManager.pauseBackgroundMusic();
  } else {
    soundManager.playBackgroundMusic();
  }
}

/**
 * Toggles the sound effect state and adjusts active game sounds.
 */
function toggleSounds() {
  const btn = document.getElementById("btn-mute-sounds");
  if (btn && btn.classList.contains("disabled")) return;

  soundManager.isSoundsMuted = !soundManager.isSoundsMuted;
  localStorage.setItem("isSoundsMuted", soundManager.isSoundsMuted);
  syncMuteButtons();
  updateGameSounds();
}

/**
 * Either stops or plays game sounds based on the sound manager's muted state.
 */
function updateGameSounds() {
  if (soundManager.isSoundsMuted) {
    soundManager.stopChickenSound();
    soundManager.stopSmallChickenSound();
    soundManager.stopEndbossChickenSound();
    soundManager.stopSnoreSound();
  } else {
    playActiveGameSounds();
  }
}

/**
 * Checks which game sounds should currently be playing and starts them.
 */
function playActiveGameSounds() {
  if (world && world.level && world.level.enemies) {
    if (world.level.enemies.some((e) => e instanceof Chicken && !e.isDead)) {
      soundManager.playChickenSound();
    }
    if (world.level.enemies.some((e) => e instanceof SmallChicken && !e.isDead)) {
      soundManager.playSmallChickenSound();
    }
    checkEndbossSound();
  }
}

/**
 * Plays the endboss sound if the boss is visible and not dead.
 */
function checkEndbossSound() {
  if (world.bossVisible) {
    let endboss = world.level.enemies.find((e) => e instanceof Endboss);
    if (endboss && !endboss.isDead) {
      soundManager.playEndbossChickenSound();
    }
  }
}

/**
 * Synchronizes the mute buttons UI with the current sound manager state.
 */
function syncMuteButtons() {
  const musicBtn = document.getElementById("btn-mute-music");
  const soundsBtn = document.getElementById("btn-mute-sounds");
  syncButtonUI(musicBtn, soundManager.isMusicMuted);
  syncButtonUI(soundsBtn, soundManager.isSoundsMuted);
}

/**
 * Updates a button's UI class based on its muted state.
 * @param {HTMLElement} btn - The button element.
 * @param {boolean} isMuted - Whether the sound is muted.
 */
function syncButtonUI(btn, isMuted) {
  if (btn) {
    if (isMuted) {
      btn.classList.add("muted");
    } else {
      btn.classList.remove("muted");
    }
  }
}

// Initial sync on page load (before startGame)
document.addEventListener("DOMContentLoaded", syncMuteButtons);

/**
 * Binds touch events to mobile control buttons.
 */
function bindMobileControls() {
  bindTouchEvents("btn-mobile-left", "LEFT");
  bindTouchEvents("btn-mobile-right", "RIGHT");
  bindTouchEvents("btn-mobile-jump", "SPACE");
  bindTouchEvents("btn-mobile-throw", "D");

  const mobileButtons = document.querySelectorAll(".mobile-btn");
  mobileButtons.forEach((btn) => {
    btn.addEventListener("contextmenu", (e) => e.preventDefault());
  });
}

/**
 * Helper to bind touchstart and touchend to a button to toggle a keyboard state.
 * @param {string} id - The ID of the button element.
 * @param {string} keyCode - The keyboard state property to toggle (e.g. "LEFT").
 */
function bindTouchEvents(id, keyCode) {
  const btn = document.getElementById(id);
  if (btn) {
    btn.addEventListener("touchstart", (e) => {
      e.preventDefault();
      keyboard[keyCode] = true;
    });
    btn.addEventListener("touchend", (e) => {
      e.preventDefault();
      keyboard[keyCode] = false;
    });
  }
}

/**
 * Toggles the additional mobile menu overlay.
 */
function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu-overlay");
  if (menu) {
    menu.classList.toggle("hidden");
  }
}