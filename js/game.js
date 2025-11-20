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