$(function () {
    $(".side-nav-btn").sideNav({
        edge: 'right'
    });

    $('.timestamp-to-date').each((i, e) => {
        e.textContent = moment(+e.textContent).format("dddd, MMMM Do, YYYY, HH:mm:ss UTCZ")
    });
});

