let figs = [$(".fig")];
let totalFigs =10;
let mouseX;
let mouseY;

let shakeInterval= 3000
let figChosen = false;
let whichFig;

$(document).ready(function() {

  $(".figSelected").hide();
  $(".choice").hide();

  $(".fig").draggable();
  $(".fig").on("mousedown",figPlucked);

  $("#taste").on("click",)
  $(".fig").on("mouseover",figShake);

  $("#taste").on("click",rotFig)
  
});

function figPlucked(){
  figChosen = true;
  whichFig = $(this);
  console.log(this);
  $(".figSelected").show();
  $(".choice").show();

}

function figShake(){
      setInterval(shakeInterval,$(this).effect("shake",10,3));
      console.log("shake");
  }

function rotFig(){
  whichFig.attr("src","../assets/images/fig2.png");
  console.log("ew");
}
