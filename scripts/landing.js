/**
 * Starts the game by hiding the start screen and initializing the world.
 */
function startGame() {
  document.getElementById("start-screen").classList.add("hidden");
  
  // Enable hover bar buttons
  const buttonsToEnable = ["btn-restart-hover", "btn-mute-music", "btn-mute-sounds"];
  buttonsToEnable.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.classList.remove("disabled");
  });

  init();
}

/**
 * Shows the Game Over screen.
 */
function showGameOver() {
  document.getElementById("game-over-screen").classList.remove("hidden");
  if (typeof soundManager !== 'undefined') {
    soundManager.pauseBackgroundMusic();
    soundManager.stopChickenSound();
    soundManager.stopSmallChickenSound();
    soundManager.stopEndbossChickenSound();
    soundManager.playGameOverSound();
  }
}

/**
 * Shows the Win screen.
 */
function showWin() {
  document.getElementById("win-screen").classList.remove("hidden");
  if (typeof soundManager !== 'undefined') {
    soundManager.pauseBackgroundMusic();
    soundManager.stopAllGameplaySounds();
    soundManager.playWinSound();
  }
}

/**
 * Restarts the game by clearing all intervals and initializing a new world.
 */
function restartGame() {
  clearAllGameIntervals();
  
  if (typeof soundManager !== "undefined") {
    soundManager.stopAllGameplaySounds();
  }
  
  resetGameUI();

  // Start a fresh game
  init();
}

/**
 * Clears all running intervals to stop the current game loop cleanly.
 */
function clearAllGameIntervals() {
    if (world) world.stop();
    for (let i = 1; i < 9999; i++) {
        window.clearInterval(i);
      }
}

/**
 * Hides victory/game over screens and enables hover bar buttons.
 */
function resetGameUI() {
  document.getElementById("game-over-screen").classList.add("hidden");
  document.getElementById("win-screen").classList.add("hidden");
  
  const buttonsToEnable = ["btn-restart-hover", "btn-mute-music", "btn-mute-sounds"];
  buttonsToEnable.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.classList.remove("disabled");
  });
}

/**
 * Returns to the Home Screen from the Game Over Screen.
 */
function goHome() {
  clearAllGameIntervals();
  
  if (typeof soundManager !== "undefined") {
    soundManager.pauseBackgroundMusic();
    soundManager.stopAllGameplaySounds();
  }
  
  resetHomeUI();
}

/**
 * Updates the UI elements to show the start screen and hide game-related overlays.
 */
function resetHomeUI() {
  document.getElementById("game-over-screen").classList.add("hidden");
  document.getElementById("win-screen").classList.add("hidden");
  
  const mobileControls = document.getElementById("mobile-controls");
  if (mobileControls) mobileControls.classList.add("hidden");

  const buttonsToDisable = ["btn-restart-hover", "btn-mute-music", "btn-mute-sounds"];
  buttonsToDisable.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.classList.add("disabled");
  });

  document.getElementById("start-screen").classList.remove("hidden");
}

/**
 * Opens a dialog overlay by adding the 'active' class.
 * @param {string} dialogId - The ID of the dialog overlay element.
 */
function openDialog(dialogId) {
  document.getElementById(dialogId).classList.add("active");
}

/**
 * Closes a dialog overlay by removing the 'active' class.
 * @param {string} dialogId - The ID of the dialog overlay element.
 */
function closeDialog(dialogId) {
  document.getElementById(dialogId).classList.remove("active");
}

/**
 * Closes the dialog when clicking on the backdrop (outside the dialog box).
 * @param {Event} event - The click event.
 * @param {string} dialogId - The ID of the dialog overlay element.
 */
function closeDialogOnBackdrop(event, dialogId) {
  if (event.target === event.currentTarget) {
    closeDialog(dialogId);
  }
}

/**
 * Toggles fullscreen mode on the game container.
 */
function toggleFullscreen() {
  let container = document.getElementById("game-container");
  if (!document.fullscreenElement) {
    container.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

/**
 * Updates the fullscreen icon based on whether the document is in fullscreen mode.
 */
function updateFullscreenIcon() {
  const icon = document.getElementById("fullscreen-icon");
  if (document.fullscreenElement) {
    icon.src = "img/exit_fullscreen.svg";
  } else {
    icon.src = "img/fullscreen.svg";
  }
}

// Update icon when fullscreen state changes (e.g., via ESC key)
document.addEventListener("fullscreenchange", updateFullscreenIcon);