class Clouds extends MovebleObject {
    y = 20;
    height = 250;
    width = 500;


    constructor(x = null, y = null) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = (typeof x === 'number') ? x : Math.random() * 500;
        if (typeof y === 'number') this.y = y;
           
      
        this.animate();

    }
    animate() {
        setInterval(() => {
            this.moveLeft();
        
        }, 1000 / 80);
    }

}