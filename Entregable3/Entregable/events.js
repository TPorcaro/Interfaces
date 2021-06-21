document.addEventListener('DOMContentLoaded', () => {
  let loader = document.querySelector('.loader');
    let body = document.querySelector('.bodyPage');
    setTimeout(() => {
        loader.classList.add('hide');
        body.classList.remove('hide');
    }, 3000);
  let elems = document.querySelectorAll('.tilt');
  elems.forEach(el => {
  const height = 200;
  const width = 300;
  el.addEventListener('mousemove', handleMove)

    function handleMove(e) {
      const xVal = e.layerX

      const yVal = e.layerY

      const yRotation = 20 * ((xVal - width / 2) / width)
      
      const xRotation = -20 * ((yVal - height / 2) / height)

      const string = 'perspective(500px) scale(1.1) rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg)'

      el.style.transform = string
    }

    el.addEventListener('mouseout', function() {
      el.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)'
    })

    el.addEventListener('mousedown', function() {
      el.style.transform = 'perspective(500px) scale(0.9) rotateX(0) rotateY(0)'
    })

    el.addEventListener('mouseup', function() {
      el.style.transform = 'perspective(500px) scale(1.1) rotateX(0) rotateY(0)'
    })

  })
  let linksNavBar = document.querySelectorAll('.navBarLink');
    linksNavBar.forEach(link => {
        link.addEventListener('click', () => {
            let urlBase = window.location.origin;
            if(link.innerHTML === "Hero"){
                window.location.assign(urlBase+ "/Interfaces/Entregable3/Entregable/index.html");
            }else{
                window.location.assign(urlBase+ "/Interfaces/Entregable3/Entregable/form.html");
            }
        })
    })
})
