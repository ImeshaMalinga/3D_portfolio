import * as THREE from 'three';
import { createCamera } from './scene/camera.js';
import { createScene } from './scene/scene.js';
import { createEnvironment } from './scene/environment.js';
import { createLights } from './scene/lights.js';
import { createAssetLoader } from './loaders/assetLoader.js';
import { createEnvironmentObjects } from './objects/environment.js';
import { createLamp } from './objects/lamp.js';
import { createChair } from './objects/chair.js';
import { createComputer } from './objects/computer.js';
import { createInteractions } from './interactions/interactions.js';
import { createAnimations } from './animation/animations.js';

const canvas = document.querySelector('.canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
const assetLoader = createAssetLoader();
const scene = createScene();
const { camera, controls } = createCamera();

scene.add(camera);
createEnvironment(scene, assetLoader.textures);
createLights(scene);
await createEnvironmentObjects(scene, assetLoader);
const lamp = await createLamp(scene, assetLoader);
const chair = await createChair(scene, assetLoader);
const computer = await createComputer(scene, assetLoader);
const animations = createAnimations({ chair: chair.model });

createInteractions({ camera, lamp, computer, chair, animations });
assetLoader.configureTextures(renderer);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const resize = () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
};

window.addEventListener('resize', resize);
resize();

const render = () => {
    controls.update();
    animations.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(render);
};

render();
