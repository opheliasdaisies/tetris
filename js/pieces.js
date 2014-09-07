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
  // this.shape = Math.floor(Math.random) * Piece.pieces.length;
  this.shape = Piece.pieces[1];
  this.orientation = this.shape.positions[0];
};

Piece.prototype.tick = function() {
  //move and shit
};

Piece.prototype.addPieceToBoard = function() {
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

Piece.pieces = pieces;