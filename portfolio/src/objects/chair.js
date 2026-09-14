export async function createChair(scene, loader) {
    const asset = await loader.loadModel('models/chair.glb');
    const model = asset.scene;
    model.position.set(0, -4.5, 0);
    model.scale.setScalar(0.3);
    model.rotation.y = 3 * Math.PI / 4;
    scene.add(model);
    return { model };
}