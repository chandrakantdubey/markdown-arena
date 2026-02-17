---
id: media-embeds
title: Media & Embeds
level: Advanced
---

# Media & Embeds

Markdown's native image syntax is limited. For advanced media, we often fall back to raw HTML.

## Resizing Images
Native Markdown doesn't support resizing. Use HTML `img` tags.

```html
<img src="/2.jpeg" width="300" height="200" alt="Resized" />
```

## Audio & Video
Use HTML5 tags.

```html
<video src="clip.mp4" controls width="400"></video>
<audio src="song.mp3" controls></audio>
```

## YouTube / Iframes
Most platforms block iframes for security, but personal sites often allow them.

```html
<iframe width="560" height="315" src="https://www.youtube.com/embed/VIDEO_ID"></iframe>
```

## Collapsible Content (Details)
Great for FAQs or spoilers.

```html
<details>
  <summary>Click to view</summary>
  Hidden content here!
</details>
```
