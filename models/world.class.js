/**
 * Represents the game world including character, level, enemies and UI elements.
 */
class World {
    /**
     * The character instance.
     * @type {Charakter}
     */
    character = new Charakter();

    /**
     * The level instance.
     * @type {Level}
     */
    level = level1;

    /**
     * The canvas element.
     * @type {HTMLCanvasElement}
     */
    canvas;

    /**
     * The canvas context.
     * @type {CanvasRenderingContext2D}
     */
    ctx;

    /**
     * The keyboard handler instance.
     * @type {Keyboard}
     */
    keyboard;

    /**
     * The camera x position.
     * @type {number}
     */
    camera_x = 0;

    /**
     * The status bar instance.
     * @type {StatusBar}
     */
    statusBar = new StatusBar();

    /**
     * The coin bar instance.
     * @type {CoinBar}
     */
    coinBar = new CoinBar();

    /**
     * The bottle bar instance.
     * @type {BottleBar}
     */
    bottleBar = new BottleBar();

    /**
     * The endboss bar instance.
     * @type {EndbossBar}
     */
    endbossBar = new EndbossBar();

    /**
     * The bottles array.
     * @type {ThrowableObject[]}
     */
    bottles = [];

    /**
     * The coins array.
     * @type {ThrowableObject[]}
     */
    coins = [];

    /**
     * The throwable objects array.
     * @type {ThrowableObject[]}
     */
    throwableObjects = [];

    /**
     * The total number of bottles.
     * @type {number}
     */
    TOTAL_BOTTLES = 10;

    /**
     * The total number of coins.
     * @type {number}
     */
    TOTAL_COINS = 11;

    /**
     * The collected coins count.
     * @type {number}
     */
    collectedCoins = 0;

    /**
     * The collected bottles count.
     * @type {number}
     */
    collectedBottles = 0;

    /**
     * The bottle throw timeout flag.
     * @type {boolean}
     */
    bottleThrowTimeout = false;

    /**
     * The character previous bottom position.
     * @type {number}
     */
    characterPrevBottom = 0;
    
    /**
     * The game over instance.
     * @type {GameOver}
     */
    gameOver = null;

    /**
     * Creates a new world instance and initializes level content.
     *
     * @param {HTMLCanvasElement} canvas - Canvas element to render the world on.
     * @param {Keyboard} keyboard - Keyboard handler instance for input.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.createBottles();
        this.createCoins();
        this.draw();
        this.setWorld();
        this.run();
        this.setupGameOverClickHandler();
    }

    /**
     * Registers the click handler that forwards clicks to the game over overlay.
     *
     * @returns {void}
     */
    setupGameOverClickHandler() {
        this.canvas.addEventListener('click', (e) => {
            if (!this.gameOver) return;
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = e.clientX - rect.left;
            const mouseY = e.clientY - rect.top;
            if (typeof this.gameOver.onClick === 'function') {
                this.gameOver.onClick(mouseX, mouseY);
            }
        });
    }

    /**
     * Injects this world instance into the character and all enemies.
     *
     * @returns {void}
     */
    setWorld() {
        this.character.world = this;
        if (this.level && this.level.enemies) {
            this.level.enemies.forEach((enemy) => {
                enemy.world = this;
            });
        }
    }

    /**
     * Creates all coin instances for the level at predefined positions.
     *
     * @returns {void}
     */
    createCoins() {
        this.coins = [
            new Coins(300, Math.random() * 80 + 40),
            new Coins(600, Math.random() * 80 + 40),
            new Coins(900, Math.random() * 80 + 40),
            new Coins(1200, Math.random() * 80 + 100),
            new Coins(1500, Math.random() * 80 + 70),
            new Coins(1800, Math.random() * 80 + 90),
            new Coins(2100, Math.random() * 80 + 30),
            new Coins(2400, Math.random() * 80 + 50),
            new Coins(2700, Math.random() * 80 + 80),
            new Coins(3000, Math.random() * 80 + 10),
            new Coins(3300, Math.random() * 80 + 70),
            new Coins(3600, Math.random() * 80 + 40),
            new Coins(3900, Math.random() * 80 + 100),
            new Coins(4200, Math.random() * 80 + 70),
            new Coins(4500, Math.random() * 80 + 90)
        ];
    }

    /**
     * Creates all bottle pickup instances for the level.
     *
     * @returns {void}
     */
    createBottles() {
        this.bottles = [
            new Bottles(400, 360),
            new Bottles(700, 360),
            new Bottles(900, 360),
            new Bottles(1200, 360),
            new Bottles(1500, 360),
            new Bottles(1800, 360),
            new Bottles(2100, 360),
            new Bottles(2400, 360),
            new Bottles(2700, 360),
            new Bottles(3000, 360),
            new Bottles(3300, 360),
            new Bottles(3700, 360),
            new Bottles(4000, 360),
            new Bottles(4200, 360),
            new Bottles(4500, 360),
            new Bottles(4700, 360)
        ];
    }

    /**
     * Starts the main world loop that checks collisions and game state.
     *
     * @returns {void}
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkGameOver(); 
            this.checkThrowObjects();
            this.updateEndbossBarVisibility();
        }, 1000 / 60);
    }

    /**
     * Checks whether the game is over (win or loss) and triggers the overlay.
     *
     * @returns {void}
     */
    checkGameOver() {
        if (this.character.isDead()) {
            if (!this.gameOver) {
                this.gameOver = new GameOver(false);
                if (window.showGameOver) window.showGameOver(false);
            }
        }
        if (this.level.enemies.some(e => e instanceof Endboss && e.isDead)) {
            if (!this.gameOver) {
                this.gameOver = new GameOver(true);
                if (window.showGameOver) window.showGameOver(true);
            }
        }
    }

    /**
     * Draws one frame of the world and schedules the next frame.
     *
     * @returns {void}
     */
    draw() {
        clearFrame(this);
        drawWorld(this);
        scheduleNextFrame(this);
    }

    /**
     * Adds all given objects to the canvas using the global helper.
     *
     * @param {DrawableObject[]} objects - Objects to draw.
     * @returns {void}
     */
    addObjectsToMap(objects) {
        addObjectsToMapHelper(this, objects);
    }

    /**
     * Draws a single object to the canvas, flipped if necessary, using the global helper.
     *
     * @param {DrawableObject} MoObject - Object to draw.
     * @returns {void}
     */
    addToMap(MoObject) {
        addToMapHelper(this, MoObject);
    }

    /**
     * Updates the visibility of the endboss health bar based on boss state.
     *
     * @returns {void}
     */
    updateEndbossBarVisibility() {
        if (!this.endbossBar || !this.level || !this.level.enemies) {
            return;
        }
        const boss = this.level.enemies.find((enemy) => enemy instanceof Endboss);
        if (boss && boss.isActivated && !boss.isDead && !boss.isDying) {
            this.endbossBar.show();
        } else {
            this.endbossBar.hide();
        }
    }

    /**
     * Handles all collision-related logic in the world via global helpers.
     *
     * @returns {void}
     */
    checkCollisions() {
        checkWorldCollisions(this);
    }

    /**
     * Handles bottle throw input and spawns a bottle when allowed via global helpers.
     *
     * @returns {void}
     */
    checkThrowObjects() {
        handleThrowObjects(this);
    }
}