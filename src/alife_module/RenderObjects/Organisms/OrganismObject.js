import * as THREE from 'three';
import EnvironmentRender from '../EnvironmentRenderer';


export const organismFactory = (organism, ...coords) => {
    const [x, y] = coords || [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
    return organismObject([x , y, 0], organism.size, organism.color, {
        type: 'organism',
        id: organism.id,
        size: organism.size,
        position: [x,y,0]
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
    
    const material = new THREE.MeshBasicMaterial({color: color});
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(...position);
    cube.rotation.set(0, 0, 0);
    cube.scale.set(1, 1, 1);

    const group = new THREE.Group().add(cube);
    group.matrixAutoUpdate = true;

    group.userData = userData || {};

    return group;

}


class OrganismObject  {

    constructor (organism, ...coords) {
        this.organism = organism;

        const [x, y] = [...coords] || [organism.x, organism.y] || [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
        
        this.renderable = organismObject([organism.x, organism.y, 0], organism.size, 0xf55a42, {        
        type: 'organism',
        id: organism.id,
        size: organism.size,
        position: [organism.x,organism.y,0]
        });


    }

    getDataObject () {
        return this.renderable.userData;
    }

    update() {

        //update render applicable properties of the mutated data 
        //this.renderable.position.set(this.organism.x, this.organism.y, 0);
        this.renderable.translateX(this.organism.x - this.renderable.position.x);
        this.renderable.translateY(this.organism.y - this.renderable.position.y);
        this.renderable.userData.position = [this.organism.x, this.organism.y, 0];

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