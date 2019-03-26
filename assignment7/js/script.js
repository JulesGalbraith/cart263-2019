let frequencies = [220.00,246.94,277.18,293.66,329.63,369.99,415.30,0];
let kick;
let hihat;
let snare;
let synth;

let note;
let theNote;

let pattern = ["x","o","*","x*","xo","o*","**x","ox*"];
let patternIndex = 0;

let playing = false;
let noteLength = [250,500,750,1000,1250,1500,2000];

let inInstrument = false;
let snareTone,kickTone,hatTone;

let circleY;
let circleColour;

function setup(){

  createCanvas(1000,750);
  synth = new Pizzicato.Sound({
    source: 'wave',
  });
  kick = new Pizzicato.Sound("assets/sounds/kick.wav");
  hihat = new Pizzicato.Sound("assets/sounds/hihat.wav");
  snare = new Pizzicato.Sound("assets/sounds/snare.wav");
}

function draw(){
  if(!inInstrument){
    homescreen();
  }
  else{
    visualsYay();
  }
  circleColour = (random(kickTone-20,kickTone),random(snareTone-40,snareTone),random(hatTone-50,hatTone));
}

function playNote(){
note = random(frequencies);
theNote = random(noteLength);

synth.frequency = note;

if (note === 0){
  setTimeout(synth.pause,random(1000,2000));
}

console.log(note);
playing = true;

circleY = random(0,height);
synth.play();

setTimeout(addTremolo,2000);
}

function addTremolo(){
  var tremolo = new Pizzicato.Effects.Tremolo({
      speed: 4,
      depth: 0.5,
      mix: 0.5
  });
synth.addEffect(tremolo);

setTimeout(synth.removeEffect(tremolo),1500);
}

function mousePressed(){

  let theNote = random(noteLength);
  if (!playing){
  setInterval(playNote,theNote);
  inInstrument = true;
  setInterval(playDrum,200);
  }
}

function playDrum(){
  let symbols = pattern[patternIndex];

  if (symbols.indexOf("x") > -1) {
    kick.play();
    kickTone = 30;
  }
  if (symbols.indexOf("o") > -1) {
    snare.play();
    snareTone = 150;
  }
  if(symbols.indexOf("*") > -1) {
    hihat.play();
    hatTone = 100;
  }
  patternIndex ++

  if (patternIndex >= pattern.length) {
    patternIndex = 0;
  }
}

function homescreen(){
background(189, 213, 252);

push();
fill(255, 249, 211);
textAlign(CENTER);
textSize(50);
textFont('Georgia');
text("Click to Play", width/2,height/2);
pop();

}

function visualsYay(){
  background(189, 213, 252);

let frequencyMin = 100;
let frequencyMax = 500;
let circleX = map(note, frequencyMin,frequencyMax,0,width);

toneSet = random(3);
push();
ellipseMode(CENTER);
fill(circleColour);
ellipse(circleX,circleY,(toneSet*snareTone)/2);
pop();
}
