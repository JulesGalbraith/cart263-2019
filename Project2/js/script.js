// variables holding various text files to be loaded into a model
let dasKapital;
let panopticism;
let reparations;
let haraway;
let clickbait;
let altRight;

//variable to hold the combined text files
let allThisBotKnows;

// variables holding words to be spoken by annyang
let speech;
let joinedSpeech;
let theWords;

//various coordinates belonging to the visuals - i'm nicknaming the red ball hal
let halX;
let halY;
let halWidth = 300;
let halLayers = 100;
//the small white balls adding texture and movement to the environment
let numDeco = 100;
let decos = [];

//tracks whether or not the homescreen is active
let inHomescreen = true;

//fonts for the various text elements
let homescreenFont;
let speechFont;
//x and y coordinates for scrolling text
let textX;
let textY;

function preload() {
  //loads text files from which hal's language will be drawn, converts them to strings
  dasKapital = loadStrings("assets/marx.txt");
  nagle = loadStrings("assets/nagle.txt");
  panopticism = loadStrings("assets/panopticism.txt");
  haraway = loadStrings("assets/cyborgmanifesto.txt");
  clickbait = loadStrings("assets/clickbaitAgency.txt");
  altRight = loadStrings("assets/shapiroPeterson.txt");

//loads fonts
  homescreenFont = loadFont("assets/Gill Sans Medium.otf");
  speechFont = loadFont("assets/inconsolata.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0, 220);
  //creates the language model for speech synthesis
  createTxtModel();
  //sets voice commands and behaviour
    talkBack();
    //sets an initial x value for the scrolling text
    textX = (width/4);
}

function draw() {

//draws homescreen
  background(0,4)
  if (inHomescreen) {
    drawHomescreen();
  }
  //on click, draws environment, 'hal', and initiates voice commands
  else if (!inHomescreen) {

    //draws hal
    createFriend();
    //hal's words appear as written text
    writeFriend();
    //cute background decoration for a bit of visual dynamism
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
  speech = allThisBotKnows.generateSentences(random(1,2));
  //joins sentences together in a new variable to be given to the speech synthesizer
  joinedSpeech = speech.join("");

  //voice library speaks the newly created sentences
  responsiveVoice.speak(joinedSpeech, "UK English Male", voiceOptions);

//sets x and y value for text that will scroll towards the left across the screen, passing over hal (for the sake of legibility)
  textY = random(halY-halWidth/2,halY+halWidth/2);
  textX = random(0,width);
}

//function making hal's speech appear as text
function writeFriend(){
  push();
  textSize(20);
  fill(255);
  textFont(speechFont);
  textX -= 1.5;
  text(speech,textX,textY);
  pop();
  console.log(textX);
}

//draws hal
function createFriend() {
  //positions hal in middle of screen
  halX = width / 2;
  halY = height / 2;

//draws a series of circles progressing to a more pale red, making hal appear dimensional
  for (i = 0; i < halLayers; i++) {
    push();
    noStroke();
    fill(225, 14 + i, 14 + i, 300);
    ellipse(halX - i / 2, halY - i / 2, halWidth - 2 * i);
    pop();
  }
}

//commands and voice synthesis
function talkBack() {
  if (annyang) {

//sets the content of particular commands; variable theWords is consistently reset so that it can appear as text. this text, however, does not scroll (it is short enough to fit on screen)
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

//matches the above responses to particular commands
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
    //adds commands and initializes voice synthesis
    annyang.addCommands(commands);
    annyang.start();
  }
}

//separate function with the same effect of turning cached responses (rather than generated ones) into script. this does not scroll, but gradually fades
function speechToText(){
  push();
  textSize(20);
  fill(255);
  textFont(speechFont);
  //appears randomly on the screen
  text(theWords,random(0,width/3),random(0,height));
  pop();
}

//draws background elements; these are merely decorative
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

//draws homescreen text
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

//main environment can be entered when homescreen is clicked, in order to ensure annyang works
function mousePressed() {
  if (inHomescreen) {
    //draws a black rectancle to cover the last of the homescreen text
    push();
    fill(0);
    rectMode(CENTER);
    rect(width/2,height/2,width,height);
    pop();
    console.log("hi");
    inHomescreen = false;
  }
}
