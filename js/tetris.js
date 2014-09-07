$(document).ready(function(){
  var board = new Board(10, 20);
  window.board = board;

  $('.start').on('click', function(){
    board.start();
  });

  $('.pause').on('click', function(){
    board.stop();
  });

});