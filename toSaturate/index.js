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
                setPixelToSaturate(imageData, x, y);
            }   
        }
        setTimeout(() => {
            
            ctx.putImageData(imageData, 0, 0);
        }, 1000);
    };
    const setPixelToSaturate = (imageData,x,y) => {
        let index = (x + y * imageData.width) *4;
        let r = getRed(imageData, x, y);
        let g = getGreen(imageData, x, y);
        let b = getBlue(imageData, x, y);
        let hsl = RGBtoHSL(r,g,b);
        hsl[1] += 0.5;
        let rgb = HSLtoRGB(hsl[0], hsl[1], hsl[2]);
        imageData.data[index + 0] = rgb[0];
        imageData.data[index + 1] = rgb[1];
        imageData.data[index + 2] = rgb[2];
    }
    const myDrawImage = (img) => {
        ctx.drawImage(img, 0, 0);
    };

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
    })