let figs = [];
let mouseX;
let mouseY;

let figChosen = false;
let whichFig;

$(document).ready(function() {

  $(".figSelected").hide();
  $(".choice").hide();

  $(".fig").draggable();
  $(".fig").on("mousedown",figPlucked);

  $("#taste").on("click",)


function figPlucked(){
  figChosen = true;
  $(".figSelected").show();
  $(".choice").show();
  console.log("hihi");
}

function figRot(){
  
}
  });
