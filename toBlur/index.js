document.addEventListener('DOMContentLoaded', () => {

    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let imageData;
    let img = new Image();
    img.src = '../assets/Landscape-Color.jpg';
    img.onload = () => {
        imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        canvas.height = img.height;
        canvas.width = img.width;
        myDrawImage(img);
    
        blur();
        
    };
    const setPixel = (imageData, x, y, r, g, b, a) => {
        let index = (x + y * imageData.width) * 4;
        imageData.data[index] = r;
        imageData.data[index + 1] = g;
        imageData.data[index + 2] = b;
        imageData.data[index + 3] = a;
    }
    const myDrawImage = (img) => {
        ctx.drawImage(img, 0, 0);
    };
    const getRed = (imageData, x, y) =>{
        let index = (x + y * imageData.height) * 4;
        return imageData.data[index + 0];
    }
    
    const getGreen = (imageData, x, y) => {
        let index = (x + y * imageData.height) * 4;
        return imageData.data[index+1];
    }
    
    const getBlue = (imageData, x, y) => {
        let index = (x + y * imageData.height) * 4;
        return imageData.data[index+2];
    }
    const blur = () => {
        let matriz =   [[ 1/9, 1/9, 1/9 ],
                        [ 1/9, 1/9, 1/9 ],
                        [ 1/9, 1/9, 1/9 ]];
        let imageData = ctx.createImageData(canvas.width, canvas.height);

        
        setTimeout(() => {
            ctx.putImageData(imageData, 0, 0);
        }, 1000);
    }
    
})