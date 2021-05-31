document.addEventListener('DOMContentLoaded',() => {
    let loader = document.querySelector('.loader');
    let body = document.querySelector('.bodyPage');
    setTimeout(() => {
        loader.classList.add('hide');
        body.classList.remove('hide');
    }, 3000);
    const button   = document.querySelector('.submit-button'),
      stateMsg = document.querySelector('.pre-state-msg');

    const updateButtonMsg = function() {
    button.classList.add('state-1', 'animated');
    
    setTimeout(finalButtonMsg, 2000);
    };

    const finalButtonMsg = function() {
    button.classList.add('state-2');
    
    setTimeout(setInitialButtonState, 2000);
    };

    const setInitialButtonState = function() {
    button.classList.remove('state-1', 'state-2', 'animated');
    };

    button.addEventListener('click', updateButtonMsg);
    let linksNavBar = document.querySelectorAll('.navBarLink');
    linksNavBar.forEach(link => {
        link.addEventListener('click', () => {
            let urlBase = window.location.origin;
            if(link.innerHTML === "Hero"){
                window.location.assign(urlBase+ "/Interfaces/Entregable3/Entregable/index.html");
            }else{
                window.location.assign(urlBase+ "/Interfaces/Entregable3/Entregable/events.html");
            }
        })
    })
})