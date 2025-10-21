class MovedleObject {
        x = 120;
        y = 280;
        img;
        height = 150;
        width = 100;
        imageCache = {};
        currentImage = 0;
        speed = 0.15;
        flipImage = false;

    loadImage(path){
        this.img = new Image();
        this.img.src = path;

    }

    loadImages(arrayOfImages){
        arrayOfImages.forEach((path) => {
        let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
        moveRight() {
                setInterval(() => {
                    this.x += this.speed;
                }, 1000 / 60);
            
            
        }
         moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }

}