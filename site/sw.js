// 예전 주소의 앱 캐시를 지우고 서비스 워커를 내린 뒤, 열린 창을 새로 불러 새 주소로 넘어가게 한다
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', event => {
  event.waitUntil(
    (async () => {
      for (const k of await caches.keys()) await caches.delete(k)
      await self.registration.unregister()
      for (const c of await self.clients.matchAll({ type: 'window' })) c.navigate(c.url)
    })()
  )
})
