import * as THREE from 'three';

export function createScene() {
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0a0a12, 0.015);
    return scene;
}