export function createAnimations({ chair }) {
    let chairAnimating = false;
    return {
        startChair() {
            if (!chairAnimating) chairAnimating = true;
        },
        update() {
            if (!chairAnimating) return;
            chair.position.x += 0.01;
            chair.position.z = chair.position.x ** 2 - 2.5 * chair.position.x;
            chair.rotation.y += 0.01;
            if (chair.position.x >= 1.6) chairAnimating = false;
        }
    };
}