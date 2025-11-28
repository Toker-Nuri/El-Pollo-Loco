/**
 * Canvas element for game rendering
 * @type {HTMLCanvasElement}
 */
let canvas;
/**
 * World instance containing game objects and logic
 * @type {World}
 */
let world;
/**
 * Keyboard instance for handling user input
 * @type {Keyboard}
 */
let keyboard = new Keyboard();
/**
 * FullScreen 
 * @type {boolean}
 */
let fullscreenRequestedOnce = false;
/**
 * Returns the fullscreen overlay element
 * @returns {HTMLElement}
 */
function getFullscreenOverlay() {
    return document.getElementById('fullscreen-overlay');
}
/**
 * Returns the fullscreen toggle container element
 * @returns {HTMLElement}
 */
function getFullscreenToggleContainer() {
    return document.getElementById('fullscreen-toggle-container');
}

/**
 * Updates the fullscreen button icon based on the fullscreen state
 * @param {boolean} isFullscreen - Whether the page is in fullscreen mode
 */
function updateFullscreenButtonIcon(isFullscreen) {
    const icon = document.getElementById('fullscreen-toggle-icon');
    if (!icon) {
        return;
    }
    icon.src = isFullscreen
        ? 'img/icons/full-screen-end.png'
        : 'img/icons/full-screen-start.png';
}
/**
 * Toggles fullscreen mode on/off
 */
function toggleFullscreen() {
    const doc = document;
    const isFullscreen = !!(doc.fullscreenElement || doc.webkitFullscreenElement || doc.msFullscreenElement);
    
    if (isFullscreen) {
        updateFullscreenButtonIcon(false);
        exitFullscreen();
    } else {
        updateFullscreenButtonIcon(true);
        enterFullscreen();
    }
}
/**
 * Returns the fullscreen element
 * @returns {HTMLElement}
 */
function getFullscreenElement() {
    return document.documentElement;
}
/**
 * Checks if the browser supports fullscreen mode
 * @returns {boolean}
 */
function canUseFullscreen() {
    const elem = getFullscreenElement();
    return !!(elem && (elem.requestFullscreen || elem.webkitRequestFullscreen || elem.msRequestFullscreen));
}
/**
 * Enters fullscreen mode
 */
function enterFullscreen() {
    const elem = getFullscreenElement();
    if (!elem) {
        return;
    }
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}
/**
 * Asks the user for fullscreen mode
 */
function askUserForFullscreen() {
    if (!canUseFullscreen() || fullscreenRequestedOnce) {
        return;
    }
    fullscreenRequestedOnce = true;
    const overlay = getFullscreenOverlay();
    if (overlay) {
        overlay.classList.remove('hidden');
    }
}
/**
 * Sets up fullscreen mode on the next interaction
 */
function setupFullscreenOnNextInteraction() {
    const handler = () => {
        askUserForFullscreen();
        window.removeEventListener('touchend', handler);
        window.removeEventListener('click', handler);
    };
    window.addEventListener('touchend', handler, { once: true });
    window.addEventListener('click', handler, { once: true });
}
/**
 * Handles orientation change events
 */
function handleOrientationChange() {
    if (window.matchMedia && window.matchMedia('(orientation: landscape)').matches) {
        setTimeout(() => {
            setupFullscreenOnNextInteraction();
        }, 200);
    }
}

window.addEventListener('orientationchange', handleOrientationChange);
/**
 * Exits fullscreen mode
 */
function exitFullscreen() {
    const doc = document;
    if (doc.exitFullscreen) {
        doc.exitFullscreen();
    } else if (doc.webkitExitFullscreen) {
        doc.webkitExitFullscreen();
    } else if (doc.msExitFullscreen) {
        doc.msExitFullscreen();
    }
}
/**
 * Checks if the screen is mobile or small
 * @returns {boolean}
 */
function isMobileOrSmallScreen() {
    return window.innerWidth < 1270;
}
/**
 * Handles fullscreen change events
 */
function handleFullscreenChange() {
    const doc = document;
    const isFullscreen = !!(doc.fullscreenElement || doc.webkitFullscreenElement || doc.msFullscreenElement);
    const toggleContainer = getFullscreenToggleContainer();
    
    updateFullscreenButtonIcon(isFullscreen);
    
    if (toggleContainer && isMobileOrSmallScreen()) {
        toggleContainer.style.display = 'flex';
    } else if (toggleContainer) {
        toggleContainer.style.display = 'none';
    }
    
    if (!isFullscreen) {
        const overlay = getFullscreenOverlay();
        if (overlay) {
            overlay.classList.add('hidden');
        }
    }
}

document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('msfullscreenchange', handleFullscreenChange);

document.addEventListener('DOMContentLoaded', () => {
    const overlay = getFullscreenOverlay();
    const enterBtn = document.getElementById('enter-fullscreen-btn');

    if (overlay && enterBtn) {
        enterBtn.addEventListener('click', () => {
            overlay.classList.add('hidden');
            enterFullscreen();
        });
    }
});

/**
 * Initializes the game world and starts the background music.
 * Creates the level if available, grabs the canvas element and
 * constructs the World instance.
 *
 * @returns {void}
 */
function init() {
    if (typeof createLevel1 === 'function') {
        level1 = createLevel1();
    }
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
     playSound('game', { loop: true, reset: false });
}

/**
 * Handles keydown events and sets the corresponding flags on the Keyboard instance.
 *
 * @param {KeyboardEvent} e - The keydown event.
 * @returns {void}
 */
window.addEventListener('keydown', (e) => {
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
        }
         if (e.keyCode == 39) {
            keyboard.RIGHT = true;
        }
        if (e.keyCode == 38) {
            keyboard.UP = true;
        }
        if (e.keyCode == 40) {
            keyboard.DOWN = true;
        }
        if (e.keyCode == 32) {
            keyboard.SPACE = true;
        }
        if (e.keyCode == 68) {
            keyboard.D = true;
        }
       
});

/**
 * Handles keyup events and clears the corresponding flags on the Keyboard instance.
 *
 * @param {KeyboardEvent} e - The keyup event.
 * @returns {void}
 */
window.addEventListener('keyup', (e) => {
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
        }
         if (e.keyCode == 39) {
            keyboard.RIGHT = false;
        }
        if (e.keyCode == 38) {
            keyboard.UP = false;
        }
        if (e.keyCode == 40) {
            keyboard.DOWN = false;
        }
        if (e.keyCode == 32) {
            keyboard.SPACE = false;
        }
      if (e.keyCode == 68) {
            keyboard.D = false;
        }
});

