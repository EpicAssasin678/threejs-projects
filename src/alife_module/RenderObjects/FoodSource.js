import * as THREE from 'three';

export const foodSourceObject = (position, size, color) => {

    const geometry = new THREE.BoxGeometry(size, size, 1);
    const material = new THREE.MeshBasicMaterial({color: color});
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(position[0], position[1], position[2]);
    cube.rotation.set(0, 0, 0);
    cube.scale.set(1, 1, 1);
    
    return cube;
}