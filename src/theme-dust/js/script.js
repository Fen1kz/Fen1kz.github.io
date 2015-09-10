$(function () {
    $(".side-nav-btn").sideNav({
        edge: 'right'
    });

    $('.timestamp-to-date').each((i, e) => {
        if (!isNaN(+e.textContent)) {
            e.textContent = moment(+e.textContent).format("dddd, MMMM Do, YYYY, HH:mm:ss UTCZ")
        }
    });
});

