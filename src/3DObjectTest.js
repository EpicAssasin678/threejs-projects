import * as THREE from 'three';
import OrbitControls from 'three/examples/jsm/controls/OrbitControls';

/**
 * Author: darkF0xTV
 * 
 */

// Create a Three.js renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


// Create controls 
const controls = new OrbitControls( camera, renderer.domElement );


//import 3D object
const loader = new GLTFLoader();
loader.load('../assets/tepestmap.gltf' , (gltf) => {
    scene.add( gltf.scene );
}, undefined, function (error) {
    console.error( error ); 
} );  

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

    controls.update();
    renderer.render(scene, camera);
    frameTick = (frameTick + 1)%60;
};

render();


return null;