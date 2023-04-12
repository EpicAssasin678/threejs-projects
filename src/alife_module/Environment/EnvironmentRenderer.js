import * as THREE from 'three';
import Environment from './Environment';
import { foodSourceObject } from '../RenderObjects/FoodSource';
import {Text} from 'troika-three-text';

class EnvironmentRender {

    /**
     * 
     * @param {Environment} environment Environment object to render
     * @param {THREE.Scene} scene THREE.js scene object
     */
    constructor(environment, scene) {
        this.environment = environment;
        this.scene = scene;

        //initialize methods
        this.initEnvironmentForeground();
        this.initializeEnvironmentObjects();
        
            
        console.log(`[ENVIRONMENT RENDERER] Environment rendered. [${this.environment.width} x ${this.environment.height}]`);
        console.log(this.environment.objects);
    }
        
    initEnvironmentForeground() {
        //add a line to the scene the width of the environment
        let points = [];
        points.push(new THREE.Vector3(0, 0, 0));
        points.push(new THREE.Vector3(this.environment.width, 0, 0));
        const widthLineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const lineMaterial = new THREE.LineBasicMaterial({color: 0xFFFFFF});
        this.scene.add(new THREE.Line(widthLineGeometry, lineMaterial));
        //add a line to scene for the height of the environment
        let points2 = [];
        points2.push(new THREE.Vector3(0, 0, 0));
        points2.push(new THREE.Vector3(0, this.environment.height, 0));
        const heightLineGeometry = new THREE.BufferGeometry().setFromPoints(points2);
        this.scene.add(new THREE.Line(heightLineGeometry, lineMaterial));
        
        let points3 = [];
        points3.push(new THREE.Vector3(0, this.environment.height, 0));
        points3.push(new THREE.Vector3(this.environment.width, this.environment.height, 0));
        const widthLineGeometry2 = new THREE.BufferGeometry().setFromPoints(points3);
        this.scene.add(new THREE.Line(widthLineGeometry2, lineMaterial));

        let points4 = [];
        points4.push(new THREE.Vector3(this.environment.width, this.environment.height, 0));
        points4.push(new THREE.Vector3(this.environment.width, 0, 0));
        const heightLineGeometry2 = new THREE.BufferGeometry().setFromPoints(points4);
        this.scene.add(new THREE.Line(heightLineGeometry2, lineMaterial));
        //create a square for each tile in the environment
        this.tiles = [];
        

    }

    initializeEnvironmentObjects() {

        this.foodSources = [];
        this.environment.objects.foodSources.forEach(foodSource => {
            
            this.scene.add(foodSourceObject([foodSource.x, foodSource.y, 0], foodSource.currentEnergy / 100, 0x00ff00, 
            () => {
                //Text decoration to the food source
                const text = new Text();
                text.text = `food source ${foodSource.id}`;
                text.fontSize = 0.5;
                //white text color 
                text.color = 0xffffff;
                text.font = 'Arial';
                text.position.set(foodSource.x, foodSource.y, 0);
                text.anchorX = 'center';
                return text;
                
            }));
            console.log(`[ENVIRONMENT RENDERER] Food source rendered at [${foodSource.x}, ${foodSource.y}]`);

        });


        //create a shape for each organism in the environment
        this.organisms = [];
        this.environment.objects.organisms.forEach(organism => {
            //const organismGeometry = new THREE.BoxGeometry(1, 1, 1);
            //create a shape for the organism with respect to its size
            const organismGeometry = new THREE.ShapeGeometry( 
                new THREE.Shape([ 
                    new THREE.Vector2(0, 0), 
                    new THREE.Vector2(organism.size, 0), 
                    new THREE.Vector2(organism.size, organismref.size), 
                    new THREE.Vector2(0, organism.size) 
                ])
                );
                
                const organismMaterial = new THREE.MeshBasicMaterial({color: 0xff0000}); //red color
                const organismMesh = new THREE.Mesh(organismGeometry, organismMaterial);
                organismMesh.position.set(organism.x, organism.y, 0);
                this.scene.add(organismMesh);
        });
    }

    update() {

    }
}

export default EnvironmentRender;