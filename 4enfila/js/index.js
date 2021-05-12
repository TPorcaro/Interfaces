document.addEventListener('DOMContentLoaded', () =>{
    let canvas = document.getElementById('canvasGame');
    canvas.width = 1600;
    canvas.height = 900;
    let ctx = canvas.getContext('2d');

    let juego1 = new Juego(ctx, canvas.width,canvas.height);
    juego1.draw();

    canvas.addEventListener('mousedown', (eMouseDown) =>{
        if(juego1.checkHit(eMouseDown.offsetX, eMouseDown.offsetY)){
            canvas.addEventListener('mousemove', (eMouseMove) => {
                juego1.handleDrag(eMouseMove.offsetX, eMouseMove.offsetY);
            });
           
        }
    });
    canvas.addEventListener('mouseup', (eMouseUp) => {
        canvas.removeEventListener('mousemove', juego1.handleDrag);
        showAlert(juego1.stopDragging());
    });
    let fichaRoja = document.querySelector('.fichaRoja');
    let fichaAzul = document.querySelector('.fichaAzul');
    let intervalTurn = setInterval(() => {
        if(juego1.getColorTurn() == 'red'){
            fichaRoja.classList.add('show');
            fichaRoja.classList.remove('hide');
            fichaAzul.classList.add('hide');
            fichaAzul.classList.remove('show');
        }else{
            fichaAzul.classList.add('show');
            fichaAzul.classList.remove('hide');
            fichaRoja.classList.add('hide');
            fichaRoja.classList.remove('show');
        }
    }, 10);
    showAlert = (winner) =>{
        if(winner){
            clearInterval(intervalTurn);
            let textH1 = document.querySelector('.textH1');
            textH1.textContent = "Ganador "
            let fireWorks = document.querySelector('.pyro');
            fireWorks.classList.add('show');
            fireWorks.classList.remove('hide');
        }
    }
})