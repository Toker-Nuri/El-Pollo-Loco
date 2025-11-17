class World {
    character = new Charakter();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    bottleBar = new BottleBar();
    endbossBar = new EndbossBar();
    bottles = [];
    coins = [];
    throwableObjects = [];
    TOTAL_BOTTLES = 10;
    TOTAL_COINS = 11;
    collectedCoins = 0;
    collectedBottles = 0;
    bottleThrowTimeout = false;
    characterPrevBottom = 0;
    gameOver = null;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.createBottles();
        this.createCoins();
        this.draw();
        this.setWorld();
        this.run();

        // Canvas-Klicks abfangen und an GameOver weiterreichen
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

    setWorld() {
        this.character.world = this;
        if (this.level && this.level.enemies) {
            this.level.enemies.forEach((enemy) => {
                enemy.world = this;
            });
        }
    }
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

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkGameOver(); 
            this.checkThrowObjects();
        }, 1000 / 60);
    }
    checkThrowObjects() {
        if (this.keyboard.D && this.collectedBottles > 0 && !this.bottleThrowTimeout) {
            // Blockieren des Werfens, wenn der Charakter rechts von einem aktiven Endboss ist
            const blockingEndboss = this.level.enemies.some((e) => {
                return e instanceof Endboss && e.isActivated && !e.isDead && this.character.x > e.x;
            });
            if (blockingEndboss) {
                // keine Flasche werfen, Spieler ist rechts vom Endboss
                this.keyboard.D = false;
                return;
            }

            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.throwableObjects.push(bottle);
            this.collectedBottles--;
            this.bottleThrowTimeout = true;
            setTimeout(() => {
                this.bottleThrowTimeout = false;
            }, 500);
            this.bottleBar.setPercentage(this.collectedBottles);
            this.keyboard.D = false;
        }

    }

    checkCollisions() {
        const currBottom = this.character.y + this.character.height - this.character.offset.bottom;
        if (this.characterPrevBottom === 0) {
            this.characterPrevBottom = currBottom;
        }
        this.level.enemies.forEach((enemy) => {
            if (enemy instanceof Endboss && !enemy.isActivated) {
                const activationDistance = 400;
                if (this.character.x > enemy.x - activationDistance) {
                    enemy.isActivated = true;
                    // Sofort Alert starten
                    enemy.alertScheduled = false;  // sicherstellen dass Timer startet
                    enemy.hasAlertPlayed = false; // Alert kann starten
                }
            }
        });

        let stompedAny = false;
        this.level.enemies.forEach((enemy) => {
            if (enemy.isDead) return;

            const cLeft = this.character.x + this.character.offset.left;
            const cRight = this.character.x + this.character.width - this.character.offset.right;
            const eLeft = enemy.x + enemy.offset.left;
            const eRight = enemy.x + enemy.width - enemy.offset.right;
            const eTop = enemy.y + enemy.offset.top;
            const horizontalOverlap = cRight > eLeft && cLeft < eRight;

            const crossedTopPlane = this.characterPrevBottom <= eTop && currBottom >= eTop;
            const falling = this.character.speedY < 0;

            if (horizontalOverlap && crossedTopPlane && falling) {
                enemy.kill();
                stompedAny = true;
            }
        });

        if (stompedAny) {
            this.character.speedY = 32;
            this.character.lastBounce = new Date().getTime();
        } else {
            this.level.enemies.forEach((enemy) => {
                if (enemy.isDead) return;
                if (!this.character.isColliding(enemy)) return;
                if (this.character.isHurt()) return;
                // Endboss-Kollisionsschaden: immer höherer Schaden bei Kontakt, sobald aktiviert
                if (enemy instanceof Endboss) {
                    if (enemy.isActivated && !enemy.isTakingDamage && !enemy.isDying) {
                        // deutlicherer Schaden durch den Endboss
                        this.character.hit(30);
                        this.statusBar.setPercentage(this.character.energy);
                    }
                } else {
                    this.character.hit();
                    this.statusBar.setPercentage(this.character.energy);
                }
            });
        }

        // Flaschen-Kollisionen mit Gegnern (inkl. Endboss)
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach((enemy) => {
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
        this.throwableObjects = this.throwableObjects.filter((b) => !b.toBeRemoved);

        // Charakter darf nicht rechts am Endboss vorbeikommen
        this.level.enemies.forEach((enemy) => {
            if (!(enemy instanceof Endboss)) return;
            // Nur wenn der Endboss aktiv ist, blockiert er den Weg
            if (!enemy.isActivated || enemy.isDead || enemy.isDying) return;
            const cRight = this.character.x + this.character.width - this.character.offset.right;
            const eLeft = enemy.x + enemy.offset.left;
            // Wenn Charakter die linke Kante des Endboss überschreitet, nach links zurücksetzen
            // --- Dieser Block blockiert das Vorbeigehen. Entfernen oder auskommentieren, damit der Spieler rechts vorbeikommt.
            /*
            if (cRight > eLeft) {
                this.character.x = eLeft - (this.character.width - this.character.offset.right);
            }
            */
        });

        this.coins.forEach((coin) => {
            if (this.character.isColliding(coin) && !coin.collected &&
                this.collectedCoins < this.TOTAL_COINS) {
                coin.collected = true;
                this.collectedCoins++;
                this.coinBar.setPercentage(this.collectedCoins);
            }
        });
        this.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle) && !bottle.collected &&
                this.collectedBottles < this.TOTAL_BOTTLES) {
                bottle.collected = true;
                this.collectedBottles++;
                this.bottleBar.setPercentage(this.collectedBottles);
            }
        });

        this.characterPrevBottom = currBottom;
    }

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

    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Hintergrund + Kamera
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.BackgroundObject);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.ctx.translate(-this.camera_x, 0);

        // HUD (fest)
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.endbossBar);

        // Objekte vor dem Charakter (mit Kamera)
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.bottles);
        this.addObjectsToMap(this.coins);
        this.addToMap(this.character);
        this.addObjectsToMap(this.throwableObjects);
        this.ctx.translate(-this.camera_x, 0);

        // Am Ende der draw()-Methode:
        // GameOver wird per DOM-Overlay gezeigt (nicht auf dem Canvas)
        // if (this.gameOver) { this.addToMap(this.gameOver); }
        
        // Request next frame
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        if (!objects || !objects.forEach) return;
        objects.forEach((obj) => {
            this.addToMap(obj);
        });
    }

    addToMap(MoObject) {
        if (!MoObject) return;
        // Wenn gespiegelt werden soll, machen wir das nur im Canvas-Kontext.
        if (MoObject.otherDirection) {
            this.ctx.save();
            // Ursprung an die rechte Kante des Objekts verschieben und horizontal spiegeln.
            this.ctx.translate(MoObject.x + MoObject.width, 0);
            this.ctx.scale(-1, 1);
            // Damit das draw(...) des Objekts an der richtigen Stelle zeichnet,
            // setzen wir kurz x auf 0, rufen draw auf und stellen x zurück.
            const oldX = MoObject.x;
            MoObject.x = 0;
            MoObject.draw(this.ctx);
            if (typeof MoObject.drawFrame === 'function') {
                MoObject.drawFrame(this.ctx);
            }
            MoObject.x = oldX;
            this.ctx.restore();
            return;
        }
        // Normalfall (nicht gespiegelt)
        MoObject.draw(this.ctx);
        if (typeof MoObject.drawFrame === 'function') {
            MoObject.drawFrame(this.ctx);
        }
    }

    flipImages(MoObject) {
        // einfacher Flip: Canvas spiegeln (Objekt x NICHT ändern)
        this.ctx.save();
        this.ctx.translate(MoObject.x + MoObject.width, 0);
        this.ctx.scale(-1, 1);
        // NICHT: MoObject.x = MoObject.x * -1;
    }

    flipImagesBack(MoObject) {
        // restore: nur Kontext zurücksetzen, Objektkoordinaten bleiben gleich
        this.ctx.restore();
        // NICHT: MoObject.x = MoObject.x * -1;
    }

}