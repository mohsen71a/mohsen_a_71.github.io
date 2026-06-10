const CACHE_NAME = "love-album-v1";
const urlsToCache = [
  ".",
  "index.html",
  "manifest.json"
];

// نصب سرویس ورکر و کش کردن فایل‌ها
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// اینترسپت درخواست‌ها و پاسخ از کش
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

// فعال‌سازی و حذف کش‌های قدیمی
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => {
        if (key !== CACHE_NAME) return caches.delete(key);
      })
    ))
  );
});