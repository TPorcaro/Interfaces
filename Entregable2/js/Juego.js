class Juego {
    constructor(ctx, width, height, rows = 8, cols = 8){
        this.ctx = ctx;
        this.mode = '';
        this.width = width;
        this.height = height;
        this.selectedChip = null;
        this.rows = rows;
        this.cols = cols;
        this.tablero = new Tablero(ctx,this.rows,this.cols,width,height);
    }

    draw(){
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.tablero.draw();
    }
    //Verifica si una ficha fue clickeada 
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
    // Redibuja la ficha dependiendo la posicion pasada por parametros
    handleDrag(posX, posY){
        if(this.mode === 'dragging' && this.selectedChip){
            this.selectedChip.move(posX, posY);
            this.draw();
        }
    }
    // Para de mover la ficha y ademas verifica si se realizo un movimiento valido
    stopDragging(){
        if(this.mode === 'dragging'){
            return this.checkMove();
        }
        this.mode = 'standBy';
    }
    //Verificia un movimiento valido y si hubo un ganador
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
    checkTie(){
        return this.tablero.checkTie();
    }
    checkFichasInBoard(){
        return this.tablero.checkFichasInBoard();
    }
}