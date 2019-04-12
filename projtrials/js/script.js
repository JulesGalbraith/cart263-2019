'use strict'
var objects = [];
var startColor;
let scene, camera, renderer;
let controls;


window.onload = function(){
renderer = new THREE.WebGLRenderer({
  alpha: true
});
//sets size of 3d canvas scene
renderer.setSize(window.innerWidth, window.innerHeight);
//adds the renderer to the html document
document.body.appendChild(renderer.domElement);

//creates a new scene
scene = new THREE.Scene();
//creates a camera and settings
camera = new THREE.PerspectiveCamera(
  100, // Field of view
  800 / 600, // Aspect ratio
  0.1, // Near plane
  10000 // Far plane
);
camera.position.set(-50,50,100);
//i love that this is a function, and I assume it is assuring that my scene is essentially always in view, rather than having to manually
//point the camera at the scene
camera.lookAt(scene.position);

init();
animate();
}

function init(){
scene.background = new THREE.Color( 0xf0f0f0 );
camera.position.z = 1000;


var ambientLight = new THREE.AmbientLight( 0x0f0f0f );
scene.add( ambientLight );

var light = new THREE.SpotLight( 0xffffff, 1.5 );
light.position.set( 0, 500, 2000 );
scene.add(light);


var geometry = new THREE.SphereGeometry( 40, 40, 40 );

for (var i = 0; i < 5; i++) {
	var object = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: Math.random() * 0xffffff } ) );

  object.position.x = Math.random() * 1000 - 500;
	object.position.y = Math.random() * 600 - 300;
	object.position.z = Math.random() * 800 - 400;

	object.castShadow = true;
	object.receiveShadow = true;

	scene.add( object );

	objects.push( object );

  let objLoad = new THREE.OBJLoader();
  objLoad.setPath('Assets/OBJ/');

me2 =  objLoad.load('jules2.obj', function(me2){
    scene.add(me2);
    objects.push(me2);
    console.log(me2);
  });

}
var controls = new THREE.DragControls( objects, camera, renderer.domElement );

controls.addEventListener( 'dragstart', dragStartCallback );
controls.addEventListener( 'dragend', dragendCallback );
}

function dragStartCallback(event) {
	startColor = event.object.material.color.getHex();
	event.object.material.color.setHex(0x000000);
}

function dragendCallback(event) {
	event.object.material.color.setHex(startColor);
}

function animate(){
  requestAnimationFrame(animate);

  renderer.render(scene,camera);
}
