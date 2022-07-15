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
  CreateCellValues("0", ["ggg", "ggg", "ggg", "ggg"], [0]),
  CreateCellValues("1", ["ggg", "gbg", "gbg", "gbg"], [0,1,2,3]),
  CreateCellValues("2", ["gbg", "gbg", "ggg", "ggg"], [0,1,2,3]),
  CreateCellValues("3", ["ggg", "gbg", "ggg", "gbg"], [0,1]),
  CreateCellValues("4", ["gbg", "gbg", "gbg", "gbg"], [0])
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

function CreateCellValues(Name, connectionsIn, rotationsIndexs) {
  var res = [];
  for (let index = 0; index < rotationsIndexs.length; index++) {
    const rotationsIndex = rotationsIndexs[index];

    var rotation = rotations[rotationsIndex];
    var tempConnections = [].concat(connectionsIn);

    for (let index = 0; index < rotationsIndex; index++) {
      tempConnections.unshift(tempConnections.pop());
    }
    res.push(new CellValue(Name, connections = tempConnections, rotation));
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
  sleepTime = document.getElementById("sleepTime").value;
  if (confirm("Sure you want to change Cell Count x*x & Cell Spacing?") != true) {
    return;
  }
  if (running) {
    done = true;
    await sleep((sleepTime*2)+5);
  }
  CellsXY = document.getElementById("cellCount").value;
  cellSpace = document.getElementById("cellSpace").value;
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
