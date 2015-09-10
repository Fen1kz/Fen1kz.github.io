---
title: Home
template: raw
timestamp: 1441677490858
breadcrumbs:
---
<div>Sup!</div>
<h2>Latest posts:</h2>
<div class="collection">
    {@loop:global.collections.posts}
        <div class="z-depth-1 padding">
            <h3><a href="/{value.href}">{value.meta.title}</a></h3>
            {!<a class="collection-item" href="/{value.href}">!}
            {!<span class="collection-post-text">{value.meta.title}</span>!}
            {!<span class="font-size-85 grey-text">@<span class="timestamp-to-date">{value.meta.timestamp}</span></span>!}
            {!</a>!}
            <div>{@truncate data="{value.content|s}" length="200" href="/{value.href}" /}</div>
            {!<div class="truncate">{value.content|s}</div>!}
        </div>
    {/loop}
</div>