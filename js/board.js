var Board = function(width, height){
  this.grid = this.createBoardGrid(width, height);
  this.playing = false;
  this.intervalId;
  this.score = 0;
  this.level = 0;
  this.rowsRemoved = 0;
  this.gameTemplate = Handlebars.compile($("#game").html());
  this.scoreTemplate = Handlebars.compile($('#score').html());
  this.levelTemplate = Handlebars.compile($('#level').html());
  this.boardTemplate = Handlebars.compile($('#board').html());
  this.drawGame();
  this.activePiece;
  this.timeOfLastMoveDown;
  this.speed = 500;
  this.input = {
    right: false,
    left: false,
    down: false,
    up: false
  }
};

Board.prototype.createBoardGrid = function(width, height){
  var board = [];
  for (var row = 0; row < height; row++) {
    var innerArray = [];
    for (var col = 0; col < width; col ++) {
      innerArray.push(false);
    }
    board.push(innerArray);
  }
  return board;
}

Board.prototype.addPiece = function(){
  this.activePiece = new Piece(this);
  this.activePiece.addPiece();
}

Board.prototype.start = function(){
  this.intervalId = window.setInterval(this.tick.bind(this), 50);
  this.timeOfLastMoveDown = Date.now();
}

Board.prototype.stop = function(){
  window.clearInterval(this.intervalId);
}

Board.prototype.tick = function(){
  if (!this.activePiece) {
    this.addPiece();
  } else {
    // console.log('tick', this);
    this.activePiece.tick();
  }
  this.checkGridForCompleteRows();
  this.updateBoard();
}

Board.prototype.checkGridForCompleteRows = function(){
  var rowCount = 0;
  this.grid.forEach(function(row, rowIndex){
    var rowComplete = row.every(function(tile){
      return tile === "frozen";
    });
    if (rowComplete) {
      rowCount ++;
      this.removeRow(rowIndex);
    }
  }.bind(this));
  this.rowRemovalScoring(rowCount);
}

Board.prototype.rowRemovalScoring = function(rowCount){
  var levelCount = this.level + 1;
  if (rowCount >= 4) {
    this.score += (1200 * levelCount);
  } else if (rowCount === 3) {
    this.score += (300 * levelCount);
  } else if (rowCount === 2) {
    this.score += (100 * levelCount);
  } else if (rowCount === 1) {
    this.score += (40 * levelCount);
  }
}

Board.prototype.removeRow = function(rowIndex){
  this.grid[rowIndex].forEach(function(tile, i){
    this.grid[rowIndex][i] = false;
  }.bind(this));
  var removed = this.grid.splice(rowIndex, 1);
  this.grid.unshift(removed[0]);
  this.rowsRemoved ++;
  this.increaseLevel();
}

Board.prototype.increaseLevel = function(){
  if (this.rowsRemoved >= 10){
    this.level ++;
    this.speed -= 20;
    this.rowsRemoved = 0;
  }
}

Board.prototype.drawGame = function(){
  $(document.body).append(this.gameTemplate(this));
  this.updateBoard();
};

Board.prototype.updateBoard = function() {

  // update score
  $('.score').html(this.scoreTemplate(this));

  // update level
  $('.level').html(this.levelTemplate(this));

  // update board
  $('.board').html(this.boardTemplate(this));

};