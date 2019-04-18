'use strict'

let input, userText;
let output = [];
let botText;


$(document).ready(function(){
  addUserText();
loadText();
console.log('yo');
});

function loadText() {
  $.get("assets/theogon.txt", function(data) {
    output = data.split("\n");
    console.log(output[0]);

    addBotText();
  });
}

 function addBotText(){
   botText = output[Math.floor(Math.random() * output.length)];
   let botSentence = $("<p id='botInput'>" +"They: "+ botText +"</p>");
   $('#chatLog').append(botSentence);
 }

function addUserText(){
$('#send').on("click", function(){
input = $("#message").val();
userText = $("<p id='userInput'>"+ "I: "+ input +"</p>");
$('#chatLog').append(userText);

setTimeout(loadText, 1000);
$('#message').val("");
});

}


// function closeChat(){
//
// }
