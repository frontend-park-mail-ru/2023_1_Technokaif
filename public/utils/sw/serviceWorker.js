import { NAMES } from '../config/config';

/**
 * Class for service worker
 */
export default class OurServiceWorker {
    /**
     * Variable for array of cache urls
     */
    #cacheData;

    /**
     * Initialize sw with listeners
     */
    constructor() {
        self.addEventListener('install', (event) => {
            event.waitUntil(
                caches.open(NAMES.nameOfApp)
                    .then((cache) => cache.addAll(this.#cacheData)),
            );
        });

        self.addEventListener('activate', (event) => {
            event.waitUntil(
                caches.keys().then((cacheNames) => Promise.all(
                    // eslint-disable-next-line max-len
                    cacheNames.filter((cacheName) => cacheName !== NAMES.nameOfApp).map((cacheName) => caches.delete(cacheName)),
                )),
            );
        });

        self.addEventListener('fetch', (event) => {
            event.respondWith(
                caches.match(event.request)
                    .then((cachedResponse) => {
                        if (navigator.onLine) {
                            return fetch(event.request);
                        }

                        if (cachedResponse) {
                            return cachedResponse;
                        }

                        return fetch(event.request);
                    })
                    .catch((err) => {
                        console.error(err.stack || err);
                    }),
            );
        });
    }

    /**
     * Register new cacheData folder.
     * @param folder
     */
    registerFolder(folder) {
        // eslint-disable-next-line global-require
        const fs = require('fs');

        fs.readdir(folder, (err, files) => {
            if (err) {
                console.error(err);
                return;
            }
            this.#cacheData.concat(files);
        });
    }

    /**
     * Register service worker and start work
     */
    start() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/serviceWorker.js', { scope: '/' })
                .then((registration) => {
                    // eslint-disable-next-line no-console
                    console.log('Service Worker registered:', registration);
                })
                .catch((error) => {
                    console.error('Service Worker registration failed:', error);
                });
        }
    }
}
