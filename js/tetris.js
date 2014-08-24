$(document).ready(function(){
  var board = createBoardGrid(10, 20);


  var theData = {boardGrid: board};

  var templateScript = $("#game").html();
  console.log(templateScript);
  var template = Handlebars.compile(templateScript);
  console.log(template(theData));
  $(document.body).append(template(theData));

});