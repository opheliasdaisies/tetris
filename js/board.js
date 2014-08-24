var width = 10;
var height = 20;

function createBoardGrid(width, height){
  var board = [];
  for (var row = 0; row < height; row++) {
    var innerArray = new Array(width);
    board.push(innerArray);
  }
  return board;
}