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
    }
    for (let y = 0; y <= width; y++) {
    for (let x = 0; x <= height; x++) {
            let r,g,b,a;
            if(y<=width/2){
                r = (y/(width/2))*255;
                g = (y/(width/2))*255;
                b=0;
            }else{
                r = 255;
                g = 255 - (((y-width/2)/width*2)*255);
                b = 0;
                if(y==width)
                console.log(r,g,b);
            }
            setPixel(imageData, x, y, r, g ,b ,255);
        }
    }
    // for (let x = 0; x <= height; x++) {
    //     for (let y = width/2; y <= width; y++) {
    //         let r,g,b,a;
    //         r = 255;
    //         g = 255-((y/width)*255);
    //         b=0;
    //         setPixel(imageData, x, y, r,g,b,255);
    //     }
    // }
    ctx.putImageData(imageData, 0, 0);
});