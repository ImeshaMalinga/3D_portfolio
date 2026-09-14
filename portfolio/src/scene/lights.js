import * as THREE from 'three';

export function createLights(scene) {
    scene.add(new THREE.AmbientLight(0xfff4e5, 0.6));
    const sunlight = new THREE.DirectionalLight(0xfff4e5, 1.5);
    sunlight.position.set(5, 10, 7);
    sunlight.castShadow = true;
    sunlight.shadow.mapSize.set(2048, 2048);
    scene.add(sunlight);
    const ceilingLight = new THREE.PointLight(0xfff0dd, 40, 20);
    ceilingLight.position.set(0, 4, 0);
    ceilingLight.castShadow = true;
    scene.add(ceilingLight);
}