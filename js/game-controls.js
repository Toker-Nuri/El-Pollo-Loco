/**
 * Shows or hides the main game canvas by toggling the `canvas-hidden` class.
 *
 * @param {boolean} hidden - Whether the canvas should be hidden.
 * @returns {void}
 */
function setCanvasHidden(hidden) {
    const canvas = document.getElementById('canvas');
    if (!canvas) return;
    canvas.classList.toggle('canvas-hidden', hidden);
}

/**
 * Starts the game from the main menu.
 * Hides menus/overlays, shows the canvas and mobile controls, removes the impressum,
 * and initializes the game world.
 *
 * @returns {void}
 */
function startGame() {
    document.getElementById('main-menu').classList.add('hidden'); 
    document.getElementById('controls-game-overlay').classList.add('hidden');
    document.getElementById('game-over-overlay').classList.add('hidden');
    setCanvasHidden(false);
    removeImpressum();
    const mobileUi = document.getElementById('mobile-touch-interface');
    if (mobileUi) {
        mobileUi.classList.remove('hidden');
    }
    init(); 
    if (typeof playSound === 'function' && soundEnabled) {
        playSound('game', { loop: true, reset: true });
    }
    
    // Zeige Fullscreen-Overlay auf kleinen Bildschirmen
    if (typeof isMobileOrSmallScreen === 'function' && isMobileOrSmallScreen()) {
        setTimeout(() => {
            if (typeof askUserForFullscreen === 'function') {
                fullscreenRequestedOnce = false; // Erlaube erneute Anfrage
                askUserForFullscreen();
            }
        }, 500);
    }
}

/**
 * Shows the controls overlay and hides the main menu.
 *
 * @returns {void}
 */
function showControls() {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('controls-game-overlay').classList.remove('hidden');
    showImpressum();
}

/**
 * Closes the controls overlay and returns to the main menu.
 *
 * @returns {void}
 */
function closeControls() {
    document.getElementById('controls-game-overlay').classList.add('hidden');
    document.getElementById('main-menu').classList.remove('hidden'); 

}

/**
 * Shows the story overlay and hides the main menu.
 *
 * @returns {void}
 */
function showStory() {
     document.getElementById('main-menu').classList.add('hidden'); 
    document.getElementById('story-game-overlay').classList.remove('hidden');
   showImpressum();
}

/**
 * Closes the story overlay and returns to the main menu.
 *
 * @returns {void}
 */
function closeStory() {
    document.getElementById('story-game-overlay').classList.add('hidden'); 
    document.getElementById('main-menu').classList.remove('hidden'); 
}


/**
 * Shows the settings overlay and hides the main menu.
 *
 * @returns {void}
 */
function showSettings() {
   document.getElementById('main-menu').classList.add('hidden'); 
    document.getElementById('settings-game-overlay').classList.remove('hidden');
   showImpressum();
}

/**
 * Closes the settings overlay and returns to the main menu.
 *
 * @returns {void}
 */
function closeSettings() {
    document.getElementById('settings-game-overlay').classList.add('hidden'); 
    document.getElementById('main-menu').classList.remove('hidden'); 
}

/**
 * Makes the impressum link visible.
 *
 * @returns {void}
 */
function showImpressum() {
     const impressum = document.getElementById('impressum-container');
    if (impressum) {
        impressum.classList.remove('hidden');
    }
}

/**
 * Hides the impressum link.
 *
 * @returns {void}
 */
function removeImpressum() {
     const impressum = document.getElementById('impressum-container');
    if (impressum) {
        impressum.classList.add('hidden');
    }
}

/**
 * Displays the game-over overlay with the appropriate image and sound
 * for winning or losing. Hides the canvas, mobile controls and impressum.
 *
 * @param {boolean} isWin - True if the player won, false if they lost.
 * @returns {void}
 */
function showGameOver(isWin) {
    const overlay = document.getElementById('game-over-overlay');
    const img = document.getElementById('game-over-image');
    img.src = isWin ? 'img/You won, you lost/You win B.png' :'img/You won, you lost/You lost.png';
    stopAllSounds();
    removeImpressum();
    playSound(isWin ? 'game_won' : 'game_lost');
    overlay.classList.remove('hidden');
    const mobileUi = document.getElementById('mobile-touch-interface');
    if (mobileUi) {
        mobileUi.classList.add('hidden');
    }
   
    setCanvasHidden(true);
}

/**
 * Restarts the game after game over.
 * Resets world and keyboard, re-initializes the game and shows mobile controls.
 *
 * @returns {void}
 */
function restartGame() {
    document.getElementById('game-over-overlay').classList.add('hidden');
    const mobileUi = document.getElementById('mobile-touch-interface');
    if (mobileUi) {
        mobileUi.classList.remove('hidden');
    }
    removeImpressum();
    setCanvasHidden(false);
    if (window.gameIntervalId) clearInterval(window.gameIntervalId);
    if (window.animationFrameId) cancelAnimationFrame(window.animationFrameId);
    world = null;
    keyboard = new Keyboard();
    init();
}

/**
 * Navigates back to the main menu page.
 *
 * @returns {void}
 */
function backToMenu() {
   const overlay = document.getElementById('game-over-overlay');
   if (overlay){
    overlay.classList.add('hidden');
   }
   const mainMenu = document.getElementById('main-menu');
   if (mainMenu){
    mainMenu.classList.remove('hidden');
   }
   setCanvasHidden(true);
   const mobileUi =document.getElementById('mobile-touch.interface');
   if (mobileUi){
    mobileUi.classList.add('hidden');
    showImpressum();
    resetGame();
   }
}

/**
 * Resets the game state by clearing intervals, canceling animation frames,
 * and re-initializing the world and keyboard.
 *
 * @returns {void}
 */
function resetGame() {
    if (window.gameIntervalId) clearInterval(window.gameIntervalId);
    if (window.animationFrameId) cancelAnimationFrame(window.animationFrameId);
    world = null;
    keyboard = new Keyboard();
}

