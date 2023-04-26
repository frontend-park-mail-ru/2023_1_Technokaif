serviceWorkerOption = {
    skipWaiting: true,
    clientsClaim: true,
    assets: [
        '/dist/',
    ],
};

const { assets } = serviceWorkerOption;

// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('Fluire')
            .then((cache) => cache.addAll(assets)),
    );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            // eslint-disable-next-line max-len
            cacheNames.filter((cacheName) => cacheName !== 'Fluire').map((cacheName) => caches.delete(cacheName)),
        )),
    );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then((cachedResponse) => {
                if (navigator.onLine) {
                    return fetch(event.request).then((response) => {
                        if (!response?.ok || !response.method !== 'GET') {
                            return response;
                        }

                        const responseToCache = response.clone();

                        caches.open('Fluire')
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    });
                }
                if (cachedResponse) {
                    return cachedResponse;
                }
            })
            .catch((err) => {
                console.error(err.stack || err);
            }),
    );
});
