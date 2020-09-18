self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.open("hacker-news-cache").then((cache) => {
      return fetch(event.request).then(function (response) {
        cache.put(event.request, response.clone());
        return response;
      });
    })
  );
});
