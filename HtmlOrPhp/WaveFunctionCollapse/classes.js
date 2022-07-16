class CellValue {
  constructor(Name, connections, rotation) {//"name", ["up", "right", "down", "left"], -1, 90, 180, 270
    this.Name = Name;
    this.connections = connections;
    this.rotation = rotation;
  }
  // Methods
  Validate(filter, direction) {
    var toMatch = this.connections[direction];
    toMatch = [...toMatch].reverse().join("");
    return filter.includes(toMatch);
  }
}

class Cell {
  constructor(xCord, yCord, options) {
    this.xCord = xCord;
    this.yCord = yCord;
    this.selected = null;
    this.setOptions(options);
  }
  // Methods
  setOptions(value) {
    this.options = [].concat(value);
    if (this.options.length == 1) {
      this.selected = this.options[0];
      drawCell(this);
    }
  }
  GetAllValidForDir(direction) {
    var resArray = [];
    this.options.forEach(option => {
      if (!resArray.includes(option.connections[direction])) {
        resArray.push(option.connections[direction])
      }
    });
    return resArray;
  }
  UpdateCell(filter, direction){
    var preOptionCount = this.options.length;
    var temp = this.options.filter(option => option.Validate(filter, direction));
    this.setOptions(temp);
    if (preOptionCount != this.options.length) {
      arrayUpdateSurrounding.push(this);
    }
  }
}

class Grid{
  constructor(width, array, height = width) {
    this.width = width;
    this.height = height;
    this.array = [];
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        this.array[x + (y * this.width)] = new Cell(x, y, array);
      }
    }
  }
  // Methods
  Cell(x, y, Cell = undefined) {
    if (x >= CellsXY || y >= CellsXY || x < 0 || y < 0) {
      console.log("Atempt to access cell out of bounds x"+x+" y"+y)
    }
    var e = x + (y * this.width);
    if (Cell !== undefined) { this.array[e] = Cell; }
    return this.array[e];
  }
  LowestEntropyCells(){
    var LowestEntropy = Infinity;
    var resCells = [];
    this.array.forEach(cell => {
      var count = cell.options.length;
      if (count < LowestEntropy && !cell.selected) {
        LowestEntropy = count;
        resCells = [cell];
      }
      else if (count == LowestEntropy) {
        resCells.push(cell);
      }
    });
    return resCells;
  }
  UpdateSurroundingCells(thisCell){
    var x = thisCell.xCord;
    var y = thisCell.yCord;
    
    if ( y >= 1 ) {
      this.Cell(x, y-1).UpdateCell(this.Cell(x, y).GetAllValidForDir(0), 2)
    }
    if (x < CellsXY-1 ) {
      this.Cell(x+1, y).UpdateCell(this.Cell(x, y).GetAllValidForDir(1), 3)
    }
    if ( y < CellsXY-1 ) {
      this.Cell(x, y+1).UpdateCell(this.Cell(x, y).GetAllValidForDir(2), 0)
    }
    if ( x >= 1 ) {
      this.Cell(x-1, y).UpdateCell(this.Cell(x, y).GetAllValidForDir(3), 1)
    }
  }
}