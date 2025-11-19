function setCanvasHidden(hidden) {
    const canvas = document.getElementById('canvas');
    if (!canvas) return;
    canvas.classList.toggle('canvas-hidden', hidden);
}

function startGame() {
    document.getElementById('main-menu').classList.add('hidden'); 
    document.getElementById('controls-game-overlay').classList.add('hidden');
    document.getElementById('game-over-overlay').classList.add('hidden');
    setCanvasHidden(false);
    init(); 
}

function showControls() {
    document.getElementById('main-menu').classList.add('hidden');
    document.getElementById('controls-game-overlay').classList.remove('hidden');
}

function closeControls() {
    document.getElementById('controls-game-overlay').classList.add('hidden');
    document.getElementById('main-menu').classList.remove('hidden'); 
}

function showStory() {
     document.getElementById('main-menu').classList.add('hidden'); 
    document.getElementById('story-game-overlay').classList.remove('hidden');
}

function closeStory() {
    document.getElementById('story-game-overlay').classList.add('hidden'); 
    document.getElementById('main-menu').classList.remove('hidden'); 
}


function showSettings() {
   document.getElementById('main-menu').classList.add('hidden'); 
    document.getElementById('settings-game-overlay').classList.remove('hidden');
}

function closeSettings() {
    document.getElementById('settings-game-overlay').classList.add('hidden'); 
    document.getElementById('main-menu').classList.remove('hidden'); 
}

function showGameOver(isWin) {
    const overlay = document.getElementById('game-over-overlay');
    const img = document.getElementById('game-over-image');
    img.src = isWin ? 'img/You won, you lost/You win B.png' : 'img/You won, you lost/You lost.png';
    overlay.classList.remove('hidden');
    setCanvasHidden(true);
}

function restartGame() {
    document.getElementById('game-over-overlay').classList.add('hidden');
    setCanvasHidden(false);
    if (window.gameIntervalId) clearInterval(window.gameIntervalId);
    if (window.animationFrameId) cancelAnimationFrame(window.animationFrameId);
    world = null;
    keyboard = new Keyboard();
    init();
}

function backToMenu() {
    location.href = 'index.html';
}

