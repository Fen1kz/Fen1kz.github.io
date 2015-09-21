(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

$(function () {
    $(".side-nav-btn").sideNav({
        edge: 'right'
    });

    //let formats = {
    //    short: 'YYYY.MM.DD'
    //    , default: "dddd, MMMM Do, YYYY, HH:mm:ss UTCZ"
    //};

    var formats = {
        short: 'YYYY.MM.DD',
        'default': "YYYY, MMMM Do, HH:mm:ss UTCZ"
    };

    $('.timestamp-to-date').each(function (i, e) {
        if (!isNaN(+e.textContent)) {
            var format = formats['default'];
            for (var formatName in formats) {
                if (e.classList.contains(formatName)) {
                    format = formats[formatName];
                    break;
                }
            }
            e.textContent = moment(+e.textContent).format(format);
        }
    });
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJEOi90ZW1wL2YuZ2guaW8vc3JjL3Jvb3QvanMvc2NyaXB0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNBQSxDQUFDLENBQUMsWUFBWTtBQUNWLEtBQUMsQ0FBQyxlQUFlLENBQUMsQ0FBQyxPQUFPLENBQUM7QUFDdkIsWUFBSSxFQUFFLE9BQU87S0FDaEIsQ0FBQyxDQUFDOzs7Ozs7O0FBT0gsUUFBSSxPQUFPLEdBQUc7QUFDVixhQUFLLEVBQUUsWUFBWTtBQUNqQixtQkFBUyw4QkFBOEI7S0FDNUMsQ0FBQzs7QUFFRixLQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxFQUFLO0FBQ25DLFlBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEVBQUU7QUFDeEIsZ0JBQUksTUFBTSxHQUFHLE9BQU8sV0FBUSxDQUFDO0FBQzdCLGlCQUFLLElBQUksVUFBVSxJQUFJLE9BQU8sRUFBRTtBQUM1QixvQkFBSSxDQUFDLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtBQUNsQywwQkFBTSxHQUFHLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQztBQUM3QiwwQkFBTTtpQkFDVDthQUNKO0FBQ0QsYUFBQyxDQUFDLFdBQVcsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ3pEO0tBQ0osQ0FBQyxDQUFDO0NBQ04sQ0FBQyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIiQoZnVuY3Rpb24gKCkge1xyXG4gICAgJChcIi5zaWRlLW5hdi1idG5cIikuc2lkZU5hdih7XHJcbiAgICAgICAgZWRnZTogJ3JpZ2h0J1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy9sZXQgZm9ybWF0cyA9IHtcclxuICAgIC8vICAgIHNob3J0OiAnWVlZWS5NTS5ERCdcclxuICAgIC8vICAgICwgZGVmYXVsdDogXCJkZGRkLCBNTU1NIERvLCBZWVlZLCBISDptbTpzcyBVVENaXCJcclxuICAgIC8vfTtcclxuXHJcbiAgICBsZXQgZm9ybWF0cyA9IHtcclxuICAgICAgICBzaG9ydDogJ1lZWVkuTU0uREQnXHJcbiAgICAgICAgLCBkZWZhdWx0OiBcIllZWVksIE1NTU0gRG8sIEhIOm1tOnNzIFVUQ1pcIlxyXG4gICAgfTtcclxuXHJcbiAgICAkKCcudGltZXN0YW1wLXRvLWRhdGUnKS5lYWNoKChpLCBlKSA9PiB7XHJcbiAgICAgICAgaWYgKCFpc05hTigrZS50ZXh0Q29udGVudCkpIHtcclxuICAgICAgICAgICAgbGV0IGZvcm1hdCA9IGZvcm1hdHMuZGVmYXVsdDtcclxuICAgICAgICAgICAgZm9yIChsZXQgZm9ybWF0TmFtZSBpbiBmb3JtYXRzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZS5jbGFzc0xpc3QuY29udGFpbnMoZm9ybWF0TmFtZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICBmb3JtYXQgPSBmb3JtYXRzW2Zvcm1hdE5hbWVdO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGUudGV4dENvbnRlbnQgPSBtb21lbnQoK2UudGV4dENvbnRlbnQpLmZvcm1hdChmb3JtYXQpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59KTtcclxuXHJcbiJdfQ==
