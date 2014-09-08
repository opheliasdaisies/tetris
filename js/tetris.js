$(document).ready(function(){
  var board = new Board(10, 20);
  window.board = board;

  $('.start').on('click', function(){
    board.start();
  });

  $('.pause').on('click', function(){
    board.stop();
  });

  $(document).on('keydown', function(e){
    var key = e.which;
    if (key === 37) {
      board.input.left = true;
    } else if (key === 38 ) {
      board.input.up = true;
    } else if (key === 39) {
      board.input.right = true;
    } else if (key === 40) {
      board.input.down = true;
    }
  });

  $(document).on('keyup', function(e){
    var key = e.which;
    if (key === 37) {
      board.input.left = false;
    } else if (key === 38 ) {
      board.input.up = false;
    } else if (key === 39) {
      board.input.right = false;
    } else if (key === 40) {
      board.input.down = false;
    }
  });

});