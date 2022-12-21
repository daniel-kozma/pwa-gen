import { InputData } from "./types.mjs"

export const defaultTemplate = `<!DOCTYPE html>
<html lang="{{lang}}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="index, follow">
  <title>{{title}}</title>
  <link rel="shortcut icon" href="{{webicon_url}}">
  <meta name="description" content="{{description}}">
  {#if keywords}<meta name="keywords" content="{{keywords}}">{/if}
  <meta name="theme-color" content="{{theme_color}}">

  <meta name="application-name" value="{{name}}">

  {#if author}<meta name="author" content="{{author}}">{/if}

  {#if page_url}<link rel="canonical" href="{{page_url}}">{/if}

  <link rel="manifest" href="{{manifest_url}}">

  <meta property="og:title" content="{{title}}">
  {#if page_url}<meta property="og:url" content="{{page_url}}">{/if}
  {#if display_img}<meta property="og:image" content="{{display_img}}">{/if}
  <meta property="og:type" content="{{app_type}}">
  <meta property="og:description" content="{{description}}">

  {{other_meta}}

  {{pag_html_output}}

  {{html_head}}

  <script>
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () =>
        navigator.serviceWorker.register("{{sw_url}}")
      )
    }
  </script>
</head>
<body>
  {{html_body}}
</body>
</html>`

export const swTemplates = {
  staleWhileRevalidate: `
    self.addEventListener('fetch', (event) => {
      event.respondWith(caches.open("pwa-cache-v1").then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          const fetchedResponse = fetch(event.request).then((networkResponse) => {
            cache.put(event.request, networkResponse.clone())
  
            return networkResponse
          })
          return cachedResponse || fetchedResponse
        })
      }))
    })
  `,
  networkOnly: `
    self.addEventListener("fetch", e => {
      return ""
    })
  `,
  fake:`
    self.addEventListener("fetch", e => {
      return ""
    })
  `,
}

export const configTemplate = JSON.stringify({
  name: "Write app name here",
  icon_URI: "Favicon path",
  description: "Write description here",
  output_html_filename: "index.html"
}, undefined, 2)