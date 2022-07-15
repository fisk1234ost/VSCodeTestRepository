var canvas = document.getElementById('myCanvas');
var canvas2d = canvas.getContext('2d');

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;
var ImgSize = (canvasWidth - ((CellsXY - 1) * cellSpace))/CellsXY;
var imgW = ImgSize;//(canvasWidth  - ((CellsX - 1) * cellSpace))/CellsX;
var imgH = ImgSize;//(canvasHeight - ((CellsY - 1) * cellSpace))/CellsY;

function drawCellAt(imgName, xCord, yCord, rotationDeg) {
  if (xCord > CellsXY || yCord > CellsXY || xCord < 0 || yCord < 0 ) {
    console.log("atempt to draw "+imgName+" out of bounds x"+xCord+" y"+yCord)
    return;
  }
  var Xpos = ((ImgSize * xCord) + (cellSpace * xCord))
  var Ypos = ((ImgSize * yCord) + (cellSpace * yCord))
  if (rotationDeg == -1) {
    drawImageAt(imgName, Xpos, Ypos, imgW, imgH);
  }
  else{
    drawImageAtRotation(imgName, Xpos, Ypos, imgW, imgH, rotationDeg)
  }
}

function drawCell(cell){
  if (cell.selected == null) {
    return;
  }
  drawCellAt(cell.selected.Name, cell.xCord, cell.yCord, cell.selected.rotation);
}

function DrawGridWithOnly(imgName) {
  canvas2d.clearRect(0, 0, canvas.width, canvas.height);
  for (let y = 0; y < CellsXY; y++) {
    for (let x = 0; x < CellsXY; x++) {
      drawCellAt(imgName, x, y, -1);
    }
  }
}

function UpdateDrawCells() {
  ImgSize = (canvasWidth - ((CellsXY - 1) * cellSpace))/CellsXY;
  imgW = ImgSize;//(canvasWidth  - ((CellsX - 1) * cellSpace))/CellsX;
  imgH = ImgSize;//(canvasHeight - ((CellsY - 1) * cellSpace))/CellsY;
}

document.onload = DrawGridWithOnly('-1');