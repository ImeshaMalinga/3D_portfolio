import * as THREE from 'three';

export function createEnvironment(scene, textures) {
    const { wallTexture, floorTexture, backgroundTexture, aboutTexture } = textures;
    backgroundTexture.repeat.set(2, 2);
    backgroundTexture.wrapS = THREE.RepeatWrapping;
    backgroundTexture.wrapT = THREE.RepeatWrapping;
    scene.background = backgroundTexture;

    floorTexture.repeat.set(40, 40);
    floorTexture.wrapS = THREE.RepeatWrapping;
    floorTexture.wrapT = THREE.RepeatWrapping;
    const floor = new THREE.Mesh(
        new THREE.BoxGeometry(300, 2, 300),
        new THREE.MeshStandardMaterial({ color: 0x8b4513, map: floorTexture })
    );
    floor.position.set(0, -5.5, 0);
    scene.add(floor);

    const wallGeometry = new THREE.BoxGeometry(15, 10, 1);
    const wallMaterial = new THREE.MeshStandardMaterial({ color: 0x808080, map: wallTexture });
    [[0, 0, -7, 0], [7.5, 0, 0, Math.PI / 2], [-7.5, 0, 0, Math.PI / 2]].forEach(([x, y, z, rotation]) => {
        const wall = new THREE.Mesh(wallGeometry, wallMaterial);
        wall.position.set(x, y, z);
        wall.rotation.y = rotation;
        scene.add(wall);
    });

    const ceiling = new THREE.Mesh(wallGeometry, wallMaterial);
    ceiling.position.set(0, 4.5, -2);
    ceiling.rotation.x = Math.PI / 2;
    scene.add(ceiling);

    const aboutScreen = new THREE.Mesh(
        new THREE.PlaneGeometry(6, 3.5),
        new THREE.MeshStandardMaterial({ color: 0xffffff, map: aboutTexture, side: THREE.DoubleSide })
    );
    aboutScreen.position.set(-6.9, 0, 2);
    aboutScreen.rotation.y = Math.PI / 2;
    aboutScreen.scale.setScalar(1.4);
    scene.add(aboutScreen);
}