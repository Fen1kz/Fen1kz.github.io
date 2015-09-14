---
template: index
timestamp: 1441677490858
breadcrumbs: null
title: root
---
<div class="col s12">
    <h2>Latest posts:</h2>
    {@loop:global.indexCollection.files value="file"}
        <div class="z-depth-1 padding">
            <h3><a href="/{file.href}">{file.meta.title}</a> <span class="font-size-50 grey-text">@<span
                    class="timestamp-to-date">{file.meta.timestamp}</span></span></h3>



            <div>{@truncate data="{file.content|s}" length="200" href="/{file.href}" /}</div>
        </div>
    {/loop}
</div>
{!<div class="col s6">!}
    {!<h2>Useful projects:</h2>!}
    {!{@loop:global.indexCollection2.files value="file"}!}
        {!<div class="z-depth-1 padding collection">!}
            {!<a class="collection-item" href="/{file.href}">!}
                {!<span class="collection-post-text">{file.meta.title}</span>!}
                {!<span class="font-size-85 grey-text">@<span class="timestamp-to-date short">{file.meta.timestamp}</span></span>!}
            {!</a>!}
        {!</div>!}
    {!{/loop}!}
{!</div>!}