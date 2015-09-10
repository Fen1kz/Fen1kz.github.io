(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

$(function () {
    $(".side-nav-btn").sideNav({
        edge: 'right'
    });

    $('.timestamp-to-date').each(function (i, e) {
        if (!isNaN(+e.textContent)) {
            e.textContent = moment(+e.textContent).format("dddd, MMMM Do, YYYY, HH:mm:ss UTCZ");
        }
    });
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkOi9fZGV2L19wcm9qZWN0cy9mLmdoLmlvL3NyYy90aGVtZS1kdXN0L2pzL3NjcmlwdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUEsQ0FBQyxDQUFDLFlBQVk7QUFDVixLQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDO0FBQ3ZCLFlBQUksRUFBRSxPQUFPO0tBQ2hCLENBQUMsQ0FBQzs7QUFFSCxLQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFLO0FBQ25DLFlBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUU7QUFDeEIsYUFBQyxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLG9DQUFvQyxDQUFDLENBQUE7U0FDdEY7S0FDSixDQUFDLENBQUM7Q0FDTixDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJChmdW5jdGlvbiAoKSB7XHJcbiAgICAkKFwiLnNpZGUtbmF2LWJ0blwiKS5zaWRlTmF2KHtcclxuICAgICAgICBlZGdlOiAncmlnaHQnXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKCcudGltZXN0YW1wLXRvLWRhdGUnKS5lYWNoKChpLCBlKSA9PiB7XHJcbiAgICAgICAgaWYgKCFpc05hTigrZS50ZXh0Q29udGVudCkpIHtcclxuICAgICAgICAgICAgZS50ZXh0Q29udGVudCA9IG1vbWVudCgrZS50ZXh0Q29udGVudCkuZm9ybWF0KFwiZGRkZCwgTU1NTSBEbywgWVlZWSwgSEg6bW06c3MgVVRDWlwiKVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KTtcclxuXHJcbiJdfQ==
