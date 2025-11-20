/**
 * Base class for drawable game objects that can render an image on the canvas.
 */
class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
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