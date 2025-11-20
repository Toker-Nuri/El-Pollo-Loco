/**
 * Returns a random integer between min and max (inclusive).
 *
 * @param {number} min - Minimum value (inclusive).
 * @param {number} max - Maximum value (inclusive).
 * @returns {number} A random integer in the given range.
 */
function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Creates an array of Chicken instances with random, non-overlapping x positions.
 *
 * @param {number} count - Number of chickens to create.
 * @param {number} minX - Minimum x position.
 * @param {number} maxX - Maximum x position.
 * @param {number} [minGap=120] - Minimal distance between two chickens on the x-axis.
 * @returns {Chicken[]} Array of created Chicken instances.
 */
function createChickens(count, minX, maxX, minGap = 120) {
    const xs = [];
    const chickens = [];
    for (let i = 0; i < count; i++) {
        let x;
        let tries = 0;
        do {
            x = randInt(minX, maxX);
            tries++;
        } while (xs.some(prev => Math.abs(prev - x) < minGap) && tries < 50);
        xs.push(x);
        const c = new Chicken();
        c.x = x;
        chickens.push(c);
    }
    return chickens;
}

/**
 * Factory function that creates the main game level (level1)
 * with enemies and background layers.
 *
 * @returns {Level} Configured level instance.
 */
function createLevel1() {
    return new Level(
        [
            ...createChickens(10, 700, 4800),
            ...Array.from({ length: 10 }, () => {
                const s = new ChickenSmall();
                s.x = 700 + Math.random() * 4100;
                return s;
            }),
            new Endboss()
        ],
        [
            ...createBackgroundFirstLayer(),
            ...createBackgroundSecondLayer(),
            ...createBackgroundThirdLayer(), 
        ]
    );
}

/**
 * Creates the first chunk of background tiles (near the starting area).
 *
 * @returns {BackgroundObject[]} List of background objects for the first section.
 */
function createBackgroundFirstLayer() {
    return [
        new BackgroundObject('img/5_background/layers/air.png', -719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

        new BackgroundObject('img/5_background/layers/air.png', 718),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 718),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 718),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 718),
    ]
}

/**
 * Creates the second chunk of background tiles.
 *
 * @returns {BackgroundObject[]} List of background objects for the second section.
 */
function createBackgroundSecondLayer() {
    return [
        new BackgroundObject('img/5_background/layers/air.png', 718 * 2),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 718 * 2),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 718 * 2),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 718 * 2),

        new BackgroundObject('img/5_background/layers/air.png', 718 * 3),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 718 * 3),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 718 * 3),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 718 * 3),

        new BackgroundObject('img/5_background/layers/air.png', 718 * 4),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 718 * 4),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 718 * 4),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 718 * 4),
    ]
}

/**
 * Creates the third chunk of background tiles (further into the level).
 *
 * @returns {BackgroundObject[]} List of background objects for the third section.
 */
function createBackgroundThirdLayer() {
    return [
        new BackgroundObject('img/5_background/layers/air.png', 718 * 5),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 718 * 5),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 718 * 5),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 718 * 5),

        new BackgroundObject('img/5_background/layers/air.png', 718 * 6),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 718 * 6),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 718 * 6),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 718 * 6),
            new BackgroundObject('img/5_background/layers/air.png', 718 * 6),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 718 * 6),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 718 * 6),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 718 * 6),

            new BackgroundObject('img/5_background/layers/air.png', 718 * 7),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 718 * 7),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 718 * 7),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 718 * 7),
    ]
}

let level1 = createLevel1();