import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import Environment from './Environment/Environment.js';
import Herbivore from './Organisms/Herbivore.js';
import FoodSource from './Environment/FoodSource.js';
import EnvironmentRenderer from './ThreeJSRenderer/RenderObjects/EnvironmentRenderer.js';
import { Text } from 'troika-three-text';
import { axisArrows, referenceRectangle } from './ThreeJSRenderer/RenderObjects/renderUtils.js';
import Simulation from './Environment/Simulation.js';

/**
 * Author: darkf0xTV 
 * Rendering script for the alife module
 */




// ALife module initialization 
const [envWidth, envHeight] = [680, 680];
var environment = new Environment(envWidth, envHeight, 100000, 24);
var foodSourceMap = new Map();


//initialize food sources 
foodSourceMap.set([10, 8], new FoodSource(600, 600, 1, [10, 8]));
foodSourceMap.set([102, 94], new FoodSource(1000, 1000, 0.5, [102, 94]));
foodSourceMap.set([210, 160], new FoodSource(250, 250, 1, [210, 160]));
foodSourceMap.set([82, 437], new FoodSource(350, 350, 1, [82, 437]));
foodSourceMap.set([308, 16], new FoodSource(500, 500, 1, [308, 16]));
foodSourceMap.set([512, 300], new FoodSource(1200, 1200, 0.25, [512, 300]));
foodSourceMap.set([345, 600], new FoodSource(1200, 1200, 1 , [345, 600]));
foodSourceMap.set([600, 100], new FoodSource(1000, 1000, 0.5, [ 600, 100 ]));

console.log(foodSourceMap);
environment.initializeFoodSources(foodSourceMap);
//environment.addToEnvironment(foodSourceMap.get([10, 8]));

const organisms = [
    new Herbivore(150, 3600, 4, 30, 360, 4, [15, 8], environment),
    new Herbivore(100, 2000, 4, 10, 100, 4, [240, 162], environment),
    new Herbivore(80, 3000, 6, 10, 210, 6, [122, 108], environment),
    new Herbivore(180, 1500, 8, 10, 210, 6, [421, 130], environment),

]
//initialize organisms 

organisms.forEach( (organism) => {
    environment.addToEnvironment(organism);
})


/* environment.addToEnvironment(
    new Herbivore(100, 20, 4, 3, 100, 4, [531, 400], environment),
    new Herbivore(300, 20, 4, 3, 100, 4, [15, 8], environment),
    
    ); */
    
    /**
     new Herbivore(100, 20, 4, 3, 100, 4, [envWidth/2, envHeight/2], environment),
     new Herbivore(100, 20, 4, 4, 100, 4, [240, 162], environment),
     new Herbivore(240, 40, 2, 1, 210, 6, [122, 108], environment),
     new Herbivore(256, 40, 2, 1, 210, 6, [421, 130], environment),
     new Herbivore(350, 40, 2, 1, 210, 12, [300, 130], environment)
     * 
    */





// Create a Three.js scene
var scene = new THREE.Scene();

//todo eventually create a scale for the camera relative to environment size
//create a fixed camera with perspective in only x and y
//var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
//const camera = new THREE.OrthographicCamera(-window.innerWidth / 2, window.innerWidth / 2, window.innerHeight / 2, -window.innerHeight / 2, 1, 1000);
const camera = new THREE.OrthographicCamera(0, envWidth, envHeight, 0, 1, 10000 );


//set camera position to fixed
camera.rotation.set(0, 0, 0);
camera.position.set(0, 0, 10);
//camera.position.set(envWidth/2, envHeight/2, 0);
//camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


//initialize ALife renderer
console.log(`Initializing environment renderer`);
const environmentDisplay = new EnvironmentRenderer(environment, scene);






//add title text 
const titleText = new Text();
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
    
    );
    
//var simulation = new Simulation(environment);


//add orbit controls
const controls = new OrbitControls( camera, renderer.domElement );
controls.enableRotate = false;

const previousMouseX = 0;
let mouseSpeed = 0;
let isStopped = false;


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


// GUI creation 





// Render loop

let clock = new THREE.Clock();
let delta = 0;
// 30 fps
let interval = 1 / 30;

var render = function() {
    //console.log(`FRAME: ${frameTick}`);
    requestAnimationFrame(render);
    delta += clock.getDelta();

    if (delta > interval) {
        
        if (!isStopped) {
            environmentDisplay.update();
        } else {
            return;
        }
        
        delta = delta % interval;
    }
    
    controls.update();
    renderer.render(scene, camera);

    
    //cube.material.color = `(${(cube.position.x )},${cube.position.y},${cube.rotation.z})`;

    //simulation.update();
    //console.log(cube.material.color);
    //pause rendering if space is pressed
    frameTick = (frameTick + 1)%60;
};

export default render;