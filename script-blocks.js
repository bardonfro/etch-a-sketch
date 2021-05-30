const container = document.querySelector('.container');

let resolution = [40,30];
let targetContainerSize = 600;
let penColor = "rgb(43, 38, 25)";

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

function fillCell(e) {
    e.target.style.backgroundColor = penColor;
}

function removeGrid() {
    const gridFrame = document.querySelector('.grid-frame');
    gridFrame.remove();
}

function resizeGrid (resWide, resHigh) {
    removeGrid();
    buildGrid(resWide, resHigh);
}

function getSizeFactor (resWide) {
    const targetCellSize = targetContainerSize / resWide / 10;
    return targetCellSize + "em"    
}

buildGrid(resolution[0], resolution[1]);

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

 