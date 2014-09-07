var Board = function(width, height){
  this.grid = this.createBoardGrid(width, height);
  this.playing = false;
  this.intervalId;
  this.score = 0;
  this.gameTemplate = Handlebars.compile($("#game").html());
  this.scoreTemplate = Handlebars.compile($('#score').html());
  this.boardTemplate = Handlebars.compile($('#board').html());
  this.drawGame();
  this.activePiece;
};

Board.prototype.createBoardGrid = function(width, height){
  var board = [];
  for (var row = 0; row < height; row++) {
    var innerArray = new Array(width);
    board.push(innerArray);
  }
  return board;
}

Board.prototype.addPiece = function(){
  this.activePiece = new Piece(this);
  this.activePiece.addOrRemovePiece('add');
}

Board.prototype.start = function(){
  this.intervalId = window.setInterval(this.tick.bind(this), 500);
}

Board.prototype.stop = function(){
  window.clearInterval(this.intervalId);
}

Board.prototype.tick = function(){
  if (this.activePiece === undefined) {
    this.addPiece();
    this.updateBoard();
  } else {
    // console.log('tick', this);
    this.activePiece.tick();
    this.updateBoard();
  }
}

Board.prototype.drawGame = function(){
  $(document.body).append(this.gameTemplate(this));
  this.updateBoard();
};

Board.prototype.updateBoard = function() {

  // update score
  $('.score').html(this.scoreTemplate(this));

  // update board
  $('.board').html(this.boardTemplate(this));

};