import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

//add camera to the scene
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.y = 5;
scene.add(camera);

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
const wallMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
wallMaterial.map = wallTexture;


//add a background
backgroundTexture.repeat.set(2, 2);
backgroundTexture.RepeatWrapping = THREE.MirroredRepeatWrapping;
backgroundTexture.wrapS = THREE.RepeatWrapping;
backgroundTexture.wrapT = THREE.RepeatWrapping;
scene.background = backgroundTexture;

//add floor to the scene
const floorGeometry = new THREE.PlaneGeometry(100, 100);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513, side: THREE.DoubleSide });

floorTexture.repeat.set(40, 40);
floorTexture.wrapS = THREE.RepeatWrapping;
floorTexture.wrapT = THREE.RepeatWrapping;

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


//Add ceiling to the scene
const ceilingMesh = new THREE.Mesh(wallGeometry, wallMaterial)
ceilingMesh.position.set(0, 4.5, 0);
ceilingMesh.rotation.x = Math.PI/2;
scene.add(ceilingMesh);

//Add a plant pot in to the scene
const loader = new GLTFLoader();
const gltf = await loader.loadAsync( '../public/models/potted_plant_01.glb' );
scene.add(gltf.scene);
gltf.scene.position.set(10, -4.5, 0);
gltf.scene.scale.set(5, 5, 5);
console.log(gltf.scene);

//Add Lamp to the scene and make it clikable to turn on and off the light
const lamp = await loader.loadAsync('../public/models/tabel_lapm_-_lowpoly.glb');
scene.add(lamp.scene);
lamp.scene.scale.set(0.2, 0.2, 0.2);
lamp.scene.position.set(-3, -1, -3.5);
const lampLigth = new THREE.PointLight(0xfff2e0, 30, 15);
scene.add(lampLigth);
lampLigth.position.copy(lamp.scene.position);


const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let lampOn = true;

window.addEventListener('click', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObject(lamp.scene, true);

        if (intersects.length > 0) {
            lampOn = !lampOn;
            lampLigth.intensity = lampOn ? 60 : 0;
            console.log('Lamp toggled:', lampOn);
        }
});

//Add table to the scene
const table = await loader.loadAsync('../public/models/office_table_desk.glb');
table.scene.position.set(-1, -4.5, -4);
table.scene.scale.set(3, 3, 3);
scene.add(table.scene);


//Add monitor to the scene
const monitor = await loader.loadAsync('../public/models/psx_monitor.glb');
monitor.scene.position.set(-0.3, -1.7, -4);
monitor.scene.scale.set(5,5,5);
scene.add(monitor.scene);

// Soft overall light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

// Main light (sunlight)
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);

// Light from ceiling (like a bulb)
const ceilingLight = new THREE.PointLight(0xffffff, 100, 0);
ceilingLight.position.set(0, 4, 0);
scene.add(ceilingLight);

//render the scene with given camera
const canvas = document.querySelector('.canvas');
const renderer = new THREE.WebGLRenderer({ canvas }, { antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.render(scene, camera);

const eventloop = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(eventloop);
    renderer.setSize(window.innerWidth, window.innerHeight);

};

eventloop();

