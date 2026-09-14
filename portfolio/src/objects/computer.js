import * as THREE from 'three';

export async function createComputer(scene, loader) {
    const { screenTexture1, screenTexture2, screenTexture3 } = loader.textures;
    const monitorAsset = await loader.loadModel('models/computer_monitor.glb');
    monitorAsset.scene.position.set(0, -1.5, -4);
    monitorAsset.scene.scale.setScalar(0.3);
    monitorAsset.scene.rotation.y = -Math.PI / 2;
    scene.add(monitorAsset.scene);

    const screenMaterial = new THREE.MeshStandardMaterial({ color: 0x03fc07, map: screenTexture1, side: THREE.DoubleSide });
    const screen = new THREE.Mesh(new THREE.PlaneGeometry(1.5, 0.9), screenMaterial);
    screen.position.set(0, 0.15, -3.45);
    screen.scale.set(2.33, 2.45, 2);
    scene.add(screen);
    return { screen, screenMaterial, screenTextures: [screenTexture1, screenTexture2, screenTexture3] };
}