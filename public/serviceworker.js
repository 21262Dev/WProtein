// let cacheName = 'wprotein-cache-v1.0.8';
// let dynamicCacheName = "site-cache-wp-v1.0.8"
// let assets = [
//     '/',
//     '/offline.html',
//     '/index.html',
//     'https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@1,800;1,900&family=Inter:wght@200;300;400;500;600&display=swap'
// ]
// //self = this
// self.addEventListener("install", (e) => {
//     console.log("Installed comrade");
//     e.waitUntil(
//         caches.open(cacheName).then((c) => {
//             console.log("caching")
//             c.addAll(assets);
//         })
//     );
// });

// self.addEventListener('activate', function(event) {
//     event.waitUntil(
//       caches.keys().then(function(allc) {
//         return Promise.all(
//             allc.filter(function(a) {
//             return a !== cacheName && a !== dynamicCacheName;
//           }).map(function(b) {
//             return caches.delete(b);
//           })
//         );
//       })
//     );
// });

// self.addEventListener("fetch", (e) => {
//     e.respondWith(
//         caches.match(e.request).then((res) => {
//             return res || fetch(e.request).then(fetchRes => {
//                 return caches.open(dynamicCacheName).then(cache => {
//                     cache.put(e.request.url, fetchRes.clone());
//                     return fetchRes;
//                 })
//             });
//         }).catch((err) => {
//             caches.match('/offline.html');
//         })
//     )
// });