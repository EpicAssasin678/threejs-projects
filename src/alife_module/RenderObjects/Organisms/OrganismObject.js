import * as THREE from 'three';
import EnvironmentRender from '../EnvironmentRenderer';


export const organismFactory = (organism, ...coords) => {
    const [x, y] = coords || [Math.floor(Math.random() * 100), Math.floor(Math.random() * 100)];
    return organismObject([x , y], organism.size, organism.color, {
        type: 'organism',
        id: organism.id,
        size: organism.size,
        position: [x,y]
    });
}

export const organismObject = (position, size, color=0xf55a42, userData) => {
    //todo add parameter with species decorations/style map and generatively creates a unique design

    //const geometry = new THREE.BoxGeometry(size, size, size);
    const geometry = new THREE.ShapeGeometry( 
        new THREE.Shape([ 
            new THREE.Vector2(0, 0), 
            new THREE.Vector2(size/2, 0),
            new THREE.Vector2(size/2, size),
            new THREE.Vector2(size/4, 1.25*size), 
            new THREE.Vector2(0, size) 
        ])
    
    );
    
    const material = new THREE.MeshBasicMaterial({color: color, wireframe: true});
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(...position);
    cube.rotation.set(0, 0, 0);
    cube.scale.set(1, 1, 1);

    const group = new THREE.Group().add(cube);
    group.matrixAutoUpdate = true;

    group.userData = userData;

    return group;

}


class OrganismObject  {

    constructor (organism, ...coords) {
        this.organism = organism;
        this.renderable = organismFactory(organism, [...coords]);

        this.renderable.addEventListener('update', this.update);
    }

    getDataObject () {
        return this.renderable.userData;
    }

    update() {

        //update render applicable properties of the mutated data 
        this.renderable.position.x = this.organism.x;
        this.renderable.position.y = this.organism.y;
        this.renderable.userData.position = [this.organism.x, this.organism.y];


    }
    
}

export default OrganismObject;


/**
 * 
 * 
 * 
 * 
 * 
 * 
 * 



export const organismFactory = (organism, ...coords) => {
    const [x, y] = coords;
    return organismObject([x || Math.floor(Math.random() * 100), y || Math.floor(Math.random() * 100)], organism.size, organism.color);
}

export const organismObject = (position, size, color=0xf55a42, ...Decorations) => {
    //todo add parameter with species decorations/style map and generatively creates a unique design

    //const geometry = new THREE.BoxGeometry(size, size, size);
    const geometry = new THREE.ShapeGeometry( 
        new THREE.Shape([ 
            new THREE.Vector2(0, 0), 
            new THREE.Vector2(size/2, 0),
            new THREE.Vector2(size/2, size),
            new THREE.Vector2(size/4, 1.25*size), 
            new THREE.Vector2(0, size) 
    ])
    
    );

    
    const material = new THREE.MeshBasicMaterial({color: color, wireframe: true});
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(...position);
    cube.rotation.set(0, 0, 0);
    cube.scale.set(1, 1, 1);

    const group = new THREE.Group().add(cube);
    group.matrixAutoUpdate = true;

    group.userData = {
        type: 'organism',
        size: size,
        color: color,
        position: position
    }

    return group;

}

 */