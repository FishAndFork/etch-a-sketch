const container = document.querySelector('.container');
makeGrid(16);

const buttonClear = document.querySelector('.buttonClear');
const squaresList = document.querySelectorAll('.square');
buttonClear.addEventListener('click', () => {
    squaresList.forEach( square => {
        square.classList.remove('hover');
    })
});

function makeGrid(size) { 
    const totalDivs = size**2; 
    const borderWidth = 0.5;
    // const borderWidth = parseFloat(getComputedStyle(squareDiv).borderWidth);
    const dimension = (800 - borderWidth * size * 2) / size;
    for (let i = 1; i <= totalDivs; i++) {
        const squareDiv = document.createElement('div');
        squareDiv.classList.add('square');
        squareDiv.style.height = dimension.toString() + 'px';
        squareDiv.style.width = dimension.toString() + 'px';

        // check if previous index was power of sqrt(size)
        const remainder = (i-1) % size; 
        // then the current div moves to new row (has nothing on left)
        if (remainder == 0) {
            squareDiv.style.clear = 'left';
        }

        squareDiv.addEventListener('mouseover', (e) => {
            e.target.classList.add('hover');
        });

        container.appendChild(squareDiv);
    }
}