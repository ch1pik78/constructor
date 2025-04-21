window.onload = function() {
    document.getElementById('popup').style.display = 'flex';
    document.getElementById('result').style.display = 'flex';
}

function closePopup() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('result').style.display = 'none';  
}

const dragElements = document.querySelectorAll('.draggable');
const leftElements = document.querySelectorAll('.left');
const rightElements = document.querySelectorAll('.right');

const originalPositions = {
    leftElements: [],
    rightElements: []
};

leftElements.forEach(el => {
    originalPositions.leftElements.push({
        element: el,
        translateX: 0,
        translateY: 0,
        rotation: 0,
        scale: parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale')) || 1.3
    });
});

rightElements.forEach(el => {
    originalPositions.rightElements.push({
        element: el,
        translateX: 0,
        translateY: 0,
        rotation: 0,
        scale: parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--scale')) || 1.3
    });
});

function updateTransform(pos) {
    pos.element.style.transform = `translate(${pos.translateX}px, ${pos.translateY}px) rotate(${pos.rotation}deg) scale(${pos.scale})`;
}

originalPositions.leftElements.forEach(pos => updateTransform(pos));
originalPositions.rightElements.forEach(pos => updateTransform(pos));

document.getElementById('mix').addEventListener('click', function () {
    originalPositions.leftElements.forEach(pos => {
        pos.translateX = 0;
        pos.translateY = 0;
        pos.rotation = 0;
        updateTransform(pos);
    });
    originalPositions.rightElements.forEach(pos => {
        pos.translateX = 0;
        pos.translateY = 0;
        pos.rotation = 0;
        updateTransform(pos);
    });
});

let isDragging = false;
let activeElement = null;
let startX, startY, startTranslateX, startTranslateY;

document.getElementById('begin').addEventListener('click', () => {
    isDragging = !isDragging; 
    
    dragElements.forEach(function (element) {
        let pos = originalPositions.leftElements.find(p => p.element === element) || 
                  originalPositions.rightElements.find(p => p.element === element);
    
        element.ondblclick = function () {
            pos.rotation += 90; 
            updateTransform(pos);
        };
    });
});

dragElements.forEach(function (element) {
    element.addEventListener('pointerdown', (event) => {
        if (!isDragging) return;

        let pos = originalPositions.leftElements.find(p => p.element === element) || 
                  originalPositions.rightElements.find(p => p.element === element);
        activeElement = pos;
        startX = event.clientX;
        startY = event.clientY;
        startTranslateX = pos.translateX;
        startTranslateY = pos.translateY;

        element.classList.add('dragging');
        element.style.zIndex = 1000; 
        element.style.cursor = 'grabbing';
    });
});

document.addEventListener('pointermove', (event) => {
    if (!isDragging || !activeElement) return;

    const dx = (event.clientX - startX);
    const dy = (event.clientY - startY);
    activeElement.translateX = startTranslateX + dx;
    activeElement.translateY = startTranslateY + dy;
    updateTransform(activeElement);
});

document.addEventListener('pointerup', () => {
    if (!isDragging) return;

    activeElement.element.classList.remove('dragging');
    activeElement.element.style.zIndex = '';
    activeElement.element.style.cursor = 'grab';
    activeElement = null;
});

function updateScale() {
    const width = window.innerWidth;
    let scale = 1.3;
    if (width <= 480) scale = 0.8;
    else if (width <= 768) scale = 1.0;

    originalPositions.leftElements.forEach(pos => {
        pos.scale = scale;
        updateTransform(pos);
    });
    originalPositions.rightElements.forEach(pos => {
        pos.scale = scale;
        updateTransform(pos);
    });
}

window.addEventListener('resize', updateScale);
window.dispatchEvent(new Event('resize'))
