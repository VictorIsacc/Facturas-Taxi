// Each GitHub Pages repository has its own cache namespace and worker scope.
const PREFIX='taxi-apc-granada-recibos:'+encodeURIComponent(self.registration.scope)+':';
const CACHE=PREFIX+'v4';
const SHELL=['./','./index.html','./style.css','./app.js?v=4','./core.js','./local-db.js','./backup.js','./jspdf.umd.min.js','./manifest.webmanifest?v=4','./icon.svg','./icon-192.png','./icon-512.png'].map(p=>new URL(p,self.location.href).href);
self.addEventListener('install',event=>event.waitUntil((async()=>{const cache=await caches.open(CACHE);await cache.addAll(SHELL);await self.skipWaiting();})()));
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const key of await caches.keys())if(key.startsWith(PREFIX)&&key!==CACHE)await caches.delete(key);await self.clients.claim();})()));
self.addEventListener('fetch',event=>{if(event.request.method!=='GET'||!SHELL.includes(event.request.url))return;event.respondWith((async()=>{const cache=await caches.open(CACHE);try{const response=await fetch(event.request);if(response.ok&&!response.redirected)await cache.put(event.request,response.clone());return response;}catch{return await cache.match(event.request)||new Response('Abre la aplicación con conexión la primera vez.',{status:503,headers:{'Content-Type':'text/plain;charset=utf-8'}});}})());});
