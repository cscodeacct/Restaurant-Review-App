const cacheMe = 'restaurant-static-v1';
const RUNTIME = 'runtime';

// A list of local resources to be cached.
const cacheMe_urls = [
	'/index.html',
	'/restaurant.html',
	'/css/styles.css',
	'/data/restaurants.json',
	'/js/dbhelper.js',
	'/js/main.js',
	'/js/restaurant_info.js',
	'/js/sw_reg.js',
	'/img/1.jpg',
	'/img/2.jpg',
	'/img/3.jpg',
	'/img/4.jpg',
	'/img/5.jpg',
	'/img/6.jpg',
	'/img/7.jpg',
	'/img/8.jpg',
	'/img/9.jpg',
	'/img/10.jpg'
];
// Credit to Google
self.addEventListener('install', event => {
	event.waitUntil(
		caches.open(cacheMe)
		.then(cache => cache.addAll(cacheMe_urls))
		.then(self.skipWaiting())
	);
});

self.addEventListener('activate', event => {
	const currentCaches = [cacheMe, RUNTIME];
	event.waitUntil(
		caches.keys().then(cacheNames => {
			return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
		}).then(cachesToDelete => {
			return Promise.all(cachesToDelete.map(cacheToDelete => {
				return caches.delete(cacheToDelete);
			}));
		}).then(() => self.clients.claim())
	);
});

self.addEventListener('fetch', event => {
		if (event.request.url.startsWith(self.location.origin)) {
		event.respondWith(
			caches.match(event.request).then(cachedResponse => {
				if (cachedResponse) {
					return cachedResponse;
				}

				return caches.open(RUNTIME).then(cache => {
					return fetch(event.request).then(response => {
					return cache.put(event.request, response.clone()).then(() => {
							return response;
						});
					});
				});
			})
		);
	}
});