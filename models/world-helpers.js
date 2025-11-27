/**
 * Helper functions for rendering and gameplay logic of the World.
 * These functions operate on a World instance passed as the first argument.
 */

/**
 * Clears the canvas for the next frame.
 *
 * @param {World} world - The world instance.
 */
function clearFrame(world) {
    world.ctx.clearRect(0, 0, world.canvas.width, world.canvas.height);
}

/**
 * Draws all world objects onto the canvas.
 *
 * @param {World} world - The world instance.
 */
function drawWorld(world) {
    world.ctx.translate(world.camera_x, 0);
    world.addObjectsToMap(world.level.BackgroundObject);
    world.addObjectsToMap(world.level.clouds);
    world.addObjectsToMap(world.level.enemies);
    world.addObjectsToMap(world.coins);
    world.ctx.translate(-world.camera_x, 0);
    drawStatusBars(world);
    world.ctx.translate(world.camera_x, 0);
    world.addObjectsToMap(world.bottles);
    world.addToMap(world.character);
    world.addObjectsToMap(world.throwableObjects);
    world.ctx.translate(-world.camera_x, 0);
}

/**
 * Draws all status bars (health, coins, bottles, endboss).
 *
 * @param {World} world - The world instance.
 */
function drawStatusBars(world) {
    world.addToMap(world.statusBar);
    world.addToMap(world.coinBar);
    world.addToMap(world.bottleBar);
    world.addToMap(world.endbossBar);
}

/**
 * Schedules the next animation frame for drawing.
 *
 * @param {World} world - The world instance.
 */
function scheduleNextFrame(world) {
    requestAnimationFrame(() => {
        world.draw();
    });
}

/**
 * Adds all given objects to the canvas using addToMap.
 *
 * @param {World} world - The world instance.
 * @param {DrawableObject[]} objects - Objects to draw.
 */
function addObjectsToMapHelper(world, objects) {
    if (!objects || !objects.forEach) return;
    objects.forEach((obj) => {
        world.addToMap(obj);
    });
}

/**
 * Draws a single object to the canvas, flipped if necessary.
 *
 * @param {World} world - The world instance.
 * @param {DrawableObject} obj - Object to draw.
 */
function addToMapHelper(world, obj) {
    if (!obj) return;
    if (obj.otherDirection) {
        drawFlippedObject(world, obj);
        return;
    }
    drawNormalObject(world, obj);
}

/**
 * Draws an object normally (not flipped).
 *
 * @param {World} world - The world instance.
 * @param {DrawableObject} obj - Object to draw.
 */
function drawNormalObject(world, obj) {
    obj.draw(world.ctx);
    if (typeof obj.drawFrame === 'function') {
        obj.drawFrame(world.ctx);
    }
}

/**
 * Draws an object flipped horizontally.
 *
 * @param {World} world - The world instance.
 * @param {DrawableObject} obj - Object to draw flipped.
 */
function drawFlippedObject(world, obj) {
    world.ctx.save();
    world.ctx.translate(obj.x + obj.width, 0);
    world.ctx.scale(-1, 1);
    const oldX = obj.x;
    obj.x = 0;
    obj.draw(world.ctx);
    if (typeof obj.drawFrame === 'function') {
        obj.drawFrame(world.ctx);
    }
    obj.x = oldX;
    world.ctx.restore();
}

/**
 * Handles all collision-related logic in the world.
 *
 * @param {World} world - The world instance.
 */
function checkWorldCollisions(world) {
    const currBottom = world.character.y + world.character.height - world.character.offset.bottom;
    if (world.characterPrevBottom === 0) {
        world.characterPrevBottom = currBottom;
    }
    activateEndbossIfNeeded(world);
    const stompedAny = handleStompOnEnemies(world, currBottom);
    if (!stompedAny) {
        handleEnemyDamage(world);
    }
    handleBottleEnemyCollisions(world);
    handleEndbossProximity(world);
    handleCoinCollisions(world);
    handleBottlePickups(world);
    world.characterPrevBottom = currBottom;
}

/**
 * Activates the endboss when the character is close enough.
 *
 * @param {World} world - The world instance.
 */
function activateEndbossIfNeeded(world) {
    world.level.enemies.forEach((enemy) => {
        if (enemy instanceof Endboss && !enemy.isActivated) {
            const activationDistance = 400;
            if (world.character.x > enemy.x - activationDistance) {
                enemy.isActivated = true;
                enemy.alertScheduled = false;
                enemy.hasAlertPlayed = false;
            }
        }
    });
}

/**
 * Handles stomping on enemies and returns whether any stomp occurred.
 *
 * @param {World} world - The world instance.
 * @param {number} currBottom - Current bottom position of the character.
 * @returns {boolean}
 */
function handleStompOnEnemies(world, currBottom) {
    let stompedAny = false;
    world.level.enemies.forEach((enemy) => {
        if (enemy.isDead) return;
        if (shouldStompEnemy(world, enemy, currBottom)) {
            enemy.kill();
            stompedAny = true;
        }
    });
    if (stompedAny) {
        world.character.speedY = 32;
        world.character.lastBounce = new Date().getTime();
    }
    return stompedAny;
}

