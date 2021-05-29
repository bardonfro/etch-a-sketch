const container = document.querySelector('.container');

let cellCount = 10;
let cellBorderWidth = 1; //Values below 1 crash the layout
let penColor = "rgb(43, 38, 25)";

function buildGrid(size) {
    let gridFrame = document.createElement('div');
    gridFrame.classList = 'grid-frame';

    let row = {};
    let rowNum = 0;
    while (rowNum < size) {
        row = buildRow(size);
        gridFrame.appendChild(row);
        ++rowNum;
    }
    container.appendChild(gridFrame);
}

function buildRow(length) {
    const row = document.createElement('div');
    row.classList = 'row';
    //set row height
    let portion = 100 / length;
    //row.style.height = `${portion}%`;
    let cell = {};
    let cellNum = 0;
    while (cellNum < length) {
        cell = buildCell(length);
        row.appendChild(cell);
        ++cellNum;
    }
    return row;
}

function buildCell(resolution) {
    const cell = document.createElement('div');
    cell.classList = 'cell';
    const borderAllowance = cellBorderWidth + cellBorderWidth;
    //set cell dimensions
    let portion = 100 / resolution; 
    const width = `calc(${portion}% - ${borderAllowance}px)`;
    //cell.style.width = width;
    //cell.style.borderWidth = `${cellBorderWidth}px`; //Override to fix layout problems if CSS border changes
    //cell.style.height = `calc(100% - ${borderAllowance}px)`;
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

function resizeGrid (size) {
    removeGrid();
    buildGrid(size);
}

buildGrid(cellCount);

 