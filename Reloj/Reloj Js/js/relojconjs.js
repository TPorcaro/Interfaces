document.addEventListener('DOMContentLoaded', function () {
    let horaid = document.getElementById("horas");
    let minutosid = document.getElementById("minutos");
    let segundosid = document.getElementById("segundos");


    function reloj() {
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

        horaid.style.transform = "rotate(" + porcentajeHoras + "deg)";
        minutosid.style.transform = "rotate(" + porcentajeMinutos + "deg)";
        segundosid.style.transform = "rotate(" + porcentajeSegundos + "deg)";
    }

    setInterval(reloj, 1000);
})