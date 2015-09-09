---
timestamp: 1441718580963
title: <%= CollectionName %>}
---
{@loop:global.<%= collectionName %>}
<div class="z-depth-1 padding">
    <h4><a href="/<%= collectionName %>/{key}">{@startCase:key/}</a></h4>
    <div class="collection">
        {@loop:value}
        <a class="collection-item" href="/{value.href}">{value.meta.title}</a>
        {/loop}
    </div>
</div>
{/loop}