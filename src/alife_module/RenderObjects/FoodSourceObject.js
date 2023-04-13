import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

export const foodSourceFactory = (foodSource, ...coords) => {

    const [x, y] = coords || [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)];

    return foodSourceObject([x, y], foodSource.size,  0x00ff00 , {
        type: 'foodSource',
        id: foodSource.id,
        size: foodSource.size,
        position: [x,y]
    });

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
        this.foodSource = foodSource;
        
        const [x, y] = [...coords] || [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)];
        this.renderable = foodSourceObject([x, y], foodSource.size,  0x00ff00 , {
            type: 'foodSource',
            id: foodSource.id,
            size: foodSource.size,
            position: [x,y]
        });
    

    }

    /**
     * Update method for the food source renderable 
     * 
     * Updates: x,y size 
     */
    update () {

        //update the position of the food source
        let scaleAmount = (this.foodSource.currentEnergy / 10) % 100;
        this.renderable.scale.set(scaleAmount, scaleAmount, scaleAmount);
        

    }


}

export default FoodSourceObject;