/**
 * Determines whether the character should stomp the given enemy.
 *
 * @param {World} world - The world instance.
 * @param {MovebleObject} enemy - The enemy to test.
 * @param {number} currBottom - Current bottom position of the character.
 * @returns {boolean}
 */
function shouldStompEnemy(world, enemy, currBottom) {
    const cLeft = world.character.x + world.character.offset.left;
    const cRight = world.character.x + world.character.width - world.character.offset.right;
    const eLeft = enemy.x + enemy.offset.left;
    const eRight = enemy.x + enemy.width - enemy.offset.right;
    const eTop = enemy.y + enemy.offset.top;
    const horizontalOverlap = cRight > eLeft && cLeft < eRight;
    const crossedTopPlane = world.characterPrevBottom <= eTop && currBottom >= eTop;
    const falling = world.character.speedY < 0;
    return horizontalOverlap && crossedTopPlane && falling;
}

/**
 * Handles the character taking damage from enemies.
 *
 * @param {World} world - The world instance.
 */
function handleEnemyDamage(world) {
    world.level.enemies.forEach((enemy) => {
        if (enemy.isDead) return;
        if (!world.character.isColliding(enemy)) return;
        if (world.character.isHurt()) return;
        if (enemy instanceof Endboss) {
            if (enemy.isActivated && !enemy.isTakingDamage && !enemy.isDying) {
                world.character.hit(30);
                world.statusBar.setPercentage(world.character.energy);
            }
        } else {
            world.character.hit();
            world.statusBar.setPercentage(world.character.energy);
        }
    });
}

/**
 * Handles collisions between thrown bottles and enemies.
 *
 * @param {World} world - The world instance.
 */
function handleBottleEnemyCollisions(world) {
    world.throwableObjects.forEach((bottle) => {
        world.level.enemies.forEach((enemy) => {
            if (!enemy.isDead && bottle.isColliding(enemy) && !bottle.isSplashing) {
                if (enemy instanceof Endboss) {
                    enemy.takeHitFromBottle();
                } else {
                    enemy.kill();
                }
                bottle.splash();
            }
        });
    });
    world.throwableObjects = world.throwableObjects.filter((b) => !b.toBeRemoved);
}

/**
 * Performs additional proximity checks for the endboss (reserved for future logic).
 *
 * @param {World} world - The world instance.
 */
function handleEndbossProximity(world) {
    world.level.enemies.forEach((enemy) => {
        if (!(enemy instanceof Endboss)) return;
        if (!enemy.isActivated || enemy.isDead || enemy.isDying) return;
        const cRight = world.character.x + world.character.width - world.character.offset.right;
        const eLeft = enemy.x + enemy.offset.left;
    });
}

/**
 * Handles collisions between the character and coins.
 *
 * @param {World} world - The world instance.
 */
function handleCoinCollisions(world) {
    world.coins.forEach((coin) => {
        if (world.character.isColliding(coin) && !coin.collected &&
            world.collectedCoins < world.TOTAL_COINS) {
            coin.collected = true;
            playSound('coin');
            world.collectedCoins++;
            world.coinBar.setPercentage(world.collectedCoins);
        }
    });
}

/**
 * Handles collisions between the character and bottle pickups.
 *
 * @param {World} world - The world instance.
 */
function handleBottlePickups(world) {
    world.bottles.forEach((bottle) => {
        if (world.character.isColliding(bottle) && !bottle.collected &&
            world.collectedBottles < world.TOTAL_BOTTLES) {
            bottle.collected = true;
            playSound('bottle_collect');
            world.collectedBottles++;
            world.bottleBar.setPercentage(world.collectedBottles);
        }
    });
}

/**
 * Handles bottle throw input and spawns a bottle when allowed.
 *
 * @param {World} world - The world instance.
 */
function handleThrowObjects(world) {
    if (!canThrowBottle(world)) {
        return;
    }
    if (isEndbossBlockingThrow(world)) {
        world.keyboard.D = false;
        return;
    }
    spawnThrowableBottle(world);
}

/**
 * Returns whether the character is currently allowed to throw a bottle.
 *
 * @param {World} world - The world instance.
 * @returns {boolean}
 */
function canThrowBottle(world) {
    return world.keyboard.D &&
        world.collectedBottles > 0 &&
        !world.bottleThrowTimeout &&
        !world.character.otherDirection;
}

/**
 * Checks if an activated endboss in front of the character blocks throwing.
 *
 * @param {World} world - The world instance.
 * @returns {boolean}
 */
function isEndbossBlockingThrow(world) {
    return world.level.enemies.some((enemy) =>
        enemy instanceof Endboss &&
        enemy.isActivated &&
        !enemy.isDead &&
        world.character.x > enemy.x
    );
}

/**
 * Spawns a throwable bottle and updates counters and UI.
 *
 * @param {World} world - The world instance.
 */
function spawnThrowableBottle(world) {
    const bottle = new ThrowableObject(world.character.x + 100, world.character.y + 100);
    world.throwableObjects.push(bottle);
    world.collectedBottles--;
    world.bottleThrowTimeout = true;
    world.character.lastMove = new Date().getTime();
    setTimeout(() => {
        world.bottleThrowTimeout = false;
    }, 800);
    world.bottleBar.setPercentage(world.collectedBottles);
    world.keyboard.D = false;
}
