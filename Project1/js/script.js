// Fig Tree: A Game of Choice and Passing Time
//Music : Sensual Seduction (Snoop Dogg Instrumental)


let figs = [$(".fig")];
let totalFigs = 10;
let mouseX;
let mouseY;

let shakeInterval = 3000
let figChosen = false;
let whichFig;

let playing = true;

$(document).ready(function() {

//hides buttons that will appear when a fig is selected
  $(".figSelected").hide();
  $(".choice").hide();
//hides text which will appearing in the various stages of rot
  $(".reactionToRottenFig").hide();
  $(".reactionToRottenTree").hide();
  $(".allFigsDead").hide();
  $(".reload").hide();

//there are 10 div elements, images of figs, each of which can be selected and dragged to reposition
  $(".healthy").draggable();
  //when one of the figs is selected, its id is tracked and the buttons, hidden above, appear, giving the option to taste or reject the fig
  $(".healthy").on("mousedown", figPlucked);

//when the button choosing to taste the fig, the image representing the selected fig is changed to an image of a less fresh fig
  $("#taste").on("click",rotFig);
  $("#reject").on("click",rotOtherFigs);
  //the individual figs shake when the cursor passes over them
  $(".healthy").on("mouseover", figShake);

  setInterval(noMoreFigs,100);
  $(".audioToggle").on("click",stopMusic);
});

//called when a fig is clicked on
function figPlucked() {
  //tracks which fig has been selected
  figChosen = true;
  whichFig = $(this);
  //retrieves and displays id of selected fig
  //shows script offering choice to taste the selected fig
  $(".figSelected").show();
  $(".reactionToRottenFig").hide();
  $(".reactionToRottenTree").hide();
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
  $(".reactionToRottenTree").show();
  //hides text and  buttons
    $(".figSelected").hide();
    $(".choice").hide();

    $(whichFig).addClass("healthy");
    $(whichFig).removeClass("rotten");

    $(".rotten").off();
}

//runs when all figs have died
 function noMoreFigs(){
  //checks how many
   if ($(".healthy").length === 0){
     //shows end text, hides the rest
     $(".allFigsDead").show();
     $(".reactionToRottenTree").hide();
     $(".reactionToRottenFig").hide();

//3 seconds after all the figs die, an animation will run fading out all elements but the background
//and the final text element, which will continue to blink. i could have stopped it in endAnimation(), but i enjoyed the
//slightly despairing, neverending blinking effect it gave
     setTimeout(endAnimation,2000);
   }
 }

//the final fadeout animation called in the above function
 function endAnimation(){
   $(".fig").fadeOut(4000);
   $(".static").fadeOut(8000);
   $(".text").fadeOut(4000);
   $(".reload").show();

   $(".reload").click(function(){
     location.reload(true);
   })
}

function stopMusic(){
  if (playing === true){
  $(".backgroundAudio").trigger("pause");
  playing = false}
  else if (playing === false) {
    $(".backgroundAudio").trigger("play");
    playing = true
  }
}
