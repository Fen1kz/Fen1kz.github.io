---
timestamp: 1441718580963
title: Collections
rename: index
---
{@loop:global.collections}
    <div>
        {!<h3><a href="/{key}">{@startCase:key/}</a></h3>!}
        <div class="collection with-header">
            <a class="collection-header" href="/{key}">{@startCase:key/}</a>
            {@loop:value}
                <a class="collection-item" href="/{value.href}">{value.meta.title}</a>
            {/loop}
        </div>
    </div>
{/loop}