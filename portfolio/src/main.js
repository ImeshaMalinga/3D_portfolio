import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();

//add camera to the scene
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 5;
scene.add(camera);

//add light to the scene
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

//add controls
const controls = new OrbitControls(camera, document.querySelector('.canvas'));
controls.update();


//texture loader
const textureLoader = new THREE.TextureLoader();
const wallTexture = textureLoader.load('../public/blank-concrete-white-wall-texture-background.jpg');
const floorTexture = textureLoader.load('../public/stone_pathway_02_4k.blend/textures/stone_pathway_02_diff_4k.jpg');
const backgroundTexture = textureLoader.load('../public/beautiful-shining-stars-night-sky.jpg');

// Define wall geometry and material
const wallGeometry = new THREE.BoxGeometry(10, 10, 1);
const wallMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });
wallMaterial.map = wallTexture;

//add a background
scene.background = backgroundTexture;

//add floor to the scene
const floorGeometry = new THREE.PlaneGeometry(100, 100);
const floorMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });

floorMaterial.map = floorTexture;
const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
floorMesh.position.set(0, -4.5, 0);
floorMesh.rotation.x = -Math.PI / 2;
scene.add(floorMesh);

//Add all wall to the scene
const walls = [
    {
        name: 'wall1',
        x: 0,
        y: 0,
        z: -5,
        rotation: 0
    },
    {
        name: 'wall2',
        x: 0,
        y: 0,
        z: 5,
        rotation: 0
    },
    {
        name: 'wall3',
        x: 4.5,
        y: 0,
        z: 0,
        rotation: Math.PI / 2
    },
    {
        name: 'wall4',
        x: -4.5,
        y: 0,
        z: 0,
        rotation: Math.PI / 2
    }
]

const wallMeshes = walls.map(wall => {
    const wallMesh = new THREE.Mesh(wallGeometry, wallMaterial);
    wallMesh.position.set(wall.x, wall.y, wall.z);
    wallMesh.rotation.y = wall.rotation;
    scene.add(wallMesh);
    return wallMesh;
});

const ceilingMesh = new THREE.Mesh(wallGeometry, wallMaterial)
ceilingMesh.position.set(0, 4.5, 0);
ceilingMesh.rotation.x = Math.PI/2;
scene.add(ceilingMesh);

//render the scene with given camera
const canvas = document.querySelector('.canvas');
const renderer = new THREE.WebGLRenderer({ canvas }, { antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.render(scene, camera);

const eventloop = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(eventloop);
}

eventloop();

console.log(canvas);
