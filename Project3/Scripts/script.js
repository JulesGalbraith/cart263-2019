'use strict'

let scene, camera, renderer;

let loader;
let bush, plant1;

function init(){

 renderer = new THREE.WebGLRenderer();
 renderer.setSize(window.innerWidth, window.innerHeight);
 document.body.appendChild( renderer.domElement );

 camera = new THREE.PerspectiveCamera(75, window.innerWidth/ window.innerHeight, 0.1, 1000)
 camera.position.z = 250;

 scene = new THREE.Scene();


var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

camera.position.z = 5;

}

// function addPlants(){
//
//   loader = new THREE.OBJLoader2();
//   bush = loader.load("Assets/OBJ/Bush1.obj",
//   function onLoad(object){
//     scene.add(object);
//   });

  init();
  addplants();
  render();
}
