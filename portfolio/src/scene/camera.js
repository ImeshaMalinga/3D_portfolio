import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export function createCamera() {
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 10;
    const controls = new OrbitControls(camera, document.querySelector('.canvas'));
    controls.minDistance = 4;
    controls.maxDistance = 80;
    controls.update();
    return { camera, controls };
}