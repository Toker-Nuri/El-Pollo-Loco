class Chicken extends MovedleObject {
   y = 370;
   width = 70;
   height = 60;
  
    constructor(){
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 200 + Math.random() * 500;
        this.animate();
    }
  
    animate() {
        setInterval(() => {
            this.x -= 0.2;
        }, 1000 / 60);
    }
}