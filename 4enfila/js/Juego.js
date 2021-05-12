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
        if (selectedChip && selectedChip.canMove) {
            this.mode = 'dragging';
            this.selectedChip = selectedChip;
            return true;
        }
        return false;
    }
    getColorTurn(){
        return this.tablero.getColorTurn();
    }
    handleDrag(posX, posY){
        if(this.mode === 'dragging' && this.selectedChip){
            this.selectedChip.move(posX, posY);
            this.draw();
        }
    }
    stopDragging(){
        if(this.mode === 'dragging'){
            return this.checkMove();
        }
        this.mode = 'standBy';
    }
    checkMove(){
        if(this.selectedChip != null){
            let positions = this.tablero.checkMove(this.selectedChip);
            this.draw();
            this.selectedChip = null;
            if(positions)
            return this.checkWinner(positions)
        }
    }
    checkWinner(positions){
        return this.tablero.checkWinner(positions.col, positions.row);
    }
}