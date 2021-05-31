document.addEventListener('DOMContentLoaded',() => {
    let loader = document.querySelector('.loader');
    let body = document.querySelector('.bodyPage');
    setTimeout(() => {
        loader.classList.add('hide');
        body.classList.remove('hide');
    }, 3000);
    
    let linksNavBar = document.querySelectorAll('.navBarLink');
    linksNavBar.forEach(link => {
        link.addEventListener('click', () => {
            let urlBase = window.location.origin;
            if(link.innerHTML === "Hero"){
                window.location.assign(urlBase+ "/Entregable/index.html");
            }else{
                window.location.assign(urlBase+ "/Entregable/events.html");
            }
        })
    })
})