document.addEventListener('DOMContentLoaded', () => {
    let loader = document.querySelector('.loader');
    let body = document.querySelector('.bodyPage');
    setTimeout(() => {
        loader.classList.add('hide');
        body.classList.remove('hide');
    }, 3000);

    document.body.addEventListener('scroll', (e) => {
        let divStarWar = document.querySelector('.starwars-demo');
        let menuToggle = document.getElementById('menuToggle');

        let valueDiv = document.body.scrollTop*0.1;
        let valueToggle = valueDiv*11;
        if(valueDiv<= 45){
            valueDiv = 45;
        }
        if(valueDiv>=100){
            valueDiv = 100;
        }
        if(valueToggle<=40){
            valueToggle = 40;
        }
        if(valueToggle>=900){
            valueToggle = 900;
        }
        
        divStarWar.style.setProperty('top',valueDiv + '%');
        menuToggle.style.setProperty('top',valueToggle + 'px');
        
    });

    const countDown = () => {
        const second = 1000,
        minute = second * 60,
        hour = minute * 60,
        day = hour * 24;
    
        let movieRelease = "Aug 30, 2021 00:00:00";
        let countDown = new Date(movieRelease).getTime(),
        x = setInterval(function() {    
    
        let now = new Date().getTime(),
            distance = countDown - now;
    
        document.getElementById("days").innerText = Math.floor(distance / (day)),
        document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
        document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
        document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);
    }, 0);
    }
    countDown();
    let linksNavBar = document.querySelectorAll('.navBarLink');
    linksNavBar.forEach(link => {
        link.addEventListener('click', () => {
            let urlBase = window.location.origin;
            if(link.innerHTML === "Form"){
                window.location.assign(urlBase+ "/Interfaces/Entregable3/Entregable/form.html");
            }else{
                window.location.assign(urlBase+ "/Interfaces/Entregable3/Entregable/events.html");
            }
        })
    })
})