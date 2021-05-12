class Tablero {
    constructor(ctx, size,width,height) {
        this.ctx = ctx;
        this.fichasTeam1 = [];
        this.fichasTeam2 = [];
        this.espacios = [[]];
        this.size = size;
        this.width = width;
        this.height = height;
        this.initFichas(22);
        this.background = 'blue';
        this.turnoActivo = true;
        this.createHitBox();
    }
    draw(){
        this.espacios.forEach(row => {
            row.forEach(col =>{
                this.ctx.beginPath();
                this.ctx.fillStyle = '#6B7AFF';
                this.ctx.rect(col.posX, col.posY, col.width, col.height);
                this.ctx.fill();
                this.ctx.fillStyle = "white";
                this.ctx.beginPath();
                this.ctx.arc(((col.width)/2+col.posX), ((col.height)/2+col.posY), col.width/2-5, 0 , Math.PI * 2, false);
                this.ctx.closePath();
                this.ctx.fill();
                this.ctx.fillStyle = "blue";
                this.ctx.fillRect(255, 707, 660, 30)
            })            
        });
        this.fichasTeam1.forEach(ficha => {
            ficha.draw();
        });
        this.fichasTeam2.forEach(ficha => {
            ficha.draw();
        }); 
    }
    getColorTurn(){
        if(this.turnoActivo){
            return 'red';
        }
        return 'blue';
    }
    initFichas(quantityFichas){
        this.initFichasRed(quantityFichas);
        this.initFichasBlue(quantityFichas);
    }
    initFichasRed(quantityFichas){
        let img = new Image();
        img.src = './assets/fichaRoja.png';
        img.onload = () => {
            for (let index = 0; index <quantityFichas; index++) {
                let newFicha = new Ficha(250, 200 + (index*20), 30, "red", img, this.ctx);
                this.fichasTeam1.push(newFicha);
            }
        }
    }
    initFichasBlue(quantityFichas){
        let img = new Image();
        img.src = './assets/fichaAzul.png';
        img.onload = () => {
            for (let index = 0; index <quantityFichas; index++) {
                let newFicha = new Ficha(920, 200 + (index*20), 30, "blue", img, this.ctx);
                this.fichasTeam2.push(newFicha);
            }
        }
    }
    getSelectedChip(posX, posY) {
        if (this.turnoActivo) {
            for (let i = 0; i < this.fichasTeam1.length; i++) {
                if (this.fichasTeam1[i].hit(posX, posY)) {
                    return this.fichasTeam1[i];
                }
            }
        } else {
            for (let i = 0; i < this.fichasTeam2.length; i++) {
                if (this.fichasTeam2[i].hit(posX, posY)) {
                    return this.fichasTeam2[i];
                }
            }
        }
        return null;
    }
    checkWinner(col, row){
        console.log(this.espacios);
        let chipDropped = this.espacios[row][col].ficha;
        if(this.checkHorizontal(col,row) || this.checkVertical(col,row) || this.checkDiagonalLeft(col,row) || this.checkDiagonalRight(col,row)){
            this.fichasUnselectable();
            return chipDropped.getColor();
        }
    }
    fichasUnselectable(){
        this.espacios.forEach(row => {
            row.forEach(col => {
                if(col.ficha != null){
                    col.ficha.cantMove();
                }
            });
        });
        this.fichasTeam1.forEach(ficha => {
            ficha.cantMove();
        });
        this.fichasTeam2.forEach(ficha => {
            ficha.cantMove();
        })
    }
    checkDiagonalRight(col, row){
        let chipsFound = 1;
        let chipDropped = this.espacios[row][col].ficha;
        for (let index = 1; index <= 4; index++) {
            if(this.espacios[row+index] != undefined){
                let posOfBoard = this.espacios[row+index][col+index];
                if(posOfBoard != undefined){
                    if(posOfBoard.ficha !=null){
                        if(posOfBoard.ficha.getColor() === chipDropped.getColor()){
                            chipsFound++;
                        }
                    }
                }
            }
        }
        if(chipsFound != 4){
            let newIndex = 4-chipsFound;
            for (let index = 1; index <= newIndex; index++) {
                if(this.espacios[row+index] != undefined){
                    let posOfBoard = this.espacios[row-index][col-index];
                    if(posOfBoard != undefined){
                        if(posOfBoard.ficha !=null){
                            if(posOfBoard.ficha.getColor() === chipDropped.getColor()){
                                chipsFound++;
                            }
                        }
                    } 
                }
            }
        }
        return chipsFound === 4;
    }
    checkDiagonalLeft(col, row){
        let chipsFound = 1;
        let chipDropped = this.espacios[row][col].ficha;
        for (let index = 1; index <= 4; index++) {
            if(this.espacios[row+index] != undefined){
                let posOfBoard = this.espacios[row+index][col-index];
                if(posOfBoard != undefined){
                     if(posOfBoard.ficha !=null){
                         if(posOfBoard.ficha.getColor() === chipDropped.getColor()){
                             chipsFound++;
                        }
                    }
                }
            }
        }
        if(chipsFound != 4){
            let newIndex = 4-chipsFound;
            for (let index = 1; index <= newIndex; index++) {
                if(this.espacios[row+index] != undefined){
                    let posOfBoard = this.espacios[row-index][col+index];
                    if(posOfBoard != undefined){
                        if(posOfBoard.ficha !=null){
                            if(posOfBoard.ficha.getColor() === chipDropped.getColor()){
                                chipsFound++;
                            }
                        }
                    } 
                }
            }
        }
        return chipsFound === 4;
    }
    checkHorizontal(col,row){
        let chipsFound = 1;
        let chipDropped = this.espacios[row][col].ficha;
        for (let index = 1; index <= 4; index++) {
            if(this.espacios[row+index] != undefined){
                let posOfBoard = this.espacios[row][col+index];
                if(posOfBoard != undefined){
                     if(posOfBoard.ficha !=null){
                         if(posOfBoard.ficha.getColor() === chipDropped.getColor()){
                             chipsFound++;
                         }
                     }
                 }
            }
        }
        if(chipsFound != 4){
            let newIndex = 4-chipsFound;
            for (let index = 1; index <= newIndex; index++) {
                if(this.espacios[row+index] != undefined){
                    let posOfBoard = this.espacios[row][col-index];
                    if(posOfBoard != undefined){
                        if(posOfBoard.ficha !=null){
                            if(posOfBoard.ficha.getColor() === chipDropped.getColor()){
                                chipsFound++;
                            }
                        }
                    } 
                }
                }
        }
        return chipsFound === 4;
    }
    checkVertical(col,row){
        let chipsFound = 1;
        let chipDropped = this.espacios[row][col].ficha;
        for (let index = 1; index <= 4; index++) {
            if(this.espacios[row+index] != undefined){
                let posOfBoard = this.espacios[row+index][col];
                if(posOfBoard != undefined){
                     if(posOfBoard.ficha !=null){
                         if(posOfBoard.ficha.getColor() === chipDropped.getColor()){
                             chipsFound++;
                         }
                     }
                 }
            }
        }
        if(chipsFound != 4){
            let newIndex = 4-chipsFound;
            for (let index = 1; index <= newIndex; index++) {
                if(this.espacios[row-index] != undefined){
                    let posOfBoard = this.espacios[row-index][col];
                    if(posOfBoard != undefined){
                        if(posOfBoard.ficha !=null){
                            if(posOfBoard.ficha.getColor() === chipDropped.getColor()){
                                chipsFound++;
                            }
                        }
                    } 
                }
            }
        }
        return chipsFound === 4;
    }
    checkMove(ficha) {
            let fichaX = ficha.getPosX();
            let fichaY = ficha.getPosY();
            let colDropped = this.getColSelected(fichaX,fichaY);
            let keepLooking = true;
            let posObject = null;
            if(colDropped != -1){
                for (let index = this.espacios.length-1; index >= 0 ; index--) {
                         if(keepLooking){
                            if(this.espacios[index][colDropped].ficha == null){
                                this.espacios[index][colDropped].ficha = ficha;
                                ficha.move((this.espacios[index][colDropped].posX + this.espacios[index][colDropped].posX +this.espacios[index][colDropped].width) /2, (this.espacios[index][colDropped].posY + this.espacios[index][colDropped].posY +this.espacios[index][colDropped].width) /2);
                                keepLooking = false;
                                ficha.cantMove();
                                this.turnoActivo = !this.turnoActivo;
                                posObject = {
                                    col : colDropped,
                                    row : index
                                };
                            }
                        }       
                }           
        }
        return posObject;
    }
    getColSelected(posX,posY){
        let returnedIndex = -1;
        let finalY = this.espacios[this.size-1][0].posY;
        this.espacios[0].forEach((celda,index) => {
            if(posY <= finalY && posX >= celda.posX && posX <= (celda.posX + celda.width)){
                returnedIndex = index;
            }
        });
        return returnedIndex;
    }
    createHitBox() {
        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                let blankSpace = {
                    posX: (this.width/5) + (x * 66),
                    posY: (this.height/5) + (y * 66),
                    width: 66,
                    height: 66,
                    ficha : null
                };
                if(x==0){
                    this.espacios[y] = new Array(this.size);
                }
                this.espacios[y][x]= blankSpace;
            }
        }
    }
    
}