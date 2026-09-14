import * as THREE from 'three';

export function createRaycaster(camera, canvas) {
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    return {
        intersect(event, object) {
            const bounds = canvas.getBoundingClientRect();
            pointer.x = ((event.clientX - bounds.left) / bounds.width) * 2 - 1;
            pointer.y = -((event.clientY - bounds.top) / bounds.height) * 2 + 1;
            raycaster.setFromCamera(pointer, camera);
            return raycaster.intersectObject(object, true);
        }
    };
}