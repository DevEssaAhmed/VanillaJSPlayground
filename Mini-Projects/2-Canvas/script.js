const canvas = document.getElementById('my-canvas');

// Canvas Context

const ctx = canvas.getContext('2d');

// Draw Reactangle
ctx.fillStyle = 'green';
ctx.fillRect(10, 10, 150, 100);

ctx.fill();

// Draw circle
ctx.fillStyle = 'red';
ctx.arc(300, 300, 100, 0, Math.PI * 2);
ctx.fill();

// Draw Lines
ctx.beginPath();
ctx.strokeStyle = 'orange';
ctx.lineWidth = 5;
ctx.moveTo(10, 10);
ctx.lineTo(300, 300);
ctx.stroke();

// Draw Text
ctx.font = '30px Inter';
ctx.lineWidth = 0.5;

ctx.fillStyle = 'blue';
ctx.fillText('Hello World', 200, 100, 300);
ctx.strokeText('Hello World', 100, 500, 300);


//Draw image
const image = document.querySelector('img')
image.style.display = 'none'

image.addEventListener('load', () => {
    ctx.drawImage(image,270,270,100,100)
})
