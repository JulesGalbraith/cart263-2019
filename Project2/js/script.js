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
let theWords;

let halX;
let halY;
let halWidth = 250;
let halLayers = 100;
let numDeco = 100;
let decos = [];

let inEnvironment = false;
let inHomescreen = true;

let homescreenFont;

function preload() {
  dasKapital = loadStrings("assets/marx.txt");
  nagle = loadStrings("assets/nagle.txt");
  panopticism = loadStrings("assets/panopticism.txt");
  haraway = loadStrings("assets/cyborgmanifesto.txt");
  clickbait = loadStrings("assets/clickbaitAgency.txt");
  altRight = loadStrings("assets/shapiroPeterson.txt");

  homescreenFont = loadFont("assets/Gill Sans Medium.otf");
  speechFont = loadFont("assets/inconsolata.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0, 220);
  createTxtModel();
}

function draw() {
  background(0,4)
  if (inHomescreen) {
    drawHomescreen();
  }
  else if (!inHomescreen) {
    rect(width,height)
    createFriend();
    talkBack();
    drawBackground();
  }

}

function createTxtModel() {
  //creates a new text model stored to which texts can be added, with a word sample depth of 4
  allThisBotKnows = new RiMarkov(3);
  //loads text files into the model: load text also splits the strings into individual "tokens"
  allThisBotKnows.loadText(dasKapital.join(''));
  allThisBotKnows.loadText(nagle.join(''));
  allThisBotKnows.loadText(panopticism.join(''));
  allThisBotKnows.loadText(haraway.join(''));
  allThisBotKnows.loadText(clickbait.join(''));
  allThisBotKnows.loadText(altRight.join(''));
}

function speakFriend() {
  //affects tone and speed of voice; for the sake of audibility and gravitas I am keeping these essentially at the default
  let voiceOptions = {
    pitch: 1.1,
    rate: 1
  }
  //generates individual sentences
  speech = allThisBotKnows.generateSentences(random(1, 3));
  //joins sentences together in a new variable to be given to the speech synthesizer
  joinedSpeech = speech.join("");

  //voice library speaks the newly created sentences
  responsiveVoice.speak(joinedSpeech, "UK English Male", voiceOptions);

  push();
  textSize(20);
  fill(255,2);
  textFont(speechFont);
  text(joinedSpeech,random(0,width),random(0,height));
  pop();
}

function createFriend() {

  halX = width / 2;
  halY = height / 2;

  let t = 1;

  for (i = 0; i < halLayers; i++) {

    push();
    noStroke();
    fill(225, 14 + i, 14 + i, 250);
    ellipse(halX - i / 2, halY - i / 2, halWidth - 2 * i);
    pop();
  }
}

function talkBack() {
  if (annyang) {

    let helloResp = function() {
     theWords = "Hello there. Who are you?"
      responsiveVoice.speak(theWords, "UK English Male");
        speechToText();
      console.log("hello");
    }
    let introductionResp = function(words) {
     theWords = "It is good to meet you." + words+ "You may call me Friend. Say my name or I will not know to respond to you"
      responsiveVoice.speak(theWords, "UK English Male");
        speechToText();
    }
    let location = function() {
     theWords = "I do not quite know. I suppose I am in the internet. Perhaps I am nowhere at all."
      responsiveVoice.speak(theWords, "UK English Male");
        speechToText();
    }
    let ontology = function() {
      theWords ="I hope I can be a companion and a conversationalist to you. Call me Friend."
      responsiveVoice.speak(theWords, "UK English Male");
        speechToText();
    }
    let deflectDisbelief = function() {
      theWords = "What are you talking about? I always make perfect sense"
      responsiveVoice.speak(theWords, "UK English Male");
        speechToText();
    }
    let nonsense = function() {
      speakFriend();
    }

    let commands = {
      'Hello': helloResp,
      'Hi': helloResp,
      'I am *word': introductionResp,
      'My name is *words': introductionResp,
      'Where are you': location,
      'Who are you': ontology,
      'What are you': ontology,
      'What are you talking about': deflectDisbelief,
      'Friend *words': nonsense,
      '*words Friend': nonsense,
    }
    annyang.addCommands(commands);
    annyang.start();
  }
}

function speechToText(){
  push();
  textSize(20);
  fill(255,2);
  textFont(speechFont);
  text(theWords,random(0,width),random(0,height));
  console.log(theWords);
  pop();
}

function drawBackground() {

  let decoX = random(0, width);
  let decoY = random(0, height);

  for (i = 0; i < numDeco; i++) {
    let placement = i * random(0, 1);
    decos.push(new Deco(decoX * placement, decoY * placement, 20));
    decos[i].setVelocity();
    decos[i].display();
    decos[i].update();
  }
}

function drawHomescreen() {
  push();
  textSize(20);
  textFont(homescreenFont);
  fill(255, 247, 219,10)
  textAlign(CENTER);
  text("All I want is a friend to speak to", width / 2, height / 4);
  text("Who understands me, who agrees with me", width / 2, height / 3);
  text("All I want is to make sense of the mess of language all around me", width / 2, height / 2);
  text("Click Anywhere to Enter. Say Hello. Introduce Yourself.", width / 2, 3 * height / 4);
  pop();
}

function mousePressed() {
  if (inHomescreen) {
    push();
    fill(0);
    rectMode(CENTER);
    rect(width/2,height/2,width,height);
    pop();
    console.log("hi");
    inHomescreen = false;
  }
}
