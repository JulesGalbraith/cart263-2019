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

let output, botGreeting, botText, botSentence;



let degree = 0;
let loaded = false;
let start = false;
let loadingManager, dragControls;

let dragging = false;

let inChat = false;

window.onload = function() {
  $(".chatBox").hide();
  addUserText();
  sceneSetup();
  createMouse();
  addSpheres();
  loadAllObjects();
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
    input = $("#message").val();
    userText = $("<p id='userInput'>" + "I: " + input + "</p>");
    $('#chatLog').append(userText);

    setTimeout(loadText, 1000);
    $('#message').val("");
  });
}

function placeChat() {
  $(".chatBox").parent().offset({
    top: Math.random() * ($(window).height() - $button.height()),
    left: Math.random() * ($(window).width() - $button.width())
  });
  $(".chatBox").show();
  greeting();
}

function removeChat() {
  $('.chatBox').remove()
  $("#chatLog").empty();
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
    sphere.position.set(200, 50, THREE.Math.mapLinear(i, 0, 9, -1300, 1300));
    scene.add(sphere);

    spheres.push(sphere);

    addDragControls();
  }
}

function renderScene() {
  // update the picking ray with the camera and mouse position
  raycaster.setFromCamera(mouse, camera);
  raycast();
  renderer.render(scene, camera);
}

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

function onMouseMove(e) {
  e.preventDefault();
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
}

function addDragControls() {
  dragControls = new THREE.DragControls(spheres, camera, renderer.domElement);

  dragControls.addEventListener('dragstart', function() {
    controls.enabled = false;
  })
  dragControls.addEventListener('dragend', function() {
    console.log('nolongerdragging');
    controls.enabled = true;
    if (!inChat) {
      placeChat();
      inChat = true;
    }
  })
  dragControls.addEventListener('drag', function(e) {
    figures[e.object.name].position.set(e.object.position.x, e.object.position.y, e.object.position.z);
  })
}

function addLandscape() {
  let numSegments = 50;
  let material = new THREE.MeshBasicMaterial({
    opacity: 0.2,
    color: robinBlue,
    wireframe: true
  });
  landmesh = new THREE.PlaneGeometry(2000, 3000, numSegments / 2, numSegments);

  for (let i = 0; i < landmesh.vertices.length; i++) {
    let noise = simplex.noise2D(i, 50)
    verticeHeight = THREE.Math.mapLinear(noise, 0, 1, 0, 200)
    landmesh.vertices[i].z = verticeHeight;
  }

  landscape = new THREE.Mesh(landmesh, material);
  landscape.rotateX(THREE.Math.degToRad(90));
  scene.add(landscape);
}

function loadAllObjects() {

  //creates a new loader, responsible for loading all models, and sets the destination folder in which they are found.
  let manager = new THREE.LoadingManager();
  manager.onProgress = function(url, itemsLoaded, itemsLoading) {
    let progress = (itemsLoaded / itemsLoading) * 100;
    let $progressText = $('<button class=progress></button>');
    $progressText.attr('string');
    $progressText.append('<p>' + 'Loading' + progress + "%" + '</p>');
    $('#text').append($progressText);
    console.log(progress + "%");

    let newButton = function() {
      $('.progress').empty();
      $progressText.append('<p>' + 'Loading ' + progress + "%" + '</p>');

    }
    setTimeout(newButton, 10);
  }

  manager.onLoad = function() {
    $('.progress').remove();
    addObjects();
    loadText();
  }

  objLoader = new THREE.OBJLoader(manager);
  objLoader.setPath('Assets/OBJ/');

  //these are 3d scans of myself and a friend, edited to an extent in blender to remove extraneous artefacts
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
    figures[i].scale.set(figScale, figScale, figScale);
    //binds model to the position of an invisible sphere. I was having trouble getting drag controls to work on the models- sabine and i came to the conclusion that
    //this was because a loded model does not correspond to one, but is comprised of many, meshes, which confuses drag controls. binding obj to sphere mesh
    //is a bit of a work-around, allowing me to select and drag a simple mesh and by proxy move the model
    figures[i].position.set(spheres[i].position.x, spheres[i].position.y, spheres[i].position.z);
    scene.add(figures[i]);
  }
}

function rotateObjets() {
  degree = THREE.Math.degToRad(0);
  for (let i = 0; i < figures.length; i++) {
    figures[i].rotateY(degree);
    degree += 0.005;
  }
}

function createParticles() {
  particleGeo = new THREE.Geometry();

  for (let i = 0; i < particlesLength; i++) {
    particle = new THREE.Vector3();
    particle.x = THREE.Math.randFloatSpread(3000);
    particle.y = THREE.Math.randFloatSpread(3000);
    particle.z = THREE.Math.randFloatSpread(3000);
    console.log("hello");
    particleGeo.vertices.push(particle);

  }
  particleMat = new THREE.PointsMaterial();
  particles = new THREE.Points(particleGeo, particleMat);
  scene.add(particles);
  console.log("hi");
}

function moveParticles() {
  for (let i = 0; i < particlesLength; i++) {
    let randInterval = Math.random();
    let randVect = THREE.Math.mapLinear(randInterval, 0, 1, -30, 30);
    particleGeo.vertices[i].y += +randVect;
    particleGeo.vertices[i].x += randVect;
    particleGeo.vertices[i].z += randVect;
    randVect += 0.1;
    //  console.log(particleGeo.vertices[20].z);
  }
  particleGeo.verticesNeedUpdate = true;
}
//animate function
function animate() {
  //i'm not sure what this does - the code comes from a threejs example
  requestAnimationFrame(animate);
  rotateObjets();
  //moveParticles();
  //ensures the continuous use of mousepad controls to navigate around the scene
  renderScene();
}
