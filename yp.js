const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth - 600;
canvas.height = 150;

let context = canvas.getContext('2d');
let startBackgroundColor = 'white';
context.fillStyle = 'white';
context.fillRect(0, 0, canvas.width, canvas.height);

let drawColor = 'black';
let drawWidth = '2';
let isDrawing = false;

let restoreArray = [];
let index = -1;

function change_color(element) {
    drawColor = element.style.background;
}

canvas.addEventListener('touchstart', start, false);
canvas.addEventListener('touchmove', draw, false);
canvas.addEventListener('mousedown', start, false);
canvas.addEventListener('mousemove', draw, false);

canvas.addEventListener('touchend', stop, false);
canvas.addEventListener('mouseup', stop, false);
canvas.addEventListener('mouseout', stop, false);

function start(event) {
    isDrawing = true;
    context.beginPath();
    context.moveTo(event.clientX - canvas.offsetLeft, 
                   event.clientY - canvas.offsetTop);
    event.preventDefault();
}

function draw(event) {
    if (isDrawing == true) {
        context.lineTo(event.clientX - canvas.offsetLeft, 
                       event.clientY - canvas.offsetTop);
        context.strokeStyle = drawColor;
        context.lineWidth = drawWidth;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.stroke();
    }
}

function stop(event) {
    if (isDrawing == true) {
        context.stroke();
        context.closePath();
        isDrawing = false;
    }
    event.preventDefault();

    if (event.type != 'mouseout') {
        restoreArray.push(context.getImageData(0, 0, canvas.width, canvas.height));
        index += 1;
    }
}

function clearCanvas() {
    context.fillStyle = startBackgroundColor;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height);

    restoreArray = [];
    index = -1;
}

function undoLast() {
    if (index <= 0) {
        clearCanvas();
    } else {
        index -= 1;
        restoreArray.pop();
        context.putImageData(restoreArray[index], 0, 0)
    }
}







