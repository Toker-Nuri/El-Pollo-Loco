/**
 * Represents a game level with enemies, clouds, background objects, coins, bottles and an end boss
 * @class
 */

class Level {
    /**
     * Creates a new level with the given enemies, clouds, and background objects.
     *
     * @param {MovebleObject[]} enemies - Array of enemy objects.
     * @param {MovebleObject[]} clouds - Array of cloud objects.
     * @param {MovebleObject[]} BackgroundObject - Array of background objects.
     */
    
enemies;
clouds;
BackgroundObject;

   /**
     * X-coordinate where the level ends
     * @type {number}
     */
level_end_x = 4950;

    /**
     * Creates a new Level instance
     * @param {Array} enemies - Array of enemy objects
     * @param {Array} clouds - Array of cloud objects
     * @param {Array} backgroundObjects - Array of background objects
     */
constructor(enemies,clouds,BackgroundObject){
    this.enemies = enemies;
    this.clouds = clouds;
    this.BackgroundObject = BackgroundObject;

}

}