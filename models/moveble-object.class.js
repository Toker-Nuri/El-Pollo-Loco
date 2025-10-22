class MovebleObject {
        x = 120;
        y = 280;
        img;
        height = 150;
        width = 100;
        imageCache = {};
        currentImage = 0;
        speed = 0.15;
        speedY = 0;
        acceleration = 2.5;
        otherDirection = false;


        applyGravity(){
            setInterval(() =>{
                if(this.isAboveGround() || this.speedY > 0){
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
                }
            }, 1000 / 25 );
        }

        isAboveGround(){
            return this.y < 150; 
            
        }


    loadImage(path){
        this.img = new Image();
        this.img.src = path;

    }

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx){
        ctx.beginPath();
        ctx.strokeStyle = 'blue';
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        ctx.lineWidth = '5';
    }

   
    loadImages(arrayOfImages){
        arrayOfImages.forEach((path) => {
        let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    playAnimation(images) {
        let index = this.currentImage % this.IMAGES_WALKING.length;
            let path = images[index];
            this.img = this.imageCache[path];
            this.currentImage++;
    }

        moveRight() {
            this.x += this.speed;
            
            
        }
         moveLeft() {
            this.x -= this.speed;
            
      
    }

    Jump(){
        this.speedY = 30;
    }

}