const container = document.querySelector('.container');
const bezel = document.querySelector('#bezel');
const btnErase = document.querySelector('#erase-button');
const sliderResize = document.querySelector('resize-slider');
const btnsColor = document.querySelectorAll('.color-button');
const colorPicker = document.querySelector('#color-picker');

btnErase.addEventListener('click', eraseBoard);
btnsColor.forEach(addListenerColorChange);
colorPicker.addEventListener('change', function () {customColor = this.value;});


let resolution = [40,30];
let targetContainerSize = 600;
let penColor = "rgb(30, 30, 30)";
let customColor = "#118d25"

function addListenerColorChange(btn) { 
    btn.addEventListener('click', function() {changePenColor(btn);});
}

function buildGrid(resWide, resHigh) {
    let gridFrame = document.createElement('div');
    gridFrame.classList = 'grid-frame';
    gridFrame.style.fontSize = getSizeFactor(resWide);

    let row = {};
    let rowNum = 0;
    while (rowNum < resHigh) {
        row = buildRow(resWide);
        gridFrame.appendChild(row);
        ++rowNum;
    }
    container.appendChild(gridFrame);
}

function buildRow(res) {
    const row = document.createElement('div');
    row.classList = 'row';
    let cell = {};
    let cellNum = 0;
    while (cellNum < res) {
        cell = buildCell();
        row.appendChild(cell);
        ++cellNum;
    }
    return row;
}

function buildCell() {
    const cell = document.createElement('div');
    cell.classList = 'cell';
    cell.addEventListener('mouseover',fillCell);
    return cell;
}

function changePenColor (btn) {
    const current = document.querySelector('button.selected');
    if (current) {current.classList.remove('selected');};
    btn.classList.add('selected');
    
    
    penColor = btn.dataset.color;
    console.log(penColor);
}

function eraseBoard() {
    btnErase.classList.add('selected');
    bezel.addEventListener('animationend',function(){
        btnErase.classList.remove('selected');
        bezel.classList.remove('animated');
    });
    bezel.classList.add('animated');
    resizeGrid(resolution[0],resolution[1]);
}

function fillCell(e) {
    let col
    switch (penColor) {
        case "rainbow":
            col = randomColor();
            break;
        case "gradient":
            col = "rgb(30, 30, 30, 0.5)";
            break;
        case "custom":
            col = customColor;
            break;
        default:
            col = "rgb(30, 30, 30)";
    }

    e.target.style.backgroundColor = col;
}

function getSizeFactor (resWide) {
    const targetCellSize = targetContainerSize / resWide / 10;
    return targetCellSize + "em"    
}

function removeGrid() {
    const gridFrame = document.querySelector('.grid-frame');
    gridFrame.remove();
}

function resizeGrid (resWide, resHigh) {
    removeGrid();
    buildGrid(resWide, resHigh);
}

function randomColor() {
    let R = Math.floor(Math.random()*256);
    let G = Math.floor(Math.random()*256);
    let B = Math.floor(Math.random()*256);
    return `rgb(${R}, ${G}, ${B})`
}

function setCustomColor (e) {
    customColor = e.target.value;
}

//Initial layout on page load
buildGrid(resolution[0], resolution[1]);

//Function for testing layout
function testGridSize (minRes, interval, maxRes) {
    let res = minRes;
    let i = 1;
    while (res <= maxRes) {
        resizeGrid(res,res);
        console.log(i + ": " + res + " - " + container.offsetWidth);
        ++i
        res = res + interval;
    }
}

 