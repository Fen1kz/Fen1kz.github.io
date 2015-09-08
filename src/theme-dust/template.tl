<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8"/>
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>-->
    <title>{file.meta.title}</title><!-- Compiled and minified CSS -->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.0/css/materialize.min.css">
    <link rel="stylesheet" href="/css/style.css">
    <!-- Compiled and minified JavaScript -->
    <script src="/js/vendor/jquery.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.0/js/materialize.min.js"></script>
    <script src="/js/script.js"></script>
</head>
<body>
<nav>
    <div class="nav-wrapper container">
        <a href="/" class="brand-logo">Lavasystems Corp.</a>
        <a href="#" data-activates="root-side-nav" class="side-nav-btn right hide-on-large-only">
            <i class="material-icons">menu</i></a>
        <ul class="right hide-on-med-and-down">
            <li><a href="/tags">Tags</a></li>
            <li><a href="/collections">Collections</a></li>
        </ul>
        <ul class="side-nav" id="root-side-nav">
            <li><a href="/tags">Tags</a></li>
            <li><a href="/collections">Collections</a></li>
        </ul>
    </div>
</nav>
<div class="container">
    {+body}
        <h2>{?file.meta.header}{file.meta.header|s}{:else}{file.meta.title|s}{/file.meta.header}</h2>

        <div>{file.contents|s}</div>
    {/body}
</div>
</body>
</html>