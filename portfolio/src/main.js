import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

//add camera to the scene
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;
scene.add(camera);

//add controls
const controls = new OrbitControls(camera, document.querySelector('.canvas'));
controls.maxDistance = 300;
controls.update();

//texture loader
const textureLoader = new THREE.TextureLoader();
const wallTexture = textureLoader.load('blank-concrete-white-wall-texture-background.jpg');
const floorTexture = textureLoader.load('stone_pathway_02_4k.blend/textures/stone_pathway_02_diff_4k.jpg');
const backgroundTexture = textureLoader.load('beautiful-shining-stars-night-sky.jpg');
const AboutTexture = textureLoader.load('About_page.png'); 
const screenTexture_1 = textureLoader.load('Monitor_1.png');
const screenTexture_2 = textureLoader.load('Monitor_2.png');
const screenTexture_3 = textureLoader.load('Monitor_3.png');


// Define wall geometry and material
const wallGeometry = new THREE.BoxGeometry(15, 10, 1);
const wallMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 });
wallMaterial.map = wallTexture;


//add a background
backgroundTexture.repeat.set(2, 2);
backgroundTexture.RepeatWrapping = THREE.RepeatWrapping;
backgroundTexture.wrapS = THREE.RepeatWrapping;
backgroundTexture.wrapT = THREE.RepeatWrapping;
scene.background = backgroundTexture;

//add floor to the scene
const floorGeometry = new THREE.BoxGeometry(300, 300, 2);
const floorMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513, side: THREE.DoubleSide });

floorTexture.repeat.set(40, 40);
floorTexture.wrapS = THREE.RepeatWrapping;
floorTexture.wrapT = THREE.RepeatWrapping;

floorMaterial.map = floorTexture;
const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
floorMesh.position.set(0, -5.5, 0);
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
        name: 'wall3',
        x: 7.5,
        y: 0,
        z: 0,
        rotation: Math.PI / 2
    },
    {
        name: 'wall4',
        x: -7.5,
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
const pot = await loader.loadAsync( 'models/potted_plant_01.glb' );
scene.add(pot.scene);
pot.scene.position.set(7,-4.5, 10);
pot.scene.scale.set(5, 5, 5);

//Add trees in the scene
const tree1 = await loader.loadAsync('models/Tree.glb');
scene.add(tree1.scene);
tree1.scene.position.set(15, -4.5, 8);
tree1.scene.scale.set(2, 2, 2);

const tree2 = await loader.loadAsync('models/Tree.glb');
scene.add(tree2.scene);
tree2.scene.position.set(19, -4.5, 12);
tree2.scene.scale.set(2, 2, 3);

const tree3 = await loader.loadAsync('models/Tree.glb');
scene.add(tree3.scene);
tree3.scene.position.set(-20, -4.5,-20);
tree3.scene.scale.set(3, 3, 3);

// Add car to the scene
const car = await loader.loadAsync('models/dodge_black.glb');
scene.add(car.scene);
car.scene.position.set(-18, -4.5,7)
car.scene.scale.set(0.015, 0.015, 0.015);

console.log(car.scene);

//Add Lamp to the scene and make it clikable to turn on and off the light
const lamp = await loader.loadAsync('models/tabel_lapm_-_lowpoly.glb');
scene.add(lamp.scene);
lamp.scene.scale.set(0.2, 0.2, 0.2);
lamp.scene.position.set(-3, -1, -3.5);
const lampLight = new THREE.PointLight(0xfff2e0, 0 , 15);
scene.add(lampLight);
lampLight.position.copy(lamp.scene.position);

//Add table to the scene
const table = await loader.loadAsync('models/office_table_desk.glb');
table.scene.position.set(0, -4.5, -4);
table.scene.scale.set(4.5, 3, 3);
scene.add(table.scene);

//Add monitor to the scene
const monitor = await loader.loadAsync('models/computer_monitor.glb');
monitor.scene.position.set(0, -1.5, -4);
monitor.scene.scale.set(0.3, 0.3, 0.3);
monitor.scene.rotation.y = -Math.PI / 2;
scene.add(monitor.scene);

//Add chair to the scene
const chair = await loader.loadAsync('models/chair.glb');
chair.scene.position.set(0, -4.5, 0);
chair.scene.scale.set(0.3, 0.3, 0.3);
chair.scene.rotation.y = 3 * Math.PI / 4;
scene.add(chair.scene);

// Add a bookshelf to the scene
const bookshelf = await loader.loadAsync('models/bookshelf.glb');
bookshelf.scene.position.set(6, -1.5, -3);
bookshelf.scene.scale.set(2, 3, 2);
scene.add(bookshelf.scene);

// Add a plane to the monitor screen
const screenGeometry = new THREE.PlaneGeometry(1.5, 0.9);
const screenMaterial = new THREE.MeshStandardMaterial({ color: 0x03fc07, side: THREE.DoubleSide });
screenMaterial.map = screenTexture_1;
const screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);
screenMesh.position.set(0, 0.15, -3.45);
screenMesh.scale.set(2.33,2.45,2);
scene.add(screenMesh);

