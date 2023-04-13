import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import Environment from './Environment/Environment.js';
import Herbivore from './Organisms/Herbivore.js';
import FoodSource from './Environment/FoodSource.js';
import EnvironmentRenderer from './RenderObjects/EnvironmentRenderer.js';
import { Text } from 'troika-three-text';
import { axisArrows, referenceRectangle } from './RenderObjects/renderUtils.js';
import Simulation from './Environment/Simulation.js';

/**
 * Author: darkf0xTV 
 * Rendering script for the alife module
 */


// ALife module initialization 
const [envWidth, envHeight] = [680, 680];
var environment = new Environment(envWidth, envHeight, 10000, 24);
var foodSourceMap = new Map();

//initialize food sources 
foodSourceMap.set([10, 8], new FoodSource(600, 600, 1, [10, 8]));
foodSourceMap.set([102, 94], new FoodSource(1000, 1000, 1, [102, 94]));
foodSourceMap.set([210, 160], new FoodSource(250, 250, 1, [210, 160]));
console.log(foodSourceMap);
environment.initializeFoodSources(foodSourceMap);
//environment.addToEnvironment(foodSourceMap.get([10, 8]));

//initialize organisms 
environment.addToEnvironment(
    new Herbivore(100, 20, 4, 3, 100, 4, [531, 400], environment),
    new Herbivore(100, 20, 4, 4, 100, 4, [240, 162], environment)
);

// Create a Three.js scene
var scene = new THREE.Scene();

//todo eventually create a scale for the camera relative to environment size
//create a fixed camera with perspective in only x and y
//var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
//const camera = new THREE.OrthographicCamera(-window.innerWidth / 2, window.innerWidth / 2, window.innerHeight / 2, -window.innerHeight / 2, 1, 1000);
const camera = new THREE.OrthographicCamera(0, envWidth, envHeight, 0, 1, 1000);

//set camera position to fixed
camera.position.set(0, 0, 10);
//camera.position.set(envWidth/2, envHeight/2, 0);
camera.rotation.set(0, 0, 0);
//camera.lookAt(0, 0, 0);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


//initialize ALife renderer
console.log(`Initializing environment renderer`);
var environmentDisplay = new EnvironmentRenderer(environment, scene);


//add title text 
var titleText = new Text();
titleText.text = 'ALife Simulation';
titleText.fontSize = 10;
titleText.font = 'Arial';
titleText.color = '#ffffff';
//titleText.anchorX = (envWidth/2);
titleText.position.set((envWidth/2) - 40 , -10,  0);
scene.add(titleText);

//add test objects from utils 
scene.add(
    referenceRectangle([0,0,0], 'origin'), 
    referenceRectangle([envWidth/2, envHeight/2, 0], 'center'),
    referenceRectangle([envWidth, envHeight, 0], 'top right'),
    axisArrows()
    );

//add orbit controls
const controls = new OrbitControls( camera, renderer.domElement );


var previousMouseX = 0;
var mouseSpeed = 0;
var isStopped = false;


document.addEventListener("keydown", event => {

    switch (event.code) {
        case ('Space'):
            console.log('SPACE WAS PRESSED ');
            isStopped = !isStopped;
            console.log(`position: ${camera.position.x}, ${camera.position.y}, ${camera.position.z}`);
            console.log(`rotation: ${camera.rotation.x}, ${camera.rotation.y}, ${camera.rotation.z}`);
            break;
        case ('KeyW'):
            console.log('W was pressed');
            camera.position.y += 0.1;
            break;
        case ('KeyS'):
            console.log('S was pressed');
            camera.position.y -= 0.1;
            break;
        case ('KeyA'):
            console.log('A was pressed');
            camera.position.x -= 0.1;
            break;
        case ('KeyD'):
            console.log('D was pressed');
            camera.position.x += 0.1;
            break;
        default:
            break;
    }
});

//event listener for hovering 


//Render variable trackers
var frameTick = 0;

// Render loop
var simulation = new Simulation(environment);

var render = function() {
    console.log(`frame rendering`);
    //console.log(`FRAME: ${frameTick}`);
    requestAnimationFrame(render);


    if (!isStopped) {
        environmentDisplay.update();
    } else {
        return;
    }

    
    //cube.material.color = `(${(cube.position.x )},${cube.position.y},${cube.rotation.z})`;

    controls.update();
    //simulation.update();
    //console.log(cube.material.color);
    //pause rendering if space is pressed
    frameTick = (frameTick + 1)%60;
    renderer.render(scene, camera);
};

export default render;