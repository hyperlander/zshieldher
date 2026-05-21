/* Register the Service Worker — loaded via <script defer> in BaseLayout */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Silently fail — site works fine without SW (e.g. Tor Browser)
    });
  });
}
