// ThriveRemoteOS Service Worker for PWA functionality

const CACHE_NAME = 'thrive-remote-os-v1.0.0';
const STATIC_CACHE = 'thrive-static-v1.0.0';
const DYNAMIC_CACHE = 'thrive-dynamic-v1.0.0';

// Assets to cache for offline functionality
const staticAssets = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json',
  '/virtual-pets-tool/',
  '/virtual-desktop-pets/',
  // Add other critical assets
];

// API endpoints that can work offline
const cacheableAPIs = [
  '/api/jobs',
  '/api/system-status',
  '/api/weather',
  '/api/useful-links'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(staticAssets);
      })
      .catch((error) => {
        console.error('Service Worker: Error caching static assets', error);
      })
  );
  
  // Force activation of new service worker
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  // Take control of all open clients
  self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Handle API requests
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      // Try network first for API calls
      fetch(request)
        .then((response) => {
          // Clone response before caching
          const responseClone = response.clone();
          
          // Cache successful API responses
          if (response.ok && cacheableAPIs.some(api => url.pathname.startsWith(api))) {
            caches.open(DYNAMIC_CACHE)
              .then((cache) => {
                cache.put(request, responseClone);
              });
          }
          
          return response;
        })
        .catch(() => {
          // Fallback to cache if network fails
          return caches.match(request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse;
              }
              
              // Return offline response for critical APIs
              if (url.pathname === '/api/system-status') {
                return new Response(JSON.stringify({
                  status: 'offline',
                  message: 'System running in offline mode',
                  timestamp: new Date().toISOString()
                }), {
                  headers: { 'Content-Type': 'application/json' }
                });
              }
              
              throw new Error('Network error and no cache available');
            });
        })
    );
    return;
  }
  
  // Handle static assets
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          return cachedResponse;
        }
        
        // Otherwise fetch from network
        return fetch(request)
          .then((response) => {
            // Don't cache if not a successful response
            if (!response.ok) {
              return response;
            }
            
            // Clone response for caching
            const responseClone = response.clone();
            
            // Cache the response
            caches.open(DYNAMIC_CACHE)
              .then((cache) => {
                cache.put(request, responseClone);
              });
            
            return response;
          });
      })
      .catch(() => {
        // Fallback for offline scenarios
        if (request.destination === 'document') {
          // Return cached index.html for navigation requests
          return caches.match('/');
        }
        
        // Return offline page or error response
        return new Response('Offline - Please check your connection', {
          status: 503,
          statusText: 'Service Unavailable'
        });
      })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync triggered', event.tag);
  
  if (event.tag === 'background-sync-jobs') {
    event.waitUntil(
      // Sync job search data when back online
      fetch('/api/jobs')
        .then((response) => response.json())
        .then((data) => {
          console.log('Service Worker: Jobs data synced', data);
          // Notify clients about sync completion
          self.clients.matchAll().then((clients) => {
            clients.forEach((client) => {
              client.postMessage({
                type: 'SYNC_COMPLETE',
                data: 'jobs'
              });
            });
          });
        })
        .catch((error) => {
          console.error('Service Worker: Sync failed', error);
        })
    );
  }
});

// Push notifications for job alerts
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push notification received');
  
  let data = { title: 'ThriveRemoteOS', body: 'New update available' };
  
  if (event.data) {
    try {
      data = event.data.json();
    } catch (error) {
      console.error('Service Worker: Error parsing push data', error);
    }
  }
  
  const options = {
    body: data.body,
    icon: '/logo192.png',
    badge: '/logo192.png',
    vibrate: [200, 100, 200],
    data: data.data || {},
    actions: [
      {
        action: 'open',
        title: 'Open App',
        icon: '/logo192.png'
      },
      {
        action: 'close',
        title: 'Close'
      }
    ],
    requireInteraction: true
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked', event.action);
  
  event.notification.close();
  
  if (event.action === 'open' || !event.action) {
    event.waitUntil(
      self.clients.matchAll({ type: 'window' })
        .then((clients) => {
          // Focus existing window if available
          if (clients.length > 0) {
            return clients[0].focus();
          }
          
          // Open new window
          return self.clients.openWindow('/');
        })
    );
  }
});

// Handle messages from main thread
self.addEventListener('message', (event) => {
  console.log('Service Worker: Message received', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    const urlsToCache = event.data.urls;
    event.waitUntil(
      caches.open(DYNAMIC_CACHE)
        .then((cache) => {
          return cache.addAll(urlsToCache);
        })
    );
  }
});

// Error handling
self.addEventListener('error', (event) => {
  console.error('Service Worker: Error occurred', event.error);
});

self.addEventListener('unhandledrejection', (event) => {
  console.error('Service Worker: Unhandled promise rejection', event.reason);
});