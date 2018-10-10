const container = document.querySelector('.container');
const buttonClear = document.querySelector('.buttonClear');
const buttonGenerate = document.querySelector('.buttonGenerate');
const buttonSwitch = document.querySelector('.buttonSwitch');
const buttonSound = document.querySelector('.buttonSound');
const speakerImage = document.querySelector('.speaker');
const audio = document.querySelector('.sound');

makeGrid(16);
let colorful = true;
let soundEnabled = false;

buttonClear.addEventListener('click', clearGrid);
buttonGenerate.addEventListener('click', repaintGrid);
buttonSwitch.addEventListener('click', switchColor);
buttonSound.addEventListener('click', switchSound);


function switchSound() {
    if (soundEnabled) {
        soundEnabled = false;
        speakerImage.setAttribute('src', 'volume.png');
    }
    else {
        soundEnabled = true;
        speakerImage.setAttribute('src', 'volume_off.png');
    }
}

function clearGrid() {
    const squaresList = document.querySelectorAll('.square');
    squaresList.forEach( square => {
        square.style.backgroundColor = 'white';
    })
}

function switchColor() {
    if (colorful) {
        colorful = false;
        buttonClear.style.backgroundColor = '#555555';
        buttonGenerate.style.backgroundColor = '#555555';
        buttonSwitch.style.backgroundColor = '#555555';
        buttonSound.style.backgroundColor = '#555555';
    }
    else {
        colorful = true;
        buttonClear.style.backgroundColor = '#4CAF50';
        buttonGenerate.style.backgroundColor = '#4CAF50';
        buttonSwitch.style.backgroundColor = '#4CAF50';
        buttonSound.style.backgroundColor = '#4CAF50';
    }
}


function repaintGrid() {
    const inputElement = document.getElementsByName('grid-size')[0];
    const newSize = parseInt(inputElement.value);
    if (typeof(newSize) === 'number' && newSize <= 64 && newSize > 0) {
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
        makeGrid(newSize);
    }
    else {
        alert('Please choose size between 1 and 64 squares');
    }
}

function makeGrid(size) { 
    const totalDivs = size**2; 
    const borderWidth = 0.5;
    const dimension = (600 - borderWidth * size * 2) / size;

    for (let i = 1; i <= totalDivs; i++) {
        const squareDiv = document.createElement('div');
        squareDiv.classList.add('square');
        squareDiv.style.height = dimension.toString() + 'px';
        squareDiv.style.width = dimension.toString() + 'px';

        // check if previous index was power of size
        const remainder = (i-1) % size; 
        // then the current div moves to new row (has nothing on left)
        if (remainder == 0) {
            squareDiv.style.clear = 'left';
        }

        squareDiv.addEventListener('mouseover', hover);
        squareDiv.setAttribute('data-black', '0');

        container.appendChild(squareDiv);
    }
}

function hover(e) {
    if (soundEnabled && audio) {
        audio.currentTime = 0; // rewind to the start
        audio.play();
    }
    if (colorful) {
        const color = `rgb(${Math.random()*256},${Math.random()*256},${Math.random()*256})`;
        e.target.style.backgroundColor = color;
    }
    else {
        let currentBlackLevel = parseInt(e.target.dataset.black);
        if (currentBlackLevel < 3) {
            currentBlackLevel = (currentBlackLevel + 1).toString();
            e.target.dataset.black = currentBlackLevel;
            let newColor = '#101010e6';
            switch (currentBlackLevel) {
                case '1':
                    newColor = '#1010104d';
                    break;
                case '2':
                    newColor = '#10101099';
                    break;
            }
            e.target.style.backgroundColor = newColor;
        }
    }
}