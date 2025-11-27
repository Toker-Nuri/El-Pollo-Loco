/**
 * Base class for drawable game objects that can render an image on the canvas.
 */
class DrawableObject {

    /**
     * Image object for the drawable object
     * @type {HTMLImageElement}
     */
    img;

    /**
     * Cache of loaded images
     * @type {Object}
     */
    imageCache = {};

    /**
     * Current image index for animation
     * @type {number}
     */
    currentImage = 0;

    /**
     * X-coordinate position of the object
     * @type {number}
     */
    x = 120;

    /**
     * Y-coordinate position of the object
     * @type {number}
     */
    y = 280;

    /**
     * Height of the object in pixels
     * @type {number}
     */
    height = 150;

    /**
     * Width of the object in pixels
     * @type {number}
     */
    width = 100;

    /**
     * Loads a single image and assigns it to this object.
     *
     * @param {string} path - Path to the image file.
     * @returns {void}
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;

    }

    /**
     * Loads multiple images and stores them in the image cache.
     *
     * @param {string[]} arrayOfImages - Array of image paths.
     * @returns {void}
     */
    loadImages(arrayOfImages){
        arrayOfImages.forEach((path) => {
        let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws the current image of this object onto the canvas.
     *
     * @param {CanvasRenderingContext2D} ctx - Canvas rendering context.
     * @returns {void}
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }    
}