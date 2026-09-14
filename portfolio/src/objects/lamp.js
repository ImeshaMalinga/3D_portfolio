import * as THREE from 'three';

export async function createLamp(scene, loader) {
    const asset = await loader.loadModel('models/tabel_lapm_-_lowpoly.glb');
    const model = asset.scene;
    model.position.set(-3, -1, -3.5);
    model.scale.setScalar(0.2);
    scene.add(model);

    const light = new THREE.PointLight(0xfff2e0, 0, 15);
    light.position.copy(model.position);
    scene.add(light);
    return { model, light, isOn: false };
}