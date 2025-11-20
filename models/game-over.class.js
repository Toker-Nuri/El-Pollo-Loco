/**
 * Fullscreen overlay that is shown when the game is over.
 * Displays either a win or lose image.
 * @extends DrawableObject
 */
class GameOver extends DrawableObject {
    /**
     * Creates a new game over screen.
     *
     * @param {boolean} isWin - Whether the player has won (true) or lost (false).
     * @constructor
     */
    constructor(isWin) {
        super();
        this.isWin = !!isWin;
        const imgPath = isWin ? 'img/You won, you lost/You win B.png' : 'img/You won, you lost/You lost.png';
        this.loadImage(imgPath);
        this.x = 0; this.y = 0;
        this.width = 720; this.height = 480;
    }
}