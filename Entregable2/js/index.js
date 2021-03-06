document.addEventListener('DOMContentLoaded', () =>{
    let canvas = document.getElementById('canvasGame');
    canvas.width = 1600;
    canvas.height = 900;
    let quantityFichasBefore = 0;
    let isATie = false;
    let gameFinish = false;
    let ctx = canvas.getContext('2d');
    let juego1 = new Juego(ctx, canvas.width,canvas.height);
    juego1.draw();
    //Al dispararse el evento mousedown verifica si selecciono una ficha correcta
    //se dispara el movimiento mousemove y redibuja la ficha dependiendo la posicion del mouse
    canvas.addEventListener('mousedown', (eMouseDown) =>{
        if(juego1.checkHit(eMouseDown.offsetX, eMouseDown.offsetY)){
            canvas.addEventListener('mousemove', (eMouseMove) => {
                juego1.handleDrag(eMouseMove.offsetX, eMouseMove.offsetY)
            });
        }
    });
    //Al dispararse el evento mouseup remueve el listener del mousemove y verifica cuantas fichas hay en el tablero antes de insertar
    // la ultima ficha, luego verifica si la ficha seleccionada esta situada en una posicion valida del tablero y la inserta si es el caso
    canvas.addEventListener('mouseup', (eMouseUp) => {
        canvas.removeEventListener('mousemove', juego1.handleDrag);
        quantityFichasBefore = juego1.checkFichasInBoard();
        showAlert(juego1.stopDragging());
    });
    let fichaRoja = document.querySelector('.fichaRoja');
    let fichaAzul = document.querySelector('.fichaAzul');
    // Se encarga de esconder o mostrar en pantalla dependiendo el turno
    let intervalTurn = setInterval(() => {
        if(!isATie){ // Si es empate no muestro que es turno de nadie
            if(juego1.getColorTurn() == 'red'){
                fichaRoja.classList.add('showFicha');
                fichaRoja.classList.remove('hideFicha');
                fichaAzul.classList.add('hideFicha');
                fichaAzul.classList.remove('showFicha');
            }else{
                fichaAzul.classList.add('showFicha');
                fichaAzul.classList.remove('hideFicha');
                fichaRoja.classList.add('hideFicha');
                fichaRoja.classList.remove('showFicha');
            }
        }
    }, 10);
    let audio = new Audio('./assets/firework.mp3');
    let btnReset = document.querySelector('.btnReset');
    let fireWorks = document.querySelector('.pyro');
    let textP = document.querySelector('.textP');
    let btnSend = document.querySelector('.btnSend');
    btnSend.addEventListener('click', () => {
        let cols = document.querySelector('#cols').value;
        let rows = document.querySelector('#rows').value;
        if(rows !== "" && (rows >= 1 && rows <=10)){
            if(cols !== "" && (cols >= 1 && cols <=10)){
                juego1 = new Juego(ctx,canvas.width,canvas.height, rows,cols);
                juego1.draw();
            }else{
                alert('El tama??o minimo es de 5x5 y el tama??o maximo es 10x10');
            }
        }else{
            alert('El tama??o minimo es de 5x5 y el tama??o maximo es 10x10');
        }
    })
    //Reinicio el juego eliminando el juego anterior y creando uno nuevo
    btnReset.addEventListener('click', () => {
        juego1 = new Juego(ctx, canvas.width,canvas.height);
        juego1.draw();
        textP.textContent = "Turno de ";
        audio.pause();
        fireWorks.classList.remove('show');
        fireWorks.classList.add('hide');
    });
    // Si se tiene un ganador se encarga de mostrarlo
    showAlert = (winner) =>{
        if(!gameFinish){
            if(winner){
                clearInterval(intervalTurn);
                textP.textContent = "Ganador ";
                fireWorks.classList.add('show');
                fireWorks.classList.remove('hide');
                audio.autoplay=true;
                audio.loop = true;
                audio.play();
                gameFinish = true;
            }else{
                // En caso de que no haya un ganador hay que preguntar si hubo empate o no,
                // si hubo un empate remuevo las fichas que se encargan de mostrar los turnos
                if(quantityFichasBefore != juego1.checkFichasInBoard()){
                    let moveAudio = new Audio('./assets/move.mp3');
                    moveAudio.play();
                }
                isATie = juego1.checkTie();
                if(isATie){
                    textP.textContent = "Empate :(";
                    fichaAzul.classList.add('hideFicha');
                    fichaRoja.classList.add('hideFicha');
                    fichaAzul.classList.remove('showFicha');
                    fichaRoja.classList.remove('showFicha');
                }
            }
        }
    }
})