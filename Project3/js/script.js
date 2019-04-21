'use strict'

let renderer, scene, camera, controls, material;
let floor, floorMaterial;
let pointLight1, pointLight2, pointLight3, softLight;
let objLoader, imgLoader;
let mouse, raycaster, mouseX, mouseY, intersects;
let white, black, robinBlue, lavender;

let landmesh, landscape, verticeHeight;
let simplex = new SimplexNoise();
let figScale = 30;
let figures = [];
let spheres = [];
let me1, me2, me3, me4, me5, liane1, liane2, liane3, liane4;
let particles = [];
let particle, particleGeo, particleMat;
let particlesLength = 3000;

let input, userText, output, botGreeting, botText, botSentence;


let degree = 0;
let loaded = false;
let start = false;
let loadingManager, dragControls;

let dragging = false;

let inChat = false;

window.onload = function() {
  console.log(window.innerWidth);
  $("#chatWrapper").hide();
  sceneSetup();
  createMouse();
  addSpheres();
  //loadAllObjects();
  //createParticles();
  // animates the program, allowing us to navigate with simple mousepad gestures
  animate();
};

function loadText() {
  $.get("Assets/script.txt", function(data) {
    output = data.split("\n");

    addBotText();
  })
}

function greeting() {
  botGreeting = $("<p id='botInput'>" + "They: Hello " + "</p>");
  $('#chatLog').append(botGreeting);
}

function addBotText() {
  botText = output[Math.floor(Math.random() * output.length)];
  botSentence = $("<p id='botInput'>" + "They: " + botText + "</p>");
  $('#chatLog').append(botSentence);
}

function addUserText() {
  $('#send').on("click", function() {
    console.log("yello");
    input = $("#message").val();
    userText = $("<p id='userInput'>" + "I: " + input + "</p>");
    $('#chatLog').append(userText);

    setTimeout(loadText, 1000);
    $('#message').val("");
  });
}

function placeChat() {
   $("#chatWrapper").offset({
    top: Math.random() * ($(window).innerWidth -$("#chatWrapper").height()),
    left: Math.random() * ($(window).innerHeight - $("#chatWrapper").width())
 });
    $(".chatBox").append($('#chatWrapper'))
    $('#chatWrapper').show();
  greeting();
  $("#close").on('click',removeChat);
  addUserText();
}

function removeChat() {
  $('#chatWrapper').hide()
  $("#chatLog").empty();
  inChat = false;
  controls.enabled = true;
}

function sceneSetup() {
  //creates a renderer for a 3d environment, permits alpha values
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
  camera.position.set(-2000, 500, 0);
  //i love that this is a function, and I assume it is assuring that my scene is essentially always in view, rather than having to manually
  //point the camera at the scene
  camera.lookAt(scene.position);

  //creates mousepad and keyboard controls, enabling scene navigation. arrow keys, by default, pan; mousepad can be clicked and dragged to orbit;
  //two finger or scrollwheel zooms. this code is from a tutorial video on youtube. damping, apparently, is a function of 'inertia' that
  //creats a sense of 'weight' for the controls.
  controls = new THREE.OrbitControls(camera);
  controls.enableDamping = true;
  controls.dampingfactor = 0.25;
  controls.enableZoom = true;

  //creates several colours that can be referred to by name
  white = new THREE.Color();
  black = new THREE.Color(0);
  robinBlue = new THREE.Color('rgb(90, 211, 244)');
  lavender = new THREE.Color('rgb(237, 216, 255)');
  let daffodil = new THREE.Color('rgb(255, 239, 140)')
  let poppy = new THREE.Color('rgb(226, 0, 0)');

  // creates three light sources of different colours, giving the objects volume via light and shdow
  pointLight1 = new THREE.PointLight(poppy);
  pointLight1.position.set(-250, 10, 15);
  scene.add(pointLight1);

  pointLight2 = new THREE.PointLight(poppy);
  pointLight2.position.set(250, 10, 15);
  scene.add(pointLight2);

  pointLight3 = new THREE.PointLight(daffodil);
  pointLight3.position.set(0, 200, 0);
  //  pointLight3.intensity = 3;
  scene.add(pointLight3);

  //creates an indirect light with a slightly yellow hue
  softLight = new THREE.AmbientLight("rgb(215, 223, 234)");
  softLight.position.set(0, 0, -13);
  scene.add(softLight);
//creates a material that will reflect light and cast shdows with a slightly metallic finish
  material = new THREE.MeshPhysicalMaterial({
    clearCoat: 0.2,
    metalness: 0.7
  });
  //sets background colour
  renderer.setClearColor(black);
  //creates a floor
  //floor = new THREE.GridHelper(500, 30, white, robinBlue);
  addLandscape();
}

