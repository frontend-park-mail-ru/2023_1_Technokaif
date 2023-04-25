/**
 * Register sw in project
 */
export default function serviceWorkerRegistration() {
    window.addEventListener('load', () => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/serviceWorker.js')
                .then((registration) => {
                    // eslint-disable-next-line no-console
                    console.log('Service Worker registered:', registration);
                })
                .catch((error) => {
                    console.error('Service Worker registration failed:', error);
                });
        }
    });
}
