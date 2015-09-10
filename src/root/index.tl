---
title: Home
template: raw
timestamp: 1441677490858
breadcrumbs: lol
---
<div>Sup!</div>
<h2>Latest posts:</h2>
<div class="collection">
    {@loop:global.indexCollection.files value="file"}
        <div class="z-depth-1 padding">
            <h3><a href="/{file.href}">{file.meta.title}</a></h3>
            <a class="collection-item" href="/{file.href}">
                <span class="collection-post-text">{file.meta.title}</span>
                <span class="font-size-85 grey-text">@<span
                        class="timestamp-to-date">{file.meta.timestamp}</span></span>
            </a>

            <div>{@truncate data="{file.content|s}" length="200" href="/{file.href}" /}</div>
        </div>
    {/loop}
</div>