export function createLoadingScreen(loadingManager) {
    const loadingScreen = document.getElementById('loading-screen');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');

    loadingManager.onProgress = (url, loaded, total) => {
        const progress = (loaded / total) * 100;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${Math.round(progress)}%`;
    };

    loadingManager.onLoad = () => {
        progressBar.style.width = '100%';
        progressText.textContent = '100%';
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            setTimeout(() => { loadingScreen.style.display = 'none'; }, 1000);
        }, 500);
    };

    loadingManager.onError = (url) => console.error(`Failed to load ${url}`);
}