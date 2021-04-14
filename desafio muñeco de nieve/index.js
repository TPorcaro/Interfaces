document.addEventListener('DOMContentLoaded', () => {

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

const drawCircle = (color, x ,y , radius) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0 , Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
}
const drawRectangle = (color, x, y, width, height) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
}
const drawTiltRectangle = (color, x, y, width, height) => {
    ctx.fillStyle = color;
    ctx.rotate(0.5);
    ctx.fillRect(x, y, width, height);
}
// cuerpo
drawCircle("#ffffff", 800, 550, 100);
drawCircle("#ffffff", 800, 400, 75);
drawCircle("#ffffff", 800, 300, 50);

// ojos
drawCircle("#000000", 820, 290, 5);
drawCircle("#000000", 780, 290, 5);


// botones 
drawCircle("#000000", 800, 380, 3);
drawCircle("#000000", 800, 410, 3);
drawCircle("#000000", 800, 450, 3);

// gorro
drawRectangle("#000000", 750, 245, 100, 10);
drawRectangle("#000000", 770, 205, 60, 40);
drawRectangle("#ffffff", 770, 235, 60, 10);

// brazos
drawRectangle("#804000", 870, 400, 80, 5);
drawRectangle("#804000", 650, 400, 80, 5);


// boca
drawCircle("#000000", 827, 315, 1.5);
drawCircle("#000000", 824, 318, 1.5);
drawCircle("#000000", 821, 321, 1.5);
drawCircle("#000000", 818, 323, 1.5);

//nariz 
ctx.fillStyle = "Orange";
ctx.beginPath();
ctx.moveTo(800, 295);
ctx.lineTo(800 + 50, 305);
ctx.lineTo(800, 310);
ctx.closePath();
ctx.fill();

    
    
    
    

})