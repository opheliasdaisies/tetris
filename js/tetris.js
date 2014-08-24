$(document).ready(function(){
  var height = 20;
  var width = 10;
  var board = new Board(width, height);
  window.board = board;

  var theData = {boardGrid: board.grid};

  var templateScript = $("#game").html();
  console.log(templateScript);
  var template = Handlebars.compile(templateScript);
  console.log(template(theData));
  $(document.body).append(template(theData));

  $('.start').on('click', function(){
    board.start();
  });

});