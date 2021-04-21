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
                setPixelToBinary(imageData, x, y);
            }   
        }
        setTimeout(() => {
            
            ctx.putImageData(imageData, 0, 0);
        }, 1000);
    };
    const setPixelToBinary = (imageData,x,y) => {
        let index = (x + y * imageData.width) *4;
        toBinary((imageData.data[index + 0] + imageData.data[index + 1] + imageData.data[index + 2])/3);
        imageData.data[index + 0] = toBinary((imageData.data[index + 0] + imageData.data[index + 1] + imageData.data[index + 2])/3);
        imageData.data[index + 1] = toBinary((imageData.data[index + 0] + imageData.data[index + 1] + imageData.data[index + 2])/3);
        imageData.data[index + 2] = toBinary((imageData.data[index + 0] + imageData.data[index + 1] + imageData.data[index + 2])/3);
    }
    const toBinary = (nmr) => {
        if(nmr<127.5){
            return 0;
        }
        return 255;
    }
    
    const myDrawImage = (img) => {
        ctx.drawImage(img, 0, 0);
    };
    })