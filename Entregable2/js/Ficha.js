class Ficha {
    constructor(posX, posY, radius, color, image, ctx) {
        this.posX = posX;
        this.posY = posY;
        this.radius = radius;
        this.color = color;
        this.ctx = ctx;
        this.canMove = true;
        this.image = image;
        this.draw();
    }
    getPosX(){
        return this.posX
    }
    getPosY(){
        return this.posY;
    }
    draw() {
        this.ctx.drawImage(this.image, this.posX-this.radius, this.posY-this.radius, this.radius*2, this.radius*2);
    }
    // Verifica si las posiciones coinciden dentro de la ficha
    hit(posX,posY){
        let radio = Math.sqrt((posX - this.posX) ** 2 + (posY - this.posY) ** 2);
        return radio < this.radius;
    }
    getColor(){
        return this.color;
    }
    // Cambia el centro de la ficha
    move(posX, posY){
        if(this.canMove){
            this.posX = posX;
            this.posY = posY;
        }
    }
    cantMove(){
        this.canMove = false;
    }
}