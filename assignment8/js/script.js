'use strict'

let renderer, scene, camera, controls;
let floor, floorMaterial;
let light, softLight;
let objLoader;
let mouse, raycaster,mouseX,mouseY;
let white, black, robinBlue;


let figures = [];
let bush, me1,me2, me3,me4,me5,liane1,liane2,liane3,liane4;

window.onload = function() {

sceneSetup();
createMouse();
loadAllObjects();
// animates the program, allowing us to navigate with simple mousepad gestures
animate();
};

function sceneSetup(){

	//creates a renderer for a 3d environment, permits alpha values
				renderer = new THREE.WebGLRenderer({alpha:true});
	//sets size of 3d canvas scene
				renderer.setSize(window.innerWidth,window.innerHeight);
	//adds the renderer to the html document
				document.body.appendChild( renderer.domElement );

	//creates a new scene
			 scene = new THREE.Scene();
	//creates a camera and settings
				 camera = new THREE.PerspectiveCamera(
					100,			// Field of view
					800 / 600,		// Aspect ratio
					0.1,			// Near plane
					10000			// Far plane
				);
				camera.position.set( 5, 15,40);
		//i love that this is a function, and I assume it is assuring that my scene is essentially always in view, rather than having to manually
		//point the camera at the scene
				camera.lookAt( scene.position );


	//creates mousepad and keyboard controls, enabling scene navigation. arrow keys, by default, pan; mousepad can be clicked and dragged to orbit;
	//two finger or scrollwheel zooms. this code is from a tutorial video on youtube. damping, apparently, is a function of 'inertia' that
	//creats a sense of 'weight' for the controls.
	    controls = new THREE.OrbitControls(camera);
	      controls.enableDamping = true;
	      controls.dampingfactor = 0.25;
	      controls.enableZoom = true;

	// creates two light sources, one pointed directly from around the same position as the camera, one ambient and cool in tone
				light = new THREE.PointLight( 0xFFFF00 );
				light.position.set( 10, 10, 15 );
				scene.add( light );
				//creates an indirect light with a slightly yellow hue
	       softLight = new THREE.AmbientLight("rgb(215, 223, 234)");
	      softLight.position.set(150,150,-1450);
	      scene.add(softLight);
	//creates several colours  to be used
	white = new THREE.Color();
 	black = new THREE.Color(0);
	robinBlue = new THREE.Color('rgb(90, 211, 244)')
	//sets background colour
	      renderer.setClearColor(black);
	//creates a floor
	  floor = new THREE.GridHelper(500,30,white,robinBlue);
	  scene.add(floor);
}

function createMouse(){

		raycaster = new THREE.Raycaster();
	  mouse = new THREE.Vector2();

		window.addEventListener('mousemove',onMouseMove,false);
		onMouseMove('mousemove');
}

function onMouseMove(e) {
mouseX =  e.pageX;
mouseY = e.pageY;

console.log(mouseX,mouseY);
}

function loadAllObjects(){

	//test object- i found a bush from a free obj site
	      objLoader = new THREE.OBJLoader();
	      objLoader.setPath('Assets/OBJ/');
	    bush = objLoader.load('Bush1.obj', function(bush){
	        bush.position.y = 5;
	        scene.add(bush);
	      });

	//these are 3d scans of myself and a friend, edited to an extent in blender to remove extraneous artefacts
	      me1 = objLoader.load('jules1.obj', function(me1){
					//sets position with reference to the origin point
	          me1.position.set = (50,50,50);
	//my models are a bit small - i'm resizing them. it takes a vector rather than a percentage
						me1.scale.set(10,10,10);
	//adds model to scene
	          scene.add(me1);
						figures.push(me1);
	        });

				me2 = objLoader.load('jules2.obj', function(me2){
					me2.position.set = (-50,50,50);
					me2.position.z = 40;
					//rotates the model with reference to the origin, which is a bit annoying.
					me2.rotateZ(THREE.Math.degToRad(-60));
					me2.rotateX(THREE.Math.degToRad(-60));

					me2.scale.set(10,10,10);
					scene.add(me2);
					figures.push(me2);
				});

				me3 = objLoader.load('jules3.obj', function(me3){
					me3.position.set(-50,100,-70);
					me3. position.x = 20;
					me3.position.z = 10;

					me3.scale.set(10,10,10);
					scene.add(me3);
					figures.push(me3);
				});

				me4 = objLoader.load('jules4.obj', function(me4){
					me4.position.set(-150,100,100);

					me4.scale.set(10,10,10);

					me4.rotateZ(THREE.Math.degToRad(-90));
					me4.rotateX(THREE.Math.degToRad(30));

					scene.add(me4);
					figures.push(me4);
				});

				me5 = objLoader.load('jules5.obj',function(me5){
				 	me5.position.set(100,100,-150);

	        me5.scale.set(10,10,10);

				 	scene.add(me5);
					figures.push(me5);
				 });

				 console.log(figures.length);
}
//animate function
    function animate(){
//i'm not sure what this does - the code comes from a threejs example
      requestAnimationFrame (animate);

//ensures the continuous use of mousepad controls to navigate around the scene
      controls.update();
//continously displays the scene as well as the perspective camera
      renderer.render(scene,camera);
    }
