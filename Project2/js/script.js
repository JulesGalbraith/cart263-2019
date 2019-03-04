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
let halLayers = 100;
let numDeco = 100;
let decos =[];

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
  background(0, 220);
  createTxtModel();
}

function draw() {
  background(10,2);
  createFriend();
  talkBack();
  drawBackground();

}

function createTxtModel() {
  //creates a new text model stored to which texts can be added, with a word sample depth of 4
  allThisBotKnows = new RiMarkov(3);
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
    pitch: 1.3,
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

for (i =0; i<halLayers;i++){
  push();
  noStroke();
  fill(225, 14+i, 14+i, 250);
  ellipse(halX-i/2, halY-i/2, halWidth-2*i);
  pop();
}

}

function talkBack() {
  if (annyang) {

    let helloResp = function (){
      responsiveVoice.speak("Hello there. Who are you?", "UK English Male");
      console.log("hello");
    }
    let introductionResp = function(){
      responsiveVoice.speak("It is good to meet you.You may call me Friend. Say my name or I will not know to respond to you", "UK English Male");
    }
    let location = function () {
        responsiveVoice.speak("I do not quite know. I suppose I am in the internet. Perhaps I am nowhere at all.", "UK English Male");
    }
    let ontology = function(){
    responsiveVoice.speak("I hope I can be a companion and a conversationalist to you", "UK English Male");
}
    let nonsense =  function(){
      speakFriend();
    }

    let commands = {
      'Hello': helloResp,
      'Hi': helloResp,
      'I am *word': introductionResp,
      'My name is *words': introductionResp,
      'Where are you':location,
      'Who are you': ontology,
      'Friend *words':nonsense,
      '*words Friend': nonsense,
    }
    annyang.addCommands(commands);
    annyang.start();
  }
}

function drawBackground(){

let decoX = random(0, width);
let decoY = random(0,height);

  for(i =0; i< numDeco;i++){
    let placement = i*random(0,1);
decos.push(new Deco(decoX*placement, decoY*placement,20));
decos[i].setVelocity();
decos[i].display();
decos[i].update();
  }
}

function mousePressed(){

}
