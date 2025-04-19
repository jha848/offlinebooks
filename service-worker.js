const CACHE_NAME = 'maharashtra-textbooks-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/manifest.json',
    // Add other assets like icons here
    '/icons/icon-72x72.png',
    '/icons/icon-96x96.png',
    '/icons/icon-128x128.png',
    '/icons/icon-144x144.png',
    '/icons/icon-152x152.png',
    '/icons/icon-192x192.png',
    '/icons/icon-384x384.png',
    '/icons/icon-512x512.png',
    // Add paths to PDFs if you want them cached immediately
    // This should be dynamically updated based on user access patterns
];

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - return response
                if (response) {
                    return response;
                }
                
                // Clone the request
                const fetchRequest = event.request.clone();
                
                return fetch(fetchRequest).then(
                    response => {
                        // Check if we received a valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Clone the response
                        const responseToCache = response.clone();
                        
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                // Cache only GET requests and PDFs
                                if (event.request.method === 'GET' && 
                                    (event.request.url.endsWith('.pdf') || 
                                    event.request.url.includes('textbooks/') || 
                                    event.request.url.includes('solutions/'))) {
                                    cache.put(event.request, responseToCache);
                                }
                            });
                        
                        return response;
                    }
                ).catch(() => {
                    // If fetch fails, return a custom offline page or cached response
                    if (event.request.url.endsWith('.pdf')) {
                        return caches.match('/offline-pdf.html');
                    }
                    return caches.match('/offline.html');
                });
            })
    );
});

self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});