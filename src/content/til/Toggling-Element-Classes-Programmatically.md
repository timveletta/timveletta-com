---
title: Toggling Element Classes Programmatically
updatedAt: 2023-11-12T16:00:00.000Z
draft: false
category: JavaScript
---

So I came across this one recently when building the mobile menu for my site where I needed to show or hide a menu when the menu button was clicked. My original solution was going to involve using `add` and `remove` to hide or show the menu however in doing so, I would need to check whether the `hidden` class exists to know which one to call.

Instead, I came across the `toggle` function which achieves the same thing but with less logic for me to implement as shown.

```javascript
const button = document.getElementById('mobile-menu-toggle');
const menu = document.getElementById('mobile-menu');

button.addEventListener('click', () => {
  menu.classList.toggle('hidden');
});
```

BTW, `hidden` is a Tailwind class that is equivalent to `display: none`.
