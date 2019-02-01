let figs = [];
let mouseX;
let mouseY;

let figChosen = false;
let whichFig;

$(document).ready(function() {

  $(".fig").on("dblclick", figPlucked);




  // this function was adapted (with help from Sabine) from an example at https://api.jquery.com/mousemove/ .
  //it tracks the coordinates of the mouse in order to be able to bind a div element (a fig, in this case) to the cursor upon being clicked
  $(".container").mousemove(function(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;

    if (figChosen === true) {
      console.log("true");

       $(whichFig).css("left", mouseX-40);
       $(whichFig).css("top", mouseY-5);
       $(".container").attr("cursor",url("../assets/images/holdingHand.png"));

    }

  });

  function figPlucked() {
  figChosen = true;
  whichFig = this;

}

});
