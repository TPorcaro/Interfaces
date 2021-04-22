document.addEventListener('DOMContentLoaded', () => {

    let inputColor = document.getElementById('inputColor')
    let inputRange = document.getElementById('inputRange');
    let btnPencil = document.getElementById('btnPencil');
    let btnEraser = document.getElementById('btnEraser');
    let resetBtn = document.getElementById('resetBtn')
    let inputFile = document.getElementById('imgFile');
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let filterBtns = document.getElementsByClassName('customBtn');
    canvas.width = 800;
    canvas.height = 600;
    ctx.lineWidth = 1;
    let canDraw = false;
    let clicking = false;
    let usingPencil = false;
    let usingEraser = false;
    let sizeMouse = 1;
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let originalImageData;
    
    const draw = (e) => {
        let x = e.offsetX;
        let y = e.offsetY;

        if(canDraw && clicking && usingPencil){
            ctx.lineTo(x,y);
            ctx.stroke();
        }
    }
    const eraser = (e) => {
        let x = e.offsetX;
        let y = e.offsetY;
        if(canDraw && clicking && usingEraser){
            ctx.clearRect(x,y,sizeMouse,sizeMouse);
        }
    }
    const setNormal = () => {
        putImg();
    }
    const setGrayScale = () => {
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let x = 0; x < canvas.width; x++) {
            for (let y = 0; y < canvas.height; y++) {
                setPixelToGreyScale(imageData, x, y);
            }   
        }
        ctx.putImageData(imageData, 0, 0);
    }
    const setPixelToGreyScale = (imageData,x,y) => {
        let index = (x + y * imageData.width) *4;
        let greyScale = Number(imageData.data[index + 0]*0.4 + imageData.data[index + 1]*0.5 + imageData.data[index + 2]*0.16); // Esta forma se ve mas oscuro
        imageData.data[index + 0] = greyScale;
        imageData.data[index + 1] = greyScale;
        imageData.data[index + 2] = greyScale;
    }
    const setNegative = () => {
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let x = 0; x < canvas.width; x++) {
            for (let y = 0; y < canvas.height; y++) {
                setPixelToNegativeScale(imageData, x, y);
            }   
        }
        ctx.putImageData(imageData, 0, 0);
    }
    const setPixelToNegativeScale = (imageData,x,y) => {
        let index = (x + y * imageData.width) *4;
        imageData.data[index + 0] = 255 - imageData.data[index + 0];
        imageData.data[index + 1] = 255 - imageData.data[index + 1];
        imageData.data[index + 2] = 255 - imageData.data[index + 2];
    }
    const setSaturate = () => {
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let x = 0; x < canvas.width; x++) {
            for (let y = 0; y < canvas.height; y++) {
                setPixelToSaturate(imageData, x, y);
            }   
        }
        ctx.putImageData(imageData, 0, 0);
    }
    const setPixelToSaturate = (imageData,x,y) => {
        let index = (x + y * imageData.width) *4;
        let r = getRed(imageData, x, y);
        let g = getGreen(imageData, x, y);
        let b = getBlue(imageData, x, y);
        let hsl = RGBtoHSL(r,g,b);
        hsl[1] += 0.1;
        let rgb = HSLtoRGB(hsl[0], hsl[1], hsl[2]);
        imageData.data[index + 0] = rgb[0];
        imageData.data[index + 1] = rgb[1];
        imageData.data[index + 2] = rgb[2];
    }
    const setSepia = () => {
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let x = 0; x < canvas.width; x++) {
            for (let y = 0; y < canvas.height; y++) {
                setPixelToSepia(imageData, x, y);
            }   
        }
        ctx.putImageData(imageData, 0, 0);
    }
    const setPixelToSepia = (imageData,x,y) => {
        let index = (x + y * imageData.width) *4;
        let greyScale = Number((imageData.data[index + 0] + imageData.data[index + 1] + imageData.data[index + 2] +imageData.data[index + 3]) / 4);
        imageData.data[index + 0] = greyScale +100;  // sepia es 
        imageData.data[index + 1] = greyScale +50;
        imageData.data[index + 2] = greyScale;
    }
    const setBrightness = (nmro) => {
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let x = 0; x < canvas.width; x++) {
            for (let y = 0; y < canvas.height; y++) {
                setPixelBrightness(imageData, x, y, nmro);
            }   
        }
        ctx.putImageData(imageData, 0, 0);
    }
    const setPixelBrightness = (imageData, x, y, nmro) => { // aumentar brillo + color , disminuir brillo - color;
        let index = (x + y * imageData.width) *4;
        imageData.data[index + 0] = imageData.data[index + 0] +nmro;
        imageData.data[index + 1] = imageData.data[index + 1] +nmro;
        imageData.data[index + 2] = imageData.data[index + 2] +nmro;
    }
    const setBinary = () => {
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (let x = 0; x < canvas.width; x++) {
            for (let y = 0; y < canvas.height; y++) {
                setPixelToBinary(imageData, x, y);
            }   
        }
        ctx.putImageData(imageData, 0, 0);
    }
    const setPixelToBinary = (imageData,x,y) => {
        let index = (x + y * imageData.width) *4;
        let binary = toBinary((imageData.data[index + 0] + imageData.data[index + 1] + imageData.data[index + 2])/3);
        imageData.data[index + 0] = binary;
        imageData.data[index + 1] = binary;
        imageData.data[index + 2] = binary;
    }
    const toBinary = (nmr) => {
        if(nmr<127.5){
            return 0;
        }
        return 255;
    }
    const setBlur = () => {
    let matriz = [
        [ 1/9, 1/9, 1/9 ],
        [ 1/9, 1/9, 1/9 ],
        [ 1/9, 1/9, 1/9 ]
        ];
        let imageData = ctx.getImageData(0, 0,canvas.width, canvas.height);
        for (let x = 0; x < canvas.width; x++) {
            for (let y = 0; y < canvas.height; y++) {
                setPixelFilterMatriz(imageData, x, y, matriz);
            }   
        }
        ctx.putImageData(imageData, 0, 0);
    }
    const setPixelFilterMatriz = (imageData, x, y, matriz) => {
        let ul = ((x - 1 + imageData.width) % imageData.width + imageData.width * ((y - 1 + imageData.height) % imageData.height)) * 4; // Arriba Izquierda
        let uc = ((x - 0 + imageData.width) % imageData.width + imageData.width * ((y - 1 + imageData.height) % imageData.height)) * 4; // Arriba Centro
        let ur = ((x + 1 + imageData.width) % imageData.width + imageData.width * ((y - 1 + imageData.height) % imageData.height)) * 4; // Arriba Derecha
        let ml = ((x - 1 + imageData.width) % imageData.width + imageData.width * ((y + 0 + imageData.height) % imageData.height)) * 4; // Izquierda
        let mc = ((x - 0 + imageData.width) % imageData.width + imageData.width * ((y + 0 + imageData.height) % imageData.height)) * 4; // Centro
        let mr = ((x + 1 + imageData.width) % imageData.width + imageData.width * ((y + 0 + imageData.height) % imageData.height)) * 4; // Derecha
        let ll = ((x - 1 + imageData.width) % imageData.width + imageData.width * ((y + 1 + imageData.height) % imageData.height)) * 4; // Abajo Izquierda
        let lc = ((x - 0 + imageData.width) % imageData.width + imageData.width * ((y + 1 + imageData.height) % imageData.height)) * 4; // Abajo Centro
        let lr = ((x + 1 + imageData.width) % imageData.width + imageData.width * ((y + 1 + imageData.height) % imageData.height)) * 4; // Abajo Derecha
        let pixelUl, pixelUc, pixelUr, pixelMl, pixelMc, pixelMr, pixelLl, pixelLc, pixelLr
        pixelUl = imageData.data[ul] * matriz[0][0];
        pixelUc = imageData.data[uc] * matriz[0][1];
        pixelUr = imageData.data[ur] * matriz[0][2];
        pixelMl = imageData.data[ml] * matriz[1][0];
        pixelMc = imageData.data[mc] * matriz[1][1];
        pixelMr = imageData.data[mr] * matriz[1][2];
        pixelLl = imageData.data[ll] * matriz[2][0];
        pixelLc = imageData.data[lc] * matriz[2][1];
        pixelLr = imageData.data[lr] * matriz[2][2];
        let r = (pixelUl + pixelUc + pixelUr + pixelMl + pixelMc + pixelMr + pixelLl + pixelLc + pixelLr);

        pixelUl = imageData.data[ul + 1] * matriz[0][0]
        pixelUc = imageData.data[uc + 1] * matriz[0][1];
        pixelUr = imageData.data[ur + 1] * matriz[0][2];
        pixelMl = imageData.data[ml + 1] * matriz[1][0];
        pixelMc = imageData.data[mc + 1] * matriz[1][1];
        pixelMr = imageData.data[mr + 1] * matriz[1][2];
        pixelLl = imageData.data[ll + 1] * matriz[2][0];
        pixelLc = imageData.data[lc + 1] * matriz[2][1];
        pixelLr = imageData.data[lr + 1] * matriz[2][2];
        let g = (pixelUl + pixelUc + pixelUr + pixelMl + pixelMc + pixelMr + pixelLl + pixelLc + pixelLr);

        pixelUl = imageData.data[ul + 2] * matriz[0][0];
        pixelUc = imageData.data[uc + 2] * matriz[0][1];
        pixelUr = imageData.data[ur + 2] * matriz[0][2];
        pixelMl = imageData.data[ml + 2] * matriz[1][0];
        pixelMc = imageData.data[mc + 2] * matriz[1][1];
        pixelMr = imageData.data[mr + 2] * matriz[1][2];
        pixelLl = imageData.data[ll + 2] * matriz[2][0];
        pixelLc = imageData.data[lc + 2] * matriz[2][1];
        pixelLr = imageData.data[lr + 2] * matriz[2][2];
        let b = (pixelUl + pixelUc + pixelUr + pixelMl + pixelMc + pixelMr + pixelLl + pixelLc + pixelLr);
        imageData.data[mc] = r;
        imageData.data[mc + 1] = g;
        imageData.data[mc + 2] = b;
        imageData.data[mc + 3] = imageData.data[lc + 3];
    }
    const setEdges = () => {
        let matriz = [
            [-2,-2,-2],
            [-2,8,-2],
            [-2,-2,-2]
        ];
        let imageData = ctx.getImageData(0, 0,canvas.width, canvas.height);
        for (let x = 0; x < canvas.width; x++) {
            for (let y = 0; y < canvas.height; y++) {
                setPixelFilterMatriz(imageData, x, y, matriz);
            }   
        }
            ctx.putImageData(imageData, 0, 0);
    }
    for (let index = 0; index < filterBtns.length; index++) {
        filterBtns[index].addEventListener('click', (e) => {
            switch (e.target.innerHTML) {
                case "Normal":
                    setNormal();
                break;
                case "Escala de Grises":
                    setGrayScale();
                break;
                case "Negativo":
                    setNegative();
                break;
                case "Saturacion":
                    setSaturate();
                break;
                case "Sepia":
                    setSepia();
                break;
                case "Binarizacion":
                    setBinary();
                break;
                case "Difuminar":
                    setBlur();
                break;
                case "Deteccion de bordes":
                    setEdges();
                break;
                case "Mas Brillo":
                    setBrightness(50);
                break;
                case "Menos Brillo":
                    setBrightness(-50);
                break;
                default:
                break;
            }
        })
        
    }

    inputColor.addEventListener('change', (e) => {
        ctx.strokeStyle = e.target.value;
    });
    inputRange.addEventListener('change', (e) => {
        sizeMouse = e.target.value;
        ctx.lineWidth = e.target.value;
    });
    resetBtn.addEventListener('click', (e) => {
        ctx.clearRect(0,0, canvas.width, canvas.height);
        inputFile.value ="";
    })
    canvas.addEventListener('mouseout', (e) => {
        canDraw = false; 
    });
    canvas.addEventListener('mouseover', (e) => {
        ctx.moveTo(e.offsetX, e.offsetY);
        canDraw = true;
    });
    btnPencil.addEventListener('click', (e) => {
        usingPencil = true;
        usingEraser = false;
    });
    btnEraser.addEventListener('click', (e) => {
        usingPencil = false;
        usingEraser = true;
    });
    canvas.addEventListener('mousemove', (e)=>{
        draw(e);
        eraser(e);
    });
    document.addEventListener('mousedown', (e) => {
        canDraw = true;
        clicking = true;
        if(usingPencil){
            ctx.beginPath();
            let x = e.offsetX;
            let y = e.offsetY;
            ctx.lineTo(x,y);
        }
        if(usingEraser){
            let x = e.offsetX;
            let y = e.offsetY;
            ctx.clearRect(x, y,sizeMouse,sizeMouse)
        }
    });
    document.addEventListener('mouseup', () => {
        clicking = false;
    });
    const putImg = () =>{
        let fileReader = new FileReader();
        fileReader.onload = () => {
            let newImage = new Image();
            newImage.src = fileReader.result;
            newImage.onload = () =>{
                newImage.width = canvas.width;
                newImage.height = canvas.height;
                ctx.drawImage(newImage,0,0,canvas.width,canvas.height);
                originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            }

        }
        if(inputFile.files[0])
        fileReader.readAsDataURL(inputFile.files[0]);
    }
    inputFile.addEventListener('change', putImg);

    

    const RGBtoHSL = (r, g, b) => {
        r /= 255, g /= 255, b /= 255;
    
        let max = Math.max(r, g, b)
        let min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
    
        if (max == min) {
            h = s = 0;
        } 
        else {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
    
            h /= 6;
        }
    
        return [ h, s, l ];
    }
      
    const HSLtoRGB = (h, s, l) => {
        let r, g, b;
    
        if (s == 0) {
            r = g = b = l; // achromatic
        } 
        else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            }
    
            let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            let p = 2 * l - q;
    
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
    
        return [ r * 255, g * 255, b * 255 ];
    } 
    const getRed = (imgData, x, y) => {
        let index = (x + y * imgData.width) * 4;
        return imgData.data[index];
    }
    
    const getGreen = (imgData, x, y) => {
        let index = (x + y * imgData.width) * 4;
        return imgData.data[index+1];
    }
    
    const getBlue = (imgData, x, y) => {
        let index = (x + y * imgData.width) * 4;
        return imgData.data[index+2];
    }
    
});