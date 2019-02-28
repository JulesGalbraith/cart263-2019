

// Create a MarkovText object with a word depth of 3
let dasKapital;
let panopticism;
let reparations;
let haraway;
let clickbait;
let altRight;

let myMarkov = new MarkovText(5);

function preload(){
dasKapital = loadStrings("assets/marx.txt");
reparations = loadStrings("assets/caseforreparations.txt");
panopticism = loadStrings("assets/panopticism.txt");
haraway = loadStrings("assets/cyborgmanifesto.txt");
clickbait = loadStrings("assets/clickbaitAgency.txt");
altRight = ("assets/shapiroPeterson.txt");

}

function setup() {
console.log(dasKapital);
}
// // Learn from our text
// function learnToSpeak (){
// let myMarkov = new MarkovText(5);
// myMarkov.learn(dasKapital);
// // Output 10 words
// var generatedWords = myMarkov.output(2);
// console.log(generatedWords);
// }
