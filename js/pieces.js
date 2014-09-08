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
      [
        [true],
        [true, true, true]
      ]
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
  this.position = 0;
  this.numberOfOrientations = this.shape.positions.length;
  this.orientation = this.shape.positions[this.position];
  this.frozen = false;
  this.timeOfLastRotation = Date.now();
};

Piece.prototype.tick = function() {
  if (this.board.input.left) {
    this.moveLeft();
  }
  if (this.board.input.right) {
    this.moveRight();
  }
  if (this.board.input.up) {
    this.rotate();
  }
  this.moveDown();
  if (!this.frozen){
    this.removePiece();
    this.addPiece();
  }
};

Piece.prototype.addPiece = function() {
  var boardRow = this.coordinates[0];
  var boardColumn = this.coordinates[1];
  for (var shapeRow = 0; shapeRow < this.orientation.length; shapeRow++) {
    for (var shapeColumn = 0; shapeColumn < this.orientation[shapeRow].length; shapeColumn++) {
      if (this.orientation[shapeRow][shapeColumn] === true) {
        this.board.grid[boardRow][boardColumn] = true;
      }
      boardColumn++;
    }
    boardRow ++;
    boardColumn = this.coordinates[1];
  }
}

Piece.prototype.removePiece = function() {
  this.board.grid.forEach(function(row){
    row.forEach(function(tile, i){
      if (tile === true) {
        row[i] = undefined;
      }
    });
  });
}

Piece.prototype.freezePiece = function(){
  this.frozen = true;
  this.board.grid.forEach(function(row){
    row.forEach(function(tile, i){
      if (tile === true) {
        row[i] = 'frozen';
      }
    });
  });
}

Piece.prototype.moveDown = function() {
  var currentTime = Date.now();
  if (currentTime - this.board.timeOfLastMoveDown >= this.board.speed || this.board.input.down) {
    this.board.timeOfLastMoveDown = currentTime;
    if (this.checkForStop()) {
      this.freezePiece();
      this.board.activePiece = undefined;
    } else {
      this.coordinates[0]++;
    }
  }
}

Piece.prototype.checkForStop = function() {
  var shapeRowLength = this.orientation.length;
  var boardRowCoordinates = this.coordinates[0];
  var nextBoardRow = boardRowCoordinates + shapeRowLength;
  var boardColumn = this.coordinates[1];
  var bottomShapeRow = this.orientation[shapeRowLength - 1];
  if (nextBoardRow >= this.board.grid.length) {
    return true;
  }
  for (var shapeRow = 0; shapeRow < this.orientation.length; shapeRow++) {
    for (var shapeColumn = 0; shapeColumn < this.orientation[shapeRow].length; shapeColumn++) {
      if (this.orientation[shapeRow][shapeColumn]) {
        if (board.grid[boardRowCoordinates+1][boardColumn] === 'frozen') {
          return true;
        }
      }
      boardColumn++;
    }
    boardRowCoordinates++;
    boardColumn = this.coordinates[1];
  }
  return false;
}

Piece.prototype.canMoveLeft = function() {
  var boardRow = this.coordinates[0];
  var boardColumn = this.coordinates[1];
  var canMoveLeft = true;
  if (boardColumn <= 0) {
    canMoveLeft = false;
  } else {
    this.board.grid.forEach(function(row){
      row.forEach(function(tile, i){
        if (tile === true && row[i-1] === 'frozen') {
          canMoveLeft = false;
        }
      });
    });
  }
  return canMoveLeft;
}

Piece.prototype.moveLeft = function() {
  if (this.canMoveLeft()) {
    this.coordinates[1]--;
  }
}

Piece.prototype.canMoveRight = function() {
  var boardRow = this.coordinates[0];
  var boardColumn = this.coordinates[1];
  var canMoveRight = true;
  var pieceWidth = this.findMaxWidth();
  if (boardColumn + pieceWidth >= this.board.grid[0].length) {
    canMoveRight = false;
  } else {
    this.board.grid.forEach(function(row){
      row.forEach(function(tile, i) {
        if (tile === true && row[i+1] === 'frozen') {
          canMoveRight = false;
        }
      });
    });
  }
  return canMoveRight;
}

Piece.prototype.moveRight = function() {
  if (this.canMoveRight()) {
    this.coordinates[1]++;
  }
}

Piece.prototype.findMaxWidth = function() {
  var maxWidth = 0;
  this.orientation.forEach(function(row){
    if (row.length > maxWidth) {
      maxWidth = row.length;
    }
  });
  return maxWidth;
}

Piece.prototype.rotate = function() {
  var currentTime = Date.now();
  if (currentTime - this.timeOfLastRotation > 100) {
    this.timeOfLastRotation = currentTime;
    if (this.position < this.numberOfOrientations-1 ) {
      console.log('rotate');
      this.position = this.position + 1
    } else {
      console.log('reset postition');
      this.position = 0;
    }
    this.orientation = this.shape.positions[this.position];
  }
}

Piece.pieces = pieces;