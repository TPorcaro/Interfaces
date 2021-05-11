class Juego {
    constructor(ctx, width, height){
        this.ctx = ctx;
        this.tablero = new Tablero(ctx,8,width,height);
        this.mode = '';
        this.width = width;
        this.height = height;
        this.selectedChip = null;
    }

    draw(){
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.tablero.draw();
    }
    checkHit(posX, posY){
        let selectedChip = this.tablero.getSelectedChip(posX, posY);
        if (selectedChip) {
            this.mode = 'dragging';
            this.selectedChip = selectedChip;
            return true;
        }
        return false;
    }
    handleDrag(posX, posY){
        if(this.mode === 'dragging' && this.selectedChip){
            this.selectedChip.move(posX, posY);
            this.draw();
        }
    }
    stopDragging(){
        if(this.mode === 'dragging'){
            this.checkMove();
        }
        this.mode = 'standBy';
    }
    checkMove(){
        let positions = this.tablero.checkMove(this.selectedChip);
        this.draw();
        if(positions)
        this.checkWinner(positions)
    }
    checkWinner(positions){
        
    }
}