// Soft overall light
const ambientLight = new THREE.AmbientLight(0xfff4e5, 0.6);
scene.add(ambientLight);

// Main light (sunlight)
const directionalLight = new THREE.DirectionalLight(0xfff4e5, 1.5);
directionalLight.position.set(5, 10, 7);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(2048, 2048);
scene.add(directionalLight);

// Light from ceiling (like a bulb)
const ceilingLight = new THREE.PointLight(0xfff0dd, 40, 20);
ceilingLight.position.set(0, 4, 0);
ceilingLight.castShadow = true;
scene.add(ceilingLight);

//Add plane to one of wall to display the portfolio
const planeGeometry = new THREE.PlaneGeometry(6, 3.5);
const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide ,opacity: 10, transparent: false});
planeMaterial.map = AboutTexture;
const AboutScreenMesh = new THREE.Mesh(planeGeometry, planeMaterial);
AboutScreenMesh.position.set(-6.9, 0, 2);
AboutScreenMesh.rotation.y = Math.PI / 2;
AboutScreenMesh.scale.set(1.4, 1.4, 1);
scene.add(AboutScreenMesh);

scene.fog = new THREE.FogExp2(0x0a0a12, 0.015); // subtle depth

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let lampOn = false;
let chairAnimating = false;

// Event listener for mouse clicks
window.addEventListener('click', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(lamp.scene, true);

    if (intersects.length > 0) {
        lampOn = !lampOn;
        lampLight.intensity = lampOn ? 60 : 0;
        console.log('Lamp toggled:', lampOn);
    }
    
    const intersectsScreen = raycaster.intersectObject(screenMesh, true);
    if (intersectsScreen.length > 0) {
        screenMaterial.map = screenTexture_2; 
        setTimeout(() => {
            screenMaterial.map = screenTexture_3; 
        }, 5000);
        setTimeout(() => {
            screenMaterial.map = screenTexture_1; 
        },10000);
    }

    const intersectsChair = raycaster.intersectObject(chair.scene, true);

    if (intersectsChair.length > 0 && !chairAnimating) {
        chairAnimating = true;
    }
});

//render the scene with given camera and polish the scene
const canvas = document.querySelector('.canvas');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

[screenTexture_1, screenTexture_2, screenTexture_3, AboutTexture, wallTexture, floorTexture]
  .forEach(t => {
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = renderer.capabilities.getMaxAnisotropy();
  });

renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.render(scene, camera);

console.log(chair.scene.position.x, chair.scene.position.z);

const eventloop = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(eventloop);
    renderer.setSize(window.innerWidth, window.innerHeight);

    if (chairAnimating) {
        chair.scene.position.x += 0.01;
        chair.scene.position.z = chair.scene.position.x * chair.scene.position.x - 2.5* chair.scene.position.x;
        chair.scene.rotation.y += 0.01; // optional: rotate smoothly
        console.log(chair.scene.position.x, chair.scene.position.z);
        if(chair.scene.position.x >= 1.6) {
            chairAnimating = false;
        }
    }

};

eventloop();

