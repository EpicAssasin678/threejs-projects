import * as THREE from 'three';

/**
 * Author: darkf0xTV 
 * Description: Script that allows you to control a cube and add random ones.
 */

// Create a Three.js scene
var scene = new THREE.Scene();

// Create a Three.js camera
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Create a Three.js renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a cube
var cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
var cubeMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

scene.add(cube);

camera.position.z = 5;

var previousMouseX = 0;
var mouseSpeed = 0;
var isStopped = false;

var rotationMatrix = [cube.rotation.x, cube.rotation.y, cube.rotation.z];
//up down right left
var movementMatrix = [0.0,0.0,0.0,0.0];
var controlCode = [0,0,0,0];

//controls
document.addEventListener("keydown", event => {

    switch (event.code) {
        case ('Space'):
            console.log('SPACE WAS PRESSED ');
            isStopped = !isStopped;
            break;
        case ('KeyW'):
            console.log('W was pressed');
            movementMatrix[0] = 0.01;
            break;
        case ('KeyS'):
            console.log('S was pressed');
            movementMatrix[1] = 0.01;
            break;
        case ('KeyA'):
            console.log('S was pressed');
            movementMatrix[3] = 0.01;
            break;
        case ('KeyD'):
            console.log('S was pressed');
            movementMatrix[2] = 0.01;
            break;
        default:
            break;
    }
});

document.addEventListener("keyup", event => {
    switch (event.code) {
        case ('KeyW'):
            console.log('W was released');
            movementMatrix[0] = 0;
            break;
        case ('KeyS'):
            console.log('S was released');
            movementMatrix[1] = 0;
            break;
        case ('KeyA'):
            console.log('S was released');
            movementMatrix[3] = 0;
            break;
        case ('KeyD'):
            console.log('S was released');
            movementMatrix[2] = 0;
            break;
        default:
            break;
    }
});

//adds a random cube with random properties
document.addEventListener("click", event => {
    let newCube = new THREE.Mesh(cubeGeometry, cubeMaterial)

    let quadrant = [1,1];
    if (Math.random()>0.5) quadrant[0] = -1;
    if (Math.random()>0.5) quadrant[1] = -1;
    
    newCube.position.x = Math.random() * 10 * quadrant[0];
    newCube.position.y = Math.random() * 10 * quadrant[1];
    scene.add(newCube);
});

// Add a mousemove event listener to the renderer's canvas
renderer.domElement.addEventListener('mousemove', function(event) {
    var currentMouseX = event.clientX;
    mouseSpeed = currentMouseX - previousMouseX;
    previousMouseX = currentMouseX;
});


//Render variable trackers
var frameTick = 0;

// Render loop
var render = function() {
    //console.log(`FRAME: ${frameTick}`);
    requestAnimationFrame(render);
    if (!isStopped) {
        cube.rotation.y += mouseSpeed * 0.01;
    } else {
        cube.rotation.y = 0;
    }

    //cube position modifiers
    cube.position.x += movementMatrix[2];
    cube.position.x -= movementMatrix[3];
    cube.position.y += movementMatrix[0];
    cube.position.y -= movementMatrix[1];

    //cube.material.color = `(${(cube.position.x )},${cube.position.y},${cube.rotation.z})`;
    cube.material.color = new THREE.Color(cube.position.x , cube.position.y, cube.rotation.y);
    console.log(cube.material.color);

    renderer.render(scene, camera);
    frameTick = (frameTick + 1)%60;
};

render();


/**
 * 
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
var cubeMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
scene.add(cube);

camera.position.z = 5;

var previousMouseX = 0;
var mouseSpeed = 0;
var isStopped = false; // flag to check if the cube rotation is stopped

renderer.domElement.addEventListener('mousemove', function(event) {
    var currentMouseX = event.clientX;
    mouseSpeed = currentMouseX - previousMouseX;
    previousMouseX = currentMouseX;
});

// Add an event listener for the space key
document.addEventListener("keydown", event => {
    if (event.code === "Space") {
        isStopped = !isStopped; // toggle the isStopped flag
    }
});

var render = function() {
    requestAnimationFrame(render);
    if (!isStopped) {
        cube.rotation.y += mouseSpeed * 0.01;
    }
    renderer.render(scene, camera);
};

render();

 */