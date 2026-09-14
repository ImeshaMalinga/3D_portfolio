import { createRaycaster } from './raycaster.js';

export function createInteractions({ camera, lamp, computer, chair, animations }) {
    const canvas = document.querySelector('.canvas');
    const raycaster = createRaycaster(camera, canvas);
    canvas.addEventListener('click', (event) => {
        if (raycaster.intersect(event, lamp.model).length) {
            lamp.isOn = !lamp.isOn;
            lamp.light.intensity = lamp.isOn ? 60 : 0;
        }
        if (raycaster.intersect(event, computer.screen).length) {
            const [, second, third] = computer.screenTextures;
            computer.screenMaterial.map = second;
            setTimeout(() => { computer.screenMaterial.map = third; }, 5000);
            setTimeout(() => { computer.screenMaterial.map = computer.screenTextures[0]; }, 10000);
        }
        if (raycaster.intersect(event, chair.model).length) animations.startChair();
    });
}