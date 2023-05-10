/* eslint-disable no-undef */
import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate } from 'workbox-strategies';

// Do precaching
precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev'),
  new StaleWhileRevalidate(),
);

self.addEventListener('install', () => {
  console.log('Service Worker: Installed');
  self.skipWaiting();
});

self.addEventListener('push', () => {
  console.log('Service Worker: Pushed');
});
