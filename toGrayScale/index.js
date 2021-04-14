document.addEventListener('DOMContentLoaded', () => {

    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    
    let img = new Image();
    img.src = '../assets/Landscape-Color.jpg';
    img.onload = () => {
        canvas.height = img.height;
        canvas.width = img.width;
        myDrawImage(img);
        let imageData = ctx.getImageData(0, 0, img.width, img.height);
        for (let x = 0; x < img.width; x++) {
            for (let y = 0; y < img.height; y++) {
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
    const myDrawImage = (img) => {
        ctx.drawImage(img, 0, 0);
    };
    })