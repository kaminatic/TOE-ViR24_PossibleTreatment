document.addEventListener('DOMContentLoaded', () => {
    let selectedSphere = null;
    const correctPasswords = ['i', 'I'];
    const passwordInput = document.getElementById('passwordInput');
    const unlockButton = document.getElementById('unlockButton');
    const lockScreen = document.getElementById('lockScreen');
    const content = document.getElementById('content');
    const gameBoard = document.getElementById('gameBoard');
    const message = document.getElementById('message');
    const testElement = document.getElementById('img8');
    const gradientLabel = document.querySelector('.gradient-label');
    const correctOrder = ['img1', 'img2', 'img3', 'img4', 'img5'];

    unlockButton.addEventListener('click', () => {
        if (correctPasswords.includes(passwordInput.value)) {
            lockScreen.style.display = 'none';
            content.style.display = 'flex';
        } else {
            alert('Incorrect Password');
        }
    });

    function shuffleArray(array) {
        do {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
        } while (JSON.stringify(array.map(img => img.id)) === JSON.stringify(correctOrder));
    }

    function checkOrder() {
        const images = Array.from(document.querySelectorAll('.selectable')).map(img => img.id);
        if (JSON.stringify(images) === JSON.stringify(correctOrder)) {
            testElement.style.animation = 'fade-out 1s linear forwards';
            testElement.addEventListener('animationend', () => {
                testElement.style.display = 'none';
                message.style.display = 'block';
                message.style.opacity = '1';
            }, { once: true });
        } else {
            message.style.display = 'none';
        }
    }

    const images = Array.from(document.querySelectorAll('.selectable'));
    shuffleArray(images);
    images.forEach(image => gameBoard.appendChild(image));

    document.querySelectorAll('.selectable').forEach(sphere => {
        sphere.addEventListener('click', (e) => {
            if (selectedSphere === e.target) {
                // Deselect the sphere
                selectedSphere.src = selectedSphere.src.replace('_selected', '');
                selectedSphere.style.width = '18vw'; // Adjust for mobile
                selectedSphere.style.height = 'auto';
                selectedSphere = null;
            } else if (selectedSphere) {
                // Swap the selected sphere with the clicked one
                const tempSrc = selectedSphere.src;
                const tempId = selectedSphere.id;
                selectedSphere.src = e.target.src.replace('_selected', '');
                selectedSphere.id = e.target.id;
                e.target.src = tempSrc.replace('_selected', '');
                e.target.id = tempId;

                // Reset sizes
                selectedSphere.style.width = '18vw'; // Adjust for mobile
                selectedSphere.style.height = 'auto';
                e.target.style.width = '18vw'; // Adjust for mobile
                e.target.style.height = 'auto';

                // Deselect the spheres
                selectedSphere = null;

                // Check the order after swapping
                checkOrder();
            } else {
                // Select the sphere
                selectedSphere = e.target;
                selectedSphere.src = selectedSphere.src.replace('.svg', '_selected.svg');
                selectedSphere.style.width = '18vw'; // Slightly larger for selection
                selectedSphere.style.height = 'auto';
            }
        });
    });

    // Initial check order on page load
    checkOrder();
});
