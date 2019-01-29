"use strict"

$(document).ready(setup);

let secretsFound = 1;
let secrets = 6;
let bckImg;
let selfDestruct = 0;


function setup() {
  setInterval(update, 500);
  $("span").on("click", spanClicked);
  $(".secret").on("mouseover", mouseWave);
}

function update() {
  $("span").each(updateSpan);
  destruct();
}

function updateSpan() {

  let probability;
  probability = Math.random();

  if (probability < 0.1) {
    $(this).removeClass("redacted");
    $(this).addClass("revealed");
  }
}

function spanClicked() {

  $(this).addClass("redacted");
  $(this).removeClass("revealed");
}

function mouseWave() {
  $(this).addClass("revealedSecret");
  $(this).off("mouseover")
  $(this).removeClass("secret");

  if (secretsFound < secrets) {
    secretsFound += 1
    $(".count").text(secretsFound);
  }

  if (secretsFound === secrets) {
    $(".count").text("all the");
    selfDestruct = 1;
  }
}

function destruct() {
  if (selfDestruct === 1) {
    console.log("hi");
    $("body").removeClass("global");
    $("body").addClass("destructMe");
  }

}
