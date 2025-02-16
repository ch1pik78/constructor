window.onload = function() {
    document.getElementById('popup').style.display = 'flex';
    document.getElementById('result').style.display = 'flex';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('result').style.display = 'none';
}


const dragElement = document.querySelectorAll('.draggable');
const playArea = document.querySelector('.play');
const leftElements = document.querySelectorAll('.left')
const rightElements = document.querySelectorAll('.right')



const originalPositions = {
    leftElements: [],
    rightElements: []
};
leftElements.forEach(el => {
    originalPositions.leftElements.push({
        element: el,
        top: el.style.top,
        left: el.style.left,
        right: el.style.right,
        rotation: el.style.transform,
        scale: el.style.transform
    });
});
rightElements.forEach(el => {
    originalPositions.rightElements.push({
        element: el,
        top: el.style.top,
        left: el.style.left,
        right: el.style.right,
        rotation: el.style.transform,
        scale: el.style.transform
    });
});
document.getElementById('mix').addEventListener('click', function () {
    originalPositions.leftElements.forEach(pos => {
        pos.element.style.top = pos.top;
        pos.element.style.left = pos.left;
        pos.element.style.right = pos.right;
    });
    originalPositions.rightElements.forEach(pos => {
        pos.element.style.top = pos.top;
        pos.element.style.left = pos.left;
        pos.element.style.right = pos.right;
    });
    originalPositions.leftElements.forEach(pos => {
        pos.element.style.transform = 'rotate(0deg) ';
        pos.element.style.transform = pos.scale;
    });
    originalPositions.rightElements.forEach(pos => {
        pos.element.style.transform = 'rotate(0deg) ';
        pos.element.style.transform = pos.scale; 
    });
});


let isDragging = false;
let activeElement = null;
let offsetX = 0;
let offsetY = 0;

document.getElementById('begin').addEventListener('click', () => {
    isDragging = !isDragging; 
    
    dragElement.forEach(function (element) {
        let rotation = 0;
        let scale = 1.3;
    
        element.ondblclick = function () {
            rotation += 90; 
            this.style.transformOrigin = 'center center'; 
            this.style.transform = `rotate(${rotation}deg) scale(${scale})`; 
        };
    });
});

dragElement.forEach(function (element) {
    element.addEventListener('pointerdown', (event) => {
        if (!isDragging) return;


        activeElement = element;

        const rect = element.getBoundingClientRect();
        offsetX = event.clientX - rect.left;
        offsetY = event.clientY - rect.top;

        element.style.zIndex = 1000; 
        element.style.cursor = 'grabbing';
    });


    document.addEventListener('pointermove', (event) => {
        if (!isDragging || !activeElement) return;

        const x = event.clientX - offsetX;
        const y = event.clientY - offsetY;

        activeElement.style.position = 'absolute';
        activeElement.style.left = `${x}px`;
        activeElement.style.top = `${y}px`;
    });


    document.addEventListener('pointerup', () => {
        if (!isDragging) return;

        activeElement.style.zIndex = '';
        activeElement.style.cursor = 'grab';
        activeElement = null;
    });
});
