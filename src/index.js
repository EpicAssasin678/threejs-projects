import render from './alife_module/render.js';
import * as THREE from 'three';

// Start the render loop
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