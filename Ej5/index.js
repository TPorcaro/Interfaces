document.addEventListener('DOMContentLoaded', () => {

    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    let width = 640;
    let height = 480;
    canvas.width = 800;
    canvas.height = 600;
    let imageData = ctx.createImageData(width, height);
    const setPixel = (imageData,x,y,r,g,b,a) => {
        let index = (x + y * imageData.height) *4;
        imageData.data[index + 0] = r;
        imageData.data[index + 1] = g;
        imageData.data[index + 2] = b;
        imageData.data[index + 3] = a;
    } // 255-(y/height*255);
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height/2; y++) {
            let r,g,b,a;
            r = y/height*255
            g = y/height*255;
            b=0;
            setPixel(imageData, x, y, r,g ,b ,255);
        }   
    }
    for (let x = 0; x < width; x++) {
        for (let y = height/2; y < height; y++) {
            let r,g,b,a;
            r = y/height*255;
            g = 255-(y/height*255);
            b =0;
            setPixel(imageData, x, y, r,g,b,255);
        }
    }
    ctx.putImageData(imageData, 0, 0);
});