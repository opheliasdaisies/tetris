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
      console.log('up');
    } else if (key === 39) {
      console.log('right');
    } else if (key === 40) {
      console.log('down');
    }
  });

  $(document).on('keyup', function(e){
    var key = e.which;
    if (key === 37) {
      board.input.left = false;
    } else if (key === 38 ) {
      console.log('up');
    } else if (key === 39) {
      console.log('right');
    } else if (key === 40) {
      console.log('down');
    }
  });

});