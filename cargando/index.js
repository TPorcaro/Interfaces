document.addEventListener('DOMContentLoaded', () => {

    let cargando = document.getElementById('cargando');
      let btn = document.getElementById('btn');
      btn.addEventListener('click', () => {
        cargando.animate(
            [
              { transform:`rotate(0deg)`},    
              { transform: `rotate(360deg)`}
            ], {
              duration: 1000,
              iterations: Infinity
            }
          );
          cargando.style.display = 'block';
          btn.style.display = 'none';
        setTimeout(() => {
            window.open("https://www.google.com","_self");
        }, 5000);
      })
})