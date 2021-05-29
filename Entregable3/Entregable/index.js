document.addEventListener('DOMContentLoaded', () => {
    let loader = document.querySelector('.loader');
    let body = document.querySelector('.bodyPage');
    setTimeout(() => {
        loader.classList.add('hide');
        body.classList.remove('hide');
    }, 1000);

    window.addEventListener('scroll', (e) => {
        let divStarWar = document.querySelector('.starwars-demo');
        let value = window.scrollY*0.1;
        if(value<= 53){
            value = 53;
        }
        console.log('scrolling', value);
        divStarWar.style.setProperty('top',value + '%');
    });
})