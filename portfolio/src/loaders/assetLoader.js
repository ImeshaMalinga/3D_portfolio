import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { createLoadingScreen } from '../ui/loadingScreen.js';

export function createAssetLoader() {
    const loadingManager = new THREE.LoadingManager();
    createLoadingScreen(loadingManager);

    const textureLoader = new THREE.TextureLoader(loadingManager);
    const textures = {
        wallTexture: textureLoader.load('blank-concrete-white-wall-texture-background.jpg'),
        floorTexture: textureLoader.load('stone_pathway_02_4k.blend/textures/stone_pathway_02_diff_4k.jpg'),
        backgroundTexture: textureLoader.load('beautiful-shining-stars-night-sky.jpg'),
        aboutTexture: textureLoader.load('About_page.png'),
        screenTexture1: textureLoader.load('Monitor_1.png'),
        screenTexture2: textureLoader.load('Monitor_2.png'),
        screenTexture3: textureLoader.load('Monitor_3.png')
    };
    const gltfLoader = new GLTFLoader(loadingManager);
    return {
        textures,
        loadModel: (path) => gltfLoader.loadAsync(path),
        configureTextures(renderer) {
            Object.values(textures).forEach((texture) => {
                texture.colorSpace = THREE.SRGBColorSpace;
                texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
            });
        }
    };
}