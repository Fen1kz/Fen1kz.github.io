---
timestamp: 1441718580963
title: <%= CollectionName %>/<%= ItemName %>}
header: <a href="/<%= collectionName %>/"><%= CollectionName %></a>/<a href="/<%= collectionName %>/<%= itemName %>"><%= ItemName %></a>
---
<div class="z-depth-1 padding">
    <div class="collection">
        {@loop:global.<%= collectionName %>.<%= itemName %>}
    <a class="collection-item" href="/{value.href}">{value.meta.title}</a>
        {/loop}
    </div>
</div>