//i was having trouble selecting the loaded objects in order to manipulate them, so- as per two different people's suggestions- i created an array of simple
//meshes to bind them to positionally
function addSpheres() {
  for (let i = 0; i < 9; i++) {
    let geometry = new THREE.SphereGeometry(100, 100, 50, 50);
    let mesh = new THREE.MeshBasicMaterial({
      color: white,
      transparent: true,
      opacity: 0.1
    });

    let sphere = new THREE.Mesh(geometry, mesh);

    sphere.name = i;
    //sets them up to stretch horizontally across my landscape
    sphere.position.set(200, 50, THREE.Math.mapLinear(i, 0, 9, -1300, 1300));
    scene.add(sphere);

    spheres.push(sphere);
//drag controls exist with reference to these spheres.
    addDragControls();
  }
}

//render functions seem to be necessary for all 3js scenes. i made this in a function separate from my animate() in an effort
//to make raycasting more simple.
function renderScene() {
  // update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);
  raycast();
  renderer.render(scene, camera);
}

//sets a vector value to mouse position, to be activated when mouse moves
function createMouse() {
  raycaster = new THREE.Raycaster();
  mouse = new THREE.Vector2();
  window.addEventListener('mousemove', onMouseMove, false);
  // calculate objects intersecting the picking ray
  //	renderer.domElement.addEventListener('click',raycast,false);
}

function raycast() {
  // calculate objects intersecting the picking ray
  intersects = raycaster.intersectObjects(figures, true);
  for (var i = 0; i < intersects.length; i++) {}
}

//calculates mouse position
function onMouseMove(e) {
  //e.preventDefault();
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
}

//after all the trouble i went to with the raycaster- turns out there's a pretty simple dragControls function. only works with meshes, though.
function addDragControls() {
  //only affects the spheres.
  dragControls = new THREE.DragControls(spheres, camera, renderer.domElement);

//disables the navigation controls when a figure is being dragged
  dragControls.addEventListener('dragstart', function() {
    controls.enabled = false;
  })

  //re-enables navigation controls and, if no chat box is open, initializes and places the chat box.
  dragControls.addEventListener('dragend', function() {
    console.log('nolongerdragging');
  //  controls.enabled = true;
    if (!inChat) {
      inChat = true;
      placeChat();
    }
  })

  //listens to whatever object is being dragged (spheres), and assigns the corresponding object (the figure in the same array position
  //as a givevn sphere) to move along with it
  dragControls.addEventListener('drag', function(e) {
  //  figures[e.object.name].position.set(e.object.position.x, e.object.position.y, e.object.position.z);
  })
}

//creates a modulates, slighly spiky wireframe landscape
function addLandscape() {
  //number of segments in the plane, defining by proxy the number of vertices
  let numSegments = 50;
  let material = new THREE.MeshBasicMaterial({
    opacity: 0.2,
    color: robinBlue,
    //i have the sense that this setting canceled out the previous two. creates a wireframe rather than a continuous plane.
    wireframe: true
  });
  landmesh = new THREE.PlaneGeometry(1000, 2000, numSegments / 2, numSegments);
//sets the vertices of what would otherwise be a rectangular plane to vary according to a noise function. threejs doens't have noise built in- this is an external
//library which generates a slighly more rudimentary version of noise- simplex rather than perlin. er- i'm not fully clear on the difference.
  for (let i = 0; i < landmesh.vertices.length; i++) {
  //the two parameters here are meant to define a vertex. i altered these values a few times and didn't really notice a difference.
    let noise = simplex.noise2D(i, 50)
    //maps the value onto a larger range
    verticeHeight = THREE.Math.mapLinear(noise, 0, 1, 0, 200)
    //sets each vertice to a different but related level, exaggerated by the map function above.
    landmesh.vertices[i].z = verticeHeight;
  }

//creates a mesh from the wireframe and geometry.
  landscape = new THREE.Mesh(landmesh, material);
  //lays it flat- relative to my objects, that is. planes geometries tend to appear perpendicular to a horizontal origin plane
  landscape.rotateX(THREE.Math.degToRad(90));
  scene.add(landscape);
}

