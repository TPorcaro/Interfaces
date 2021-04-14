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
                setPixelToSepia(imageData, x, y);
            }   
        }
        setTimeout(() => {
            
            ctx.putImageData(imageData, 0, 0);
        }, 1000);
    };
    const setPixelToSepia = (imageData,x,y) => {
        let index = (x + y * imageData.width) *4;
        imageData.data[index + 0] = imageData.data[index + 0];  
        imageData.data[index + 1] = imageData.data[index + 1];
        imageData.data[index + 2] = imageData.data[index + 2];
    }
    const myDrawImage = (img) => {
        ctx.drawImage(img, 0, 0);
    };
    const getRed = (imageData, x, y) =>{
        let index = (x + y * imageData.width) * 4;
        return imageData.data[index];
    }
    
    const getGreen = (imageData, x, y) => {
        let index = (x + y * imageData.width) * 4;
        return imageData.data[index+1];
    }
    
    const getBlue = (imageData, x, y) => {
        let index = (x + y * imageData.width) * 4;
        return imageData.data[index+2];
    }
    })