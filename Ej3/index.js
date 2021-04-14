document.addEventListener('DOMContentLoaded', () => {

    let canvas = document.getElementById('canvas');
    let width = 640;
    let height = 480;
    canvas.width = 800;
    canvas.height = 600;
    let ctx = canvas.getContext('2d');
    let imageData = ctx.createImageData(width, height);
    const setPixel = (imageData,x,y,r,g,b,a) => {
        let index = (x + y * imageData.height) *4;
        imageData.data[index + 0] = r;
        imageData.data[index + 1] = g;
        imageData.data[index + 2] = b;
        imageData.data[index + 3] = a;
    }
    for (let x = 0; x < width; x++) {
       for (let y = 0; y < height; y++) {
        setPixel(imageData,x,y,255,0,0,255);   
       }
        
    }
    ctx.putImageData(imageData, 50, 50);

    
    
})