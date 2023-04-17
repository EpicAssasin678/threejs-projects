import * as THREE from 'three';
import { Text } from 'troika-three-text';

export const referenceRectangle = (position, title) => {

    //create a rectangle with position (0, 0) and size (1, 1)
    const rect = new THREE.Mesh( 
        new THREE.PlaneGeometry(1, 1, 1, 1),
        new THREE.MeshBasicMaterial({color: 0xfffff, side: THREE.DoubleSide})
    );
    rect.position.set(position[0], position[1], position[2]);
    rect.rotation.set(0, 0, 0);
    rect.scale.set(1, 1, 1);

    //create text that says origin which has the same position as the rectangle
    const text = new Text();
    text.text = title || 'origin';
    text.fontSize = 10;
    text.font = 'Arial';   
    text.color = '#ffffff';
    text.position.set(position[0], position[1] , position[2]);
    text.anchorX = 'center';
    text.rotation.set(0, 0, 0);
    text.scale.set(1, 1, 1);

    //create a group to hold the rectangle and text
    const group = new THREE.Group();
    group.add(text, rect);

    return group;
}

export const movementTrail = (position) => {
    
    const rect = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 1, 1, 1),
        new THREE.MeshBasicMaterial({color: 0xc4e2f2, side: THREE.DoubleSide})
    )
    rect.position.set(...position);
    rect.rotation.set(0,0,0);
    rect.scale.set(1,1,1);
    return rect;
}

export const visionSweep = (position, option='RADIAL', radius, ) => {

    switch (option) {
        
        case 'RADIAL':
            let radialSweep = new THREE.Mesh( 
                new THREE.CircleGeometry(radius, radius * 2, Math.PI/4, Math.PI/2 ),
                new THREE.MeshBasicMaterial({color: 0xffdb9c, opacity: 1})
            );

            radialSweep.position.set(...position);
            radialSweep.rotation.set(0,0,0);
            radialSweep.scale.set(1,1,1);
            return radialSweep;

        default:

            return undefined;
    }
    
}

export const axisArrows = () => {
    //create a group to hold arrows for each axis 
    const group = new THREE.Group();
    
    /**
     const xArrowText = new Text();
     xArrowText.text = 'x';
     xArrowText.fontSize = 10;
     xArrowText.font = 'Arial';
     xArrowText.color = '#ff0000';
     xArrowText.anchorX = 'center';
     xArrowText.scale.set(1,1,1);
     * 
     */
    const xArrow = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), 1, 0xff0000);
    const yArrow = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), 1, 0x00ff00);
    const zArrow = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0), 1, 0x0000ff); 


    

    group.add(xArrow, yArrow, zArrow);
    group.scale.set(2,2,2);
    return group;
}


