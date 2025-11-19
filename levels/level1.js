function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

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
            new Clouds(200),
            new Clouds(1000),
            new Clouds(1800),
            new Clouds(2600),
            new Clouds(3400),
            new Clouds(4200),
        ],
        [
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

            new BackgroundObject('img/5_background/layers/air.png', 718 * 5),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 718 * 5),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 718 * 5),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 718 * 5),

            new BackgroundObject('img/5_background/layers/air.png', 718 * 6),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 718 * 6),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 718 * 6),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 718 * 6),

            new BackgroundObject('img/5_background/layers/air.png', 718 * 7),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 718 * 7),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 718 * 7),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 718 * 7),
        ]
    );
}

let level1 = createLevel1();