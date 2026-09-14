export async function createEnvironmentObjects(scene, loader) {
    const placements = [
        ['models/potted_plant_01.glb', [7, -4.5, 10], [5, 5, 5]],
        ['models/Tree.glb', [15, -4.5, 8], [2, 2, 2]],
        ['models/Tree.glb', [19, -4.5, 12], [2, 2, 3]],
        ['models/Tree.glb', [-20, -4.5, -20], [3, 3, 3]],
        ['models/dodge_black.glb', [-18, -4.5, 7], [0.015, 0.015, 0.015]],
        ['models/office_table_desk.glb', [0, -4.5, -4], [4.5, 3, 3]],
        ['models/bookshelf.glb', [6, -1.5, -3], [2, 3, 2]]
    ];

    const models = {};
    for (const [path, position, scale] of placements) {
        const key = path.split('/').pop().split('.')[0];
        const asset = await loader.loadModel(path);
        asset.scene.position.set(...position);
        asset.scene.scale.set(...scale);
        scene.add(asset.scene);
        models[key] = asset.scene;
    }
    return models;
}