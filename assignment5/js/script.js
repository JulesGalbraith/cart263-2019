"use strict";

let animals = [
  "aardvark",
  "alligator",
  "alpaca",
  "antelope",
  "ape",
  "armadillo",
  "baboon",
  "badger",
  "bat",
  "bear",
  "bearded dragon",
  "beaver",
  "bison",
  "boar",
  "buffalo",
  "bull",
  "camel",
  "canary",
  "capybara",
  "cat",
  "chameleon",
  "cheetah",
  "chimpanzee",
  "chinchilla",
  "chipmunk",
  "cougar",
  "cow",
  "coyote",
  "crocodile",
  "crow",
  "deer",
  "dingo",
  "dog",
  "donkey",
  "dromedary",
  "echidna",
  "elephant",
  "elk",
  "ewe",
  "ferret",
  "finch",
  "fish",
  "fox",
  "frog",
  "gazelle",
  "gila monster",
  "giraffe",
  "gnu",
  "goat",
  "gopher",
  "gorilla",
  "grizzly bear",
  "ground hog",
  "guinea pig",
  "hamster",
  "hedgehog",
  "hippopotamus",
  "hog",
  "horse",
  "hyena",
  "ibex",
  "iguana",
  "impala",
  "jackal",
  "jaguar",
  "kangaroo",
  "koala",
  "komodo dragon",
  "lamb",
  "lemur",
  "leopard",
  "lion",
  "lizard",
  "llama",
  "lynx",
  "mandrill",
  "marmoset",
  "mink",
  "mole",
  "mongoose",
  "monkey",
  "moose",
  "mountain goat",
  "mouse",
  "mule",
  "muskrat",
  "mustang",
  "mynah bird",
  "newt",
  "ocelot",
  "opossum",
  "orangutan",
  "oryx",
  "otter",
  "ox",
  "panda",
  "panther",
  "parakeet",
  "parrot",
  "pig",
  "platypus",
  "polar bear",
  "porcupine",
  "porpoise",
  "prairie dog",
  "puma",
  "rabbit",
  "raccoon",
  "ram",
  "rat",
  "reindeer",
  "rhinoceros",
  "salamander",
  "seal",
  "sheep",
  "shrew",
  "silver fox",
  "skunk",
  "sloth",
  "snake",
  "squirrel",
  "tapir",
  "tiger",
  "toad",
  "turtle",
  "walrus",
  "warthog",
  "weasel",
  "whale",
  "wildcat",
  "wolf",
  "wolverine",
  "wombat",
  "woodchuck",
  "yak",
  "zebra"
];
let correctAnimal;
let $guessButton;

let answers = [];
const NUM_OPTIONS = 5;


$(document).ready(setup);

function setup() {
  $("#begin").on("click", startGame);
};

function startGame() {
  newRound();
  talk();
};

function addButton(label) {
  $guessButton = $('<div class="guess"></div>');
  $guessButton.text(label);
  $guessButton.button();

  $guessButton.on("click", checkGuess)
  $("body").append($guessButton);
};

function checkGuess() {
  if ($(this).text() === correctAnimal) {
    console.log("that's right!")
    $(".guess").remove();
    setTimeout(newRound, 500);
  } else {
    console.log("nope");
    speakAnimal(correctAnimal);
    $(this).effect('shake');
  }

};

function newRound() {
  answers = [];

  for (let i = 0; i < NUM_OPTIONS; i++) {

    let chooseAnimal = animals[Math.floor(Math.random() * animals.length)];
    addButton(chooseAnimal);
    answers.push(chooseAnimal);
  }

  correctAnimal = answers[Math.floor(Math.random() * answers.length)];
  $("#begin").hide();
  speakAnimal(correctAnimal);
};

function speakAnimal(name) {
  let reverseName = name.split('').reverse().join('');
  let options = {
    rate: 0.71,
    pitch: 1
  };
  responsiveVoice.speak(reverseName, "Russian Male", options);
};

function talk() {
  if (annyang) {
    console.log("listening");
    var commands = {

      'i give up': function(correctAnimal) {
        $guessButton.effect("shake");
        console.log("yello")
        $(".guess").remove();
        newRound();
      },
      'Say it again': function() {
        speakAnimal(correctAnimal);
      },
      "I think it's *word": function(word) {
        if (word === correctAnimal) {
          $(".guess").remove();
          setTimeout(newRound, 3000);
          responsiveVoice.speak("that's right", "Spanish Male");
        } else {
          $(".guess").effect("shake");
          speakAnimal(correctAnimal);
        }
      }
    }
    annyang.addCommands(commands);
    annyang.start();
  }
}