function loadAllObjects() {

  //creates a new loader, responsible for loading all models, and sets the destination folder in which they are found.
  let manager = new THREE.LoadingManager();
  //function to be executed as objects are loading
  manager.onProgress = function(url, itemsLoaded, itemsLoading) {
    //calculates the percent value of objects loaded
    let progress = (itemsLoaded / itemsLoading) * 100;
    //adds a button. it's bright green!
    let $progressText = $('<button class=progress></button>');
    //assigns the type of value it takes
    $progressText.attr('string');
    //adds a percentage tracking the loaded objects
    $progressText.append('<p>' + 'Loading' + progress + "%" + '</p>');
    //adds the button to an invisible div
    $('#text').append($progressText);

    //er- because the loader is tracking objects, which spring fully loaded in steps rather than being loaded continuously,
    //each time a new object loaded a new button would appear next to the last. thus this workaround, which empties the old $button
    //and updates its status
    let newButton = function() {
      $('.progress').empty();
      $progressText.append('<p>' + 'Loading ' + progress + "%" + '</p>');

    }
    setTimeout(newButton, 10);
  }

//to be executed when all objects are loaded.
  manager.onLoad = function() {
    //gets rid of progrss button
    $('.progress').remove();
    //adds all the objects so they appear together, rather than as each one loads
    addObjects();
    //creates function that will be called whenever a button on the chatbox is clicked. i figured i would throw it in here rather than in onLoad
    //so that the program could just focus on loading the models
    addUserText();
  }

//creates a loader that loads obj files. actually requires extra reference in the index
  objLoader = new THREE.OBJLoader(manager);
  //sets the retrieval path for all objs
  objLoader.setPath('Assets/OBJ/');

  //these are 3d scans of myself and a friend, edited to an extent in blender to remove extraneous artefacts and reposition at origin
  me1 = objLoader.load('jules1.obj', function(me1) {
    //adds to an array holding all models
    figures.push(me1);
  });
  //
  me2 = objLoader.load('jules2.obj', function(me2) {
    figures.push(me2);
  });

  me3 = objLoader.load('jules3.obj', function(me3) {
    figures.push(me3);
  });

  me4 = objLoader.load('jules4.obj', function(me4) {
    figures.push(me4);
  });

  me5 = objLoader.load('jules5.obj', function(me5) {
    figures.push(me5);
  });

  liane1 = objLoader.load('liane1.obj', function(liane1) {
    figures.push(liane1);
  });

  liane2 = objLoader.load('liane2.obj', function(liane2) {
    figures.push(liane2);
  });

  liane3 = objLoader.load('liane3.obj', function(liane3) {
    figures.push(liane3);
  });

  liane4 = objLoader.load('liane4.obj', function(liane4) {
    figures.push(liane4);
  });
}

//batch assigns material, position and adds figures. initially i was assigning all these at the same time as loading due to issues with referring to the
//figures array- finally realized that the loaded objects were not actually counted as single instances of a mesh, but were rather considered (according to sabine)
//aggregations of meshes. digging through stackexchange gave me this method, where rather than putting creating a new mesh from each obj and a material, i could
//'traverse' the obj's to assign materials to their constituent mesh particles.
function addObjects() {
  for (let i = 0; i < figures.length; i++) {
    figures[i].traverse(function(child) {
      if (child instanceof THREE.Mesh) {
        child.material = material;
        material.color.set(white);
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    //scales the figures up because i like big programs, apparently
    figures[i].scale.set(figScale, figScale, figScale);
    //binds model to the position of an invisible sphere. I was having trouble getting drag controls to work on the models- sabine and i came to the conclusion that
    //this was because a loded model does not correspond to one, but is comprised of many, meshes, which confuses drag controls. binding obj to sphere mesh
    //is a bit of a work-around, allowing me to select and drag a simple mesh and by proxy move the model
    figures[i].position.set(spheres[i].position.x, spheres[i].position.y, spheres[i].position.z);
    //adds em all to the scene
    scene.add(figures[i]);
  }
}

//static things are boring! movement is lovely and eerie so they will rotate in place.
function rotateObjets() {
  //expresses angle without referring back to math i can't remember
  degree = THREE.Math.degToRad(0);
  //all figures rotate around their origin
  for (let i = 0; i < figures.length; i++) {
    figures[i].rotateY(degree);
    degree += 0.005;
  }
}

//creating a fun little moving field to haze around my objects. this is based on a threejs example for a static starfield
function createParticles() {
  //these particles won't be independent objects, but will in fact all be vertices of the same geometry.
  particleGeo = new THREE.Geometry();

  for (let i = 0; i < particlesLength; i++) {
    //each particle is expressed as a vector
    particle = new THREE.Vector3();
//i don't actually know why randFloatSpread is necessary, but when I tried placing them randomly according to my intuition, they came out a straight diagonal line, so
//i just lifted the example placement
    particle.x = THREE.Math.randFloatSpread(3000);
    particle.y = THREE.Math.randFloatSpread(3000);
    particle.z = THREE.Math.randFloatSpread(3000);
    //adds each vector to the geometry
    particleGeo.vertices.push(particle);

  }
  //new material rinse repeat
  particleMat = new THREE.PointsMaterial();
  //
  //adds geometry and material into a mesh that is technically just a mass of points
  particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);
}

//updates the vertices of the geometry created above to create a static-y movement effect
function moveParticles() {
  for (let i = 0; i < particlesLength; i++) {
    //creates a random interval between 1 and 0
    let randInterval = Math.random();
    //maps that between a negative and positive interval
    let randVect = THREE.Math.mapLinear(randInterval, 0, 1, -30, 30);
    //updates the vertice positions
    particleGeo.vertices[i].y += +randVect;
    particleGeo.vertices[i].x += randVect;
    particleGeo.vertices[i].z += randVect;
    //increases the different every frame
    randVect += 0.1;
    //  console.log(particleGeo.vertices[20].z);
  }
  //spare no expense$$$. tells the processor that i do in fact want the vertices updated every frame. '
  particleGeo.verticesNeedUpdate = true;
}
//animate function
function animate() {
  //i'm not sure what this does - the code is in every threejs example.it seems that it is necessary for movement
  requestAnimationFrame(animate);
//  rotateObjets();
  //moveParticles();
  //ensures the continuous use of mousepad controls to navigate around the scene
  renderScene();
}
