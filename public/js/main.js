$(window).scroll(function () {
    if ($(document).scrollTop() > 50) {
        $('#mainNav').addClass('shrink');
    }
    else {
        $('#mainNav').removeClass('shrink');
    }
});