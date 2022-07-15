//vars
var done = false;
var running = false;
//var seed = 10;
var CellsXY = 25;
var sleepTime = 0; 
var cellSpace = 0;
var rotations = [-1,90,180,270];
var CellValues = [];
CellValues = CellValues.concat(
  [new CellValue(Name = "0", connections = ["ggg", "ggg", "ggg", "ggg"], rotation = rotations[0])],
  CreatRotations(new CellValue(Name = "1", connections = ["ggg", "gbg", "gbg", "gbg"], rotation = rotations[0]), [0,1,2,3]),
  CreatRotations(new CellValue(Name = "2", connections = ["gbg", "gbg", "ggg", "ggg"], rotation = rotations[0]), [0,1,2,3]),
  CreatRotations(new CellValue(Name = "3", connections = ["ggg", "gbg", "ggg", "gbg"], rotation = rotations[0]), [0,1]),
  [new CellValue(Name = "4", connections = ["gbg", "gbg", "gbg", "gbg"], rotation = rotations[0])]
);
var grid = new Grid(CellsXY, CellValues);

//HELPERs
function pickRandomFromList(List) {
  var index = Math.floor(Math.random() * List.length);
  return List[index];
}

function sleep(ms) {
  return new Promise(
    resolve => setTimeout(resolve, ms)
  );
}

function logFormatGrid(toLogGrid = Grid){
  var res = "";
  for (let index = 0; index < toLogGrid.array.length; index++) {
    if ((index % toLogGrid.width) == 0 && index != 0) {
      res += "\n";
    }
    const element = toLogGrid.array[index];
    if (element.selected != null) {
      res += "{\""+element.selected.Name+"\"("+element.selected.rotation+")} ";
    }
    else {
      res += "["+element.options.length+"] ";
    }
  }
  return res;
}

function CreatRotations(cellValue, rotationsIndexs = [0,1]) {
  var res = [];
  for (let index = 0; index < rotationsIndexs.length; index++) {
    var newCellValue = cellValue.clone();
    const rotationsIndex = rotationsIndexs[index];
    newCellValue.rotation = rotations[rotationsIndex];
    for (let index = 0; index < rotationsIndex; index++) {
      newCellValue.connections.unshift(newCellValue.connections.pop());
    }
    res.push(newCellValue);
  }
  return res;
}


//USER
function UserStep() {
  if (done) {
    console.log("DONE");
    return;
  }
  if (running) {
    console.log("wait");
    return;
  }
  running = true;
  step();
  running = false;
}

async function UserRun() {
  if (done) {
    console.log("DONE");
    return;
  }
  if (running) {
    console.log("wait");
    return;
  }
  running = true;
  while (!done) {
    step();
    await sleep(sleepTime);
  }
  running = false;
}

async function UserReset() {
  if (running) {
    done = true;
    await sleep((sleepTime*2)+5);
  }
  grid = new Grid(CellsXY, CellValues);
  done = false;
  DrawGridWithOnly('-1');
}

async function UserUpdateSettings() {
  if (false && confirm("Sure you want to change settings?") != true) {
    return;
  }
  if (running) {
    done = true;
    await sleep((sleepTime*2)+5);
  }
  CellsXY = document.getElementById("cellCount").value;
  cellSpace = document.getElementById("cellSpace").value;
  sleepTime = document.getElementById("sleepTime").value;
  UpdateDrawCells();
  grid = new Grid(CellsXY, CellValues);
  done = false;
  DrawGridWithOnly('-1');
}

function UserToImg() {
  var img = new Image();
  img.src = canvas.toDataURL();
  document.body.appendChild(img);
}

//MAIN
var arrayUpdateSurrounding = [];
function step() {
  var nextCells = grid.LowestEntropyCells();
  if (nextCells.length == 0) {
    done = true;
    return;
  }
  var next = pickRandomFromList(nextCells);
  next.setOptions([pickRandomFromList(next.options)]);
  drawCell(next);
  arrayUpdateSurrounding.push(next);
  while (arrayUpdateSurrounding.length > 0) {
    grid.UpdateSurroundingCells(arrayUpdateSurrounding.pop());
  }
  //console.log(logFormatGrid(grid));
  return true;
}
