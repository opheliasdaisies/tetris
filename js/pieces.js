var pieces = [
  {
    color: 'white',
    positions: [
      [
        [true],
        [true],
        [true],
        [true]
      ],
      [
        [true, true, true, true]
      ]
    ]
  },
  {
    color: 'red',
    positions: [
      [
        [true, true],
        [true, true]
      ]
    ]
  },
  {
    color: 'yellow',
    positions: [
      [
        [true, true],
        [, true],
        [, true]
      ],
      [
        [,, true],
        [true, true, true]
      ],
      [
        [true],
        [true],
        [true, true]
      ],
      [
        [true, true, true],
        [true]
      ]
    ]
  },
  {
    color: 'purple',
    positions: [
      [
        [true, true],
        [true],
        [true]
      ],
      [
        [true, true, true],
        [,, true]
      ],
      [
        [, true],
        [, true],
        [true, true]
      ],
      [true],
      [true, true, true]
    ]
  },
  {
    color: 'blue',
    positions: [
      [
        [, true],
        [true, true, true]
      ],
      [
        [true],
        [true, true],
        [true]
      ],
      [
        [true, true, true],
        [, true]
      ],
      [
        [, true],
        [true, true],
        [, true]
      ]
    ]
  },
  {
    color: 'orange',
    positions: [
      [
        [true, true],
        [, true, true]
      ],
      [
        [, true],
        [true, true],
        [true]
      ]
    ]
  },
  {
    color: 'green',
    positions: [
      [
        [undefined, true, true],
        [true, true]
      ],
      [
        [true],
        [true, true],
        [undefined, true]
      ]
    ]
  }
];

var Piece = function(board){
  this.board = board;
  this.coordinates = [0, board.grid[0].length/2-1];
  this.shape = Piece.pieces[Math.floor(Math.random() * Piece.pieces.length)];
  // this.shape = Piece.pieces[1];
  this.orientation = this.shape.positions[0];
};

Piece.prototype.tick = function() {
  this.moveDown();
};

Piece.prototype.addOrRemovePiece = function(addOrRemove) {
  var boardRow = this.coordinates[0];
  var boardColumn = this.coordinates[1];
  for (var shapeRow = 0; shapeRow < this.orientation.length; shapeRow++) {
    for (var shapeColumn = 0; shapeColumn < this.orientation[shapeRow].length; shapeColumn++) {
      if (addOrRemove === 'add' && this.orientation[shapeRow][shapeColumn] === true) {
        this.board.grid[boardRow][boardColumn] = true;
      } else if (addOrRemove === 'freeze' && this.orientation[shapeRow][shapeColumn] === true) {
        this.board.grid[boardRow][boardColumn] = 'frozen';
        // this.board.activePiece = undefined;
      } else {
        this.board.grid[boardRow][boardColumn] = undefined;
      }
      boardColumn++;
    }
    boardRow ++;
    boardColumn = this.coordinates[1];
  }
}

Piece.prototype.moveDown = function() {
  var cannotMoveDown = this.checkForStop();
  if (cannotMoveDown === true){
    this.addOrRemovePiece('freeze');
    this.board.activePiece = undefined;
  } else {
    this.addOrRemovePiece('remove');
    this.coordinates[0]++;
    this.addOrRemovePiece('add');
  }
}

Piece.prototype.checkForStop = function() {
  var shapeRows = this.orientation.length;
  var nextBoardRow = this.coordinates[0] + shapeRows;
  var boardColumn = this.coordinates[1];
  var bottomShapeRow = this.orientation[shapeRows - 1];
  if (nextBoardRow >= this.board.grid.length) {
    return true;
  }
  // for (var shapeColumn = 0; shapeColumn < bottomShapeRow.length; shapeColumn++) {
  //   if (bottomShapeRow[shapeColumn] === true) {
  //     var nextTile
  //     if (this.board.grid[nextBoardRow][boardColumn] === true || this.board.grid)
  //   }
  // }
}

Piece.pieces = pieces;