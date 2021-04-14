document.addEventListener('DOMContentLoaded', () => {

    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    //let imageData = new Image();
    
    let image1 = new Image();
    image1.src = 'Landscape-Color.jpg'
    image1.onload = () => {
        canvas.height = image1.height;
        canvas.width = image1.width;
        myDrawImage(image1);
        let imageData = ctx.getImageData(0, 0, image1.width, image1.height);
        for (let x = 0; x < image1.width; x++) {
            for (let y = 0; y < image1.height; y++) {
                setPixelToGreyScale(imageData, x, y);
            }   
        }
        setTimeout(() => {
            
            ctx.putImageData(imageData, 0, 0);
        }, 1000);
    };
    const setPixelToGreyScale = (imageData,x,y) => {
        let index = (x + y * imageData.width) *4;
        let greyScale = Number((imageData.data[index + 0] + imageData.data[index + 1] + imageData.data[index + 2] +imageData.data[index + 3]) / 4);
        imageData.data[index + 0] = greyScale;
        imageData.data[index + 1] = greyScale;
        imageData.data[index + 2] = greyScale;
        imageData.data[index + 3] = greyScale;
    }
    const myDrawImage = (image1) => {
        ctx.drawImage(image1, 0, 0);
    };
    })