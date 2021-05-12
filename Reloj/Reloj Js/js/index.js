document.addEventListener('DOMContentLoaded', () => {


    const relojin = () => {
        let seconds = document.getElementById("segundos");
        let minutes = document.getElementById("minutos");
        let hours = document.getElementById("horas");
        console.log(seconds.style.transform);
        time = new Date();
        horas = time.getHours();
        minutos = time.getMinutes();
        segundos = time.getSeconds();

        if (horas >= 12) {
            porcentajeHoras = horas / 12 * 360 // divido en 12 y en los 360 grados del reloj
        } else {
            porcentajeHoras = horas / 24 * 360;
        }

        porcentajeHoras += minutos / 60 * 30;
        porcentajeMinutos = minutos / 60 * 360;
        porcentajeSegundos = segundos / 60 * 360;
        seconds.animate(
            [
              { transform:`rotate(${porcentajeSegundos}deg)`},    
              { transform: `rotate(${porcentajeSegundos+360}deg)`}
            ], {
              duration: 60000,
              iterations: Infinity
            }
          );
          minutes.animate(
            [ 
                { transform: `rotate(${porcentajeMinutos}deg)`},
                { transform: `rotate(${porcentajeMinutos+360}deg)`}
            ],{
                duration: 3600000,
                iterations: Infinity
            }
        );
        hours.animate(
          [ 
              { transform: `rotate(${porcentajeHoras}deg)`},
              { transform: `rotate(${porcentajeHoras+360}deg)`}
          ],{
              duration: 86400000,
              iterations: Infinity
          }
      );
    }
    relojin();
});