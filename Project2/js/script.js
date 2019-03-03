// variables holding various text files to be loaded into a model
let dasKapital;
let panopticism;
let reparations;
let haraway;
let clickbait;
let altRight;

//variable to hold the combined text files
let allThisBotKnows;

let speech;
let joinedSpeech;

let halX;
let halY;
let halWidth = 250;

function preload() {
  dasKapital = loadStrings("assets/marx.txt");
  reparations = loadStrings("assets/caseforreparations.txt");
  panopticism = loadStrings("assets/panopticism.txt");
  haraway = loadStrings("assets/cyborgmanifesto.txt");
  clickbait = loadStrings("assets/clickbaitAgency.txt");
  altRight = loadStrings("assets/shapiroPeterson.txt");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0, 200);
  createTxtModel();
}

function draw() {
  createFriend();
  talkBack();

}

function createTxtModel() {
  //creates a new text model stored to which texts can be added, with a word sample depth of 4
  allThisBotKnows = new RiMarkov(4);
  //loads text files into the model: load text also splits the strings into individual "tokens"
   allThisBotKnows.loadText(dasKapital.join(''));
   allThisBotKnows.loadText(reparations.join(''));
   allThisBotKnows.loadText(panopticism.join(''));
   allThisBotKnows.loadText(haraway.join(''));
   allThisBotKnows.loadText(clickbait.join(''));
  allThisBotKnows.loadText(altRight.join(''));
}

function speakFriend() {
  let voiceOptions = {
    pitch: 1,
    rate: 1
  }
  speech = allThisBotKnows.generateSentences(random(1,3));
  joinedSpeech = speech.join("");

  console.log(joinedSpeech);
   responsiveVoice.speak(joinedSpeech, "UK English Male", voiceOptions);
}

function createFriend() {

  halX = width/2;
  halY = height/2;

  push();
  fill(255, 0, 0, 250);
  ellipse(halX, halY, halWidth);
  pop();

}

function talkBack() {
  if (annyang) {

    let helloResp = function (){
      responsiveVoice.speak("Hello there. Who are you?", "UK English Male");
      console.log("hello");
    }
    let introductionResp = function(){
      responsiveVoice.speak("It is good to meet you. You may call me Friend. Say my name or I will not know to respond to you", "UK English Male");
    }
    let nonsense =  function(){
      speakFriend();
    }
    let commands = {
      'Hello': helloResp,
      'Hi': helloResp,
      'I am *word': introductionResp,
      'My name is *words': introductionResp,
      'Friend *words':nonsense,
      '*words Friend': nonsense,
    }
    annyang.addCommands(commands);
    annyang.start();
  }
}

function mousePressed(){
  let withinCircle = dist(mouseX, mouseY,halX,halY);

  if (withinCircle < halWidth/2) {
    speakFriend();
}
}
