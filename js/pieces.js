var pieces = [
  {
    color: white,
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
    color: red,
    positions: [
      [
        [true, true],
        [true, true]
      ]
    ]
  },
  {
    color: yellow,
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
    color: purple,
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
    color: blue,
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
    color: orange,
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
    color: green,
    positions: [
      [
        [, true, true],
        [true, true]
      ],
      [
        [true],
        [true, true],
        [, true]
      ]
    ]
  }
];

var Piece = function(board){
};

Piece.prototype.tick = function() {
  //move and shit
};

Piece.pieces = pieces;