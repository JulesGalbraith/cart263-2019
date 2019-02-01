let figs = [$(".fig")];
let totalFigs = 10;
let mouseX;
let mouseY;

let shakeInterval = 3000
let figChosen = false;
let whichFig;

$(document).ready(function() {

//hides buttons that will appear when a fig is selected
  $(".figSelected").hide();
  $(".choice").hide();
//hides text which will appear when an individual fig rots
  $(".reactionToRottenFig").hide();
//hides text appearing when all the figs rot

//there are 10 div elements, images of figs, each of which can be selected and dragged to reposition
  $(".healthy").draggable();
  //when one of the figs is selected, its id is tracked and the buttons, hidden above, appear, giving the option to taste or reject the fig
  $(".healthy").on("mousedown", figPlucked);

//when the button choosing to taste the fig, the image representing the selected fig is changed to an image of a less fresh fig
  $("#taste").on("click",rotFig);
  $("#reject").on("click",rotOtherFigs);
  //the individual figs shake when the cursor passes over them
  $(".healthy").on("mouseover", figShake);

});

//called when a fig is clicked on
function figPlucked() {
  //tracks which fig has been selected
  figChosen = true;
  whichFig = $(this);
  //retrieves and displays id of selected fig
  //shows script offering choice to taste the selected fig
  $(".figSelected").show();
  //shows two buttons with the choice to taste or reject the fig
  $(".choice").show();

}

//shakes individual figs upon mouseover
function figShake() {
  setInterval(shakeInterval, $(this).effect("shake", 10, 3));
}


//called when button to taste fig is selected
function rotFig() {
  //replaces current background image for div representing fig, replaces it with a more rotten fig
  $(whichFig).removeClass("healthy");
  $(whichFig).addClass("rotten");
  //turns off all functions bound to the fig- kills it, effectively
  $(whichFig).off();

//hides text and  buttons
  $(".figSelected").hide();
  $(".choice").hide();

//shows new text, which expresses disappointment at the newly rotten fig
 $(".reactionToRottenFig").show();
 $(whichFig).draggable("disable");
}

function rotOtherFigs(){
  $(".fig").removeClass("healthy");
  $(".fig").addClass("rotten");

  //hides text and  buttons
    $(".figSelected").hide();
    $(".choice").hide();

    $(whichFig).addClass("healthy");
    $(whichFig).removeClass("rotten");

    $(".rotten").off();
}

 function noMoreFigs(){
   if ($(".healthy").length === 0){

   }
 }
