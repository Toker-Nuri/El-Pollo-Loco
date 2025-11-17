function startGame() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('canvas').style.display = 'block';
    init(); // Spiel starten
}

function showControls() {
    // Hier Steuerungsinfo anzeigen
    alert('LINKS: Pfeiltaste Links\nRECHTS: Pfeiltaste Rechts\nSPRINGEN: Leertaste\nWERFEN: D');
}

function showStory() {
    // Hier Geschichte anzeigen
    alert('Hilf Pepe, den verrückten Hühnerboss zu besiegen!');
}

function showGameOver(isWin) {
    const overlay = document.getElementById('game-over-overlay');
    const img = document.getElementById('game-over-image');
    img.src = isWin ? 'img/You won, you lost/You win B.png' : 'img/You won, you lost/You lost.png';
    document.getElementById('canvas').style.display = 'none';
    overlay.classList.remove('hidden');
}

function restartGame() {
    // UI zurücksetzen
    document.getElementById('game-over-overlay').classList.add('hidden');
    document.getElementById('canvas').style.display = 'block';

    // Beispiel: alte Loops stoppen (falls du IDs speicherst)
    if (window.gameIntervalId) clearInterval(window.gameIntervalId);
    if (window.animationFrameId) cancelAnimationFrame(window.animationFrameId);

    // Globals zurücksetzen
    world = null;
    keyboard = new Keyboard();

    // Neues Spiel initialisieren
    init();
}

function backToMenu() {
    location.href = 'index.html';
}