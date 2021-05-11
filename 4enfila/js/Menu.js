document.addEventListener('DOMContentLoaded', () =>{
    let canvas = document.getElementById('canvasGame');
    let activePlayer = document.getElementById('activePlayer');
    canvas.width = 1024;
    canvas.height = 768;
    let ctx = canvas.getContext('2d');

    let juego1 = new Juego(ctx, canvas.width,canvas.height);
    juego1.draw();

    canvas.addEventListener('mousedown', (eMouseDown) =>{
        if(juego1.checkHit(eMouseDown.offsetX, eMouseDown.offsetY)){
            canvas.addEventListener('mousemove', (eMouseMove) => {
                juego1.handleDrag(eMouseMove.offsetX, eMouseMove.offsetY);
            });
           
        }
    })
    canvas.addEventListener('mouseup', (eMouseUp) => {
        canvas.removeEventListener('mousemove', juego1.handleDrag);
        juego1.stopDragging();
    })
})