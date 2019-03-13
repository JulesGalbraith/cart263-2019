"use strict";
let verb = "is";
let vowel = ['a','e','i','o','u','y'];
let article = "a"

$(document).ready(setup);

function setup(){
  console.log("Hi!")

$.getJSON("data/data.json",dataLoaded);

$("#refresh").on("click",reload);
};

function dataLoaded(data){
  console.log(data);

  let condiment = getRandomElement(data.condiments);
  console.log(condiment);

  if (condiment.charAt(condiment.length-1) === "s") {
    verb = "are";
  }
  console.log(verb);

  let cat = getRandomElement(data.cats);
  let room = getRandomElement(data.rooms);


  let firstLetter = room.charAt(0);

 if (vowel.indexOf(firstLetter) > -1) {
   article = "an";
 }
 let infinitive = getRandomElement(data.verbs);

 let society = getRandomElement(data.societies).name;
 let drunk = getRandomElement(data.statesOfDrunkenness);
 let art = getRandomElement(data.isms);
 let mood = getRandomElement(data.moods);

  let description = condiment + " " + verb + " like a " + cat + " in " + article + " " + room +"."+ " We used to " + infinitive + " with someone from the " + society + ", often " + drunk + ", but the " + art + " was always " + mood + ".";
  $("p").append(description);
}

 function getRandomElement(array){
   let element = array[Math.floor(Math.random()*array.length)];
   return element;
 }

function reload(){
  location.reload();
}
