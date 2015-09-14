$(function () {
    $(".side-nav-btn").sideNav({
        edge: 'right'
    });

    //let formats = {
    //    short: 'YYYY.MM.DD'
    //    , default: "dddd, MMMM Do, YYYY, HH:mm:ss UTCZ"
    //};

    let formats = {
        short: 'YYYY.MM.DD'
        , default: "YYYY, MMMM Do, HH:mm:ss UTCZ"
    };

    $('.timestamp-to-date').each((i, e) => {
        if (!isNaN(+e.textContent)) {
            let format = formats.default;
            for (let formatName in formats) {
                if (e.classList.contains(formatName)) {
                    format = formats[formatName];
                    break;
                }
            }
            e.textContent = moment(+e.textContent).format(format);
        }
    });
});

