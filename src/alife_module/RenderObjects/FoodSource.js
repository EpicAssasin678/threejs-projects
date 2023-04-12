import * as THREE from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

export const foodSourceObject = (position, size, color=0x00ff00, ...decorationObjects) => {

    const geometry = new THREE.BoxGeometry(size, size, 1);
    const material = new THREE.MeshBasicMaterial({color: color});
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(position[0], position[1], position[2]);
    cube.rotation.set(0, 0, 0);
    cube.scale.set(1, 1, 1);

    var added = [];
    const group = new THREE.Group().add(cube, ...decorationObjects);

    //create a dom listener for the mouseover event on the group

    return group;
}
