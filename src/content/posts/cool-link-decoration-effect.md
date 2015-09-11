---
title: Cool Link Decoration Effect
category: snippet
tags: css, design, style
timestamp: 1428577377894
---

```.css

a {
    position: relative;
}

a::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: currentColor;
    visibility: hidden;
    transform: scaleX(0);
    transition-duration: 0.2s;
    transition-timing-function: ease-in-out;
    transition-delay: 0s;
}

a:hover::before {
    visibility: visible;
    transform: scaleX(1);
}
```
>src: http://notes.iissnan.com/