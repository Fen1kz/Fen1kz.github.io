---
title: Cool link decoration effect
category: snippet
tags: css, design, style
timestamp: 1428577377894
 ---
```
.posts-expand .post-title-link::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #000;
  visibility: hidden;
  transform: scaleX(0);
  transition-duration: 2.2s;
  transition-timing-function: ease-in-out;
  transition-delay: 0s;
}
.posts-expand .post-title-link:hover::before {
  visibility: visible;
  transform: scaleX(1);
}
```

src: http://notes.iissnan.com/