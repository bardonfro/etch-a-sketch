const container = document.querySelector('.container');
const bezel = document.querySelector('#bezel');
const btnErase = document.querySelector('#erase-button');
const sliderResize = document.querySelector('#resize-slider');
const btnsColor = document.querySelectorAll('.color-button');
const colorPicker = document.querySelector('#color-picker');
const outpResolution = document.querySelector('#resolution-output')

btnErase.addEventListener('click', eraseBoard);
sliderResize.addEventListener('change', sliderSet);
sliderResize.addEventListener('input', sliderMove);
btnsColor.forEach(addListenerColorChange);
colorPicker.addEventListener('change', function () {customColor = this.value;});


let resolution = [40,30];
let aspectRatio = 4/3;
let targetContainerSize = 600;
let penColor = "black";
let customColor = "#00C2B5"

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
}

function eraseBoard() {
    btnErase.classList.add('selected');
    bezel.classList.add('animated');
    resizeGrid(resolution[0],resolution[1]);
}

bezel.addEventListener('animationend',function(){
    btnErase.classList.remove('selected');
    bezel.classList.remove('animated');
});

function fillCell(e) {
    let col
    switch (penColor) {
        case "none":
            return;
        case "rainbow":
            col = randomColor();
            break;
        case "gradient":
            col = returnGradient(e.target);
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

function initializePage () {
    buildGrid(resolution[0], resolution[1]);
    outpResolution.textContent = resolution[0] + "x" + resolution[1];
    sliderResize.value = resolution[0];
    colorPicker.value = customColor;
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

//We use dataset and backgroundColor instead of style.opacity to not change the border
function returnGradient(cell) {
    let opacity = Number(cell.dataset.opacity);
    if (opacity >= 1) {
        return;
    }
    if (!opacity) {
        opacity = 0.1;
    } else {
        opacity = (Math.round((opacity*10) + 1) / 10);
    }
    cell.dataset.opacity = opacity;
    cell.style.backgroundColor = `rgb(30, 30, 30, ${opacity})`;
}

function setCustomColor (e) {
    customColor = e.target.value;
}

function sliderMove(e) {
    val = e.target.value;
    resolution = [val, Math.floor(val / aspectRatio)];
    outpResolution.textContent = resolution[0] + "x" + resolution[1];
}

function sliderSet(e) {
    resizeGrid(resolution[0], resolution[1]);
}

//Initial layout on page load
initializePage();