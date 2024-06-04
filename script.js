const correctPasswords = ['i', 'I'];
const passwordInput = document.getElementById('passwordInput');
const unlockButton = document.getElementById('unlockButton');
const lockScreen = document.getElementById('lockScreen');
const content = document.getElementById('content');
const gameBoard = document.getElementById('gameBoard');
const message = document.getElementById('message');
const testElement = document.getElementById('img8');
const gradientLabel = document.querySelector('.gradient-label');

unlockButton.addEventListener('click', () => {
    if (correctPasswords.includes(passwordInput.value)) {
        lockScreen.style.display = 'none';
        content.style.display = 'flex';
    } else {
        alert('Incorrect Password');
    }
});

// Correct order of the images
const correctOrder = ['img1', 'img2', 'img3', 'img4', 'img5'];

// Shuffle the images and append to the game board
document.addEventListener('DOMContentLoaded', () => {
    const images = Array.from(document.querySelectorAll('.draggable'));
    shuffleArray(images);
    images.forEach(image => gameBoard.appendChild(image));
    addDragAndDropHandlers();
    checkOrder();
});

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function addDragAndDropHandlers() {
    const draggables = document.querySelectorAll('.draggable');
    let dragSrcEl = null;

    draggables.forEach(draggable => {
        draggable.addEventListener('dragstart', handleDragStart);
        draggable.addEventListener('dragover', handleDragOver);
        draggable.addEventListener('drop', handleDrop);
        draggable.addEventListener('dragend', handleDragEnd);
    });

    function handleDragStart(e) {
        dragSrcEl = this;
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.outerHTML);
        this.classList.add('dragging');
    }

    function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        e.dataTransfer.dropEffect = 'move';
        return false;
    }

    function handleDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }

        if (dragSrcEl !== this) {
            const dropHTML = e.dataTransfer.getData('text/html');
            this.insertAdjacentHTML('beforebegin', dropHTML);
            this.parentNode.removeChild(dragSrcEl);
            addDnDHandlers(this.previousSibling);
            checkOrder();
        }
        return false;
    }

    function handleDragEnd() {
        this.classList.remove('dragging');
    }

    function addDnDHandlers(element) {
        element.addEventListener('dragstart', handleDragStart);
        element.addEventListener('dragover', handleDragOver);
        element.addEventListener('drop', handleDrop);
        element.addEventListener('dragend', handleDragEnd);
    }

    function checkOrder() {
        const images = Array.from(document.querySelectorAll('.draggable')).map(img => img.id);
        if (JSON.stringify(images) === JSON.stringify(correctOrder)) {
            testElement.style.animation = 'fade-out 1s linear forwards';
            testElement.addEventListener('animationend', () => {
                testElement.style.display = 'none';
                const labelRect = gradientLabel.getBoundingClientRect();
                message.style.position = 'absolute';
                message.style.top = `${labelRect.bottom + window.scrollY + 20}px`; // 20 pixels below the gradient label
                message.style.left = `${labelRect.left + window.scrollX}px`;
                message.style.display = 'block';
                message.style.opacity = '1';
            });
        } else {
            message.style.display = 'none';
        }
    }
}
