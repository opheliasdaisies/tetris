var Board = function(width, height){
  this.grid = this.createBoardGrid(width, height);
  this.playing = false;
  this.intervalId;
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
  var cell = $('.row').first().children()[4]
  $(cell).addClass('active');
}

Board.prototype.start = function(){
  this.addPiece();
  this.intervalId = window.setInterval(this.tick.bind(this), 500);
}

Board.prototype.stop = function(){
  window.clearInterval(this.intervalId);
}

Board.prototype.tick = function(){
  console.log('tick', this);

}