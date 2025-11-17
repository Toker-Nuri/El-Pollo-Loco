class GameOver extends DrawableObject {
    constructor(isWin) {
        super();
        this.isWin = !!isWin;
        // lade Bild direkt, damit World die Klasse nutzen kann
        const imgPath = isWin ? 'img/You won, you lost/You win B.png' : 'img/You won, you lost/You lost.png';
        this.loadImage(imgPath);
        this.x = 0; this.y = 0;
        this.width = 720; this.height = 480;
    }
}