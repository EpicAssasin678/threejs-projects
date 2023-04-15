import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

export const foodSourceFactory = (foodSource, ...coords) => {

    const [x, y] = coords || [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)];

    let group = new THREE.Group().add(
        foodSourceObject([x, y, 0], foodSource.currentEnergy/100,  0x00ff00 , {
            type: 'foodSource',
            id: foodSource.id,
            size: foodSource.size,
            position: [x,y]
        })
    );
    return group;

} 

export const foodSourceObject = (position, size, color=0x00ff00, userData, ...decorationObjects) => {

    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshBasicMaterial({color: color});
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(...position);
    cube.rotation.set(0, 0, 0);
    cube.scale.set(1, 1, 1);

    var added = [];
    const group = new THREE.Group().add(cube, ...decorationObjects);

    group.userData = userData; 
    //create a dom listener for the mouseover event on the group

    return group;
}


class FoodSourceObject {

    constructor (foodSource, ...coords) {
        console.log(`Creating food source object for food source ${foodSource.id}`);


        this.foodSource = foodSource;
        
        const [x, y] = [...coords] || [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)];

        this.renderable = foodSourceObject([foodSource.x, foodSource.y, 0], foodSource.currentEnergy/100,  0x00ff00 , {
            type: 'foodSource',
            id: foodSource.id,
            size: foodSource.size,
            position: [foodSource.x,foodSource.y,0]
        });
    

    }


    renderableCreator () {

    }

    /**
     * Update method for the food source renderable 
     * 
     * Updates: x,y size 
     */
    update () {

        //update the position of the food source
        let scaleAmount = (this.foodSource.currentEnergy/this.foodSource.totalEnergy);
        
        


    }


}

export default FoodSourceObject;
